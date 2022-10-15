module.exports = {
  ...require('./test/jest-common'),
  collectCoverageFrom: [
    '**/src/**/*.js',
  ] /** include all the project files in coverage not only the test files */,
  coverageThreshold: {
    global: {
      statements: 0,
      branches: 0,
      functions: 0,
      lines: 0,
    },
    //When makeing specific rules for files respect to coverage .. it subtract it's percenge from the global setting Above
    // './src/shared/utils.js': {
    //   // make this file strick for coverage ..if anyone change function or add function make sure every line in covered in testing
    //   statements: 0,
    //   branches: 0,
    //   functions: 0,
    //   lines: 0,
    // },
  },
  projects: [
    './test/jest.client.js',
    './test/jest.server.js',
    './test/jest.lint.js',
  ],
}
