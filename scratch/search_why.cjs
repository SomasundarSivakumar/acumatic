const fs = require('fs');
const html = fs.readFileSync('c:\\Users\\SUNDAR\\Documents\\GitHub\\acumatic_1\\index.html', 'utf8');

const keyWords = ['why-choose-us-section', 'why-item', 'why-card', 'why-animated-path', 'why-mobile-progress'];
for (const kw of keyWords) {
  const index = html.indexOf(kw);
  console.log(`Keyword "${kw}": ${index !== -1 ? 'FOUND at index ' + index : 'NOT FOUND'}`);
}
