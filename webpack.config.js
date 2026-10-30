// Generated using webpack-cli https://github.com/webpack/webpack-cli

const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const stylesHandler = "style-loader";

const config = {
  entry: "./src/main.jsx",
  // Target browsers directly — prevents webpack 5 from emitting
  // ES6+ iterator/arrow syntax that breaks older browsers
  target: ["web", "es5"],
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "build")
  },
  watchOptions: { poll: true },
  devServer: {
    port: 3000,
    host: "0.0.0.0"
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, "index.html")
    })
  ],
  module: {
    rules: [
      {
        test: /\.(js|jsx|es)$/i,
        exclude: /node_modules/,
        loader: "babel-loader"
      },
      {
        test: /\.less$/i,
        use: [stylesHandler, "css-loader", "postcss-loader", "less-loader"]
      },
      {
        test: /\.css$/i,
        use: [stylesHandler, "css-loader", "postcss-loader"]
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/i,
        type: "asset"
      }

      // Add your rules for custom modules here
      // Learn more about loaders from https://webpack.js.org/loaders/
    ]
  },
  resolve: {
    extensions: ["*", ".js", ".jsx", ".es", ".mjs"],
    alias: {
      immer: path.resolve(__dirname, "node_modules/immer/dist/immer.legacy-esm.js")
    }
  }
};

module.exports = (env, argv) => {
  const isProd = (argv && argv.mode === "production") || process.env.NODE_ENV === "production";
  process.env.NODE_ENV = isProd ? "production" : "development";
  config.mode = process.env.NODE_ENV;
  return config;
};
