const fs = require('fs');

const htmlPath = 'c:\\Users\\SUNDAR\\Documents\\GitHub\\acumatic_1\\index.html';
let html = fs.readFileSync(htmlPath, 'utf8');

console.log("Replacing timeline typography classes globally...");

// Count occurrences of cyan/green titles
let countTeal = (html.match(/text-\[#0284c7\] font-display/g) || []).length;
let countGreen = (html.match(/text-\[#059669\] font-display/g) || []).length;

console.log(`Found ${countTeal} sky blue titles and ${countGreen} emerald green titles.`);

// 1. Replace title text color and font family
html = html.split('text-[#0284c7] font-display').join('text-black font-sans');
html = html.split('text-[#059669] font-display').join('text-black font-sans');

// 2. Replace description text color inside timeline cards.
// In the timeline, the descriptions have: class="text-sm md:text-base text-slate-600 leading-relaxed ...
// Let's replace 'text-slate-600' inside the timeline section with 'text-black'.
// Since text-slate-600 is also used elsewhere in the document, we can safely target only the timeline portion.
// To do this, let's locate the 'Why Businesses Choose Acumatic' section
const sectionStart = html.indexOf('Why Businesses Choose <span class="gradient-text">Acumatic</span>');
if (sectionStart !== -1) {
  let sectionPart = html.substring(sectionStart);
  sectionPart = sectionPart.split('text-slate-600').join('text-black');
  html = html.substring(0, sectionStart) + sectionPart;
  console.log("Successfully replaced text-slate-600 to text-black inside timeline section!");
} else {
  console.log("Warning: Could not find timeline section for description replacements!");
}

fs.writeFileSync(htmlPath, html, 'utf8');
console.log("Successfully completed global replacement updates in index.html!");
