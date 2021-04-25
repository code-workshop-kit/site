import { createRequire } from 'module';
import { promises as fs } from 'fs';
import path from 'path';

const require = createRequire(import.meta.url);
const marked = require('marked');

marked.setOptions({
  renderer: new marked.Renderer(),
  highlight: (code, lang) => {
    const hljs = require('highlight.js');

    const language = hljs.getLanguage(lang) ? lang : 'plaintext';
    return hljs.highlight(code, { language }).value;
  },
});

const rootFolder = path.resolve('pages', 'news');

export const buildHtmlFromMd = async () => {
  const newsFolder = await fs.lstat(path.resolve(rootFolder));
  if (newsFolder.isDirectory()) {
    const template = await fs.readFile(path.resolve(rootFolder, 'template.html'), 'utf-8');

    const newsFilesOrFolders = await fs.readdir(path.resolve(rootFolder));

    let lstats = newsFilesOrFolders.map((fileOrFolder) =>
      fs.lstat(path.resolve(rootFolder, fileOrFolder)),
    );
    lstats = await Promise.all(lstats);

    const articleFolders = newsFilesOrFolders.filter((fileOrFolder, i) => lstats[i].isDirectory());

    let markdownStrings = articleFolders.map((folder) =>
      fs.readFile(path.resolve(rootFolder, folder, 'index.md'), 'utf-8'),
    );
    markdownStrings = await Promise.all(markdownStrings);

    const htmlStrings = markdownStrings.map((str) => marked(str));

    const writePromises = htmlStrings.map((str, i) => {
      return fs.writeFile(
        path.resolve(rootFolder, articleFolders[i], `${articleFolders[i]}.html`),
        template.replace('{{ content }}', str).replace('{{ id }}', articleFolders[i]),
      );
    });
    await Promise.all(writePromises);
  }
};
