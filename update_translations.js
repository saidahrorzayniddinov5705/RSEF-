import * as fs from 'fs';

const filePath = 'src/data/guidelinesTranslations.ts';
let content = fs.readFileSync(filePath, 'utf8');

const categoriesEn = `
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
      ],`;

const categoriesUz = `
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
        "Translational Medical Science (TRMD)"
      ],`;

const categoriesRu = `
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
      ],`;

content = content.replace(
  'format3D: "Uploaded to YouTube (unlisted) or Google Drive"\\n    },',
  'format3D: "Uploaded to YouTube (unlisted) or Google Drive",' + categoriesEn + '\\n    },'
);

content = content.replace(
  'format3D: "YouTube (Ochiq emas) yoki Google Drive-ga yuklanadi"\\n    },',
  'format3D: "YouTube (Ochiq emas) yoki Google Drive-ga yuklanadi",' + categoriesUz + '\\n    },'
);

content = content.replace(
  'format3D: "Загружено на YouTube (доступ по ссылке) или Google Drive"\\n    },',
  'format3D: "Загружено на YouTube (доступ по ссылке) или Google Drive",' + categoriesRu + '\\n    },'
);

fs.writeFileSync(filePath, content, 'utf8');
console.log("Translations updated!");
