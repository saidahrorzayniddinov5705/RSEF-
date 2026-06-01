import * as fs from 'fs';

let content = fs.readFileSync('src/data/guidelinesTranslations.ts', 'utf8');

content = content.replace(
  's4Desc: "Present your passion project in-person to judges. Receive feedbacks from foreign and national experts."',
  's4Desc: "Present your passion project in-person to judges. Q&A sessions will be held only in English. Receive feedbacks from foreign and national experts."'
);

content = content.replace(
  's4Desc: "Loyihangizni hakamlarga yuzma-yuz namoyish qiling. Xorijiy va mahalliy mutaxassislardan fikr-mulohazalar oling."',
  's4Desc: "Loyihangizni hakamlarga yuzma-yuz namoyish qiling. Savol-javoblar faqat ingliz tilida bo\'lib o\'tadi. Xorijiy va mahalliy mutaxassislardan fikr-mulohazalar oling."'
);

content = content.replace(
  's4Desc: "Представьте свой проект жюри лично. Получите отзывы от иностранных и национальных экспертов."',
  's4Desc: "Представьте свой проект жюри лично. Вопросы и ответы будут проходить только на английском языке. Получите отзывы от иностранных и национальных экспертов."'
);

fs.writeFileSync('src/data/guidelinesTranslations.ts', content, 'utf8');
console.log('updated lang');
