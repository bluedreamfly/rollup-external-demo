import fs from 'fs';
import path from 'path';
import resolve from '@rollup/plugin-node-resolve';
import babel from '@rollup/plugin-babel';
// import postcss from 'rollup-plugin-postcss';
import typescript2 from 'rollup-plugin-typescript2';
// import autoprefixer from 'autoprefixer';
// import url from 'postcss-url';

const inputs = [{
  'Popup/index': 'src/Popup/index.tsx',
  external: [path.resolve(__dirname, 'src/Mask/index.tsx')]
}, {
    'Mask/index': 'src/Mask/index.tsx',
    external: []
}];

// console.log('external___', external);

const configs =
  inputs.map(input => {
      const external = input.external;
      delete input.external;
    // const { cssPath, filePath } = input;
    // const extraPath = `./es/${cssPath}/index.css`;
    // delete input.cssPath;
    // delete input.filePath;

    return ({
      input,
      output: {
        dir: './es',
        exports: 'named',
        entryFileNames: '[name].js',
        format: 'es',
      },
      external,
      plugins: [
        resolve(),
        // plugin(),
        babel({
          exclude: 'node_modules/**',
          babelHelpers: 'bundled',
        }),
        typescript2(),
        // 处理样式
        // postcss({
        //   extract: path.join(__dirname, extraPath),
        //   // path.resolve(__dirname, input.replace('src', 'es'), 'index.css'),
        //   // 处理 css 中引用的图片
        //   plugins: [
        //     // 前缀的处理范围在 package.json
        //     autoprefixer(),
        //     url({
        //       url: 'inline'
        //     }),
        //   ],
        //   extensions: ['.css', '.scss'],
        // }),
      ],
    })
  })

export default configs;