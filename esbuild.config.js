const esbuild = require('esbuild');
import { sassPlugin } from 'esbuild-sass-plugin';
const ImportGlobPlugin = require('esbuild-plugin-import-glob');
const sassGlob = require('esbuild-sass-glob');
const fs = require('fs-extra');
const path = require('path');
const { watch } = require('fs');

const SOURCE_ROOT = path.join(__dirname, 'src');

const APPS_PATH = path.join(__dirname, '../ui.apps/src/main/content/jcr_root/apps/mysite');
const LIBS_DEST = path.join(APPS_PATH, 'clientlibs/clientlib-site');
const DIST_PATH = path.join(LIBS_DEST, 'resources');

async function clientlibBuild() {
  // Start the build process
  await esbuild
    .build({
      entryPoints: [path.join(SOURCE_ROOT, 'main.ts')],
      bundle: true,
      outdir: DIST_PATH,
      minify: true,
      plugins: [sassPlugin({
        precompile: (source, pathname) => {
          return sassGlob.default(source, pathname)
        }
      }), ImportGlobPlugin.default()],
      entryNames: 'site',
      loader: {
        '.ts': 'tsx',
        '.tsx': 'tsx',
        '.woff': 'file',
        '.woff2': 'file',
        '.ttf': 'file',
        '.eot': 'file',
        '.png': 'file',
        '.jpg': 'file',
        '.jpeg': 'file',
        '.gif': 'file',
        '.svg': 'file',
      },
      sourcemap: true,
    })
    .then(() => {
      // green console.log
      console.log('\x1b[32m%s\x1b[0m', 'Build successful');
      buildClientLibs();
    })
    .catch(() => {
      console.error('Build failed');
    });
}

const exec = require('child_process').exec;

function createClientLibsXML() {
  const libXml = `<?xml version="1.0" encoding="UTF-8"?>
  <jcr:root xmlns:cq="http://www.day.com/jcr/cq/1.0" xmlns:jcr="http://www.jcp.org/jcr/1.0"
    jcr:primaryType="cq:ClientLibraryFolder"
    categories="[mysite.site]"
    cssProcessor="[default:none,min:none]"
    jsProcessor="[default:none,min:none]"
    allowProxy="{Boolean}true"/>`;

  fs.writeFileSync(path.join(LIBS_DEST, '.content.xml'), libXml)
}

function createClientLibsTxt() {
  fs.writeFileSync(path.join(LIBS_DEST, 'css.txt'), '#base=resources\nsite.css');
  fs.writeFileSync(path.join(LIBS_DEST, 'js.txt'), '#base=resources\nsite.js');
}

function buildClientLibs() {
  createClientLibsXML();
  createClientLibsTxt();
}

function syncApps() {
  const endpoint = 'http://admin:admin@localhost:4502';
  exec(`aemsync -p '${APPS_PATH}' -t ${endpoint}`, (err, stdout, stderr) => {
    if (err) {
      console.error(err);
      return;
    }
    console.log(stdout);
  });
}

function syncContent() {
  const endpoint = 'http://admin:admin@localhost:4502';
  exec(`aemsync -p '${__dirname}/../ui.content/src/main/content/jcr_root' -t ${endpoint}`, (err, stdout, stderr) => {
    if (err) {
      console.error(err);
      return;
    }
    console.log(stdout);
  });
}

if (!process.argv.includes('--watch')) {
  clientlibBuild();
}

if (process.argv.includes('--sync') && !process.argv.includes('--watch')) {
  syncApps();
}

if (process.argv.includes('--watch')) {
  watch(SOURCE_ROOT, { recursive: true }, (eventType, filename) => {
    console.log(`File ${filename} has been changed`);
    clientlibBuild();
  });

  if (process.argv.includes('--sync')) {
    watch(`${APPS_PATH}/components`, { recursive: true }, (eventType, filename) => {
      console.log(`File ${filename} has been changed`);
      clientlibBuild();
      syncApps();
    });
  }

  if (process.argv.includes('--sync')) {
    watch(`${APPS_PATH}/clientlibs`, { recursive: true }, (eventType, filename) => {
      console.log(`File ${filename} has been changed`);
      syncApps();
    });
  }

  if (process.argv.includes('--sync')) {
    watch(`${__dirname}/../ui.content/src/main/content/jcr_root`, { recursive: true }, (eventType, filename) => {
      console.log(`File ${filename} has been changed`);
      syncContent();
    });
  }
}
