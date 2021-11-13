/**
 * @type {import("@jest/types").Config.InitialOptions}
 */
const config = {
  preset: 'ts-jest/presets/default-esm',
  testMatch: ['**/*.test.ts'],
  collectCoverage: true,
  collectCoverageFrom: ['src/**.ts'],
  globals: {
    'ts-jest': {
      useESM: true,
    },
  },
  coverageThreshold: {
    global: {
      branches: 100,
      functions: 100,
      lines: 100,
      statements: 100,
    },
  },
  moduleNameMapper: {
    '^(\\.{1,2}/.*)\\.js$': '$1',
  },
}

export default config
