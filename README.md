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

This package requires image to be of type arraybuffer.

- Using `imagesToPDF` function.

  ```js
  import { imagesToPDF } from '@coderosh/images-to-pdf'

  const main = async () => {
    const img1 = await fetch('https://img1').then((res) => res.arrayBuffer())
    const img2 = await fetch('https://img2').then((res) => res.arrayBuffer())

    const pdf = await imagesToPDF([img1, img2])

    const base64Url = await pdf.base64()
    const uint8array = await pdf.uint8array()

    console.log(base64Url, uint8array)
  }

  main()
  ```

- Using `ImagesToPDF` class.

  ```js
  import ImagesToPDF from '@coderosh/images-to-pdf'

  const main = async () => {
    const pdf = await ImagesToPDF.create()
    const img1 = await fetch('https://img1').then((res) => res.arrayBuffer())
    const img2 = await fetch('https://img2').then((res) => res.arrayBuffer())

    await pdf.addImage(img1)
    await pdf.addImage(img2)

    const base64Url = await pdf.save('base64')
    const uint8array = await pdf.save('uint8array')

    console.log(base64Url, uint8array)
  }

  main()
  ```

### Passing Options

`height`, `width` and `type` of image will be calculated by this package. But if you want you can pass those on your own too.

- Using `ImagesToPDF` class.

  ```js
  import ImagesToPDF from '@coderosh/images-to-pdf'

  const main = async () => {
    const pdf = await ImagesToPDF.create()
    const img1 = await fetch('https://img1.png').then((res) =>
      res.arrayBuffer()
    )
    const img2 = await fetch('https://img2.jpg').then((res) =>
      res.arrayBuffer()
    )

    await pdf.addImage(img1, { height: 234, width: 234, type: 'png' })
    await pdf.addImage(img2, { type: 'jpg' })

    const base64Url = await pdf.save('base64')
    const uint8array = await pdf.save('uint8array')

    console.log(base64Url, uint8array)
  }

  main()
  ```

- Using `imagesToPDF` function.

  ```js
  import { imagesToPDF } from '@coderosh/images-to-pdf'

  const main = async () => {
    const img1 = await fetch('https://img1.png').then((res) =>
      res.arrayBuffer()
    )
    const img2 = await fetch('https://img2.jpg').then((res) =>
      res.arrayBuffer()
    )

    const pdf = await imagesToPDF([
      { src: img1, options: { type: 'png' } },
      { src: img2, options: { height: 234, width: 234, type: 'jpg' } },
    ])

    const base64Url = await pdf.base64()
    const uint8array = await pdf.uint8array()

    console.log(base64Url, uint8array)
  }

  main()
  ```

## License

MIT
