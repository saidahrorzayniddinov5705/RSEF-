import * as fs from 'fs';

let navbarContent = fs.readFileSync('src/components/Navbar.tsx', 'utf8');
navbarContent = navbarContent.replace('registration: \'Guidelines\',', 'registration: \'Online selection requirements\',');
navbarContent = navbarContent.replace('registration: \'Qoidalar\',', 'registration: \'Onlayn tanlov talablari\',');
navbarContent = navbarContent.replace('registration: \'Правила\',', 'registration: \'Требования к онлайн-отбору\',');
fs.writeFileSync('src/components/Navbar.tsx', navbarContent, 'utf8');

let footerContent = fs.readFileSync('src/components/Footer.tsx', 'utf8');
footerContent = footerContent.replace('{ name: "Guidelines", path: "registration" },', '{ name: "Online selection requirements", path: "registration" },');
fs.writeFileSync('src/components/Footer.tsx', footerContent, 'utf8');
console.log('navbar and footer updated');
