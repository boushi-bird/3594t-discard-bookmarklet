#!/usr/bin/env ts-node

import path from 'path'
import fs from 'fs'
import UglifyJS from 'uglify-es'
import defines from '../config/defines'

const { scriptId, embedJsUrl } = defines

const bookmarkletFile = path.resolve(__dirname, '../bookmarklet/index.js')

const content = fs.readFileSync(bookmarkletFile, 'utf-8')

const builtJs = content
  .replace('<JS_URL>', embedJsUrl)
  .replace('<SCRIPT_ID>', scriptId)

const { code, error } = UglifyJS.minify(builtJs, {
  mangle: true,
  compress: {
    expression: true,
    evaluate: false,
    reduce_vars: false, // eslint-disable-line @typescript-eslint/camelcase
  },
})

if (error) {
  console.error(error)
  process.exit(1)
} else {
  console.log(`javascript:${encodeURIComponent(code)}`)
}
