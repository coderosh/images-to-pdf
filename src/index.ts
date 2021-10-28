import ImagesToPDF from './ImageToPdf.js'
import { ImageOptions } from './utils.js'

const imagesToPDF = async (
  images: ArrayBuffer[] | { src: ArrayBuffer; options?: ImageOptions }[]
) => {
  const pdf = await ImagesToPDF.create()

  for (const image of images) {
    image instanceof ArrayBuffer
      ? await pdf.addImage(image)
      : await pdf.addImage(image.src, image.options)
  }

  return {
    base64: () => pdf.save('base64'),
    uint8array: () => pdf.save('uint8array'),
  }
}

export default ImagesToPDF
export { imagesToPDF }
