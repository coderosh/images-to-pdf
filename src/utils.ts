const isNum = (a: any) => typeof a === 'number' && a - a === 0

const getOrientation = (width: number, height: number) =>
  width > height ? 'l' : 'p'

export { isNum, getOrientation }
