#!/usr/bin/env node

const path = require('path')
const fs = require('fs')
const UglifyJS = require('uglify-es')

const { scriptId, embedJsUrl } = require('../config/defines')

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
    reduce_vars: false
  }
})

if (error) {
  console.error(error)
  process.exit(1)
} else {
  console.log(`javascript:${encodeURIComponent(code)}`)
}
