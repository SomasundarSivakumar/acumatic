const fs = require('fs');

const htmlPath = 'c:\\Users\\SUNDAR\\Documents\\GitHub\\acumatic_1\\index.html';
let html = fs.readFileSync(htmlPath, 'utf8');

const targetPlaceholder = `    <!-- Choose us section -->
    <section class="">
      <div class="max-w-[85%] mx-auto py-30">
        <div class="flex items-center gap-3">
          <div class="bg-[#05c6c5] w-2.5 h-2.5">
          </div>
          <div class="text-[#05c6c5] font-display font-medium text-lg tracking-wider uppercase">
            Our Mission
          </div>
        </div>
        <div class="text-5xl font-medium mt-5 text-black">
          Why Businesses Choose Acumatic
        </div>
      </div>
    </section>`;

const cleanTimelineHtml = `    <!-- Why Businesses Choose Acumatic Section -->
    <section class="why-choose-us-section relative overflow-hidden py-24 bg-[#ffffff] border-t border-slate-100">
      <!-- Luminous Glow Backdrops -->
      <div class="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-[#0284c7]/5 blur-[150px] pointer-events-none"></div>
      <div class="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-[#059669]/5 blur-[150px] pointer-events-none"></div>

      <div class="max-w-[85%] mx-auto relative z-10">
        <!-- Section Header -->
        <div class="flex items-center gap-3 mb-4">
          <div class="bg-[#05c6c5] w-2.5 h-2.5"></div>
          <div class="text-[#05c6c5] font-display font-medium text-lg tracking-wider uppercase">Our Mission</div>
        </div>
        <h2 class="text-4xl md:text-5xl font-bold tracking-wide text-slate-900 font-display mb-20 max-w-2xl leading-tight">
          Why Businesses Choose <span class="gradient-text">Acumatic</span>
        </h2>

        <!-- Interactive Timeline Container -->
        <div class="relative w-full py-10">
          
          <!-- Central Winding SVG Line (Desktop) -->
          <div class="absolute inset-y-0 left-1/2 -translate-x-1/2 w-24 md:flex hidden justify-center pointer-events-none z-0">
            <svg class="w-full h-full" viewBox="0 0 100 1600" fill="none" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
              <!-- Slate Background Track -->
              <path d="M50 0 L50 50 Q50 85 20 120 Q50 155 50 200 Q50 245 80 280 Q50 315 50 360 Q50 405 20 440 Q50 475 50 520 Q50 565 80 600 Q50 635 50 680 Q50 725 20 760 Q50 795 50 840 Q50 885 80 920 Q50 955 50 1000 Q50 1045 20 1080 Q50 1115 50 1160 Q50 1205 80 1240 Q50 1275 50 1320 Q50 1365 20 1400 Q50 1435 50 1480 Q50 1525 80 1560 Q50 1595 50 1650 L 50 1700" stroke="rgba(15, 23, 42, 0.08)" stroke-width="3" stroke-linecap="round" fill="none" />
              
              <!-- Animated Winding Path -->
              <path class="why-animated-path" d="M50 0 L50 50 Q50 85 20 120 Q50 155 50 200 Q50 245 80 280 Q50 315 50 360 Q50 405 20 440 Q50 475 50 520 Q50 565 80 600 Q50 635 50 680 Q50 725 20 760 Q50 795 50 840 Q50 885 80 920 Q50 955 50 1000 Q50 1045 20 1080 Q50 1115 50 1160 Q50 1205 80 1240 Q50 1275 50 1320 Q50 1365 20 1400 Q50 1435 50 1480 Q50 1525 80 1560 Q50 1595 50 1650 L 50 1700" stroke="url(#why-line-grad)" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round" fill="none" />
              
              <defs>
                <linearGradient id="why-line-grad" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stop-color="#0284c7" />
                  <stop offset="50%" stop-color="#059669" />
                  <stop offset="100%" stop-color="#2563eb" />
                </linearGradient>
              </defs>
            </svg>
          </div>

          <!-- Mobile Timeline Line -->
          <div class="absolute left-[23px] top-0 bottom-0 w-[2px] bg-slate-100 md:hidden block pointer-events-none z-0"></div>
          <div class="why-mobile-progress absolute left-[23px] top-0 w-[2px] bg-gradient-to-b from-[#0284c7] to-[#059669] md:hidden block pointer-events-none z-0 transition-all duration-300" style="height: 0%"></div>

          <!-- Timeline Items Flow -->
          <div class="w-full flex flex-col gap-16 relative z-10">

            <!-- Item 1: LEFT -->
            <div class="why-item relative w-full flex flex-col md:flex-row md:justify-between items-start md:items-center pl-12 md:pl-0">
              <!-- Left side: Card -->
              <div class="why-card w-full md:w-[42%] text-left md:text-right pr-0 md:pr-12 order-2 md:order-1">
                <div class="text-black font-sans font-bold text-lg mb-2">01. AI-First Strategy Approach</div>
                <p class="text-sm md:text-base text-black leading-relaxed max-w-lg md:ml-auto font-medium">
                  We embed intelligent machine-learning models at the core of business processes rather than as retrofitted add-ons.
                </p>
              </div>
              <!-- Center: Node dot -->
              <div class="why-node-container w-10 h-10 absolute left-2 md:left-1/2 md:-translate-x-1/2 flex items-center justify-center z-20 order-1 md:order-2">
                <div class="why-node-dot w-4 h-4 rounded-full bg-white border-2 border-slate-200 flex items-center justify-center transition-all duration-500">
                  <div class="w-1.5 h-1.5 rounded-full bg-[#0284c7] why-dot-core"></div>
                </div>
              </div>
              <!-- Right side: Spacer -->
              <div class="w-[42%] md:block hidden order-3"></div>
            </div>

            <!-- Item 2: RIGHT -->
            <div class="why-item relative w-full flex flex-col md:flex-row md:justify-between items-start md:items-center pl-12 md:pl-0">
              <!-- Left side: Spacer -->
              <div class="w-[42%] md:block hidden order-1"></div>
              <!-- Center: Node dot -->
              <div class="why-node-container w-10 h-10 absolute left-2 md:left-1/2 md:-translate-x-1/2 flex items-center justify-center z-20 order-2">
                <div class="why-node-dot w-4 h-4 rounded-full bg-white border-2 border-slate-200 flex items-center justify-center transition-all duration-500">
                  <div class="w-1.5 h-1.5 rounded-full bg-[#059669] why-dot-core"></div>
                </div>
              </div>
              <!-- Right side: Card -->
              <div class="why-card w-full md:w-[42%] text-left pl-0 md:pl-12 order-3">
                <div class="text-black font-sans font-bold text-lg mb-2">02. Industry-focused Technology Expertise</div>
                <p class="text-sm md:text-base text-black leading-relaxed max-w-lg font-medium">
                  Our deep vertical expertise ensures customized solutions engineered for specific market compliance and operational models.
                </p>
              </div>
            </div>

            <!-- Item 3: LEFT -->
            <div class="why-item relative w-full flex flex-col md:flex-row md:justify-between items-start md:items-center pl-12 md:pl-0">
              <!-- Left side: Card -->
              <div class="why-card w-full md:w-[42%] text-left md:text-right pr-0 md:pr-12 order-2 md:order-1">
                <div class="text-black font-sans font-bold text-lg mb-2">03. Scalable & Secure Solutions</div>
                <p class="text-sm md:text-base text-black leading-relaxed max-w-lg md:ml-auto font-medium">
                  Built on enterprise-grade server infrastructure, ensuring high performance, low latency, and comprehensive data protection.
                </p>
              </div>
              <!-- Center: Node dot -->
              <div class="why-node-container w-10 h-10 absolute left-2 md:left-1/2 md:-translate-x-1/2 flex items-center justify-center z-20 order-1 md:order-2">
                <div class="why-node-dot w-4 h-4 rounded-full bg-white border-2 border-slate-200 flex items-center justify-center transition-all duration-500">
                  <div class="w-1.5 h-1.5 rounded-full bg-[#0284c7] why-dot-core"></div>
                </div>
              </div>
              <!-- Right side: Spacer -->
              <div class="w-[42%] md:block hidden order-3"></div>
            </div>

            <!-- Item 4: RIGHT -->
            <div class="why-item relative w-full flex flex-col md:flex-row md:justify-between items-start md:items-center pl-12 md:pl-0">
              <!-- Left side: Spacer -->
              <div class="w-[42%] md:block hidden order-1"></div>
              <!-- Center: Node dot -->
              <div class="why-node-container w-10 h-10 absolute left-2 md:left-1/2 md:-translate-x-1/2 flex items-center justify-center z-20 order-2">
                <div class="why-node-dot w-4 h-4 rounded-full bg-white border-2 border-slate-200 flex items-center justify-center transition-all duration-500">
                  <div class="w-1.5 h-1.5 rounded-full bg-[#059669] why-dot-core"></div>
                </div>
              </div>
              <!-- Right side: Card -->
              <div class="why-card w-full md:w-[42%] text-left pl-0 md:pl-12 order-3">
                <div class="text-black font-sans font-bold text-lg mb-2">04. Data-driven Decision Frameworks</div>
                <p class="text-sm md:text-base text-black leading-relaxed max-w-lg font-medium">
                  We empower executive leaders with real-time predictive analytics and automated business intelligence systems.
                </p>
              </div>
            </div>

            <!-- Item 5: LEFT -->
            <div class="why-item relative w-full flex flex-col md:flex-row md:justify-between items-start md:items-center pl-12 md:pl-0">
              <!-- Left side: Card -->
              <div class="why-card w-full md:w-[42%] text-left md:text-right pr-0 md:pr-12 order-2 md:order-1">
                <div class="text-black font-sans font-bold text-lg mb-2">05. Innovation-led Consulting</div>
                <p class="text-sm md:text-base text-black leading-relaxed max-w-lg md:ml-auto font-medium">
                  Constant research into emerging AI models keeps your product roadmap ahead of the technological curve.
                </p>
              </div>
              <!-- Center: Node dot -->
              <div class="why-node-container w-10 h-10 absolute left-2 md:left-1/2 md:-translate-x-1/2 flex items-center justify-center z-20 order-1 md:order-2">
                <div class="why-node-dot w-4 h-4 rounded-full bg-white border-2 border-slate-200 flex items-center justify-center transition-all duration-500">
                  <div class="w-1.5 h-1.5 rounded-full bg-[#0284c7] why-dot-core"></div>
                </div>
              </div>
              <!-- Right side: Spacer -->
              <div class="w-[42%] md:block hidden order-3"></div>
            </div>

            <!-- Item 6: RIGHT -->
            <div class="why-item relative w-full flex flex-col md:flex-row md:justify-between items-start md:items-center pl-12 md:pl-0">
              <!-- Left side: Spacer -->
              <div class="w-[42%] md:block hidden order-1"></div>
              <!-- Center: Node dot -->
              <div class="why-node-container w-10 h-10 absolute left-2 md:left-1/2 md:-translate-x-1/2 flex items-center justify-center z-20 order-2">
                <div class="why-node-dot w-4 h-4 rounded-full bg-white border-2 border-slate-200 flex items-center justify-center transition-all duration-500">
                  <div class="w-1.5 h-1.5 rounded-full bg-[#059669] why-dot-core"></div>
                </div>
              </div>
              <!-- Right side: Card -->
              <div class="why-card w-full md:w-[42%] text-left pl-0 md:pl-12 order-3">
                <div class="text-black font-sans font-bold text-lg mb-2">06. End-to-End Digital Transformation Support</div>
                <p class="text-sm md:text-base text-black leading-relaxed max-w-lg font-medium">
                  We guide organizations seamlessly from initial feasibility research through deployment to continuous operations.
                </p>
              </div>
            </div>

            <!-- Item 7: LEFT -->
            <div class="why-item relative w-full flex flex-col md:flex-row md:justify-between items-start md:items-center pl-12 md:pl-0">
              <!-- Left side: Card -->
              <div class="why-card w-full md:w-[42%] text-left md:text-right pr-0 md:pr-12 order-2 md:order-1">
                <div class="text-black font-sans font-bold text-lg mb-2">07. Customized Enterprise Solutions</div>
                <p class="text-sm md:text-base text-black leading-relaxed max-w-lg md:ml-auto font-medium">
                  Tailored technological architectures designed to seamlessly integrate with legacy business databases and APIs.
                </p>
              </div>
              <!-- Center: Node dot -->
              <div class="why-node-container w-10 h-10 absolute left-2 md:left-1/2 md:-translate-x-1/2 flex items-center justify-center z-20 order-1 md:order-2">
                <div class="why-node-dot w-4 h-4 rounded-full bg-white border-2 border-slate-200 flex items-center justify-center transition-all duration-500">
                  <div class="w-1.5 h-1.5 rounded-full bg-[#0284c7] why-dot-core"></div>
                </div>
              </div>
              <!-- Right side: Spacer -->
              <div class="w-[42%] md:block hidden order-3"></div>
            </div>

            <!-- Item 8: RIGHT -->
            <div class="why-item relative w-full flex flex-col md:flex-row md:justify-between items-start md:items-center pl-12 md:pl-0">
              <!-- Left side: Spacer -->
              <div class="w-[42%] md:block hidden order-1"></div>
              <!-- Center: Node dot -->
              <div class="why-node-container w-10 h-10 absolute left-2 md:left-1/2 md:-translate-x-1/2 flex items-center justify-center z-20 order-2">
                <div class="why-node-dot w-4 h-4 rounded-full bg-white border-2 border-slate-200 flex items-center justify-center transition-all duration-500">
                  <div class="w-1.5 h-1.5 rounded-full bg-[#059669] why-dot-core"></div>
                </div>
              </div>
              <!-- Right side: Card -->
              <div class="why-card w-full md:w-[42%] text-left pl-0 md:pl-12 order-3">
                <div class="text-black font-sans font-bold text-lg mb-2">08. Dubai-based Global Service Capability</div>
                <p class="text-sm md:text-base text-black leading-relaxed max-w-lg font-medium">
                  Global logistics, hosting, and data collection support driven from a world-class strategic hub.
                </p>
              </div>
            </div>

            <!-- Item 9: LEFT -->
            <div class="why-item relative w-full flex flex-col md:flex-row md:justify-between items-start md:items-center pl-12 md:pl-0">
              <!-- Left side: Card -->
              <div class="why-card w-full md:w-[42%] text-left md:text-right pr-0 md:pr-12 order-2 md:order-1">
                <div class="text-black font-sans font-bold text-lg mb-2">09. Agile & Adaptive Execution Methodology</div>
                <p class="text-sm md:text-base text-black leading-relaxed max-w-lg md:ml-auto font-medium">
                  Fast prototyping and iterative MVP releases ensure rapid deployment cycle efficiency and market speed.
                </p>
              </div>
              <!-- Center: Node dot -->
              <div class="why-node-container w-10 h-10 absolute left-2 md:left-1/2 md:-translate-x-1/2 flex items-center justify-center z-20 order-1 md:order-2">
                <div class="why-node-dot w-4 h-4 rounded-full bg-white border-2 border-slate-200 flex items-center justify-center transition-all duration-500">
                  <div class="w-1.5 h-1.5 rounded-full bg-[#0284c7] why-dot-core"></div>
                </div>
              </div>
              <!-- Right side: Spacer -->
              <div class="w-[42%] md:block hidden order-3"></div>
            </div>

            <!-- Item 10: RIGHT -->
            <div class="why-item relative w-full flex flex-col md:flex-row md:justify-between items-start md:items-center pl-12 md:pl-0">
              <!-- Left side: Spacer -->
              <div class="w-[42%] md:block hidden order-1"></div>
              <!-- Center: Node dot -->
              <div class="why-node-container w-10 h-10 absolute left-2 md:left-1/2 md:-translate-x-1/2 flex items-center justify-center z-20 order-2">
                <div class="why-node-dot w-4 h-4 rounded-full bg-white border-2 border-slate-200 flex items-center justify-center transition-all duration-500">
                  <div class="w-1.5 h-1.5 rounded-full bg-[#059669] why-dot-core"></div>
                </div>
              </div>
              <!-- Right side: Card -->
              <div class="why-card w-full md:w-[42%] text-left pl-0 md:pl-12 order-3">
                <div class="text-black font-sans font-bold text-lg mb-2">10. Dedicated Post-Launch Support & Optimization</div>
                <p class="text-sm md:text-base text-black leading-relaxed max-w-lg font-medium">
                  Continuous neural model retraining and cloud database management keep performance metrics stable.
                </p>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>`;

// Replace the placeholder with the clean complete timeline section
if (html.includes(targetPlaceholder)) {
  const updatedHtml = html.replace(targetPlaceholder, cleanTimelineHtml);
  fs.writeFileSync(htmlPath, updatedHtml, 'utf8');
  console.log("Successfully injected clean timeline into index.html!");
} else {
  // Try a generic placeholder find
  const startIdx = html.indexOf('<!-- Choose us section -->');
  if (startIdx !== -1) {
    const endIdx = html.indexOf('</section>', startIdx);
    if (endIdx !== -1) {
      const updatedHtml = html.substring(0, startIdx) + cleanTimelineHtml + html.substring(endIdx + 10);
      fs.writeFileSync(htmlPath, updatedHtml, 'utf8');
      console.log("Successfully injected clean timeline via index find!");
    } else {
      console.error("Could not find section end!");
    }
  } else {
    console.error("Could not locate placeholder section!");
  }
}
