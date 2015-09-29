var webpack = require('webpack');
var path = require('path');
var pkg = require(process.cwd() + '/package.json');
var constants = require('postcss-local-constants');

var release = (process.env.NODE_ENV === 'production');
var testing = (process.env.NODE_ENV === 'testing');

var plugins = [
  new webpack.IgnorePlugin(/vertx/),
  new webpack.NormalModuleReplacementPlugin(/^react$/, 'react/addons'),
];

if (!testing) {
  plugins.push(new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.js'));
  plugins.push(function() { // emit stats.json here because shell scripting is hard
    this.plugin('done', function(stats) {
      var jsonStats = stats.toJson({
        chunkModules: true,
      });
      require('fs').writeFileSync(
        path.join(process.cwd(), 'dist', 'assets.json'),
        JSON.stringify(jsonStats.assetsByChunkName)
      );
      require('fs').writeFileSync(
        path.join(process.cwd(), 'dist', 'stats.json'),
        JSON.stringify(jsonStats)
      );

      var modules = jsonStats.modules;
      modules.sort(function(a, b) {
        if (a.size > b.size) {
          return -1;
        }
        if (a.size < b.size) {
          return 1;
        }
        // a must be equal to b
        return 0;
      });

      console.log('\n\n20 largest assets');

      for (var i=0;i<20;i++) {
        var module = modules[i];
        console.log(module.name + ' ' + module.size);
      }

      console.log();
    });
  });
}

var jsxLoader = ['babel-loader?optional[]=runtime&stage=0&cacheDirectory=true'];

if (release)  {
  plugins.push(new webpack.DefinePlugin({
    'process.env': {
      // This has effect on the react lib size
      'NODE_ENV': JSON.stringify('production'),
    },
  }));

  plugins.push(new webpack.optimize.DedupePlugin());
  plugins.push(new webpack.optimize.UglifyJsPlugin({compress: {warnings: false}}));
  plugins.push(new webpack.NoErrorsPlugin()); // cause failed production builds to fail faster
} else if (!testing) {
  jsxLoader.unshift('react-hot-loader');
}

if (testing) {
  var entry = null;
} else {
  var entry = {
    app: './app',
    vendor: Object.keys(pkg.dependencies).filter(function(e) {
      return [
        'macropod-components',
        'react-components', //TODO: make this finer
        'open-sans',
        'pouch-client',
      ].indexOf(e) === -1;
    }),
  };
}

var config = module.exports = {
  debug: !release,
  cache: !release,
  devtool: !release && 'eval',
  entry: entry,
  output: {
    path: process.cwd() + '/dist',
    filename: '[name].js',
  },
  plugins: plugins,
  resolveLoader: {
    modulesDirectories: ['node_modules', 'node_modules/macropod-tools/node_modules']
  },
  resolve: {
    extensions: ['', '.js', '.jsx', '.scss', '.css', '.mcss'],
    modulesDirectories: ['node_modules', 'node_modules/macropod-tools/node_modules'],
    packageMains: ['browser', 'main', 'style'],
  },
  module: {
    loaders: [
      // don't move this loader out of first place - it's referenced by position
      // in stack's config (i know, ew)
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loaders: jsxLoader,
      },
      {
        test: /\.(js|jsx)$/,
        /*
         * Note: When building a module which needs to be included and built
         * using Babel, you must add its name to the end of the `include` regex
         * i.e. /node_modules[\\\/](?:macropod-components|my-module-name)/
         */
        include: /node_modules[\\\/](?:macropod-components|pouch-client)/,
        loaders: jsxLoader,
      },
      {
        test: /\.json$/,
        loader: 'json',
      },
      {
        test: /\.scss$/,
        loaders: [
          'style-loader',
          'css-loader?-minimize',
          'autoprefixer-loader',
          'sass-loader?includePaths[]=./app/base/style,includePaths[]=./node_modules,includePaths[]=./style,includePaths[]=./node_modules/macropod-components/style,includePaths[]=./app/base/style,includePaths[]=./app/base/components,includePaths[]=./node_modules,includePaths[]=./node_modules/bootstrap-sass/assets/fonts'
        ],
      },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader?-minimize',
      },
      {
        test: /\.mcss$/,
        loader: 'style-loader!css-loader?-minimize&modules&localIdentName=[path][name]---[local]---[hash:base64:5]&importLoaders=1!postcss-loader',
      },
      {
        test: /\.png$/,
        loader: 'url-loader?limit=100000&mimetype=image/png',
      },
      {
        test: /\.jpg$/,
        loader: 'url-loader?limit=100000&mimetype=image/jpeg',
      },
      {
        test: /\.woff$/,
        loader: 'url-loader?mimetype=application/font-woff',
      },
      {
        test: /\.ttf$/,
        loader: 'url-loader?',
      },
      {
        test: /\.eot$/,
        loader: 'url-loader?',
      },
      {
        test: /\.svg$/,
        loader: 'url-loader',
      },
      {
        test: /\.pdf$/,
        loader: 'file-loader',
      },
      {
        test: /\.raw.svg$/,
        loader: 'raw-loader?',
      },
    ],
  },
  postcss: [
    constants(),
  ],
};
