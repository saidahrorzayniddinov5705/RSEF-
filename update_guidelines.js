import * as fs from 'fs';

let content = fs.readFileSync('src/data/guidelinesTranslations.ts', 'utf8');

// The s1, s2, s3, s4, s5 variables mapping
// Previously:
// s1Label: "10.05 - 18.06" -> Application Period
// s2Label: "18.06 - 21.06" -> Review & Invitation
// s3Label: "21.06 - 01.07" -> Prepare your project
// s4Label: "03.07" -> Fair day
// s5Label: "04.07" -> Award ceremony

// The user request:
// Application periodni 08.06.2026 - 01.07.2026
// Prepare your project: 01.07.2026- 07.07.2026
// Fair Day: 08.07.2026
// Award Ceremony: 08.07.2026

content = content.replace(/s1Label: "10\.05 - 18\.06"/g, 's1Label: "08.06.2026 - 01.07.2026"');
content = content.replace(/s2Label: "18\.06 - 21\.06"/g, 's2Label: "01.07.2026 - 07.07.2026"'); // Review & invitation? Actually prepare your project is s3.
content = content.replace(/s3Label: "21\.06 - 01\.07"/g, 's3Label: "01.07.2026 - 07.07.2026"');
content = content.replace(/s4Label: "03\.07"/g, 's4Label: "08.07.2026"');
content = content.replace(/s5Label: "04\.07"/g, 's5Label: "08.07.2026"');

// Wait what about s2Label? Let's just make Review and Invitation "01.07.2026 - 07.07.2026" or maybe just leave s2 label to be "01.07.2026 - 07.07.2026"?
// If s1 is 08.06-01.07, and s3 is 01.07-07.07. The user didn't mention Review & Invitation. Let's make Review & Invitation: "01.07.2026 - 07.07.2026".

// EN text replacements
content = content.replace(
  's3Desc: "Invited participants (individually or in a team) submit their full project report, poster, and a short video presentation before the fair date."',
  's3Desc: "Invited participants (individually or in a team) should prepare their poster and full report until the event day during this period."'
);
content = content.replace(
  's4Desc: "Present your project live to a panel of judges. Q&A sessions are held in Uzbek or English. Receive feedback from expert reviewers."',
  's4Desc: "Present your passion project in-person to judges. Receive feedbacks from foreign and national experts."'
);
content = content.replace(
  's5Desc: "Winners are announced at the closing ceremony. Top projects may be nominated for international representation."',
  's5Desc: "Winners are announced at the closing ceremony. Outstanding projects will receive awards and prizes."'
);

// UZ text replacements
content = content.replace(
  's3Desc: "Taklif etilgan ishtirokchilar (yakka yoki jamoa bo\'lib) musobaqadan oldin to\'liq loyiha hisobotini, posterni va qisqa video taqdimotni yuboradilar."',
  's3Desc: "Taklif etilgan ishtirokchilar (yakka yoki jamoa bo\'lib) ushbu davrda tadbir kunigacha o\'z posterlari va to\'liq hisobotlarini tayyorlashlari kerak."'
);
content = content.replace(
  's4Desc: "Loyihangizni hakamlar hay\'atiga jonli ravishda namoyish eting. Savol-javoblar o\'zbek yoki ingliz tilida o\'tadi. Mutaxassislardan fikr-mulohazalar oling."',
  's4Desc: "Loyihangizni hakamlarga yuzma-yuz namoyish qiling. Xorijiy va mahalliy mutaxassislardan fikr-mulohazalar oling."'
);
content = content.replace(
  's5Desc: "Yopilish marosimida g\'oliblar e\'lon qilinadi. Eng yaxshi loyihalar xalqaro ishtirok uchun nomzod qilinishi mumkin."',
  's5Desc: "Yopilish marosimida g\'oliblar e\'lon qilinadi. Eng yaxshi loyihalar mukofotlar va sovrinlar bilan taqdirlanadi."'
);

