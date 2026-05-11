import * as fs from 'fs';

const filePath = 'src/pages/apply.tsx';
let content = fs.readFileSync(filePath, 'utf8');

const regexMap = [
  {
    find: /className="w-full rounded-md border border-\[#dfdbd1\] bg-white px-4 py-3 placeholder:text-slate-400 focus:border-\[#0c182c\] focus:ring-1 focus:ring-\[#0c182c\] disabled:bg-slate-50 transition-all font-medium text-\[#0c182c\]"/g,
    replace: 'className="w-full rounded-xl border-2 border-[#dfdbd1] bg-[#fdfdfc] px-4 py-3.5 placeholder:text-slate-400 focus:bg-white focus:border-blue-600 focus:ring-4 focus:ring-blue-600/10 disabled:bg-slate-50 transition-all font-medium text-[#0c182c] shadow-sm hover:border-[#cbd0d6]"'
  },
  {
    find: /className="w-full rounded-md border border-\[#dfdbd1\] bg-white px-4 py-3 focus:border-\[#0c182c\] focus:ring-1 focus:ring-\[#0c182c\] disabled:bg-slate-50 transition-all font-medium text-\[#0c182c\]"/g,
    replace: 'className="w-full rounded-xl border-2 border-[#dfdbd1] bg-[#fdfdfc] px-4 py-3.5 focus:bg-white focus:border-blue-600 focus:ring-4 focus:ring-blue-600/10 disabled:bg-slate-50 transition-all font-medium text-[#0c182c] shadow-sm hover:border-[#cbd0d6]"'
  },
  {
    find: /className="w-full rounded-md border border-\[#dfdbd1\] bg-white px-4 py-3 placeholder:text-slate-400 focus-within:border-\[#0c182c\] focus-within:ring-1 focus-within:ring-\[#0c182c\] disabled:bg-slate-50 transition-all font-medium text-\[#0c182c\] apply-phone-input"/g,
    replace: 'className="w-full rounded-xl border-2 border-[#dfdbd1] bg-[#fdfdfc] px-4 py-3.5 placeholder:text-slate-400 focus-within:bg-white focus-within:border-blue-600 focus-within:ring-4 focus-within:ring-blue-600/10 disabled:bg-slate-50 transition-all font-medium text-[#0c182c] shadow-sm hover:border-[#cbd0d6] apply-phone-input"'
  },
  {
    find: /className="w-full rounded-md border border-\[#dfdbd1\] bg-white px-4 py-3 placeholder:text-slate-400 focus:border-\[#0c182c\] focus:ring-1 focus:ring-\[#0c182c\] disabled:bg-slate-50 transition-all font-medium text-\[#0c182c\] resize-none"/g,
    replace: 'className="w-full rounded-xl border-2 border-[#dfdbd1] bg-[#fdfdfc] px-4 py-3.5 placeholder:text-slate-400 focus:bg-white focus:border-blue-600 focus:ring-4 focus:ring-blue-600/10 disabled:bg-slate-50 transition-all font-medium text-[#0c182c] shadow-sm hover:border-[#cbd0d6] resize-none"'
  },
  {
    find: /className="w-full rounded-md border border-\[#dfdbd1\] bg-white px-4 py-3 focus:border-\[#0c182c\] focus:ring-1 focus:ring-\[#0c182c\] cursor-pointer"/g,
    replace: 'className="w-full rounded-xl border-2 border-[#dfdbd1] bg-[#fdfdfc] px-4 py-3.5 focus:bg-white focus:border-blue-600 focus:ring-4 focus:ring-blue-600/10 cursor-pointer shadow-sm hover:border-[#cbd0d6]"'
  }
];

regexMap.forEach(({ find, replace }) => {
  content = content.replace(find, replace);
});

fs.writeFileSync(filePath, content, 'utf8');
console.log("Updated apply.tsx successfully");
