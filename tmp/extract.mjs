import fs from 'node:fs/promises';
import * as pdfjs from './pdfs/package/legacy/build/pdf.mjs';
const files=(await fs.readdir('C:/Users/Felipe/Desktop')).filter(n=>n.startsWith('Tá Pago')&&n.endsWith('.pdf'));
for (const [i,n] of files.entries()) {
 const doc=await pdfjs.getDocument({data:new Uint8Array(await fs.readFile('C:/Users/Felipe/Desktop/'+n)),useSystemFonts:true}).promise;
 const texts=[];
 for(let p=1;p<=doc.numPages;p++){const pg=await doc.getPage(p); texts.push((await pg.getTextContent()).items.map(x=>x.str).join(' '));}
 await fs.writeFile('tmp/pdfs/'+i+'.txt',texts.join('\n\n'));
 console.log(JSON.stringify({i,name:n,pages:doc.numPages,text:texts.join('\n').slice(0,11000)}));
}
