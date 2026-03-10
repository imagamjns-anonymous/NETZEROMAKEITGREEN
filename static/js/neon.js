/* neon.js — Intro animation + background particles for NetZero */
'use strict';

// ════════════════════════════════════════════
// INTRO SCREEN ANIMATION
// ════════════════════════════════════════════
(function () {
  var screen  = document.getElementById('intro-screen');
  var icanvas = document.getElementById('intro-canvas');
  var barFill = document.getElementById('intro-bar-fill');
  if (!screen || !icanvas) return;

  var ictx = icanvas.getContext('2d');
  var W = 0, H = 0, exited = false;
  var TOTAL = 3400;
  var t0 = performance.now();

  function resize() {
    W = icanvas.width  = window.innerWidth;
    H = icanvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  // background particles for intro
  var ipts = [];
  for (var i = 0; i < 80; i++) {
    ipts.push({
      x:  Math.random(),
      y:  Math.random(),
      vx: (Math.random() - 0.5) * 0.0003,
      vy: (Math.random() - 0.5) * 0.0003,
      r:  Math.random() * 1.2 + 0.3,
      a:  Math.random() * 0.4 + 0.1,
      ph: Math.random() * Math.PI * 2
    });
  }

  var rafId;

  function frame(ts) {
    var elapsed = ts - t0;
    var raw = Math.min(elapsed / TOTAL, 1);
    // ease-in-out
    var eased = raw < 0.5
      ? 2 * raw * raw
      : 1 - Math.pow(-2 * raw + 2, 2) / 2;

    ictx.clearRect(0, 0, W, H);

    // floating particles
    for (var i = 0; i < ipts.length; i++) {
      var p = ipts[i];
      p.ph += 0.016;
      p.x = ((p.x + p.vx) + 1) % 1;
      p.y = ((p.y + p.vy) + 1) % 1;
      var alpha = p.a * (0.5 + 0.5 * Math.sin(p.ph));
      ictx.beginPath();
      ictx.arc(p.x * W, p.y * H, p.r, 0, Math.PI * 2);
      ictx.fillStyle = 'rgba(0,255,140,' + alpha + ')';
      ictx.shadowColor = '#00ff8c';
      ictx.shadowBlur = 5;
      ictx.fill();
    }

    // arc geometry
    var cx = W * 0.5;
    var cy = H * 0.68;
    var R  = Math.min(W, H) * 0.36;
    var sa = Math.PI;
    var ea = Math.PI + eased * Math.PI;

    // outer halo
    ictx.save();
    ictx.beginPath();
    ictx.arc(cx, cy, R * 1.2, sa, ea);
    ictx.strokeStyle = 'rgba(0,255,140,' + (0.06 * eased) + ')';
    ictx.lineWidth = 30;
    ictx.shadowBlur = 0;
    ictx.stroke();
    ictx.restore();

    // main glowing arc
    ictx.save();
    ictx.beginPath();
    ictx.arc(cx, cy, R, sa, ea);
    var g = ictx.createLinearGradient(cx - R, cy, cx + R, cy);
    g.addColorStop(0,   'rgba(0,255,140,0.05)');
    g.addColorStop(0.4, 'rgba(0,255,140,0.9)');
    g.addColorStop(1,   'rgba(170,255,106,0.95)');
    ictx.strokeStyle = g;
    ictx.lineWidth = 2.5;
    ictx.shadowColor = '#00ff8c';
    ictx.shadowBlur = 22;
    ictx.stroke();
    ictx.restore();

    // dashed inner arc
    ictx.save();
    ictx.beginPath();
    ictx.arc(cx, cy, R * 0.76, sa, ea);
    ictx.strokeStyle = 'rgba(0,255,140,' + (0.22 * eased) + ')';
    ictx.lineWidth = 1;
    ictx.setLineDash([5, 9]);
    ictx.shadowColor = '#00ff8c';
    ictx.shadowBlur = 6;
    ictx.stroke();
    ictx.setLineDash([]);
    ictx.restore();

    // comet tip + trail
    if (eased > 0.04) {
      for (var t = 1; t <= 7; t++) {
        var ta = ea - t * 0.035;
        ictx.save();
        ictx.beginPath();
        ictx.arc(cx + R * Math.cos(ta), cy + R * Math.sin(ta), Math.max(0.5, 3.5 - t * 0.4), 0, Math.PI * 2);
        ictx.fillStyle = 'rgba(0,255,140,' + (0.65 - t * 0.08) + ')';
        ictx.shadowBlur = 10;
        ictx.shadowColor = '#00ff8c';
        ictx.fill();
        ictx.restore();
      }
      // bright tip dot
      ictx.save();
      ictx.beginPath();
      ictx.arc(cx + R * Math.cos(ea), cy + R * Math.sin(ea), 4.5, 0, Math.PI * 2);
      ictx.fillStyle = '#00ff8c';
      ictx.shadowColor = '#00ff8c';
      ictx.shadowBlur = 28;
      ictx.fill();
      ictx.restore();
    }

    // radial floor glow
    var rg = ictx.createRadialGradient(cx, cy, 0, cx, cy, R * 0.9);
    rg.addColorStop(0, 'rgba(0,255,140,' + (0.04 * eased) + ')');
    rg.addColorStop(1, 'transparent');
    ictx.fillStyle = rg;
    ictx.fillRect(0, 0, W, H);

    // progress bar
    if (barFill) barFill.style.width = (raw * 100) + '%';

    if (!exited) rafId = requestAnimationFrame(frame);
  }

  rafId = requestAnimationFrame(frame);

  function exit() {
    if (exited) return;
    exited = true;
    cancelAnimationFrame(rafId);
    screen.classList.add('out');
    setTimeout(function () { screen.style.display = 'none'; }, 950);
  }

  // auto-exit after animation completes
  setTimeout(exit, TOTAL + 300);
  // skip on click or keypress
  document.addEventListener('keydown', exit, { once: true });
  screen.addEventListener('click', exit);
})();


// ════════════════════════════════════════════
// BACKGROUND PARTICLE NETWORK
// ════════════════════════════════════════════
(function () {
  var canvas = document.getElementById('neon-canvas');
  if (!canvas) return;
  var ctx = canvas.getContext('2d');
  var W = 0, H = 0;
  var mouse = { x: -999, y: -999 };

  function resize() {
    W = canvas.width  = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize);
  window.addEventListener('mousemove', function (e) {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });

  var particles = [];
  for (var i = 0; i < 110; i++) {
    particles.push({
      x:  Math.random(),
      y:  Math.random(),
      vx: (Math.random() - 0.5) * 0.00032,
      vy: (Math.random() - 0.5) * 0.00032,
      r:  Math.random() * 1.4 + 0.3,
      a:  Math.random() * 0.5 + 0.1,
      ph: Math.random() * Math.PI * 2
    });
  }

  function animate() {
    ctx.clearRect(0, 0, W, H);

    // draw connections
    for (var i = 0; i < particles.length; i++) {
      for (var j = i + 1; j < particles.length; j++) {
        var ax = particles[i].x * W, ay = particles[i].y * H;
        var bx = particles[j].x * W, by = particles[j].y * H;
        var d  = Math.sqrt((ax - bx) * (ax - bx) + (ay - by) * (ay - by));
        if (d < 100) {
          ctx.beginPath();
          ctx.moveTo(ax, ay);
          ctx.lineTo(bx, by);
          ctx.strokeStyle = 'rgba(0,255,140,' + ((1 - d / 100) * 0.11) + ')';
          ctx.lineWidth = 0.6;
          ctx.shadowBlur = 0;
          ctx.stroke();
        }
      }
    }

    // draw particles
    for (var i = 0; i < particles.length; i++) {
      var p = particles[i];
      p.ph += 0.018;
      p.x = ((p.x + p.vx) + 1) % 1;
      p.y = ((p.y + p.vy) + 1) % 1;

      var px = p.x * W, py = p.y * H;
      var dx = px - mouse.x, dy = py - mouse.y;
      var dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 130 && dist > 0) {
        var f = (130 - dist) / 130;
        p.x += (dx / dist) * f * 0.0018;
        p.y += (dy / dist) * f * 0.0018;
      }

      var alpha = p.a * (0.55 + 0.45 * Math.sin(p.ph));
      ctx.beginPath();
      ctx.arc(px, py, p.r, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(0,255,140,' + alpha + ')';
      ctx.shadowColor = '#00ff8c';
      ctx.shadowBlur = 6;
      ctx.fill();
    }

    requestAnimationFrame(animate);
  }

  animate();
})();
