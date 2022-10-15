const isTest = String(process.env.NODE_ENV) === 'test'

module.exports = {
  plugins: ['@emotion', '@babel/plugin-transform-runtime'],
  presets: [
    [
      '@babel/preset-env',
      {
        modules: isTest ? 'commonjs' : false,
        targets: {
          node: '10',
        },
      },
    ],
    '@babel/preset-typescript',
    [
      '@babel/preset-react',
      {
        runtime: 'automatic',
      },
    ],
  ],
}
