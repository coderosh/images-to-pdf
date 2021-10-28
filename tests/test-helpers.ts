const isPdf = (buf: Uint8Array) => {
  const arr = [0x25, 0x50, 0x44, 0x46, 0x2d]

  for (let i = 0; i <= 4; i++) {
    if (buf[i] !== arr[i]) return false
  }

  return true
}

export { isPdf }
