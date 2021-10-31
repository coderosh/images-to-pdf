import ImagesToPDF, { ImageOptions } from './ImagesToPdf.js'

const imagesToPDF = (
  images:
    | {
        src: Uint8Array | ArrayBuffer
        options?: ImageOptions
      }[]
) => {
  const imgToPdf = new ImagesToPDF(images)

  return imgToPdf.createPdf()
}

export { ImagesToPDF as default, imagesToPDF }