// RU text replacements
content = content.replace(
  's3Desc: "Приглашенные участники загружают полный отчет, постер и краткую видео-презентацию до начала мероприятия."',
  's3Desc: "Приглашенные участники (индивидуально или в команде) в этот период должны подготовить свой постер и полный отчет до дня мероприятия."'
);
content = content.replace(
  's4Desc: "Представьте свой проект жюри. Вопросы и ответы проходят на узбекском или английском языке. Получите отзывы от экспертов."',
  's4Desc: "Представьте свой проект жюри лично. Получите отзывы от иностранных и национальных экспертов."'
);
content = content.replace(
  's5Desc: "Победители будут объявлены на церемонии закрытия. Лучшие проекты могут быть выдвинуты на международный уровень."',
  's5Desc: "Победители объявляются на церемонии закрытия. Выдающиеся проекты получат награды и призы."'
);

// Remove video from format
const formatRegex = /,\n\s*format3T: ".*?\[^\n]*\n\s*format3D: ".*?"/g;
content = content.replace(formatRegex, '');

// The regex above will fail because of syntax. Let me just use split and join or explicit strings.
// Let's replace the explicit formats:
// EN:
content = content.replace(
  '      format2D: "A1 size, PDF or print-ready file",\n      format3T: "3-Minute Video",\n      format3D: "Uploaded to YouTube (unlisted) or Google Drive",',
  '      format2D: "A1 size, PDF or print-ready file",'
);
// UZ:
content = content.replace(
  '      format2D: "A1 o\'lchamda, PDF yoki chop etishga tayyor fayl",\n      format3T: "3 daqiqalik Video",\n      format3D: "YouTube (unlisted) yoki Google Drive\'ga yuklangan",',
  '      format2D: "A1 o\'lchamda, PDF yoki chop etishga tayyor fayl",'
);
// RU:
content = content.replace(
  '      format2D: "Формат A1, PDF или файл, готовый к печати",\n      format3T: "3-минутное видео",\n      format3D: "Загружено на YouTube (дост. по ссылке) или Google Drive",',
  '      format2D: "Формат A1, PDF или файл, готовый к печати",'
);

// Title updates
content = content.replace(
  'title: ["Application", "Guidelines"]',
  'title: ["Online Selection", "Requirements"]'
);
content = content.replace(
  'title: ["Ariza topshirish", "Qo\'llanmasi"]',
  'title: ["Onlayn tanlov", "talablari"]'
);
content = content.replace(
  'title: ["Руководство по", "подаче заявки"]',
  'title: ["Требования к", "онлайн-отбору"]'
);

// Format guidelines keys title replacement (just in case they need to be shown correctly? We'll let registrationInfo.tsx use it correctly).

// Requirements sidebars
content = content.replace('req3: "Poster for presentation (print-ready PDF).",\n      req4: "Video submission (3-minute pitch).",\n      req5: "Crucial: Projects must not have won a prior national level competition."', 'req3: "ISEF-style research poster.",\n      req4: "Crucial: Projects must not have won a prior national level competition."');

content = content.replace('req3: "Taqdimot uchun poster (chop etishga tayyor PDF).",\n      req4: "Video taqdimot (3 daqiqalik yozuv).",\n      req5: "Muhim: Loyihalar bungacha milliy miqyosdagi musobaqalarda g\'olib bo\'lmagan bo\'lishi kerak."', 'req3: "ISEF-style research poster.",\n      req4: "Muhim: Loyihalar bungacha milliy miqyosdagi musobaqalarda g\'olib bo\'lmagan bo\'lishi kerak."');

content = content.replace('req3: "Постер для презентации (PDF для печати).",\n      req4: "Видео-презентация (запись на 3 минуты).",\n      req5: "Важно: Проекты не должны являться победителями прошлых соревнований национального уровня."', 'req3: "Изследовательский постер в стиле ISEF.",\n      req4: "Важно: Проекты не должны являться победителями прошлых соревнований национального уровня."');


fs.writeFileSync('src/data/guidelinesTranslations.ts', content, 'utf8');
console.log('Update finished');
