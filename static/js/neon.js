/* neon.js — Intro animation + 3D star field for NetZero */
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

  var ipts = [];
  for (var i = 0; i < 80; i++) {
    ipts.push({
      x:  Math.random(), y: Math.random(),
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
    var eased = raw < 0.5 ? 2*raw*raw : 1 - Math.pow(-2*raw+2, 2)/2;

    ictx.clearRect(0, 0, W, H);

    for (var i = 0; i < ipts.length; i++) {
      var p = ipts[i];
      p.ph += 0.016; p.x = ((p.x+p.vx)+1)%1; p.y = ((p.y+p.vy)+1)%1;
      var alpha = p.a * (0.5 + 0.5*Math.sin(p.ph));
      ictx.beginPath(); ictx.arc(p.x*W, p.y*H, p.r, 0, Math.PI*2);
      ictx.fillStyle = 'rgba(0,255,140,'+alpha+')';
      ictx.shadowColor = '#00ff8c'; ictx.shadowBlur = 5; ictx.fill();
    }

    var cx = W*0.5, cy = H*0.68, R = Math.min(W,H)*0.36;
    var sa = Math.PI, ea = Math.PI + eased*Math.PI;

    ictx.save(); ictx.beginPath(); ictx.arc(cx,cy,R*1.2,sa,ea);
    ictx.strokeStyle='rgba(0,255,140,'+(0.06*eased)+')';
    ictx.lineWidth=30; ictx.shadowBlur=0; ictx.stroke(); ictx.restore();

    ictx.save(); ictx.beginPath(); ictx.arc(cx,cy,R,sa,ea);
    var g=ictx.createLinearGradient(cx-R,cy,cx+R,cy);
    g.addColorStop(0,'rgba(0,255,140,0.05)'); g.addColorStop(0.4,'rgba(0,255,140,0.9)'); g.addColorStop(1,'rgba(170,255,106,0.95)');
    ictx.strokeStyle=g; ictx.lineWidth=2.5; ictx.shadowColor='#00ff8c'; ictx.shadowBlur=22; ictx.stroke(); ictx.restore();

    ictx.save(); ictx.beginPath(); ictx.arc(cx,cy,R*0.76,sa,ea);
    ictx.strokeStyle='rgba(0,255,140,'+(0.22*eased)+')'; ictx.lineWidth=1; ictx.setLineDash([5,9]);
    ictx.shadowColor='#00ff8c'; ictx.shadowBlur=6; ictx.stroke(); ictx.setLineDash([]); ictx.restore();

    if (eased > 0.04) {
      for (var t=1; t<=7; t++) {
        var ta=ea-t*0.035;
        ictx.save(); ictx.beginPath();
        ictx.arc(cx+R*Math.cos(ta), cy+R*Math.sin(ta), Math.max(0.5,3.5-t*0.4), 0, Math.PI*2);
        ictx.fillStyle='rgba(0,255,140,'+(0.65-t*0.08)+')';
        ictx.shadowBlur=10; ictx.shadowColor='#00ff8c'; ictx.fill(); ictx.restore();
      }
      ictx.save(); ictx.beginPath(); ictx.arc(cx+R*Math.cos(ea), cy+R*Math.sin(ea), 4.5, 0, Math.PI*2);
      ictx.fillStyle='#00ff8c'; ictx.shadowColor='#00ff8c'; ictx.shadowBlur=28; ictx.fill(); ictx.restore();
    }

    var rg=ictx.createRadialGradient(cx,cy,0,cx,cy,R*0.9);
    rg.addColorStop(0,'rgba(0,255,140,'+(0.04*eased)+')'); rg.addColorStop(1,'transparent');
    ictx.fillStyle=rg; ictx.fillRect(0,0,W,H);

    if (barFill) barFill.style.width = (raw*100)+'%';
    if (!exited) rafId = requestAnimationFrame(frame);
  }
  rafId = requestAnimationFrame(frame);

  function exit() {
    if (exited) return; exited = true;
    cancelAnimationFrame(rafId);
    screen.classList.add('out');
    setTimeout(function(){ screen.style.display='none'; }, 950);
  }
  setTimeout(exit, TOTAL+300);
  document.addEventListener('keydown', exit, {once:true});
  screen.addEventListener('click', exit);
})();


