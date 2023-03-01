import base, { banner } from './rollup.config.base'
import { terser } from 'rollup-plugin-terser'

const config = Object.assign({}, base, {
  output: {
    exports: 'named',
    name: 'vuejsDatepicker',
    file: 'dist/vuejs-datepicker.min.js',
    banner: banner,
    format: 'iife',
    globals: {
      'vue': 'Vue'
    }
  }
})

config.plugins.push(terser())

export default config
