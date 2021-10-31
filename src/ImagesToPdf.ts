import { jsPDF as JSPDF } from 'jspdf'
import imageSize from '@coderosh/image-size'

import { getOrientation, isNum } from './utils.js'

export interface ImageOptions {
  height?: number
  width?: number
}

class ImagesToPDF {
  constructor(
    public images: {
      src: ArrayBuffer | Uint8Array
      options?: ImageOptions
    }[] = []
  ) {}

  addImage(img: ArrayBuffer | Uint8Array, options?: ImageOptions) {
    this.images.push({ src: img, options })
  }

  async createPdf() {
    let doc: JSPDF | undefined

    for (const image of this.images) {
      const src =
        image.src instanceof ArrayBuffer ? new Uint8Array(image.src) : image.src

      const options = image.options || {}

      if (!isNum(options.height) || !isNum(options.width)) {
        const size = await imageSize(src.buffer)
        options.height = size.height
        options.width = size.width
      }

      const orientation = getOrientation(options.width!, options.height!)
      if (typeof doc === 'undefined') {
        doc = new JSPDF({
          format: [options.width!, options.height!],
          orientation,
        })
      } else {
        doc.addPage([options.width!, options.height!], orientation)
      }

      doc.addImage(src, 0, 0, options.width!, options.height!)
    }

    return {
      arrayBuffer: () => doc!.output('arraybuffer'),
      dataUrl: () => doc!.output('dataurlstring'),
    }
  }
}

export default ImagesToPDF
