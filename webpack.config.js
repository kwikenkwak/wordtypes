const path = require('path')

module.exports = {
  entry: './src/index.js', // path to our input file
  output: {
    filename: 'index-bundle.js', // output bundle file name
    path: path.resolve(__dirname, './static') // path to our Django static directory
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: { presets: ['@babel/preset-env', '@babel/preset-react'] }
      },
      {
        test: /\.(scss|css)$/,
        use: ['style-loader', 'css-loader', 'sass-loader']
      }
    ]
  },
  resolve: {
    alias: {
      src: path.resolve(__dirname, './src'),
      components: path.resolve(__dirname, './src/components'),
      hooks: path.resolve(__dirname, './src/hooks'),
      utils: path.resolve(__dirname, './src/utils'),
      pages: path.resolve(__dirname, './src/pages'),
      themes: path.resolve(__dirname, './src/themes')
    }
  }
}
