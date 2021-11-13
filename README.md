# images-to-pdf

> Combine images to a single pdf. Works on both browser and node.

<a href="https://npmjs.com/package/@coderosh/images-to-pdf"><img alt="NPM" src="https://img.shields.io/npm/v/@coderosh/images-to-pdf" /></a>
<a href="https://github.com/coderosh/images-to-pdf"><img alt="MIT" src="https://img.shields.io/badge/license-MIT-blue.svg" /></a>
<a href="#"><img alt="CI" src="https://img.shields.io/github/workflow/status/coderosh/images-to-pdf/CI"></a>
<a href="https://github.com/coderosh/images-to-pdf"><img src="https://img.shields.io/badge/PRs-welcome-brightgreen.svg" alt="PRs welcome!" /></a>

## Installation

```sh
# node
npm install @coderosh/images-to-pdf

# yarn
yarn add @coderosh/images-to-pdf
```

## Usage

This package requires image to be of type arraybuffer or uint8array.

- Using `imagesToPDF` function.

  ```js
  import { imagesToPDF } from '@coderosh/images-to-pdf'

  const main = async () => {
    const img1 = await fetch('https://img1').then((res) => res.arrayBuffer())
    const img2 = await fetch('https://img2').then((res) => res.arrayBuffer())

    const pdf = await imagesToPDF([
      img1,
      { src: img2, options: { height: 234, width: 345 } },
    ])

    const dataUrl = pdf.dataUrl()
    const arrayBuffer = pdf.arrayBuffer()
  }

  main()
  ```

- Using `ImagesToPDF` class.

  ```js
  import ImagesToPDF from '@coderosh/images-to-pdf'

  const main = async () => {
    const img1 = await fetch('https://img1').then((res) => res.arrayBuffer())
    const img2 = await fetch('https://img2').then((res) => res.arrayBuffer())
    const img3 = await fetch('https://img3').then((res) => res.arrayBuffer())
    const img4 = await fetch('https://img4').then((res) => res.arrayBuffer())

    const imgToPdf = new ImagesToPDF([img1, { src: img2 }])
    imgToPdf.addImage(img3)
    imgToPdf.addImage(img4, { height: 234, width: 324 })

    const pdf = await imgToPdf.createPdf()

    const dataUrl = pdf.dataUrl()
    const arrayBuffer = pdf.arrayBuffer()
  }

  main()
  ```

## License

MIT
