var path = require("path");
var webpack = require("webpack");
var htmlWebpackPlugin = require("html-webpack-plugin");  //操作index.html
var openBrowserWebpackPlugin = require("open-browser-webpack-plugin"); // 自动打开浏览器
var ExtractTextWebpackPlugin = require("extract-text-webpack-plugin");    // 抽离样式  

module.exports = {
    entry: ["./src/index.js"],   //入口文件   多个入口文件 合并 

    output: {       // 出口文件
        path: path.resolve(__dirname, "dist"),
        filename: "js/[name].[hash:8].js",  // 防止缓存
        publicPath: "/"     // 自动注入时候拼接的路径
    },
    devtool: "source-map",   // 方便调试
    // 加载器声明  loader 

    // JS/CSS/PNG/SVG/Iconfont 
    // 正则符号 
    module: {
        // loaders
        rules: [
            {
                test: /\.js[x]?$/,
                use: ["babel-loader"],
                exclude: [path.resolve(__dirname, "node_modules")]
            },
            // 抽离样式  
            {
                test: /\.(css|scss)$/,
                // exclude:/node_modules/,
                use: ExtractTextWebpackPlugin.extract({
                    fallback: "style-loader",   //  转换成node 风格的js代码
                    use: ["css-loader", {     // css-loader 打包成模块  
                        loader: "postcss-loader",  // 美化css 代码
                        options: {
                            plugins: function () {
                                return [
                                    require("cssgrace"),  // 美化代码
                                    require("postcss-px2rem")({ remUnit: 100 }),  //rem 转换  200px == 2rem  
                                    require("autoprefixer")() // 自动补全
                                ]
                            }
                        }

                    }, "sass-loader"]   // less 编译成 css 
                })
            },
            // 打包图片 
            {
                test: /\.(gif|jpg|png|woff|woff2|svg|eot|ttf)\??.*$/,
                use: ["url-loader?limit=8192&name=font/[hash:8].[ext]"]
            }
        ]
    },

    resolve: {
        alias: {   //别名
            "react": path.join(__dirname, "node_modules", "react")
        }
    },

    // 服务器  webpack-dev-server
    devServer: {
        contentBase: path.join(__dirname, "dist"),
        compress: true,
        hot: true,  //自动刷新
        host: "0.0.0.0",
        port: 8000,
        publicPath: "/",
        historyApiFallback: true,   // html5 history API 
        disableHostCheck: true
    },

    // 插件  plugins

    plugins: [
        new htmlWebpackPlugin({
            template: "./src/index.html",    // index.html
            inject: true     // 自动注入js/css  
        }),

        new openBrowserWebpackPlugin({   // 自动打开浏览器  
            url: "http://localhost:8000"
        }),

        // 热替换  
        new webpack.HotModuleReplacementPlugin(),

        // 抽离样式 
        new ExtractTextWebpackPlugin({
            filename: "app.[hash:8].css",
            allChunks: true,
            disable: false
        }),

        new webpack.ProvidePlugin({ axios: 'axios' }),
    ]
}