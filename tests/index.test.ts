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
  it('should return a object with base64 and uint8array function', async () => {
    const imagesToPDF = await import('../src').then((res) => res.imagesToPDF)

    const pdf = await imagesToPDF([ab])

    expect(pdf).toMatchInlineSnapshot(`
      Object {
        "base64": [Function],
        "uint8array": [Function],
      }
    `)
  })

  describe('imagesToPDF:base64', () => {
    it('should return base64 string', async () => {
      const imagesToPDF = await import('../src').then((res) => res.imagesToPDF)
      const pdf = await imagesToPDF([ab])

      expect(
        (await pdf.base64()).startsWith('data:application/pdf;base64')
      ).toBe(true)
    })
  })

  describe('imagesToPDF:uint8array', () => {
    it('should return uint8array', async () => {
      const imagesToPDF = await import('../src').then((res) => res.imagesToPDF)
      const pdf = await imagesToPDF([ab])
      expect((await pdf.uint8array()) instanceof Uint8Array).toBe(true)
    })

    it('should return uint8array which should be a pdf', async () => {
      const imagesToPDF = await import('../src').then((res) => res.imagesToPDF)
      const pdf = await imagesToPDF([ab])
      expect(isPdf(await pdf.uint8array())).toBe(true)
    })
  })
})
