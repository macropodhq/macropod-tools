var webpack = require('webpack');

var release = (process.env.NODE_ENV === 'production');

var plugins = [
  new webpack.IgnorePlugin(/vertx/),
  new webpack.NormalModuleReplacementPlugin(/^react$/, 'react/addons'),
  new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.js'),
];

var jsxLoader = ['jsx?harmony'];

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
  jsxLoader = ['react-hot', 'jsx?harmony'];
}

var config = module.exports = {
  debug: !release,
  cache: !release,
  devtool: !release && 'eval',
  entry: {
    app: './app',
    vendor: ['react/addons', 'lodash-node', // incomplete, and needs some magic to pull them from the targets deps
     'moment', 'react-textarea-autosize'],
  },
  output: {
    path: __dirname + '/dist',
    filename: '[name].js',
  },
  plugins: plugins,
  resolve: {
    extensions: ['', '.js', '.jsx', '.scss', '.css'],
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
      { test: /\raw.svg$/,  loader: 'raw-loader?' },
    ],
},
};
