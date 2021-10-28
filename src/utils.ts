// https://en.wikipedia.org/wiki/Portable_Network_Graphics#File_header
const isPng = (uint8array: Uint8Array) => {
  const arr = [0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]
  for (let i = 0; i <= 7; i++) {
    if (arr[i] !== uint8array[i]) return false
  }
  return true
}

interface ImageOptions {
  height?: number
  width?: number
  type?: 'png' | 'jpg'
}

const isNum = (a: any) => typeof a === 'number'

export { isPng, isNum, ImageOptions }
