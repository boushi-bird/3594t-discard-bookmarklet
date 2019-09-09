#!/usr/bin/env ts-node

import fs from 'fs';
import fse from 'fs-extra';
import path from 'path';
import jsYaml from 'js-yaml';

import { distDir } from './config';

const charset = 'utf-8';

const copySrcDir = path.resolve(__dirname, '../docs');

if (!fs.existsSync(distDir)) {
  fs.mkdirSync(distDir, { recursive: true });
}

fse.copySync(copySrcDir, distDir);

const srcConfigPath = path.resolve(copySrcDir, '_config.yml');
const distConfigPath = path.resolve(distDir, '_config.yml');

const conf = jsYaml.safeLoad(fs.readFileSync(srcConfigPath, charset));

if (process.env.GH_PAGES_URL) {
  conf.url = process.env.GH_PAGES_URL;
}

if (process.env.GOOGLE_TAG_MANAGER_CONTAINER_ID) {
  conf.google_tag_manager = process.env.GOOGLE_TAG_MANAGER_CONTAINER_ID;
}

fs.writeFileSync(distConfigPath, jsYaml.safeDump(conf), charset);
