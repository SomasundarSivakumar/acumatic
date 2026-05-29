const fs = require('fs');

const rawPath = 'C:\\Users\\SUNDAR\\Documents\\GitHub\\acumatic_1\\scratch\\extracted_timeline_raw.txt';
let raw = fs.readFileSync(rawPath, 'utf8');

// The text is stringified JSON. Let's parse it to get the raw unescaped string
let clean = raw;
try {
  // If it starts with quotes, it's stringified. Let's check:
  if (!raw.startsWith('<section')) {
    clean = JSON.parse('"' + raw + '"');
  }
} catch (e) {
  // fallback
}

// Split into lines
const lines = clean.split('\\n');
const cleanLines = [];

for (let line of lines) {
  // If the line starts with '+' (from diff), strip it
  if (line.startsWith('+')) {
    line = line.substring(1);
  } else if (line.startsWith(' ')) {
    line = line.substring(1);
  }
  
  // Unescape quotes
  line = line.replace(/\\"/g, '"');
  line = line.replace(/\\'/g, "'");
  
  cleanLines.push(line);
}

const finalHtml = cleanLines.join('\n');
fs.writeFileSync('C:\\Users\\SUNDAR\\Documents\\GitHub\\acumatic_1\\scratch\\clean_timeline.html', finalHtml, 'utf8');
console.log("SUCCESSFULLY GENERATED CLEAN TIMELINE HTML!");
