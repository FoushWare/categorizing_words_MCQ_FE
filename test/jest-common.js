const path = require('path')
// configure jest [jsdom] envirnoment
module.exports = {
  rootDir: path.join(__dirname, '../'),
  moduleNameMapper: {
    '\\.module\\.css$': 'identity-obj-proxy', // to make className appear in the test
    '\\.css$': require.resolve('./style-mock.js'), // mocking css file because it's render as module not css file
  },
  moduleDirectories: [
    'node_modules',
    path.join(__dirname, '../src'),
    'shared',
    __dirname,
  ],
  watchPlugins: [
    'jest-watch-select-projects',
    'jest-watch-typeahead/filename',
    'jest-watch-typeahead/testname',
  ],
}
