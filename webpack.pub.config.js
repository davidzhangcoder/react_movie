const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin'); //导入 在内存中自动生成 index 页面的插件

//导入每次删除文件夹的插件
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

//const webpack = require('webpack');

//其实不需要这个插件，因为webpack中已集成了这个插件
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

const MiniCssExtractPlugin = require('mini-css-extract-plugin');


const htmlWebPackPlugin = new HtmlWebPackPlugin({
    template: path.join(__dirname, "./src/index.html"), //指明源文件的位置, __dirname是指当前文件(即webpack.config.js)所在的目录
    filename: 'index.html',//生成的内存中首页的名称 
    minify: {
        //压缩html文件
        collapseWhitespace: true,
        removeComments: true,
        removeAttributeQuotes: true,
    }
});

//用于postcss调试开发环境-browserslist中的development（默认是看生产环境，跟mode是否配development无关），注释掉下面这行，即为用于生产环境
process.env.NODE_ENV = 'development';

//向外暴露一个打包的配置对象
//Webpack默认只能打包处理 .js 后缀名类型的文件，像 .png .vue 无法主动处理，所以要配置第三方的loader (即第三方模块)
module.exports = {

    entry: path.join( __dirname, './src/index.js'),

    //用于webpack3 - 代码分离
    // entry: {
    //     app:path.join( __dirname, './src/index.js'),
    //     vendors1: ['react']
    // },

    output: {
        filename: "js/bundle-[name]-[contenthash:10].js",
        path: path.join(__dirname,"./dist")
    },

    mode: 'development', // development production
    //devtool: false

    plugins: [
        htmlWebPackPlugin,

        new CleanWebpackPlugin(), //默认清除 webpack配置的 output.path 目录

        //用于webpack3 - 代码分离
        // new webpack.optimize.CommonsChunkPlugin({
        //     name: "vendors1",
        //     filename: "vendors.js"
        // })

        new MiniCssExtractPlugin({
            //对输出的css文件进行重命名
            filename: "css/build.css"
        }),
    ],

    module: { //所有第三方 模块的配置规则
        //
        rules: [ //第三方配置规则
            {
                test: /\.js|jsx$/,
                use: 'babel-loader',
                exclude: /node_modules/ //exclude必须要加
            },

            //可以在 css-loader 之后， 通过 ? 追加参数
            //其中，有个固定参数，叫做modules,表示为 普通的css样式表，启用模块化
            {
                test: /\.css$/, use: [
                    //创建style标签，将样式放入
                    { loader: 'style-loader' },

                    //这个loader取代style-loader, 作用:提取js中的css成单独文件
                    //MiniCssExtractPlugin.loader,
                    {
                        //将css文件整合到js文件中
                        loader: 'css-loader',
                        // options: {
                        //     modules: {
                        //         localIdentName: '[path][name]-[local]-[hash:5]'
                        //     }
                        // }
                    }, //打包处理CSS样式表的第三方loader

                    // {loader: 'postcss-loader'},
                ]
            },

            { test: /\.ttf|woff|woff2|eot|svt$/, use:'url-loader' }, //打包处理字体文件的Loader

            { test:/\.scss$/, use: [
                //创建style标签，将样式放入
                //'style-loader',
                //这个loader取代style-loader, 作用:提取js中的css成单独文件
                // MiniCssExtractPlugin.loader, //简单配置
                {
                    loader: MiniCssExtractPlugin.loader,
                    options:{
                        publicPath:'../' //图片的路径，因为在url-loader中已把图片放在images目录下
                    }
                },

                {
                    loader:'css-loader',
                    options: {
                        modules: {
                            localIdentName: '[path][name]-[local]-[hash:5]'
                        }
                    }
                },

                {loader: 'postcss-loader'},

                //package.json中的配置
                // "browserslist":{
                //      开发环境:默认是看生产环境，如要用开发环境，需要设置node环境变量: process.env.NODE_ENV = 'development'
                //     "development": [
                //       "last 1 chrome version",
                //       "last 1 firefox version",
                //       "last 1 safari version"
                //     ],
                //      生产环境:默认是看生产环境，跟mode是否配development无关
                //     "production": [
                //       ">0.2%",
                //       "not dead",
                //       "not op_mini all"
                //     ]
                //   }


                // {
                //     loader: 'postcss-loader',
                //         ident: 'postcss',
                //         options: {
                //         postcssOptions: {
                //             //或者将插件引入写在单独的配置js中
                //             //config: './config/postcss.config.js',
                //             plugins: () => [
                //                 require('postcss-preset-env')()
                //             ]
                //         }
                //     }
                // },

                'sass-loader',//打包处理scss文件的loader                
            ]
            },

            {
                test: /\.(png|jpg|bmp|gif)$/, 
                use: [{
                    loader: "url-loader",
                    options: {
                        limit: 1000, // 大于 1000 bytes 的文件都走 fallback
                        name: "images/[hash:8]-[name].[ext]"
                    }
                }],
            }
    
        ]
    },

    resolve: {
        extensions: ['.js', '.jsx', '.json'], //表示这几个文件的后缀名，可以省略不写
        alias: {
            '@': path.join(__dirname, './src')
        }
    },

    optimization: {
        splitChunks: {
            chunks: "all"
        },
        minimizer: [new UglifyJsPlugin()],
    }
}

//优化：
//1.代码分离
//  (1)js分离 - webpack4用 splitChunks, webpack3用 CommonsChunkPlugin
//  (2)css分离 － webpack4用 mini-css-extract-plugin, webpack3用 extract-text-webpack-plugin
//2.css兼容性处理 - 用 postcss-loader
//3.压缩js － 用 uglifyjs-webpack-plugin 或 model设为production
//4.压缩html - 用 HtmlWebPackPlugin 中的 minify
//5.压缩css - 用optimize-css-assets-webpack-plugin
//6.tree shaking - 去掉无用的css代码和js代码
//7.js和css分别目录存放