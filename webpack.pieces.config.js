const path = require('path');

// B2 조립용: runtime + 모듈별 조각을 각각의 js로 뽑는다 (library/UMD 없음 = 부수효과 스크립트).
// 다운로드 시 서버가 _runtime.js + 고른 조각들을 concat + UMD 껍데기 → plugin.js.
const MODULES = ['buttonRole', 'gridHeaderColor', 'gridHeaderGroup', 'gridPaging', 'gridRowColor', 'gridSelectedOptions', 'gridSorting', 'gridSummary', 'gridTooltip'];

const entry = {_runtime: './src/runtime.js'};
MODULES.forEach((m) => (entry[m] = `./src/pieces/${m}.js`));

module.exports = {
    mode: 'production',
    entry,
    output: {
        path: path.resolve(__dirname, 'dist/pieces'),
        filename: '[name].js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            }
        ]
    }
};
