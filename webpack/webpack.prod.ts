import { Configuration, RuleSetRule } from 'webpack';
import path from 'path';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import OptimizeCssAssetsPlugin from 'optimize-css-assets-webpack-plugin';
import TerserPlugin from 'terser-webpack-plugin';
import webpackMerge from 'webpack-merge';
import baseconfig from './webpack.common';

const basedir = process.cwd();
const prodspace = 'dist';

// SCSS
const scssRule: RuleSetRule = {
    test: /\.s[ac]ss$/i,
    use: [
        // Creates `style` nodes from JS strings
        MiniCssExtractPlugin.loader,
        // Translates CSS into CommonJS
        'css-loader',
        // Compiles Sass to CSS
        'sass-loader',
    ],
};

// Plugins
const cleandist = new CleanWebpackPlugin();

// Html Template - Default
const HtmlTemplate = new HtmlWebpackPlugin({
    filename: path.resolve(basedir, prodspace, 'index.html'),
    title: 'Vanilla - Starter - Kit',
    favicon: './assets/favicon.ico',
});

// Mini Css
const MiniCssExtract = new MiniCssExtractPlugin({
    filename: '[name].[hash].css',
    ignoreOrder: false, // Enable to remove warnings about conflicting order
});

// Optimizations for Prod
const OptimizeCSS = new OptimizeCssAssetsPlugin({
    cssProcessorOptions: { discardComments: { removeAll: true } },
    canPrint: true,
    assetNameRegExp: /\.min\.css$/,
});

const OptimizeJs = new TerserPlugin({
    extractComments: false,
    parallel: true,
    // include: /\.min\.js$/,
    sourceMap: true,
});

// TODO: Lazy Load / Dynamic Imports
const config: Configuration = {
    mode: 'production',
    entry: {
        vanilla: ['./src/index.ts', './src/styles/main.scss'],
    },
    output: {
        path: path.resolve(basedir, prodspace),
        filename: '[name].[hash].js',
    },
    devtool: 'source-map',
    module: {
        rules: [scssRule],
    },
    plugins: [cleandist, HtmlTemplate, MiniCssExtract],
    optimization: {
        minimize: true,
        minimizer: [OptimizeJs, OptimizeCSS],
    },
};

const prodconfig = webpackMerge(baseconfig, config);

export default prodconfig;
