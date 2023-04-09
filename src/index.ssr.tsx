//  server.js
import path from 'path';
import express from "express";
import './index.ssr.dev';

const app = new express();
app.use(express.static(path.join(__dirname, '../client')));
app.use(async (req, res, next) => {
  console.log('path', req.path)
  const result = `
    <html>
      <body>
        <div id="root">${global.rtnRootHtmlContent(req.path)}</div>
            <script src="./index.js"></script>
      </body>
    </html>
   `;
  res.set('content-type', 'text/html');
  res.send(result);
  res.end();
});
app.listen(3003, () => {
  console.log("listen:3003");
  console.log('http://localhost:3003');
});