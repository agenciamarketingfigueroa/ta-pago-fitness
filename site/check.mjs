import fs from 'node:fs/promises';
import assert from 'node:assert/strict';
import {products} from './products.mjs';
const pages=['index.html','produtos/index.html','404.html',...products.map(p=>`${p.slug}/index.html`)];
let links=0;
for(const file of pages){
 const html=await fs.readFile('dist/'+file,'utf8');
 assert.equal((html.match(/<h1[ >]/g)||[]).length,1,`${file}: exactly one main heading`);
 assert.equal((html.match(/fbq\('init', '2284410015213545'\)/g)||[]).length,1,`${file}: one pixel init`);
 assert.equal((html.match(/fbq\('track', 'PageView'\)/g)||[]).length,1,`${file}: one PageView`);
 assert(html.indexOf("fbq('init'")<html.indexOf('</head>'),`${file}: pixel inside head`);
 assert(html.indexOf('<noscript>')>html.indexOf('<body>'),`${file}: valid noscript placement`);
 for(const match of html.matchAll(/(?:href|src)="(\/[^"#]*)/g)){
  let target=match[1].split('#')[0]; if(target.endsWith('/'))target+='index.html';
  await fs.access('dist'+target); links++;
 }
 for(const match of html.matchAll(/href="\/#[^"]+"/g)){
  const id=match[0].split('#')[1].slice(0,-1);const home=await fs.readFile('dist/index.html','utf8');assert(home.includes(`id="${id}"`));
 }
}
for(const p of products){
 const html=await fs.readFile(`dist/${p.slug}/index.html`,'utf8');
 const urls=[...html.matchAll(/href="(https:\/\/pay\.hotmart\.com\/[^\"]+)"/g)].map(x=>x[1].replaceAll('&amp;','&'));
 assert.equal(urls.length,2); assert(urls.every(u=>u===p.checkout));
 assert(html.includes(p.installments));assert(html.includes(p.price));
}
assert.equal(products.find(p=>p.category==='combo').price,'14,90');
console.log(`PASS: ${pages.length} pages, ${links} local links/assets, five checkout destinations, prices and Meta Pixel.`);
