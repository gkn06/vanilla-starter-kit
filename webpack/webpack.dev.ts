import { Configuration, RuleSetRule } from 'webpack';
import path from 'path';
import webpackMerge from 'webpack-merge';
import baseconfig from './webpack.common';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import WebpackDevServer from 'webpack-dev-server';

const PORT = 8000;
const basedir = process.cwd();
const devspace = 'build';

const scssRule: RuleSetRule = {
    test: /\.s[ac]ss$/i,
    use: [
        // Creates `style` nodes from JS strings
        'style-loader',
        // Translates CSS into CommonJS
        {
            loader: 'css-loader',
            options: {
                sourceMap: true,
            },
        },
        // "resolve-url-loader", May be
        // Compiles Sass to CSS
        {
            loader: 'sass-loader',
            options: {
                sourceMap: true,
            },
        },
    ],
};

const devServer: WebpackDevServer.Configuration = {
    port: PORT,
    stats: 'errors-only',
    open: true,
    hot: true,
    watchOptions: {
        ignored: /node_modules/,
    },
};

const HtmlTemplate = new HtmlWebpackPlugin({
    filename: path.resolve(basedir, devspace, 'index.html'),
    title: 'Vanilla - Starter - Kit',
    favicon: './assets/favicon.ico',
});

const config: Configuration = {
    mode: 'development',
    entry: './src/index.ts',
    output: {
        path: path.resolve(basedir, devspace),
        filename: 'main.js',
        publicPath: '/',
    },
    devtool: 'inline-source-map',
    module: {
        rules: [scssRule],
    },
    plugins: [HtmlTemplate],
    devServer,
};

const devconfig = webpackMerge(baseconfig, config);

export default devconfig;
