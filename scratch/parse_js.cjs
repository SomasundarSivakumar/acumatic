const fs = require('fs');

const rawPath = 'C:\\Users\\SUNDAR\\Documents\\GitHub\\acumatic_1\\scratch\\extracted_main.js';
let raw = fs.readFileSync(rawPath, 'utf8');

// The file contains double-escaped newlines because of the JSON logs.
// Let's decode it by unescaping double backslashes and JSON parsing
let clean = raw;
if (raw.includes('\\\\n') || raw.includes('\\n')) {
  // Replace double backslashes to single backslashes so JSON.parse can unescape
  let escaped = raw.replace(/\\"/g, '"');
  // Decode double escaped characters
  clean = escaped.replace(/\\\\n/g, '\n').replace(/\\n/g, '\n').replace(/\\\\"/g, '"').replace(/\\"/g, '"');
}

// Clean any leading/trailing diff signs or system logs garbage
const lines = clean.split('\n');
const cleanLines = [];
for (let line of lines) {
  if (line.startsWith('+')) {
    line = line.substring(1);
  } else if (line.startsWith(' ')) {
    line = line.substring(1);
  }
  
  // Strip truncations or diff markers if present
  if (line.includes('<truncated') || line.includes('[diff_block_end]')) {
    continue;
  }
  
  cleanLines.push(line);
}

// Construct the complete, highly polished, fully functional timeline scroll triggers code block
const timelineJS = `
// ─── GSAP ScrollTrigger: Why Choose Acumatic Winding Timeline ──────────────────
const whyChooseUsSection = document.querySelector('.why-choose-us-section')
if (whyChooseUsSection) {
  const animatedPath = document.querySelector('.why-animated-path')
  const mobileProgress = document.querySelector('.why-mobile-progress')

  if (animatedPath) {
    const pathLength = animatedPath.getTotalLength()
    
    // Set initial dash states
    gsap.set(animatedPath, {
      strokeDasharray: pathLength,
      strokeDashoffset: pathLength
    })

    // Draw the winding SVG path on scroll
    gsap.to(animatedPath, {
      strokeDashoffset: 0,
      ease: 'none',
      scrollTrigger: {
        trigger: '.why-choose-us-section',
        start: 'top 30%',
        end: 'bottom 70%',
        scrub: 0.8,
        onUpdate: (self) => {
          // Sync the mobile progress bar height too!
          if (mobileProgress) {
            mobileProgress.style.height = \`\${self.progress * 100}%\`
          }
        }
      }
    })
  }

  // Stagger reveal of all 10 timeline items
  const whyItems = gsap.utils.toArray('.why-item')
  whyItems.forEach((item, index) => {
    const card = item.querySelector('.why-card')
    const dot = item.querySelector('.why-node-dot')
    const core = item.querySelector('.why-dot-core')

    if (card && dot && core) {
      const isLeft = index % 2 === 0
      
      // Set initial states: cards shifted left/right and invisible, nodes scaled down
      gsap.set(card, { opacity: 0, x: isLeft ? -50 : 50 })
      gsap.set(dot, { scale: 0, borderColor: 'rgba(15, 23, 42, 0.08)' })
      gsap.set(core, { opacity: 0, scale: 0 })
      
      // Card reveal animation
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

      // Dot glow and zoom animation (styled for light theme)
      gsap.to(dot, {
        scale: 1,
        borderColor: isLeft ? '#0284c7' : '#059669',
        backgroundColor: '#ffffff',
        boxShadow: \`0 0 10px \${isLeft ? 'rgba(2, 132, 199, 0.4)' : 'rgba(5, 150, 105, 0.4)'}\`,
        duration: 0.6,
        ease: 'back.out(2)',
        scrollTrigger: {
          trigger: item,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        }
      })

      // Active core glow dot reveal
      gsap.to(core, {
        opacity: 1,
        scale: 1.3,
        duration: 0.6,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: item,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        }
      })
    }
  })
}
`;

// Append this complete block to src/main.js
const mainJsPath = 'C:\\Users\\SUNDAR\\Documents\\GitHub\\acumatic_1\\src\\main.js';
let mainJs = fs.readFileSync(mainJsPath, 'utf8');

// To avoid duplicate appends, let's remove any previous winding timeline block if it exists
const startBlockComment = '// ─── GSAP ScrollTrigger: Why Choose Acumatic Winding Timeline';
const blockIndex = mainJs.indexOf(startBlockComment);
if (blockIndex !== -1) {
  mainJs = mainJs.substring(0, blockIndex);
}

// Append the new block
fs.writeFileSync(mainJsPath, mainJs.trim() + '\n' + timelineJS.trim() + '\n', 'utf8');
console.log("SUCCESSFULLY APPENDED AND RECONFIGURED main.js!");
