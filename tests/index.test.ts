import axios from 'axios'
import { isPdf } from './test-helpers'

let ab: ArrayBuffer
beforeAll(async () => {
  jest.mock('@coderosh/image-size', () => ({
    __esModule: true,
    default: jest.fn(() => ({ height: 827, width: 738 })),
  }))

  ab = await axios
    .get('https://ulka.js.org/logo.png', { responseType: 'arraybuffer' })
    .then((res) => res.data.buffer)
})

afterAll(() => {
  jest.restoreAllMocks()
})

describe('imagesToPDF', () => {
  it('should return a object with dataUrl and arrayBuffer function', async () => {
    const imagesToPDF = await import('../src').then((res) => res.imagesToPDF)

    const pdf = await imagesToPDF([{ src: ab }])

    expect(pdf).toMatchInlineSnapshot(`
      Object {
        "arrayBuffer": [Function],
        "dataUrl": [Function],
      }
    `)
  })

  it('should work for more than one image', async () => {
    const imagesToPDF = await import('../src').then((res) => res.imagesToPDF)
    const pdf = await imagesToPDF([ab, ab])

    expect(pdf).toMatchInlineSnapshot(`
    Object {
      "arrayBuffer": [Function],
      "dataUrl": [Function],
    }
  `)
  })

  describe('imagesToPDF:dataUrl', () => {
    it('should return data url string', async () => {
      const imagesToPDF = await import('../src').then((res) => res.imagesToPDF)
      const pdf = await imagesToPDF([{ src: ab }])
      expect(pdf.dataUrl().startsWith('data:application/pdf;')).toBe(true)
    })
  })

  describe('imagesToPDF:arrayBuffer', () => {
    it('should return arrayBuffer', async () => {
      const imagesToPDF = await import('../src').then((res) => res.imagesToPDF)
      const pdf = await imagesToPDF([{ src: ab }])
      expect(pdf.arrayBuffer() instanceof ArrayBuffer).toBe(true)
    })

    it('should return arrayBuffer which should be a pdf', async () => {
      const imagesToPDF = await import('../src').then((res) => res.imagesToPDF)
      const pdf = await imagesToPDF([{ src: ab }])

      expect(isPdf(new Uint8Array(pdf.arrayBuffer()))).toBe(true)
    })
  })

  describe('ImagesToPdf', () => {
    test('addImage method should work', async () => {
      const ImagesToPdf = await import('../src').then((res) => res.default)
      const pdf = new ImagesToPdf()
      pdf.addImage(ab, { height: 20, width: 20 })
      pdf.addImage(new Uint8Array(ab), { height: 20 })

      expect(pdf.images.length).toBe(2)
      const arb = (await pdf.createPdf()).arrayBuffer()
      expect(isPdf(new Uint8Array(arb))).toBe(true)
    })
  })
})
