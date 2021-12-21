const makeEntryHTML = (content, meta) => {
  let html = `
  <html>
    <head>
      <title>${meta.title}</title>
      <link rel="stylesheet" href="../styles.css">
    </head>
    <body>
      <a class='back-button' href='/'>Back to Home</a>
      <div class='markdown-body'>
        ${content}
      </div>
    </body>
  </html>
  `;

  return html;
}

module.exports = makeEntryHTML;