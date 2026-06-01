import * as fs from 'fs';

let content = fs.readFileSync('src/data/guidelinesTranslations.ts', 'utf8');

content = content.replace(
  'readyDesc: "Applications close on June 18",',
  'readyDesc: "Applications close on July 1",'
);

content = content.replace(
  'readyDesc: "Arizalar qabuli 18-iyunda yopiladi",',
  'readyDesc: "Arizalar qabuli 1-iyulda yopiladi",'
);

content = content.replace(
  'readyDesc: "Прием заявок закрывается 18 июня",',
  'readyDesc: "Прием заявок закрывается 1 июля",'
);

fs.writeFileSync('src/data/guidelinesTranslations.ts', content, 'utf8');

console.log('updated')
