import { PDFDocument } from 'pdf-lib'
import imageSize from '@coderosh/image-size'

import { ImageOptions, isNum, isPng } from './utils.js'

class ImagesToPDF {
  private constructor(private pdfDoc: PDFDocument) {}

  static async create() {
    const doc = await PDFDocument.create()
    return new ImagesToPDF(doc)
  }

  async addImage(img: ArrayBuffer, options?: ImageOptions) {
    if (!options) options = {}

    if (!isNum(options.height) || !isNum(options.width)) {
      const { height, width } = await imageSize(img)
      options.height = height
      options.width = width
    }

    if (!options.type) {
      options.type = isPng(new Uint8Array(img)) ? 'png' : 'jpg'
    }

    const page = this.pdfDoc.addPage([options.width!, options.height!])

    const pdfImage =
      options.type === 'png'
        ? await this.pdfDoc.embedPng(img)
        : await this.pdfDoc.embedJpg(img)

    const drawOptions = {
      height: options.height,
      width: options.width,
      x: 0,
      y: 0,
    }

    page.drawImage(pdfImage, drawOptions)
  }

  save(format?: 'uint8array'): Promise<Uint8Array>
  save(format?: 'base64'): Promise<string>
  save(format: any = 'uint8array') {
    return format === 'uint8array'
      ? this.pdfDoc.save()
      : this.pdfDoc.saveAsBase64({ dataUri: true })
  }
}

export default ImagesToPDF
