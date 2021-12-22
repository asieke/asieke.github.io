const fs = require('fs/promises');
const marked = require("marked");
const makeEntryHTML = require("./template.js");

//Set the options for the markdown parser
marked.setOptions({
  renderer: new marked.Renderer(),
  highlight: function (code, lang) {
    const hljs = require('highlight.js');
    const language = hljs.getLanguage(lang) ? lang : 'plaintext';
    return hljs.highlight(code, { language }).value;
  },
  langPrefix: 'hljs language-', // highlight.js css expects a top-level 'hljs' class.
  pedantic: false,
  gfm: true,
  breaks: false,
  sanitize: false,
  smartLists: true,
  smartypants: false,
  xhtml: false
});

/**********************
 * Read the markdown pages
 * Parse the files
 * Write to public/pages
 **********************/

fs.readdir('./markdown/pages')
  .then(files => {
    files.forEach(f => {
      fs.readFile('./markdown/pages/' + f, 'utf8')
        .then(contents => {
          let title = contents.split("\n")[0];
          let html = makeEntryHTML(marked.parse(contents), { title: title.substr(2) });
          let path = './public/pages/' + f.split(".")[0] + ".html";
          fs.writeFile(path, html).
            then(() => console.log('Writing File: ' + path));
        });
    });
  });

/**********************
 * Read all of the entries
 * Parse the metadata and append to table of contents
 * Write parsed md -> public/entries
 * Write table of contents JSON to public/data.js
 **********************/

fs.readdir('./public/entries')
  .then(files => {
    return Promise.all(files.map(f => fs.unlink('./public/entries/' + f)))
  })
  .then(() => {
    return fs.readdir('./markdown/entries');
  })
  .then(files => {
    return Promise.all(files.map(f => fs.readFile('./markdown/entries/' + f, 'utf8')));
  })
  .then(data => {
    let promises = []; let tableOfContents = [];
    data.forEach(contents => {
      let lines = contents.split('\n');
      let index = lines.indexOf("}");
      let meta = JSON.parse(lines.slice(0, index + 1).join("\n"));
      meta.url = 'public/entries/' + meta.date + '-' + meta.url + '.html'
      let html = makeEntryHTML(marked.parse(lines.slice(index + 1).join("\n")), meta);
      tableOfContents.push(meta);
      promises.push(fs.writeFile('./' + meta.url, html));
      console.log('Writing File: ./' + meta.url);
    });
    outJS = "const TABLE_OF_CONTENTS=" + JSON.stringify(tableOfContents) + ";";
    promises.push(fs.writeFile('./public/data.js', outJS));
    return Promise.all(promises);
  })
  .then(() => console.log('Done writing files'))
  .catch(err => console.error(err))

