import webpack, { Configuration, RuleSetRule } from 'webpack';
import FriendlyErrorsWebpackPlugin from 'friendly-errors-webpack-plugin';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const WebpackBar = require('webpackbar');

// Typescript
const TsRule: RuleSetRule = {
    test: /\.ts$/,
    use: [
        {
            loader: 'ts-loader',
        },
    ],
    exclude: /node_modules/,
};

const FriendlyErrorsPugin = new FriendlyErrorsWebpackPlugin({
    clearConsole: true,
    // onErrors - Notifiers
});

const handler = (percentage: number, message: string, ...args: any[]): void => {
    // e.g. Output each progress message directly to the console:
    // console.info(percentage, message, ...args);
    console.info(`${(percentage * 100).toFixed()}% ${message}`, ...args);
};

// https://webpack.js.org/plugins/progress-plugin/
const progress = new webpack.ProgressPlugin(handler);

const baseconfig: Configuration = {
    module: {
        rules: [TsRule],
    },
    plugins: [
        // progress,
        new WebpackBar(),
        FriendlyErrorsPugin,
    ],
    resolve: {
        extensions: ['.ts', '.js'],
        // alias
    },
};

export default baseconfig;
