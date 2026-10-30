import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import {fileURLToPath} from 'node:url';

const projectDirectory = path.dirname(fileURLToPath(import.meta.url));

const PUBLIC_PATH = process.env.PUBLIC_PATH || '/';

export default {
  mode: 'development',
  entry: ['./src/index.tsx'],
  output: {
    filename: 'main.bundle.js',
    path: path.resolve(projectDirectory, 'dist'),
    publicPath: PUBLIC_PATH,
  },
  devServer: {
    port: 8080,
    static: {
      directory: './dist',
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'public/index.html',
    }),
  ],
  module: {
    rules: [
      {
        test: /\.(ts|js)x?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            cacheDirectory: true,
          },
        },
      },
      {
        test: /\.html$/i,
        use: ['html-loader'],
      },
      {
        test: /\.svg$/i,
        type: 'asset/resource',
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: {
                namedExport: true,
                exportLocalsConvention: 'camel-case-only',
              },
            },
          },
          'resolve-url-loader',
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
            },
          },
        ],
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf|svg)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'fonts/[hash][ext][query]',
        },
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.scss', '.ttf', '.svg'],
  },
};
