const fs = require('fs/promises');
const marked = require("marked");
const makeEntryHTML = require("./template.js");

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

const pages = fs.readdir('./markdown/pages')
  .then(files => {
    files.forEach(f => {
      fs.readFile('./markdown/pages/' + f, 'utf8')
        .then(contents => {
          let title = contents.split("\n")[0];
          let html = makeEntryHTML(marked.parse(contents), { title: title.substr(2) });
          let path = './public/pages/' + f.split(".")[0] + ".html";
          fs.writeFile(path, html).
            then(() => console.log('Done - writing' + path));
        });
    });
  });


const files = fs.readdir('./markdown/entries')
  .then(files => {
    return Promise.all(files.map(f => fs.readFile('./markdown/entries/' + f, 'utf8')));
  })
  .then(data => {
    let promises = []; let tableOfContents = [];
    data.forEach(contents => {
      let lines = contents.split('\n');
      let url = './entries/' + lines[0] + '.html';
      let meta = {
        date: lines[0],
        title: lines[1],
        author: lines[2],
        url: url
      };
      tableOfContents.push(meta);

      let html = makeEntryHTML(marked.parse(lines.slice(4).join('\n')), meta);
      let path = './public/entries/' + lines[0] + '.html';
      promises.push(fs.writeFile(path, html));
    });
    outJS = "const TABLE_OF_CONTENTS=" + JSON.stringify(tableOfContents) + ";";
    promises.push(fs.writeFile('./public/data.js', outJS));
    return Promise.all(promises);
  })
  .then(() => {
    console.log("Done - writing entries pages");
  })
  .catch(err => console.error(err));


