import * as fs from 'fs';

const filePath = 'src/pages/apply.tsx';
let content = fs.readFileSync(filePath, 'utf8');

const regexMap = [
  {
    find: /className="bg-white border text-left border-\[#dfdbd1\] rounded-xl p-8 shadow-sm"/g,
    replace: 'className="bg-white border-2 text-left border-[#dfdbd1] rounded-xl p-8 shadow-sm focus-within:ring-4 focus-within:ring-blue-600/10 focus-within:border-blue-600 transition-all hover:border-[#cbd0d6]"'
  },
  {
    find: /className="bg-white border border-\[#dfdbd1\] rounded-xl p-6 shadow-sm focus-within:ring-1 focus-within:ring-\[#0c182c\] focus-within:border-\[#0c182c\] transition-all"/g,
    replace: 'className="bg-white border-2 border-[#dfdbd1] rounded-xl p-6 shadow-sm focus-within:ring-4 focus-within:ring-blue-600/10 focus-within:border-blue-600 transition-all hover:border-[#cbd0d6]"'
  }
];

regexMap.forEach(({ find, replace }) => {
  content = content.replace(find, replace);
});

fs.writeFileSync(filePath, content, 'utf8');
console.log("Updated apply.tsx focus-within successfully");
