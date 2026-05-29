const fs = require('fs');

const mainJsPath = 'C:\\Users\\SUNDAR\\Documents\\GitHub\\acumatic_1\\src\\main.js';
let mainJs = fs.readFileSync(mainJsPath, 'utf8');

console.log("Updating main.js to animate connecting lines...");

// Target where the whyItems variables are initialized
const targetInit = `    const card = item.querySelector('.why-card')
    const dot = item.querySelector('.why-node-dot')
    const core = item.querySelector('.why-dot-core')`;

const replacementInit = `    const card = item.querySelector('.why-card')
    const dot = item.querySelector('.why-node-dot')
    const core = item.querySelector('.why-dot-core')
    const line = item.querySelector('.why-connect-line')`;

// Target where the initial states are set
const targetSet = `      gsap.set(card, { opacity: 0, x: isLeft ? -50 : 50 })
      gsap.set(dot, { scale: 0, borderColor: 'rgba(15, 23, 42, 0.08)' })
      gsap.set(core, { opacity: 0, scale: 0 })`;

const replacementSet = `      gsap.set(card, { opacity: 0, x: isLeft ? -50 : 50 })
      gsap.set(dot, { scale: 0, borderColor: 'rgba(15, 23, 42, 0.08)' })
      gsap.set(core, { opacity: 0, scale: 0 })
      if (line) {
        gsap.set(line, { scaleX: 0 })
      }`;

// Target card animation block to inject connecting line animation right after it
const targetAnim = `      // Card reveal animation
      gsap.to(card, {
        opacity: 1,
        x: 0,
        y: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: item,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        }
      })`;

const replacementAnim = `      // Card reveal animation
      gsap.to(card, {
        opacity: 1,
        x: 0,
        y: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: item,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        }
      })

      // Connecting line scale-draw animation
      if (line) {
        gsap.to(line, {
          scaleX: 1,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: item,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          }
        })
      }`;

if (mainJs.includes(targetInit) && mainJs.includes(targetSet) && mainJs.includes(targetAnim)) {
  mainJs = mainJs.split(targetInit).join(replacementInit);
  mainJs = mainJs.split(targetSet).join(replacementSet);
  mainJs = mainJs.split(targetAnim).join(replacementAnim);
  fs.writeFileSync(mainJsPath, mainJs, 'utf8');
  console.log("Successfully integrated connecting line GSAP triggers into main.js!");
} else {
  console.error("Could not find matching code sections in main.js to patch triggers.");
}
