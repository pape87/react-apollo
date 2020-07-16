import path from "path";
import webpack, { Configuration } from "webpack";
import HtmlWebpackPlugin from "html-webpack-plugin";
import ForkTsCheckerWebpackPlugin from "fork-ts-checker-webpack-plugin";

const webpackConfig = (env): Configuration => ({
  entry: "./src/index.tsx",
  resolve: {
    extensions: [".ts", ".tsx", ".js"],
    alias: {
      components: path.resolve(__dirname, "./src/components/")
    }
  },
  output: {
    path: path.join(__dirname, "/dist"),
    filename: "build.js"
  },
  devtool: "source-map",
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: "ts-loader",
        options: {
          transpileOnly: true
        },
        exclude: /dist/
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: ["style-loader", "css-loader"]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./public/index.html"
    }),
    new webpack.DefinePlugin({
      "process.env.PRODUCTION": env.production || !env.development,
      "process.env.NAME": JSON.stringify(require("./package.json").name),
      "process.env.VERSION": JSON.stringify(require("./package.json").version)
    }),
    new ForkTsCheckerWebpackPlugin({
      eslint: {
        files: "./src/**/*.{ts,tsx,js,jsx}"
      }
    })
  ]
});

export default webpackConfig;