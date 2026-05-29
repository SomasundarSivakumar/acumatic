const fs = require('fs');

const mainJsPath = 'C:\\Users\\SUNDAR\\Documents\\GitHub\\acumatic_1\\src\\main.js';
let mainJs = fs.readFileSync(mainJsPath, 'utf8');

console.log("Replacing dark pinned spacer background color with white in main.js...");

// Count occurrences of '#03000a'
const count = (mainJs.match(/#03000a/g) || []).length;
console.log(`Found ${count} occurrences of dark spacer color #03000a.`);

mainJs = mainJs.split('#03000a').join('#ffffff');

fs.writeFileSync(mainJsPath, mainJs, 'utf8');
console.log("Successfully completed spacer background update in main.js!");
