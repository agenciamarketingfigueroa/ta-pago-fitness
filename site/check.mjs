import fs from 'node:fs/promises';
import assert from 'node:assert/strict';
import {products} from './products.mjs';
import {questions} from './quiz.mjs';
import './attribution.test.mjs';
const pages=['index.html','produtos/index.html','quiz-dieta-com-ia/index.html','dieta-com-ia-v2/index.html','404.html',...products.map(p=>`${p.slug}/index.html`)];
let links=0;
for(const file of pages){
 const html=await fs.readFile('dist/'+file,'utf8');
 assert.equal((html.match(/<h1[ >]/g)||[]).length,1,`${file}: exactly one main heading`);
 assert.equal((html.match(/type="module" src="\/attribution\.js"/g)||[]).length,1,`${file}: campaign forwarding enabled`);
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
 const html=await fs.readFile(`dist/${p.category==='ia'?'dieta-com-ia-v2':p.slug}/index.html`,'utf8');
 const urls=[...html.matchAll(/href="(https:\/\/pay\.hotmart\.com\/[^\"]+)"/g)].map(x=>x[1].replaceAll('&amp;','&'));
 assert.equal(urls.length,2); assert(urls.every(u=>u===p.checkout));
 if(p.installments) assert(html.includes(p.installments));assert(html.includes(p.price));
}
assert.equal(products.find(p=>p.category==='combo').price,'14,90');
const quiz=await fs.readFile('dist/quiz-dieta-com-ia/index.html','utf8');
const quizScript=await fs.readFile('dist/quiz.js','utf8');
const quizCss=await fs.readFile('dist/quiz.css','utf8');
assert.equal(quiz,await fs.readFile('dist/dieta-com-ia/index.html','utf8'));
assert.equal((quiz.match(/class="quiz-step"/g)||[]).length,questions.length);
assert.equal((quiz.match(/class="quiz-answer"/g)||[]).length,questions.length*4);
assert.equal(products[0].price,'19,90');
assert(quiz.includes('id="quiz-result" hidden'));
assert(quiz.includes('<link rel="stylesheet" href="/fonts.css"'));
assert(quiz.includes('<link rel="stylesheet" href="/styles.css"'));
assert(!quiz.includes('src="/app.js"'));
assert(quiz.includes('content="noindex, nofollow"'));
assert(quiz.includes('R$67')&&quiz.includes(products[0].price));
assert(quiz.includes(products[0].checkout.replaceAll('&','&amp;')));
assert(quizScript.includes("track('QuizStarted')")&&quizScript.includes("track('QuizCompleted')")&&quizScript.includes("track('InitiateCheckout', 'track')"));
assert(quizCss.includes('[hidden]{display:none!important}'));
const fonts=await fs.readFile('dist/fonts.css','utf8');
for(const match of fonts.matchAll(/url\('([^']+)'\)/g)) await fs.access('dist'+match[1]);
console.log(`PASS: ${pages.length} pages, ${links} local links/assets, checkout destinations, quiz, prices and Meta Pixel.`);
