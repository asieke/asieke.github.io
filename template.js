const makeEntryHTML = (content, meta) => {
  let html = `
  <html>
    <head>
      <title>${meta.title}</title>
      <link rel="stylesheet" href="../css/styles.css">
      <link rel="stylesheet" href="../css/markdown.css">
    </head>
    <body>
      <div class='header'>
        <div class='logo'><a href='../../index.html'><img src='../images/full-stack-logo.svg' height='50' width='160'></a></div>
        <div class='links'>
          <a href='../pages/about.html'>About</a>
          <a href='../pages/contact.html'>Contact</a>
          <a href='../pages/fun.html'>Fun Stuff</a>
        </div>
      </div>
      <div class='markdown-body'>
        ${content}
      </div>
    </body>
  </html>
  `;

  return html;
};

module.exports = makeEntryHTML;
