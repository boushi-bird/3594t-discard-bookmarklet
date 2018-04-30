#!/usr/bin/env node

const path = require('path')
const fs = require('fs')

let embedJsUrl = process.env.NODE_ENV === 'production'
  ? 'http://example.com/scripts/bundle.js' : 'http://localhost:8080/main.js'

const bookmarkletFile = path.resolve(__dirname, '../bookmarklet/index.js')

const content = fs.readFileSync(bookmarkletFile, 'utf-8')
console.log(content.replace('<JS_URL>', embedJsUrl))
