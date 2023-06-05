const path = require('path')

const CopyWebpackPlugin = require('copy-webpack-plugin')
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin')
const { DefinePlugin } = require('webpack')
const Dotenv = require('dotenv-webpack')
const { merge: webpackMerge } = require('webpack-merge')

const isDevelopment = process.env.NODE_ENV !== 'production'

const getPath = () => {
    if (isDevelopment) {
        return '.env.local'
    }

    return '.env'
}

const options = {
    mode: 'none',
    resolve: {
        alias: {
            '@gitcv': path.resolve(__dirname, '../src'),
        },
        extensions: ['.js', '.jsx', '.ts', '.tsx', '.html'],
        modules: ['node_modules', 'src'],
    },
    resolveLoader: {
        modules: ['node_modules', 'src'],
    },
    entry: {
        main: ['@babel/polyfill', './src/main.tsx'],
    },
    module: {
        rules: [
            {
                test: /\.[jt]sx?$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: require.resolve('babel-loader'),
                        options: {
                            plugins: [
                                isDevelopment &&
                                    require.resolve('react-refresh/babel'),
                            ].filter(Boolean),
                        },
                    },
                ],
            },
            {
                test: /\.css/,
                use: [
                    {
                        loader: 'style-loader',
                    },
                    {
                        loader: 'css-loader',
                    },
                ],
            },
        ],
    },
    plugins: [
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: 'src/assets',
                    to: '',
                    globOptions: {
                        ignore: ['.gitkeep', '**/.DS_Store', '**/Thumbs.db'],
                    },
                },
            ],
        }),
        new Dotenv({
            path: getPath(),
        }),
        isDevelopment && new ReactRefreshWebpackPlugin(),
    ].filter(Boolean),
}

module.exports = isDevelopment
    ? webpackMerge(options, require('./webpack.dev'))
    : webpackMerge(options, require('./webpack.dist'))
