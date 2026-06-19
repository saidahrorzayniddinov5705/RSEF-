import * as fs from 'fs';

let content = fs.readFileSync('src/pages/results.tsx', 'utf8');

const regex = /\{res\.imageUrl && \(\s*<div className="w-full md:w-1\/3">\s*<img src=\{res\.imageUrl[^>]+>\s*<\/div>\s*\)\}/g;

const replacement = `{res.imageUrl && (
                              <div className="w-full md:w-1/3 bg-slate-100 rounded-xl overflow-hidden shadow-md border border-slate-200 flex-shrink-0">
                                 {res.imageUrl.match(/(?:youtu\\.be\\/|youtube\\.com\\/(?:embed\\/|v\\/|watch\\?v=|watch\\?.+&v=))([^&?]+)/) ? (
                                    <iframe 
                                       className="w-full aspect-video min-h-[250px]"
                                       src={\`https://www.youtube.com/embed/\${res.imageUrl.match(/(?:youtu\\.be\\/|youtube\\.com\\/(?:embed\\/|v\\/|watch\\?v=|watch\\?.+&v=))([^&?]+)/)[1]}\`} 
                                       title={title}
                                       frameBorder="0"
                                       allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                       allowFullScreen
                                    ></iframe>
                                 ) : (
                                    <img src={res.imageUrl} alt={title} className="w-full object-cover" />
                                 )}
                              </div>
                          )}`;

fs.writeFileSync('src/pages/results.tsx', content.replace(regex, replacement));
