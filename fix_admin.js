import * as fs from 'fs';

let content = fs.readFileSync('src/pages/admin.tsx', 'utf8');

const newsRegex = /\{n\.imageUrl && \(n\.imageUrl\.match[^>]*(>\s*YouTube Video[^}]*\}|>[^}]*<div[^}]*\}|>[^<]*<img[^}]*\})\}/g;
const resRegex = /\{r\.imageUrl && \(r\.imageUrl\.match[^>]*(>\s*YouTube Video[^}]*\}|>[^}]*<div[^}]*\}|>[^<]*<img[^}]*\})\}/g;

const newsRep = '{n.imageUrl && (n.imageUrl.match(/(?:youtu\\\\.be\\\\/|youtube\\\\.com\\\\/(?:embed\\\\/|v\\\\/|watch\\\\?v=|watch\\\\?.+&v=))([^&?]+)/) ? <div className="w-20 h-20 bg-slate-200 rounded-lg shrink-0 flex items-center justify-center text-[10px] text-slate-500 font-bold p-2 text-center border">YouTube Video</div> : <img src={n.imageUrl} alt="" className="w-20 h-20 object-cover rounded-lg bg-slate-100 shrink-0" />)}'.replace(/\\\\/g, '\\\\');

const resRep = '{r.imageUrl && (r.imageUrl.match(/(?:youtu\\\\.be\\\\/|youtube\\\\.com\\\\/(?:embed\\\\/|v\\\\/|watch\\\\?v=|watch\\\\?.+&v=))([^&?]+)/) ? <div className="w-20 h-20 bg-slate-200 rounded-lg shrink-0 flex items-center justify-center text-[10px] text-slate-500 font-bold p-2 text-center border">YouTube Video</div> : <img src={r.imageUrl} alt="" className="w-20 h-20 object-cover rounded-lg bg-slate-100 shrink-0" />)}'.replace(/\\\\/g, '\\\\');

content = content.replace(newsRegex, newsRep);
content = content.replace(resRegex, resRep);

fs.writeFileSync('src/pages/admin.tsx', content);
