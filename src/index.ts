import ImagesToPDF, { ImageOptions } from './ImagesToPdf.js'

const imagesToPDF = (
  images: (
    | {
        src: ArrayBuffer | Uint8Array
        options?: ImageOptions
      }
    | (ArrayBuffer | Uint8Array)
  )[]
) => {
  const imgToPdf = new ImagesToPDF(images)

  return imgToPdf.createPdf()
}

export { ImagesToPDF as default, imagesToPDF }
