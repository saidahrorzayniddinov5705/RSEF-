import * as fs from 'fs';

const filePath = 'src/pages/registrationInfo.tsx';
let content = fs.readFileSync(filePath, 'utf8');

const target = "{activeTab === 'guidelines' && (\\n                <div className=\\\"grid grid-cols-1 md:grid-cols-2 gap-8 mb-24 animate-in fade-in slide-in-from-bottom-4 duration-500\\\">";
const repl = "{activeTab === 'guidelines' && (\\n                <div className=\\\"animate-in fade-in slide-in-from-bottom-4 duration-500 mb-24\\\">\\n                   <div className=\\\"grid grid-cols-1 md:grid-cols-2 gap-8 mb-8\\\">";

content = content.replace(target, repl);

fs.writeFileSync(filePath, content, 'utf8');
console.log("Wrapper updated!");
