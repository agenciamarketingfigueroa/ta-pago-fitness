import http from 'node:http';
import fs from 'node:fs/promises';
import path from 'node:path';
const root=path.resolve('dist');
const types={'.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.js':'text/javascript; charset=utf-8','.svg':'image/svg+xml','.png':'image/png','.webp':'image/webp','.jpg':'image/jpeg','.ttf':'font/ttf','.woff2':'font/woff2','.xml':'application/xml','.txt':'text/plain'};
const server=http.createServer(async(req,res)=>{try{let url=new URL(req.url,'http://localhost');let pathname=decodeURIComponent(url.pathname);let file=path.resolve(root,'.'+pathname);if(!file.startsWith(root+path.sep)&&file!==root){res.writeHead(403);return res.end();}let stat=await fs.stat(file).catch(()=>null);if(stat?.isDirectory()){file=path.join(file,'index.html');}let data=await fs.readFile(file).catch(()=>null);let code=200;if(!data){data=await fs.readFile(path.join(root,'404.html'));code=404;file='404.html';}res.writeHead(code,{'Content-Type':types[path.extname(file)]||'application/octet-stream','Cache-Control':'no-cache'});res.end(data);}catch{res.writeHead(400);res.end('Bad request');}});
server.listen(4173,'127.0.0.1',()=>console.log('Local: http://127.0.0.1:4173'));
