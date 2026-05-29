const fs = require('fs');
const stats = fs.statSync('C:\\Users\\SUNDAR\\Documents\\GitHub\\acumatic_1\\scratch\\clean_timeline.html');
const content = fs.readFileSync('C:\\Users\\SUNDAR\\Documents\\GitHub\\acumatic_1\\scratch\\clean_timeline.html', 'utf8');
const lines = content.split('\n');
console.log(`File Size: ${stats.size} bytes`);
console.log(`Line Count: ${lines.length}`);
console.log("Last 3 lines:");
console.log(lines.slice(-3).join('\n'));