// ════════════════════════════════════════════
// 3D STAR FIELD  — cursor-reactive
// Stars exist in 3D space (x,y,z)
// Mouse tilt rotates the whole field
// Cursor proximity makes stars shine bright
// ════════════════════════════════════════════
(function () {
  var canvas = document.getElementById('neon-canvas');
  if (!canvas) return;
  var ctx = canvas.getContext('2d');

  var W, H, cx, cy;
  var mouse = { x: 0, y: 0, px: 0, py: 0 };   // current & previous
  var tilt  = { x: 0, y: 0 };                  // smooth tilt offset
  var TILT_MAX = 60;                            // max pixel shift at edge

  function resize() {
    W = canvas.width  = window.innerWidth;
    H = canvas.height = window.innerHeight;
    cx = W / 2; cy = H / 2;
  }
  resize();
  window.addEventListener('resize', resize);

  window.addEventListener('mousemove', function(e) {
    mouse.px = mouse.x; mouse.py = mouse.y;
    mouse.x  = e.clientX; mouse.y = e.clientY;
  });

  // ── Build star field ────────────────────────────────
  var STAR_COUNT = 260;
  var DEPTH      = 800;   // z range 0..DEPTH
  var stars      = [];

  function mkStar() {
    var size = Math.random();           // 0=tiny dim, 1=big bright
    return {
      x: (Math.random() - 0.5) * 2400, // 3D x
      y: (Math.random() - 0.5) * 1600, // 3D y
      z: Math.random() * DEPTH,        // 3D z (depth)
      baseR: 0.4 + size * 2.2,         // base radius
      baseA: 0.15 + size * 0.6,        // base alpha
      twinkle: Math.random() * Math.PI * 2,
      twinkleSpeed: 0.012 + Math.random() * 0.025,
      color: mkColor(size),            // neon green hue
      shine: 0,                        // cursor proximity glow 0..1
      // trail for movement
      trailX: 0, trailY: 0
    };
  }

  function mkColor(size) {
    // Brighter stars lean lime, dimmer lean teal
    var h = 140 + size * 20;   // 140=green 160=teal-green
    var s = 80 + size * 20;
    var l = 50 + size * 30;
    return 'hsl('+h+','+s+'%,'+l+'%)';
  }

  for (var i = 0; i < STAR_COUNT; i++) stars.push(mkStar());

  // ── Project 3D → 2D ─────────────────────────────────
  function project(star, ox, oy) {
    // ox,oy = tilt offset applied to scene origin
    var fov   = 600;
    var scale = fov / (fov + star.z);
    var sx    = star.x * scale + cx + ox * (star.z / DEPTH);
    var sy    = star.y * scale + cy + oy * (star.z / DEPTH);
    return { sx: sx, sy: sy, scale: scale };
  }

  // ── Draw a star ──────────────────────────────────────
  function drawStar(star, sx, sy, scale) {
    var tw  = 0.6 + 0.4 * Math.sin(star.twinkle);
    var r   = star.baseR * scale * tw + star.shine * 3.5;
    var a   = Math.min(1, star.baseA * tw + star.shine * 0.9);

    // glow halo when shining
    if (star.shine > 0.05) {
      var glow = ctx.createRadialGradient(sx, sy, 0, sx, sy, r * 6);
      glow.addColorStop(0, 'rgba(0,255,140,' + (star.shine * 0.35) + ')');
      glow.addColorStop(1, 'transparent');
      ctx.fillStyle = glow;
      ctx.beginPath(); ctx.arc(sx, sy, r * 6, 0, Math.PI*2); ctx.fill();
    }

    // 4-spike sparkle for bright stars
    if (r > 1.6) {
      var len = r * (2.5 + star.shine * 5);
      ctx.save();
      ctx.strokeStyle = 'rgba(0,255,140,' + (a * 0.6) + ')';
      ctx.lineWidth   = 0.6;
      ctx.shadowColor = '#00ff8c';
      ctx.shadowBlur  = 4 + star.shine * 10;
      for (var s = 0; s < 4; s++) {
        var ang = (s / 4) * Math.PI * 2;
        ctx.beginPath();
        ctx.moveTo(sx, sy);
        ctx.lineTo(sx + Math.cos(ang)*len, sy + Math.sin(ang)*len);
        ctx.stroke();
      }
      ctx.restore();
    }

    // core dot
    ctx.beginPath(); ctx.arc(sx, sy, Math.max(0.3, r), 0, Math.PI*2);
    ctx.fillStyle = star.color.replace(')', ', ' + a + ')').replace('hsl', 'hsla');
    ctx.shadowColor = '#00ff8c';
    ctx.shadowBlur  = 3 + star.shine * 14;
    ctx.fill();
  }

  // ── Main loop ────────────────────────────────────────
  var prevTime = 0;

  function animate(ts) {
    var dt = Math.min((ts - prevTime) / 16.67, 3); // delta frames, capped
    prevTime = ts;

    ctx.clearRect(0, 0, W, H);

    // Smooth tilt towards mouse position
    var targetTX = ((mouse.x / W) - 0.5) * TILT_MAX * 2;
    var targetTY = ((mouse.y / H) - 0.5) * TILT_MAX * 2;
    tilt.x += (targetTX - tilt.x) * 0.04;
    tilt.y += (targetTY - tilt.y) * 0.04;

    // Mouse speed for shimmer trail
    var mspeed = Math.sqrt(
      (mouse.x-mouse.px)*(mouse.x-mouse.px) +
      (mouse.y-mouse.py)*(mouse.y-mouse.py)
    );

    for (var i = 0; i < stars.length; i++) {
      var star = stars[i];
      star.twinkle += star.twinkleSpeed * dt;

      // Slow drift through Z (parallax depth feel)
      star.z -= 0.18 * dt;
      if (star.z <= 0) {
        star.z = DEPTH;
        star.x = (Math.random() - 0.5) * 2400;
        star.y = (Math.random() - 0.5) * 1600;
      }

      var proj = project(star, tilt.x, tilt.y);
      var sx = proj.sx, sy = proj.sy;

      // Skip if off-screen
      if (sx < -80 || sx > W+80 || sy < -80 || sy > H+80) continue;

      // Cursor proximity shine
      var dx   = sx - mouse.x;
      var dy   = sy - mouse.y;
      var dist = Math.sqrt(dx*dx + dy*dy);
      var proximity = Math.max(0, 1 - dist / 180);
      var speedBoost = Math.min(1, mspeed / 30);

      // Shine: direct proximity + motion spray
      var targetShine = proximity * 0.95 + speedBoost * proximity * 0.5;
      star.shine += (targetShine - star.shine) * 0.12;

      drawStar(star, sx, sy, proj.scale);
    }

    requestAnimationFrame(animate);
  }

  requestAnimationFrame(animate);
})();
