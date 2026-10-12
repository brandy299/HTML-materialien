const {chromium}=require('/opt/node22/lib/node_modules/playwright');const fs=require('fs');
(async()=>{const [src,dst,q,w]=process.argv.slice(2);const b=await chromium.launch({executablePath:'/opt/pw-browsers/chromium'});const p=await b.newPage();
const data='data:image/png;base64,'+fs.readFileSync(src).toString('base64');
const out=await p.evaluate(async([d,q,w])=>{const im=new Image();im.src=d;await im.decode();const k=Math.min(1,w/im.naturalWidth);const c=document.createElement('canvas');c.width=Math.round(im.naturalWidth*k);c.height=Math.round(im.naturalHeight*k);c.getContext('2d').drawImage(im,0,0,c.width,c.height);return c.toDataURL('image/webp',q).split(',')[1];},[data,+q,+w]);
fs.writeFileSync(dst,Buffer.from(out,'base64'));await b.close();})();
