// Generated using webpack-cli https://github.com/webpack/webpack-cli

const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const isProduction = process.env.NODE_ENV == "production";

const stylesHandler = "style-loader";

const config = {
  entry: "./src/main.jsx",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "build")
  },
  devServer: {
    port: 3000,
    host: "localhost"
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
        exclude: /node-modules/,
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
    extensions: ["", ".js", ".jsx", ".es"]
  }
};

module.exports = () => {
  if (isProduction) {
    config.mode = "production";
  } else {
    config.mode = "development";
  }
  return config;
};
