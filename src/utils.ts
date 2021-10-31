const isNum = (a: any) => typeof a === 'number'

const getOrientation = (width: number, height: number) =>
  width > height ? 'l' : 'p'

export { isNum, getOrientation }
