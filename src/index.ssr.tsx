//  server.js
import path from 'path';
import fs from 'fs';
import express from "express";
import './index.ssr.dev';

const app = new express();
const templateHtml = fs.readFileSync(path.join(__dirname, '../index.html'), 'utf-8');
app.use(express.static(path.join(__dirname, '../client')));
console.log('__dirname', __dirname);
app.use(async (req, res, next) => {
  console.log('path', req.path);
  const result = templateHtml.replace('<!-- CONTENT -->',global.rtnRootHtmlContent(req.path)).replace('/client','.');
  res.set('content-type', 'text/html');
  res.send(result);
  res.end();
});
app.listen(3003, () => {
  console.log("listen:3003");
  console.log('http://localhost:3003');
});
