/**
 * Advanced AI Neural Network (Synaptic Net) Canvas Background.
 * Simulates a glowing neural network with active electrical impulses, magnetic cursor interactions, and deep background neural layers.
 */

export function initAISynapseCanvas(canvas) {
  const parent = canvas.parentElement;
  if (!parent) return () => {};

  const ctx = canvas.getContext('2d');
  let width = 0;
  let height = 0;
  let animId = 0;
  let running = false;
  
  // Interactive synaptic net particles
  let neurons = [];
  const neuronCount = 80;
  const linkDistance = 120;
  
  // Background slow-moving deep energy waves (brainwave ripples)
  let energyWaves = [];
  const waveCount = 4;

  // Active electrical impulse signals (synaptic data packets)
  let synapses = [];
  const maxImpulses = 15;

  const mouse = { x: -9999, y: -9999, active: false, radius: 160 };
  const smoothMouse = { x: -9999, y: -9999 };

  function initNeurons() {
    neurons = Array.from({ length: neuronCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.45,
      vy: (Math.random() - 0.5) * 0.45,
      r: 1.2 + Math.random() * 2.8,
      pulseSpeed: 0.02 + Math.random() * 0.03,
      phase: Math.random() * Math.PI * 2,
      // Magnetic properties
      originX: 0,
      originY: 0,
      magneticForce: 0.05 + Math.random() * 0.08
    }));

    // Initialize background deep brainwaves (large glowing aura elements)
    energyWaves = Array.from({ length: waveCount }, (_, idx) => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.12,
      vy: (Math.random() - 0.5) * 0.12,
      maxRadius: 180 + Math.random() * 120,
      phase: Math.random() * Math.PI * 2,
      pulseSpeed: 0.005 + Math.random() * 0.005,
      color: idx % 2 === 0 ? "0, 242, 254" : "0, 255, 135" // Cyan and Green brand accents
    }));
  }

  function resize() {
    const w = parent.clientWidth;
    const h = parent.clientHeight;
    if (!w || !h) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.floor(w * dpr);
    canvas.height = Math.floor(h * dpr);
    canvas.style.width = `${w}px`;
    canvas.style.height = `${h}px`;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    width = w;
    height = h;
    if (!neurons.length) initNeurons();
  }

  function updateMouseFromEvent(e) {
    const rect = parent.getBoundingClientRect();
    const inside =
      e.clientX >= rect.left &&
      e.clientX <= rect.right &&
      e.clientY >= rect.top &&
      e.clientY <= rect.bottom;

    if (inside) {
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
      mouse.active = true;
    } else {
      mouse.active = false;
    }
  }

  function update() {
    // Smooth mouse position tracking
    if (mouse.active) {
      if (smoothMouse.x === -9999) {
        smoothMouse.x = mouse.x;
        smoothMouse.y = mouse.y;
      } else {
        smoothMouse.x += (mouse.x - smoothMouse.x) * 0.12;
        smoothMouse.y += (mouse.y - smoothMouse.y) * 0.12;
      }
    } else {
      smoothMouse.x = -9999;
      smoothMouse.y = -9999;
    }

    // Twinkle and move active neurons
    neurons.forEach(n => {
      n.phase += n.pulseSpeed;

      // Drift physics
      n.x += n.vx;
      n.y += n.vy;

      // Soft boundaries bounce
      if (n.x <= 0 || n.x >= width) n.vx *= -1;
      if (n.y <= 0 || n.y >= height) n.vy *= -1;

      // Keep inside bounds
      n.x = Math.max(0, Math.min(width, n.x));
      n.y = Math.max(0, Math.min(height, n.y));

      // Magnetic hover attraction (simulates brain thought focus)
      if (mouse.active) {
        const dx = smoothMouse.x - n.x;
        const dy = smoothMouse.y - n.y;
        const dist = Math.hypot(dx, dy);

        if (dist < mouse.radius) {
          // Attract elements gently to the cursor
          const pull = (1 - dist / mouse.radius) * n.magneticForce;
          n.x += (dx / dist) * pull * 12;
          n.y += (dy / dist) * pull * 12;
        }
      }
    });

    // Move background deep brainwaves
    energyWaves.forEach(w => {
      w.phase += w.pulseSpeed;
      w.x += w.vx;
      w.y += w.vy;

      if (w.x <= -w.maxRadius || w.x >= width + w.maxRadius) w.vx *= -1;
      if (w.y <= -w.maxRadius || w.y >= height + w.maxRadius) w.vy *= -1;
    });

    // Generate real-time electrical synaptic pulses (data packets)
    if (synapses.length < maxImpulses && Math.random() < 0.18) {
      // Find two nearby nodes to bridge
      const p1Idx = Math.floor(Math.random() * neurons.length);
      const p1 = neurons[p1Idx];
      
      // Look for a close neighbour
      const neighbors = [];
      neurons.forEach((p2, idx) => {
        if (p1Idx === idx) return;
        const dist = Math.hypot(p1.x - p2.x, p1.y - p2.y);
        if (dist < linkDistance) {
          neighbors.push(p2);
        }
      });

      if (neighbors.length > 0) {
        const p2 = neighbors[Math.floor(Math.random() * neighbors.length)];
        
        synapses.push({
          start: p1,
          end: p2,
          progress: 0,
          speed: 0.02 + Math.random() * 0.02,
          color: Math.random() > 0.5 ? "0, 242, 254" : "0, 255, 135"
        });
      }
    }

    // Move synaptic pulses
    synapses = synapses.filter(s => {
      s.progress += s.speed;
      return s.progress < 1;
    });
  }

  function draw() {
    ctx.clearRect(0, 0, width, height);

    // 1. Render Background Energy Waves (Deep brain aura layout)
    energyWaves.forEach(w => {
      const radius = w.maxRadius * (0.8 + Math.sin(w.phase) * 0.2);
      const alpha = 0.045 * (0.6 + Math.sin(w.phase) * 0.4);

      const glow = ctx.createRadialGradient(w.x, w.y, 0, w.x, w.y, radius);
      glow.addColorStop(0, `rgba(${w.color}, ${alpha})`);
      glow.addColorStop(1, `rgba(${w.color}, 0)`);

      ctx.fillStyle = glow;
      ctx.beginPath();
      ctx.arc(w.x, w.y, radius, 0, Math.PI * 2);
      ctx.fill();
    });

    // 2. Draw Synaptic Path Connections (The neural web threads)
    for (let i = 0; i < neurons.length; i++) {
      for (let j = i + 1; j < neurons.length; j++) {
        const n1 = neurons[i];
        const n2 = neurons[j];
        const dist = Math.hypot(n1.x - n2.x, n1.y - n2.y);

        if (dist < linkDistance) {
          // Connections fade organically as distance increases
          const factor = 1 - dist / linkDistance;
          let alpha = 0.15 * factor;

          // Boost connection glowing state if mouse is nearby (active thinking sector)
          if (mouse.active) {
            const distToCursor1 = Math.hypot(n1.x - smoothMouse.x, n1.y - smoothMouse.y);
            const distToCursor2 = Math.hypot(n2.x - smoothMouse.x, n2.y - smoothMouse.y);
            if (distToCursor1 < mouse.radius || distToCursor2 < mouse.radius) {
              const boost = (1 - Math.min(distToCursor1, distToCursor2) / mouse.radius) * 0.22;
              alpha += boost;
            }
          }

          ctx.beginPath();
          ctx.moveTo(n1.x, n1.y);
          ctx.lineTo(n2.x, n2.y);
          ctx.strokeStyle = `rgba(0, 242, 254, ${alpha})`;
          ctx.lineWidth = 0.6 + factor * 0.6;
          ctx.stroke();
        }
      }
    }

    // 3. Draw Active Synaptic Impulses (Action potential electrical pulses)
    synapses.forEach(s => {
      const x = s.start.x + (s.end.x - s.start.x) * s.progress;
      const y = s.start.y + (s.end.y - s.start.y) * s.progress;

      ctx.shadowBlur = 8;
      ctx.shadowColor = `rgba(${s.color}, 1)`;
      ctx.fillStyle = "#ffffff";
      ctx.beginPath();
      ctx.arc(x, y, 2.2, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0; // Reset
    });

    // 4. Render twinking Neuron Nodes
    neurons.forEach(n => {
      const breathing = Math.sin(n.phase) * 0.35 + 0.65;
      let alpha = 0.28 + breathing * 0.32;
      let size = n.r;

      // Glow activation upon cursor hover
      if (mouse.active) {
        const dist = Math.hypot(n.x - smoothMouse.x, n.y - smoothMouse.y);
        if (dist < mouse.radius) {
          const hoverFactor = 1 - dist / mouse.radius;
          alpha += hoverFactor * 0.4;
          size += hoverFactor * 1.5;
        }
      }

      // Neuron Core Core
      ctx.beginPath();
      ctx.arc(n.x, n.y, size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(0, 242, 254, ${alpha})`;
      ctx.fill();

      // Soft halo for larger nodes
      if (n.r > 2.0) {
        ctx.beginPath();
        ctx.arc(n.x, n.y, size * 2.2, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 255, 135, ${alpha * 0.16})`; // Green secondary brand accent halo
        ctx.fill();
      }
    });

    // 5. Draw Cursor Magnetic Core (Thought Center)
    if (mouse.active) {
      const pulse = Math.sin(Date.now() * 0.004) * 0.15 + 0.85;
      const innerRadius = 25 * pulse;

      // Gravitational warp core graphics
      const warpGlow = ctx.createRadialGradient(
        smoothMouse.x,
        smoothMouse.y,
        0,
        smoothMouse.x,
        smoothMouse.y,
        innerRadius * 2
      );
      warpGlow.addColorStop(0, "rgba(0, 242, 254, 0.18)");
      warpGlow.addColorStop(1, "rgba(0, 242, 254, 0)");

      ctx.fillStyle = warpGlow;
      ctx.beginPath();
      ctx.arc(smoothMouse.x, smoothMouse.y, innerRadius * 2, 0, Math.PI * 2);
      ctx.fill();

      // Core electric micro-dots linking
      neurons.forEach(n => {
        const dist = Math.hypot(n.x - smoothMouse.x, n.y - smoothMouse.y);
        if (dist < 45) {
          ctx.beginPath();
          ctx.moveTo(smoothMouse.x, smoothMouse.y);
          ctx.lineTo(n.x, n.y);
          ctx.strokeStyle = `rgba(0, 255, 135, ${(1 - dist / 45) * 0.35})`;
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }
      });
    }
  }

  function loop() {
    if (!running) return;
    update();
    draw();
    animId = requestAnimationFrame(loop);
  }

  const observer = new IntersectionObserver(
    ([entry]) => {
      running = entry.isIntersecting;
      if (running) {
        resize();
        loop();
      } else {
        cancelAnimationFrame(animId);
        mouse.active = false;
      }
    },
    { threshold: 0.05 }
  );

  observer.observe(parent);
  resize();

  const onResize = () => resize();
  const onPointerMove = e => updateMouseFromEvent(e);

  window.addEventListener('resize', onResize);
  document.addEventListener('pointermove', onPointerMove, { passive: true });

  return () => {
    running = false;
    cancelAnimationFrame(animId);
    observer.disconnect();
    window.removeEventListener('resize', onResize);
    document.removeEventListener('pointermove', onPointerMove);
  };
}
