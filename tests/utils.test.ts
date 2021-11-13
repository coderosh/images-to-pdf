import { isNum, getOrientation } from '../src/utils'

describe('isNum', () => {
  it('should return true if given arg is a number', () => {
    expect(isNum(5)).toBe(true)
  })

  it('should return false if given arg is a string', () => {
    expect(isNum('2')).toBe(false)
  })

  it('should return false if given arg is Infinity', () => {
    expect(isNum(Infinity)).toBe(false)
  })

  it('should return false if given arg is NaN', () => {
    expect(isNum(NaN)).toBe(false)
  })
})

describe('isOrientation', () => {
  it("should return 'l' if width is greater than height", () => {
    expect(getOrientation(300, 200)).toBe('l')
  })

  it("should return 'p' if width is less than height", () => {
    expect(getOrientation(100, 200)).toBe('p')
  })
})
