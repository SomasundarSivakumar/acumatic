const fs = require('fs');
const path = require('path');

const logPath = 'C:\\Users\\SUNDAR\\.gemini\\antigravity-ide\\brain\\9236a52e-912c-4912-8beb-5242138136ac\\.system_generated\\logs\\transcript.jsonl';
const fileContent = fs.readFileSync(logPath, 'utf8');

console.log("Searching for timeline HTML in transcript.jsonl...");

// We want to find the HTML block containing why-animated-path or why-item
const lines = fileContent.split('\n');
let found = false;

for (let i = 0; i < lines.length; i++) {
  const line = lines[i];
  if (line.includes('why-animated-path') && line.includes('why-choose-us-section')) {
    console.log(`Found match on line ${i}`);
    
    // Let's find the HTML string inside the JSON object
    try {
      const jsonObj = JSON.parse(line);
      // Look inside tool_calls or content
      const str = JSON.stringify(jsonObj);
      const startIdx = str.indexOf('<section class="why-choose-us-section');
      if (startIdx !== -1) {
        const endIdx = str.indexOf('</section>', startIdx);
        if (endIdx !== -1) {
          const sectionHtml = str.substring(startIdx, endIdx + 10);
          // Unescape backslashes and quotes
          const cleanHtml = JSON.parse('"' + sectionHtml.replace(/"/g, '\\"') + '"');
          console.log("SUCCESSFULLY EXTRACTED TIMELINE HTML!");
          fs.writeFileSync('C:\\Users\\SUNDAR\\Documents\\GitHub\\acumatic_1\\scratch\\extracted_timeline.html', cleanHtml, 'utf8');
          found = true;
          break;
        }
      }
    } catch (err) {
      // JSON parse error, ignore
    }
  }
}

if (!found) {
  // Let's do a broader regex match on the raw text
  console.log("Broad search...");
  const match = fileContent.match(/<section class=\\"why-choose-us-section[^\n]+/);
  if (match) {
    console.log("Found raw match!");
    // Write out a part of the match to verify
    fs.writeFileSync('C:\\Users\\SUNDAR\\Documents\\GitHub\\acumatic_1\\scratch\\extracted_timeline_raw.txt', match[0], 'utf8');
  } else {
    console.log("Timeline HTML not found in log.");
  }
}
