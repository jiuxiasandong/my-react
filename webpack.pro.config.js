var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
module.exports = {
    entry: {
        app: path.resolve(__dirname, 'src/index.js'),
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'js/[name].[hash:8].js',//以文件内容的MD5生成Hash名称的script来防止缓存
        publicPath: '',//生成的html里的引用路径用 publicPath
    },
    module: {
        rules: [
            {
                test: /\.js[x]?$/,
                use: ['babel-loader'],
                exclude: [path.resolve(__dirname, 'node_modules')]
            },
            {
                test: /\.(css|scss)$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: ['css-loader', {
                        loader: 'postcss-loader',
                        options: {
                            plugins: function () {
                                return [
                                    require('cssgrace'),
                                    require('postcss-px2rem')({ remUnit: 100 }),
                                    require('autoprefixer')(),
                                ];
                            }
                        }
                    }, 'sass-loader']
                })
            },
            {
                test: /\.(gif|jpg|png|woff|woff2|svg|eot|ttf)\??.*$/,
                use: ['url-loader?limit=8192&name=font/[hash:8].[name].[ext]']
            },
        ]
    },
    resolve: {
        alias: {   //别名  react
            "react": path.join(__dirname, 'node_modules', 'react')
        }
    },

    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('production')
            }
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false,
                drop_console: false,
            }
        }),
        new HtmlWebpackPlugin({
            template: './src/index.html',
            inject: true, // 自动注入
            minify: {
                removeComments: true,        //去注释
                collapseWhitespace: true,    //压缩空格
                removeAttributeQuotes: true  //去除属性引用
            },
        }),
        new ExtractTextPlugin({
            filename: 'app.[hash].css',
            allChunks: true,
            disable: false
        }),
    ]
}