const esbuild = require('esbuild');
import { sassPlugin } from 'esbuild-sass-plugin';
import type { ReactNode } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
const ImportGlobPlugin = require('esbuild-plugin-import-glob');
const sassGlob = require('esbuild-sass-glob');
const fs = require('fs-extra');
const path = require('path');
const { watch } = require('fs');

const SOURCE_ROOT = path.join(__dirname, `../src`);
const FRONTEND_ROOT = path.join(__dirname, `..`);
const AEM_ROOT = path.join(__dirname, `../..`);

const APPS_PATH = path.join(AEM_ROOT, 'ui.apps/src/main/content/jcr_root/apps/mysite');
const LIBS_DEST = path.join(APPS_PATH, 'clientlibs/clientlib-site');
const DIST_PATH = path.join(LIBS_DEST, 'resources');
const XML_TEMPLATES = path.join(FRONTEND_ROOT, `server/xmlTemplates`);

const isWatch = process.argv.includes('--watch');
const isSync = process.argv.includes('--sync');

async function runEsbuild() {
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
      console.log('\x1b[32m%s\x1b[0m', 'Build successful');
      buildClientLibs();
    })
    .catch(() => {
      console.error('Build failed');
    });
}

const exec = require('child_process').exec;

function createClientlibXml() {
  const libXml = fs.readFileSync(path.join(XML_TEMPLATES, '/clientlib.xml'), 'utf8');
  fs.writeFileSync(path.join(LIBS_DEST, '.content.xml'), libXml)
}

function createClientlibTxt() {
  fs.writeFileSync(path.join(LIBS_DEST, 'css.txt'), '#base=resources\nsite.css');
  fs.writeFileSync(path.join(LIBS_DEST, 'js.txt'), '#base=resources\nsite.js');
}

function buildClientLibs() {
  createClientlibXml();
  createClientlibTxt();
}

function syncApps() {
  const endpoint = 'http://admin:admin@localhost:4502';
  exec(`aemsync -p '${APPS_PATH}' -t ${endpoint}`, (err: any, stdout: any, stderr: any) => {
    if (err) {
      console.error(err);
      return;
    }
    console.log(stdout);
  });
}

function syncContent() {
  const endpoint = 'http://admin:admin@localhost:4502';
  exec(`aemsync -p '${__dirname}/../ui.content/src/main/content/jcr_root' -t ${endpoint}`, (err: any, stdout: any, stderr: any) => {
    if (err) {
      console.error(err);
      return;
    }
    console.log(stdout);
  });
}

if (isWatch) {
  watch(SOURCE_ROOT, { recursive: true }, (_: string, filename: string) => {
    console.log(`File ${filename} has been changed`);
    runEsbuild();
  });

  if (isSync) {
    watch(path.join(APPS_PATH, 'components'), { recursive: true }, (_: string, filename: string) => {
      console.log(`File ${filename} has been changed`);
      runEsbuild();
      syncApps();
    });

    watch(path.join(APPS_PATH, 'clientlibs'), { recursive: true }, (_: string, filename: string) => {
      console.log(`File ${filename} has been changed`);
      syncApps();
    });

    watch(path.join(AEM_ROOT, 'ui.content/src/main/content/jcr_root'), { recursive: true }, (_: string, filename: string) => {
      console.log(`File ${filename} has been changed`);
      syncContent();
    });
  }
} else {
  runEsbuild();

  if (isSync) {
    syncApps();
  }
}

// get all paths under ../server/components
const componentsDir = path.join(__dirname, '../server/components');
const components = fs.readdirSync(componentsDir);

// create a component for each file in ../server/components
components.forEach(renderComponent);

function renderComponent(filename: string) {
  filename = filename.replace('.tsx', '');
  const componentPath = path.join(APPS_PATH, 'components', filename);
  fs.ensureDirSync(componentPath);

  renderReactComponent(filename, path.join(FRONTEND_ROOT, 'server/components', filename));

  if (isWatch) {
    watch(path.join(FRONTEND_ROOT, 'server/components', filename + '.tsx'), { recursive: true }, (_: string, filename: string) => {
      filename = filename.replace('.tsx', '');
      renderReactComponent(filename, path.join(FRONTEND_ROOT, 'server/components', filename));
    });
  }
}

function renderReactComponent(name: string, inputPath: string) {
  const { component, definition, dialog } = require(inputPath).default;
  if (!component || !definition || !dialog) {
    return;
  }

  let componentXml = fs.readFileSync(path.join(XML_TEMPLATES, 'component.xml'), 'utf8');
  componentXml = interpolateXml(componentXml, definition);

  const editConfigXml = fs.readFileSync(path.join(XML_TEMPLATES, '_cq_editConfig.xml'), 'utf8');

  const paths = {
    'html': path.join(APPS_PATH, 'components', name, `${name}.html`),
    '.content.xml': path.join(APPS_PATH, 'components', name, '.content.xml'),
    '_cq_editConfig.xml': path.join(APPS_PATH, 'components', name, '_cq_editConfig.xml'),
    '_cq_dialog/.content.xml': path.join(APPS_PATH, 'components', name, '_cq_dialog/.content.xml'),
  };

  fs.writeFileSync(paths['html'], transformContent(component()));
  fs.writeFileSync(paths['.content.xml'], componentXml);
  fs.writeFileSync(paths['_cq_editConfig.xml'], editConfigXml);
  fs.ensureDirSync(path.join(APPS_PATH, 'components', name, '_cq_dialog'));
  fs.writeFileSync(paths['_cq_dialog/.content.xml'], dialog.xml());
}

function transformContent(component: ReactNode) {
  let content = renderToStaticMarkup(component);
  content = content.replace(/&quot;/g, '"');
  content = content.replace(/&apos;/g, "'");
  content = content.replace(/&#x27;/g, "'");
  return content;
}

function interpolateXml(xml: string, values: Record<string, string>) {
  for (const key in values) {
    xml = xml.replace(`{{${key}}}`, values[key]);
  }
  return xml;
}
