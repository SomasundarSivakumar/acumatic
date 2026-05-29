const fs = require('fs');
const htmlPath = 'c:\\Users\\SUNDAR\\Documents\\GitHub\\acumatic_1\\index.html';
const html = fs.readFileSync(htmlPath, 'utf8');

let pos = html.indexOf('why-card');
while (pos !== -1) {
  console.log("MATCH:", html.substring(pos, pos + 180));
  pos = html.indexOf('why-card', pos + 1);
}
