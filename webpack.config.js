import HtmlWebpackPlugin from 'html-webpack-plugin'
import path from 'path'
import process from 'process'
import 'webpack-dev-server'

export default {
    mode: 'development',
    devtool: 'source-map',
    entry: './src/Index.tsx',
    resolve: { extensions: ['.ts', '.tsx', '...'] },
    output: { clean: true, path: path.join(process.cwd(), './dist/') },
    devServer: { hot: true, liveReload: false },
    plugins: [
        new HtmlWebpackPlugin({
            publicPath: '/',
            template: new URL(await import.meta.resolve('./src/index.html')).pathname,
        }),
    ],
    module: {
        rules: [
            {
                resource: { not: /node_modules/, and: [/.[j|t]sx?$/i] },
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-typescript', 'babel-preset-solid'],
                        plugins: [['solid-refresh/babel', { bundler: 'webpack5' }]],
                    },
                },
            },
        ],
    },
}
