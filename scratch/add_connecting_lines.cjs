const fs = require('fs');

const htmlPath = 'c:\\Users\\SUNDAR\\Documents\\GitHub\\acumatic_1\\index.html';
let html = fs.readFileSync(htmlPath, 'utf8');

console.log("Adding dynamic connecting lines to timeline items in index.html...");

// Let's replace each why-item manually by item number or index to ensure absolute correctness.
// We have 10 items.
// Let's define the line tags:
const leftLine = `<div class="why-connect-line absolute top-1/2 -translate-y-1/2 right-1/2 left-[42%] h-[1.5px] bg-gradient-to-r from-slate-200 to-[#0284c7]/40 origin-right pointer-events-none md:block hidden"></div>`;
const rightLine = `<div class="why-connect-line absolute top-1/2 -translate-y-1/2 left-1/2 right-[42%] h-[1.5px] bg-gradient-to-l from-slate-200 to-[#059669]/40 origin-left pointer-events-none md:block hidden"></div>`;

// Splitting the file by why-item allows us to process each item block individually!
const parts = html.split('<div class="why-item relative w-full flex flex-col md:flex-row md:justify-between items-start md:items-center pl-12 md:pl-0">');

if (parts.length !== 11) {
  console.error(`Expected 11 split parts but found ${parts.length}. This means the timeline items are not matching the target class.`);
  process.exit(1);
}

// Reconstruct
let updatedHtml = parts[0];
for (let i = 1; i <= 10; i++) {
  let itemBlock = parts[i];
  const isLeft = i % 2 !== 0; // Item 1 is left, Item 2 is right, etc.
  const lineToInsert = isLeft ? leftLine : rightLine;
  
  // We insert the line right after the why-card container (which ends with </div>)
  // Let's locate the first </div> that closes the why-card
  const firstDivClose = itemBlock.indexOf('</div>');
  if (firstDivClose !== -1) {
    // Insert the line
    itemBlock = itemBlock.substring(0, firstDivClose + 6) + '\n              ' + lineToInsert + itemBlock.substring(firstDivClose + 6);
  }
  
  updatedHtml += '<div class="why-item relative w-full flex flex-col md:flex-row md:justify-between items-start md:items-center pl-12 md:pl-0">' + itemBlock;
}

fs.writeFileSync(htmlPath, updatedHtml, 'utf8');
console.log("Successfully added all 10 connecting lines to index.html!");
