#!/usr/bin/env node

const path = require('path')
const fs = require('fs')
const UglifyJS = require('uglify-es')

let embedJsUrl = process.env.NODE_ENV === 'production'
  ? 'https://boushi-bird.github.io/3594t-discard-bookmarklet/scripts/bundle.js'
  : 'http://localhost:8080/bundle.js'

const bookmarkletFile = path.resolve(__dirname, '../bookmarklet/index.js')

const content = fs.readFileSync(bookmarkletFile, 'utf-8')

const builtJs = content
  .replace('<JS_URL>', embedJsUrl)

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
