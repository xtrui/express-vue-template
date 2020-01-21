const path = require('path');

const HtmlwebpackPlugin = require('html-webpack-plugin');
// const CleanWebpackPlugin = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const VueLoader = require('vue-loader/lib/plugin');

const isProd = process.env.NODE_ENV === 'production';
const resolvePath = inputPath => path.join(__dirname, inputPath);

let webpackConfig = {
    mode: isProd ? 'production' : 'development',
    stats: 'minimal',
    entry: {
        app: [resolvePath('./src/main.js')]
    },
    output: {
        filename: '[name].[hash:8].js',
        path: isProd ? resolvePath('../vue-dist') : resolvePath('dist'),
        publicPath: '/'
    },
    resolve: {
        extensions: ['.js', '.vue', '.json'],
        alias: {
            'vue$': 'vue/dist/vue.esm.js',
            '@': resolvePath('src'),
        }
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                // options: vueLoaderConfig
            },
            {
                test: /\.js?$/,
                loader: 'babel-loader',
                exclude: file => (
                    /node_modules/.test(file) && !/\.vue\.js/.test(file)
                )
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    // name: utils.assetsPath('img/[name].[hash:7].[ext]')
                }
            },
            {
                test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    // name: utils.assetsPath('media/[name].[hash:7].[ext]')
                }
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    // name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
                }
            },
            {
                test: /\.less$/,
                use: [
                    isProd ? MiniCssExtractPlugin.loader : 'vue-style-loader',
                    'css-loader',
                    'less-loader'
                ]
            },
            {
                test: /\.css$/,
                use: [
                    isProd ? MiniCssExtractPlugin.loader : 'vue-style-loader',
                    'css-loader'
                ]
            },
            {
                test: /\.(jpe?g|png|gif|ico)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 8192, // 小于8k的图片自动转成base64格式
                            outputPath: 'images/' //图片打包后的文件夹
                        }
                    }
                ]
            }
        ]

        // rules: [
        //     {
        //         test: /\.vue$/,
        //         loader: 'vue-loader'
        //     },
        //     {
        //         test: /\.js?$/,
        //         loader: 'babel-loader',
        //         exclude: file => (
        //             /node_modules/.test(file) && !/\.vue\.js/.test(file)
        //         )
        //     },
        //     {
        //         test: /\.less$/,
        //         use: [
        //             isProd ? MiniCssExtractPlugin.loader : 'vue-style-loader',
        //             'css-loader',
        //             'less-loader'
        //         ]
        //     },
        //     {
        //         test: /\.css$/,
        //         use: [
        //             isProd ? MiniCssExtractPlugin.loader : 'vue-style-loader',
        //             'css-loader'
        //         ]
        //     },
        //     {
        //         test: /\.(jpe?g|png|gif)$/,
        //         use: [
        //             {
        //                 loader: 'url-loader',
        //                 options: {
        //                     limit: 8192, // 小于8k的图片自动转成base64格式
        //                     outputPath: 'images/' //图片打包后的文件夹
        //                 }
        //             }
        //         ]
        //     }
        // ]
    },
    plugins: [
        // 处理 .vue
        new VueLoader(),

        // 输出 index.html 到 output
        new HtmlwebpackPlugin({
            template: resolvePath('./public/index.html'),
            filename: 'index.html',
            inject: true,
            favicon: resolvePath('./public/logo.png')
        })
    ],
    // optimization: {
    //     splitChunks: {
    //         chunks: 'all'
    //     }
    // },

};

// if (isProd) {
//     webpackConfig.plugins.push(
//         // 每次 build 清空 output 目录
//         new CleanWebpackPlugin(resolvePath('../vue-dist'))
//     )
//     webpackConfig.plugins.push(
//         // 分离单独的 CSS 文件到 output
//         new MiniCssExtractPlugin({
//             filename: 'style.css',
//         })
//     )
// }

module.exports = webpackConfig;
