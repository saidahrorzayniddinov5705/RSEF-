import * as fs from 'fs';

const filePath = 'src/data/guidelinesTranslations.ts';
let content = fs.readFileSync(filePath, 'utf8');

const categoriesEn = \`
      categoriesTitle: "Project Categories",
      categoriesDesc: "You must choose one of the following 22 categories for your project. Make sure your research closely aligns with your selected category.",
      categoriesList: [
        "Animal Sciences (ANIM)",
        "Behavioral and Social Sciences (BEHA)",
        "Biochemistry (BCHM)",
        "Biomedical and Health Sciences (BMED)",
        "Biomedical Engineering (ENBM)",
        "Cellular and Molecular Biology (CELL)",
        "Chemistry (CHEM)",
        "Computational Biology and Bioinformatics (CBIO)",
        "Earth and Environmental Sciences (EAEV)",
        "Embedded Systems (EBED)",
        "Energy: Sustainable Materials and Design (EGSD)",
        "Engineering Technology: Statics and Dynamics (ETSD)",
        "Environmental Engineering (ENEV)",
        "Materials Science (MATS)",
        "Mathematics (MATH)",
        "Microbiology (MCRO)",
        "Physics and Astronomy (PHYS)",
        "Plant Sciences (PLNT)",
        "Robotics and Intelligent Machines (ROBO)",
        "Software Design (SFTD)",
        "Technology Enhances the Arts (TECA)",
        "Translational Medical Science"
      ]\`;

const categoriesUz = \`
      categoriesTitle: "Loyiha Kategoriyalari",
      categoriesDesc: "Loyihangiz uchun quyidagi 22 ta kategoriyadan birini tanlashingiz kerak. Tadqiqotingiz tanlagan kategoriyangizga to'g'ri kelishiga ishonch hosil qiling.",
      categoriesList: [
        "Animal Sciences (ANIM)",
        "Behavioral and Social Sciences (BEHA)",
        "Biochemistry (BCHM)",
        "Biomedical and Health Sciences (BMED)",
        "Biomedical Engineering (ENBM)",
        "Cellular and Molecular Biology (CELL)",
        "Chemistry (CHEM)",
        "Computational Biology and Bioinformatics (CBIO)",
        "Earth and Environmental Sciences (EAEV)",
        "Embedded Systems (EBED)",
        "Energy: Sustainable Materials and Design (EGSD)",
        "Engineering Technology: Statics and Dynamics (ETSD)",
        "Environmental Engineering (ENEV)",
        "Materials Science (MATS)",
        "Mathematics (MATH)",
        "Microbiology (MCRO)",
        "Physics and Astronomy (PHYS)",
        "Plant Sciences (PLNT)",
        "Robotics and Intelligent Machines (ROBO)",
        "Software Design (SFTD)",
        "Technology Enhances the Arts (TECA)",
        "Translational Medical Science"
      ]\`;

const categoriesRu = \`
      categoriesTitle: "Категории проектов",
      categoriesDesc: "Вы должны выбрать одну из следующих 22 категорий для вашего проекта. Убедитесь, что ваше исследование соответствует выбранной категории.",
      categoriesList: [
        "Animal Sciences (ANIM)",
        "Behavioral and Social Sciences (BEHA)",
        "Biochemistry (BCHM)",
        "Biomedical and Health Sciences (BMED)",
        "Biomedical Engineering (ENBM)",
        "Cellular and Molecular Biology (CELL)",
        "Chemistry (CHEM)",
        "Computational Biology and Bioinformatics (CBIO)",
        "Earth and Environmental Sciences (EAEV)",
        "Embedded Systems (EBED)",
        "Energy: Sustainable Materials and Design (EGSD)",
        "Engineering Technology: Statics and Dynamics (ETSD)",
        "Environmental Engineering (ENEV)",
        "Materials Science (MATS)",
        "Mathematics (MATH)",
        "Microbiology (MCRO)",
        "Physics and Astronomy (PHYS)",
        "Plant Sciences (PLNT)",
        "Robotics and Intelligent Machines (ROBO)",
        "Software Design (SFTD)",
        "Technology Enhances the Arts (TECA)",
        "Translational Medical Science"
      ]\`;

content = content.replace(
  \`format3D: "Uploaded to YouTube (unlisted) or Google Drive"\`,
  \`format3D: "Uploaded to YouTube (unlisted) or Google Drive",\\n\` + categoriesEn
);

content = content.replace(
  \`format3D: "YouTube (unlisted) yoki Google Drive'ga yuklangan"\`,
  \`format3D: "YouTube (unlisted) yoki Google Drive'ga yuklangan",\\n\` + categoriesUz
);

content = content.replace(
  \`format3D: "Загружено на YouTube (дост. по ссылке) или Google Drive"\`,
  \`format3D: "Загружено на YouTube (дост. по ссылке) или Google Drive",\\n\` + categoriesRu
);

fs.writeFileSync(filePath, content, 'utf8');
console.log("Translations updated!");
