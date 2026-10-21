import fs from 'node:fs/promises';
import {createRequire} from 'node:module';
const require=createRequire(import.meta.url);
const canvas=require('./pdfs/package/node_modules/@napi-rs/canvas');
globalThis.DOMMatrix=canvas.DOMMatrix;globalThis.ImageData=canvas.ImageData;globalThis.Path2D=canvas.Path2D;
const pdfjs=await import('./pdfs/package/legacy/build/pdf.mjs');
const files=(await fs.readdir('C:/Users/Felipe/Desktop')).filter(n=>n.startsWith('Tá Pago')&&n.endsWith('.pdf'));
for (const [i,n] of files.entries()) {
 const doc=await pdfjs.getDocument({data:new Uint8Array(await fs.readFile('C:/Users/Felipe/Desktop/'+n)),useSystemFonts:true}).promise;
 const page=await doc.getPage(1);const vp=page.getViewport({scale:1.6});const c=canvas.createCanvas(vp.width,vp.height);
 await page.render({canvasContext:c.getContext('2d'),viewport:vp}).promise;
 await fs.writeFile('site/dist/assets/cover-'+i+'.png',c.toBuffer('image/png'));
 console.log(i,n,doc.numPages);
 if(i===1||i===3){const p=await doc.getPage(3);const v=p.getViewport({scale:1.4});const cv=canvas.createCanvas(v.width,v.height);await p.render({canvasContext:cv.getContext('2d'),viewport:v}).promise;await fs.writeFile('tmp/pdfs/recipe-'+i+'.png',cv.toBuffer('image/png'));}
}
