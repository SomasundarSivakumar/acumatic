const fs = require('fs');

const logPath = 'C:\\Users\\SUNDAR\\.gemini\\antigravity-ide\\brain\\9236a52e-912c-4912-8beb-5242138136ac\\.system_generated\\logs\\transcript.jsonl';
const fileContent = fs.readFileSync(logPath, 'utf8');

console.log("Searching for main.js timeline triggers inside logs...");

// Look for lines containing "whyChooseUsSection" and "gsap.to" inside main.js
const lines = fileContent.split('\n');
let found = false;

for (let i = lines.length - 1; i >= 0; i--) {
  const line = lines[i];
  if (line.includes('whyChooseUsSection') && line.includes('why-animated-path') && line.includes('whyItems.forEach')) {
    console.log(`Found a potential match on log line ${i}`);
    
    try {
      const jsonObj = JSON.parse(line);
      const str = JSON.stringify(jsonObj);
      const startIdx = str.indexOf('// ─── GSAP ScrollTrigger: Why Choose Acumatic Winding');
      if (startIdx !== -1) {
        const endIdx = str.indexOf('whyItems.forEach', startIdx);
        if (endIdx !== -1) {
          // Let's find the closing brackets of the block
          const endBraceIdx = str.indexOf('})\\n    }\\n  })\\n}', endIdx);
          if (endBraceIdx !== -1) {
            const block = str.substring(startIdx, endBraceIdx + 20);
            const cleanBlock = JSON.parse('"' + block.replace(/"/g, '\\"') + '"');
            console.log("SUCCESSFULLY EXTRACTED JS BLOCK!");
            fs.writeFileSync('C:\\Users\\SUNDAR\\Documents\\GitHub\\acumatic_1\\scratch\\extracted_main.js', cleanBlock, 'utf8');
            found = true;
            break;
          }
        }
      }
    } catch (err) {
      // JSON parse error, ignore
    }
  }
}

if (!found) {
  // Let's do a broader regex match on the raw text
  console.log("Broad search for whyChooseUsSection in JS...");
  const match = fileContent.match(/\/\/ ─── GSAP ScrollTrigger: Why Choose Acumatic Winding[^\n]+/);
  if (match) {
    console.log("Found raw match!");
    // Unescape the raw match
    let clean = match[0];
    try {
      if (clean.includes('\\n')) {
        clean = JSON.parse('"' + clean.replace(/"/g, '\\"') + '"');
      }
    } catch (e) {
      // fallback
    }
    // Clean diff signs if any
    const cleanLines = clean.split('\n').map(l => l.startsWith('+') ? l.substring(1) : l);
    fs.writeFileSync('C:\\Users\\SUNDAR\\Documents\\GitHub\\acumatic_1\\scratch\\extracted_main.js', cleanLines.join('\n'), 'utf8');
  } else {
    console.log("Timeline JS triggers not found in log.");
  }
}
