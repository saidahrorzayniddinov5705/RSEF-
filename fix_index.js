import * as fs from 'fs';

let content = fs.readFileSync('src/pages/index.tsx', 'utf8');

const regex = /<div className="h-56 overflow-hidden bg-slate-100 shrink-0">\s*<img src=\{news\.imageUrl[^>]+>\s*<\/div>/g;

const replacement = `<div className="h-56 overflow-hidden bg-slate-100 shrink-0">
                           {news.imageUrl && news.imageUrl.match(/(?:youtu\\.be\\/|youtube\\.com\\/(?:embed\\/|v\\/|watch\\?v=|watch\\?.+&v=))([^&?]+)/) ? (
                              <iframe 
                                 className="w-full h-full"
                                 src={\`https://www.youtube.com/embed/\${news.imageUrl.match(/(?:youtu\\.be\\/|youtube\\.com\\/(?:embed\\/|v\\/|watch\\?v=|watch\\?.+&v=))([^&?]+)/)[1]}\`} 
                                 title={title}
                                 frameBorder="0"
                                 allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                 allowFullScreen
                              ></iframe>
                           ) : (
                              <img src={news.imageUrl || 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=600&auto=format&fit=crop'} alt={title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                           )}
                        </div>`;

fs.writeFileSync('src/pages/index.tsx', content.replace(regex, replacement));
