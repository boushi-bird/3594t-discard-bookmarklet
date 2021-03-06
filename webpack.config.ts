import path from 'path';
import { Configuration, DefinePlugin } from 'webpack';
import defines from './config/defines';

const isProduction: boolean = process.env.NODE_ENV === 'production';

const convertObjectKeys = <V, O extends { [key: string]: V }>(
  o: O,
  func: (key: string) => string
): O =>
  Object.assign(
    {},
    ...Object.entries(o).map(([k, v]) => ({ [func(k)]: `'${v}'` }))
  );

const config: Configuration = {
  mode: isProduction ? 'production' : 'development',
  entry: {
    bundle: path.resolve(__dirname, 'src/index.ts'),
  },
  output: {
    path: path.resolve(__dirname, 'dist/scripts'),
    filename: '[name].js',
  },
  devtool: isProduction ? false : 'inline-source-map',
  resolve: {
    extensions: ['.js', '.ts', '.tsx'],
  },
  plugins: [
    new DefinePlugin(convertObjectKeys(defines, (k) => `configDefines.${k}`)),
  ],
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: ['babel-loader'],
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader',
            options: {
              minimize: true,
            },
          },
        ],
      },
    ],
  },
  devServer: {
    host: '0.0.0.0',
  },
};

export default config;
