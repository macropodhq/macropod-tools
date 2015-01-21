var webpack = require('webpack');

var release = (process.env.NODE_ENV === 'production');

var plugins = [
  new webpack.IgnorePlugin(/vertx/),
  new webpack.NormalModuleReplacementPlugin(/^react$/, 'react/addons'),
  new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.js'),
];

var jsxLoader = ['jsx-loader?harmony'];

if (release)  {
  plugins.push(new webpack.DefinePlugin({
    'process.env': {
      // This has effect on the react lib size
      'NODE_ENV': JSON.stringify('production'),
    },
  }));

  plugins.push(new webpack.optimize.DedupePlugin());
  plugins.push(new webpack.optimize.UglifyJsPlugin());
} else {
  jsxLoader.unshift('react-hot-loader');
}

var config = module.exports = {
  debug: !release,
  cache: !release,
  devtool: !release && 'eval',
  entry: {
    app: './app',
    vendor: [],
  },
  output: {
    path: process.cwd() + '/dist',
    filename: '[name].js',
  },
  plugins: plugins,
  resolveLoader: {
    modulesDirectories: ['node_modules', 'node_modules/macropod-tools/node_modules']
  },
  resolve: {
    extensions: ['', '.js', '.jsx', '.scss', '.css'],
    modulesDirectories: ['node_modules', 'node_modules/macropod-tools/node_modules']
  },
  module: {
    loaders: [
      { test: /\.jsx$/, loaders: jsxLoader },
      {
        test: /\.scss$/,
        loaders: [
          'style-loader',
          'css-loader',
          'autoprefixer-loader',
          'sass-loader?includePaths[]=./app/base/style,includePaths[]=./node_modules,includePaths[]=./style'
        ],
      },
      { test: /\.css$/,     loader: 'style-loader!css-loader' },
      { test: /\.png$/,     loader: 'url-loader?limit=100000&mimetype=image/png'},
      { test: /\.jpg$/,     loader: 'url-loader?limit=100000&mimetype=image/jpeg' },
      { test: /\.woff$/,    loader: 'url-loader?mimetype=application/font-woff' },
      { test: /\.ttf$/,     loader: 'url-loader?' },
      { test: /\.eot$/,     loader: 'url-loader?' },
      { test: /\.svg$/,     loader: 'file-loader' },
      { test: /\.pdf$/,     loader: 'file-loader' },
      { test: /\raw.svg$/,  loader: 'raw-loader?' },
    ],
  },
};
