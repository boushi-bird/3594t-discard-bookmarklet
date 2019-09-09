#!/usr/bin/env ts-node

import path from 'path';
import fs from 'fs';
import UglifyJS from 'uglify-es';
import defines from '../config/defines';

import { charset, distDir } from './config';

const { scriptId, embedJsUrl } = defines;

const distBookmarkletDir = path.resolve(distDir, 'bookmarklet');

if (!fs.existsSync(distBookmarkletDir)) {
  fs.mkdirSync(distBookmarkletDir, { recursive: true });
}

const srcBookmarkletFile = path.resolve(__dirname, '../bookmarklet/index.js');
const distBookmarkletFile = path.resolve(
  distBookmarkletDir,
  process.env.NODE_ENV === 'production' ? 'main.js' : 'local.js'
);

const content = fs.readFileSync(srcBookmarkletFile, charset);

const builtJs = content
  .replace('<JS_URL>', embedJsUrl)
  .replace('<SCRIPT_ID>', scriptId);

const { code, error } = UglifyJS.minify(builtJs, {
  mangle: true,
  compress: {
    expression: true,
    evaluate: false,
    reduce_vars: false,
  },
});

if (error) {
  console.error(error);
  process.exit(1);
} else {
  fs.writeFileSync(
    distBookmarkletFile,
    `javascript:${encodeURIComponent(code)}\n`,
    charset
  );
}
