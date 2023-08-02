const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const LodashPlugin = require('lodash-webpack-plugin');
const path = require('path');
const webpack = require('webpack');

module.exports = {
    bail: true,
    context: __dirname,
    entry: {
        main: './assets/js/app.js',
        head_async: ['lazysizes'],
        font: './assets/js/theme/common/font.js',
        polyfills: './assets/js/polyfills.js',
        polyfill_form_data: ['formdata-polyfill'],
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                include: /(assets\/js|assets\\js|stencil-utils)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        plugins: [
                            '@babel/plugin-syntax-dynamic-import',
                            'lodash',
                            'transform-object-assign',
                        ],
                        presets: [
                            [
                                '@babel/preset-env',
                                {
                                    loose: true,
                                    modules: false,
                                    useBuiltIns: 'entry',
                                    corejs: '^3.6.5',
                                },
                            ],
                            '@babel/react',
                        ],
                    },
                },
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
            },
            // Add other loaders for SCSS or other CSS pre-processors if needed.
            {
                test: require.resolve('jquery'),
                loader: 'expose-loader',
                options: {
                    exposes: ['$'],
                },
            },
        ],
    },
    output: {
        chunkFilename: 'theme-bundle.chunk.[name].js',
        filename: 'theme-bundle.[name].js',
        path: path.resolve(__dirname, 'assets/dist'),
    },
    performance: {
        hints: 'warning',
        maxAssetSize: 1024 * 300,
        maxEntrypointSize: 1024 * 300,
    },
    plugins: [
        new CleanWebpackPlugin({
            cleanOnceBeforeBuildPatterns: ['assets/dist'],
            verbose: false,
            watch: false,
        }),
        new LodashPlugin(),
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            'window.jQuery': 'jquery',
        }),
        new BundleAnalyzerPlugin({
            analyzerMode: 'static',
            openAnalyzer: false,
        }),
    ],
    resolve: {
        fallback: { url: require.resolve('url/') },
        alias: {
            jquery: path.resolve(__dirname, 'node_modules/jquery/dist/jquery.min.js'),
            jstree: path.resolve(__dirname, 'node_modules/jstree/dist/jstree.min.js'),
            lazysizes: path.resolve(__dirname, 'node_modules/lazysizes/lazysizes.min.js'),
            'slick-carousel': path.resolve(__dirname, 'node_modules/slick-carousel/slick/slick.min.js'),
            'svg-injector': path.resolve(__dirname, 'node_modules/svg-injector/dist/svg-injector.min.js'),
        },
    },
};