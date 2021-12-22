const makeEntryHTML = (content, meta) => {
  let html = `
  <html>
    <head>
      <title>${meta.title}</title>
      <link rel="stylesheet" href="./styles.css">
      <link rel="stylesheet" href="../styles.css">
    </head>
    <body>
      <div class='container'>
        <div class='logo'><a href='/'><img src='../images/full-stack-logo.svg'></a></div>
        <div class='links'>
          <a href='/about.html'>About</a>
          <a href='/contact.html'>Contact</a>
          <a href='/fun.html'>Fun Stuff</a>
        </div>
      </div>
      <div class='markdown-body'>
        ${content}
      </div>
    </body>
  </html>
  `;

  return html;
}

module.exports = makeEntryHTML;