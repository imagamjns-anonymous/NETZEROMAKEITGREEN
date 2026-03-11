'use strict';

// ── Brand logos — inline SVG, zero CDN dependency ─────────────────
const BRAND_LOGOS = {

  'toyota': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 192 192"><ellipse cx="96" cy="96" rx="90" ry="90" fill="none" stroke="#eb0a1e" stroke-width="11"/><ellipse cx="96" cy="96" rx="56" ry="36" fill="none" stroke="#eb0a1e" stroke-width="11"/><ellipse cx="96" cy="96" rx="19" ry="90" fill="none" stroke="#eb0a1e" stroke-width="11"/></svg>`,

  'hyundai': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 192 96"><text x="96" y="80" font-family="Arial" font-weight="900" font-size="90" fill="#002c5f" text-anchor="middle" font-style="italic">H</text></svg>`,

  'honda': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 192 192"><rect width="192" height="192" rx="8" fill="#cc0000"/><text x="96" y="142" font-family="Arial" font-weight="900" font-size="130" fill="white" text-anchor="middle">H</text></svg>`,

  'volkswagen': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 192 192"><circle cx="96" cy="96" r="90" fill="#001e50"/><text x="96" y="130" font-family="Arial" font-weight="900" font-size="100" fill="white" text-anchor="middle">VW</text></svg>`,

  'vw': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 192 192"><circle cx="96" cy="96" r="90" fill="#001e50"/><text x="96" y="130" font-family="Arial" font-weight="900" font-size="100" fill="white" text-anchor="middle">VW</text></svg>`,

  'tesla': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 192 192"><path d="M96 20 C60 20 30 40 20 60 L40 60 C48 46 65 38 96 38 C127 38 144 46 152 60 L172 60 C162 40 132 20 96 20Z" fill="#cc0000"/><path d="M96 38 L76 60 L96 170 L116 60 Z" fill="#cc0000"/><path d="M76 60 L96 80 L116 60 Z" fill="#cc0000"/></svg>`,

  'bmw': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 192 192"><circle cx="96" cy="96" r="90" fill="white" stroke="#000" stroke-width="8"/><path d="M96 6 A90 90 0 0 1 186 96 L96 96 Z" fill="#0066cc"/><path d="M6 96 A90 90 0 0 1 96 6 L96 96 Z" fill="white"/><path d="M96 186 A90 90 0 0 1 6 96 L96 96 Z" fill="#0066cc"/><path d="M186 96 A90 90 0 0 1 96 186 L96 96 Z" fill="white"/><circle cx="96" cy="96" r="30" fill="none" stroke="#000" stroke-width="8"/><text x="96" y="40" font-family="Arial" font-weight="900" font-size="22" fill="#000" text-anchor="middle">BMW</text></svg>`,

  'mercedes': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 192 192"><circle cx="96" cy="96" r="90" fill="white" stroke="#888" stroke-width="5"/><circle cx="96" cy="96" r="60" fill="none" stroke="#888" stroke-width="5"/><line x1="96" y1="36" x2="96" y2="96" stroke="#888" stroke-width="5"/><line x1="96" y1="96" x2="44" y2="145" stroke="#888" stroke-width="5"/><line x1="96" y1="96" x2="148" y2="145" stroke="#888" stroke-width="5"/></svg>`,

  'kia': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 100"><rect width="300" height="100" rx="8" fill="#05141f"/><text x="150" y="75" font-family="Arial" font-weight="900" font-size="72" fill="white" text-anchor="middle" letter-spacing="8">KIA</text></svg>`,

  'nissan': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 100"><rect width="300" height="100" rx="8" fill="#c01a24"/><text x="150" y="72" font-family="Arial" font-weight="900" font-size="52" fill="white" text-anchor="middle" letter-spacing="4">NISSAN</text></svg>`,

  'ford': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 130"><ellipse cx="150" cy="65" rx="145" ry="60" fill="#003478"/><text x="150" y="90" font-family="Georgia" font-weight="bold" font-size="72" fill="white" text-anchor="middle" font-style="italic">Ford</text></svg>`,

  'tata': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 100"><rect width="300" height="100" rx="8" fill="#0071ce"/><text x="150" y="72" font-family="Arial" font-weight="900" font-size="62" fill="white" text-anchor="middle" letter-spacing="6">TATA</text></svg>`,

  'mahindra': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 100"><rect width="300" height="100" rx="8" fill="#e31837"/><text x="150" y="68" font-family="Arial" font-weight="900" font-size="42" fill="white" text-anchor="middle" letter-spacing="2">MAHINDRA</text></svg>`,

  'mg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 192 192"><circle cx="96" cy="96" r="90" fill="#c8102e"/><text x="96" y="128" font-family="Arial" font-weight="900" font-size="88" fill="white" text-anchor="middle">MG</text></svg>`,

  'jeep': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 100"><rect width="300" height="100" rx="8" fill="#1a1a1a"/><text x="150" y="72" font-family="Arial" font-weight="900" font-size="62" fill="white" text-anchor="middle" letter-spacing="6">JEEP</text></svg>`,

  'range rover': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 100"><rect width="300" height="100" rx="8" fill="#005a2b"/><text x="150" y="58" font-family="Arial" font-weight="700" font-size="28" fill="white" text-anchor="middle" letter-spacing="3">RANGE ROVER</text></svg>`,

  'land rover': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 100"><rect width="300" height="100" rx="8" fill="#005a2b"/><text x="150" y="58" font-family="Arial" font-weight="700" font-size="28" fill="white" text-anchor="middle" letter-spacing="3">LAND ROVER</text></svg>`,

  'suzuki': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 100"><rect width="300" height="100" rx="8" fill="#e4000f"/><text x="150" y="72" font-family="Arial" font-weight="900" font-size="52" fill="white" text-anchor="middle" letter-spacing="4">SUZUKI</text></svg>`,

  'maruti': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 100"><rect width="300" height="100" rx="8" fill="#e4000f"/><text x="150" y="72" font-family="Arial" font-weight="900" font-size="52" fill="white" text-anchor="middle" letter-spacing="4">SUZUKI</text></svg>`,

  'yamaha': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 192 192"><circle cx="96" cy="96" r="90" fill="#0a1464"/><circle cx="96" cy="96" r="60" fill="none" stroke="white" stroke-width="6"/><line x1="96" y1="36" x2="96" y2="156" stroke="white" stroke-width="6"/><line x1="44" y1="126" x2="148" y2="66" stroke="white" stroke-width="6"/><line x1="44" y1="66" x2="148" y2="126" stroke="white" stroke-width="6"/></svg>`,

  'ktm': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 100"><rect width="300" height="100" rx="8" fill="#ff6600"/><text x="150" y="78" font-family="Arial" font-weight="900" font-size="72" fill="white" text-anchor="middle" letter-spacing="6">KTM</text></svg>`,

  'bajaj': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 100"><rect width="300" height="100" rx="8" fill="#003087"/><text x="150" y="72" font-family="Arial" font-weight="900" font-size="52" fill="white" text-anchor="middle" letter-spacing="4">BAJAJ</text></svg>`,

  'royal enfield': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 100"><rect width="300" height="100" rx="8" fill="#2d0000"/><text x="150" y="48" font-family="Georgia" font-weight="700" font-size="22" fill="#c8a850" text-anchor="middle" letter-spacing="3">ROYAL ENFIELD</text><line x1="30" y1="58" x2="270" y2="58" stroke="#c8a850" stroke-width="1.5"/><text x="150" y="80" font-family="Georgia" font-weight="700" font-size="18" fill="#c8a850" text-anchor="middle" letter-spacing="4">EST. 1901</text></svg>`,

  'harley': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 120"><rect width="300" height="120" rx="8" fill="#ff6600"/><text x="150" y="50" font-family="Arial" font-weight="900" font-size="20" fill="white" text-anchor="middle" letter-spacing="3">HARLEY-DAVIDSON</text><text x="150" y="95" font-family="Arial" font-weight="900" font-size="36" fill="white" text-anchor="middle" letter-spacing="2">MOTOR CO.</text></svg>`,
};

function getBrandLogo(name) {
  const lower = name.toLowerCase();
  const sorted = Object.keys(BRAND_LOGOS).sort((a, b) => b.length - a.length);
  for (const brand of sorted) {
    if (lower.includes(brand)) return BRAND_LOGOS[brand];
  }
  return null;
}


// ── Page Navigation ──────────────────────────────────────────────
function goPage(page) {
  document.querySelectorAll('.page').forEach(p => p.style.display = 'none');
  document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
  const target = document.getElementById('page-' + page);
  if (target) target.style.display = 'block';
  const btn = document.querySelector(`.nav-btn[data-page="${page}"]`);
  if (btn) btn.classList.add('active');
  window.scrollTo(0, 0);
}

document.querySelectorAll('.nav-btn').forEach(btn => {
  btn.addEventListener('click', () => goPage(btn.dataset.page));
});

// Show home page on load
goPage('home');


// ── State ────────────────────────────────────────────────────────
const state = {
  vehicles:      {},
  selectedId:    null,
  selectedIdA:   null,
  selectedIdB:   null,
  emMode:        'tailpipe',
  appMode:       'single',
  typeFilter:    'All',
  freq:          'daily',
  freqC:         'daily',
};

// ── Emission mode info ───────────────────────────────────────────
const EM_INFO = {
  tailpipe:   '<strong>🏭 Tailpipe:</strong> Only the CO₂ released directly from your exhaust while driving. For EVs this is zero — but it ignores how electricity or fuel is produced upstream.',
  lca:        '<strong>🔄 LCA (Life Cycle Assessment):</strong> The complete picture — CO₂ from manufacturing the vehicle, producing fuel/electricity, all driving over its lifetime, and final disposal. This is the most accurate real-world measure.',
  disposable: '<strong>♻️ Disposable / End-of-Life:</strong> Emissions specifically from scrapping, shredding metals, and recycling components (especially lithium-ion battery packs). EVs score higher here due to battery complexity.',
};

const TIPS = {
  Petrol:     ['🚗 Carpooling cuts your per-trip footprint in half instantly.','⚡ Switching to an EV eliminates tailpipe emissions entirely.','🔧 Keeping tyre pressure correct improves fuel efficiency by up to 3%.'],
  Diesel:     ['🌿 Diesel hybrids offer a practical middle ground for long trips.','🛣️ Smooth acceleration and braking cuts fuel consumption significantly.','🚌 For city commutes, public transit can be 5× more efficient per passenger.'],
  Electric:   ['🌞 Charging from solar or renewables makes your LCA emissions near-zero.','⚡ Zero tailpipe emissions — great for urban air quality.','♻️ Ask your manufacturer about battery take-back and recycling programmes.'],
  Hybrid:     ['🏙️ Hybrids shine in stop-and-go city traffic — you\'re making a smart choice.','🔋 Plug-in hybrids can run purely on electric for typical daily commutes.','🌱 Your LCA emissions are already well below the average petrol car.'],
  Motorcycle: ['🚲 For very short trips, a bicycle produces zero emissions.','🔌 Electric motorcycles are now affordable and practical for city use.','🏍️ Motorcycles are lighter — but check your model\'s real-world emissions data.'],
  SUV:        ['🚙 Large SUVs are among the highest emitters across all three measures.','⚡ Electric SUVs like Tesla Model Y or Hyundai Ioniq 6 are now widely available.','🗓️ Combining errands into fewer trips significantly reduces annual emissions.'],
  Public:     ['🚌 Excellent choice — public transit emits far less per passenger than any car.','🚶 Walking the last mile keeps your footprint at its absolute minimum.','📱 Transit apps help you plan efficient routes with minimal waiting.'],
};

// ── Init ─────────────────────────────────────────────────────────
async function init() {
  updateEmInfo();
  setupEmButtons();
  setupModeTabs();
  setupFreqButtons('freqGroup', (v) => { state.freq = v; });
  setupFreqButtons('freqGroupC', (v) => { state.freqC = v; });
  syncSlider('distance', 'distSlider');
  syncSlider('distanceC', 'distSliderC');
  document.getElementById('calcBtn').addEventListener('click', doCalculate);
  document.getElementById('compareBtn').addEventListener('click', doCompare);

  await loadVehicles();
}

// ── Load vehicles from API ───────────────────────────────────────
async function loadVehicles() {
  try {
    const res = await fetch('/api/vehicles');
    state.vehicles = await res.json();
    buildTypeChips();
    setupSearch('vehicleSearch', 'vehicleList', 'vSelected', (id) => { state.selectedId = id; });
    setupSearch('searchA', 'listA', 'selA', (id) => { state.selectedIdA = id; });
    setupSearch('searchB', 'listB', 'selB', (id) => { state.selectedIdB = id; });
  } catch(e) {
    console.error('Failed to load vehicles:', e);
  }
}

// ── Emission mode buttons ────────────────────────────────────────
function setupEmButtons() {
  document.querySelectorAll('.em-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.em-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      state.emMode = btn.dataset.mode;
      updateEmInfo();
    });
  });
}

function updateEmInfo() {
  document.getElementById('emInfoBox').innerHTML = EM_INFO[state.emMode] || '';
}

// ── Mode tabs ────────────────────────────────────────────────────
function setupModeTabs() {
  document.querySelectorAll('.mode-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('.mode-tab').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      state.appMode = tab.dataset.mode;
      document.getElementById('singleMode').style.display  = state.appMode === 'single'  ? 'block' : 'none';
      document.getElementById('compareMode').style.display = state.appMode === 'compare' ? 'block' : 'none';
      document.getElementById('historyMode').style.display = state.appMode === 'history' ? 'block' : 'none';
      document.getElementById('resultsCard').style.display        = 'none';
      document.getElementById('compareResultsCard').style.display = 'none';
      if (state.appMode === 'history') loadHistory();
    });
  });
}

// ── Frequency buttons ────────────────────────────────────────────
function setupFreqButtons(groupId, onChange) {
  document.querySelectorAll(`#${groupId} .pill`).forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll(`#${groupId} .pill`).forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      onChange(btn.dataset.val);
    });
  });
}

// ── Slider <-> input sync ────────────────────────────────────────
function syncSlider(inputId, sliderId) {
  const inp = document.getElementById(inputId);
  const sld = document.getElementById(sliderId);
  sld.addEventListener('input', () => { inp.value = sld.value; });
  inp.addEventListener('input', () => { sld.value = Math.min(Math.max(+inp.value, 1), 500); });
}

// ── Type filter chips ────────────────────────────────────────────
function buildTypeChips() {
  const container = document.getElementById('typeChips');
  const types = ['All', ...new Set(Object.values(state.vehicles).map(v => v.type))];
  container.innerHTML = types.map(t =>
    `<button class="chip${t==='All'?' active':''}" data-type="${t}">${t}</button>`
  ).join('');
  container.querySelectorAll('.chip').forEach(chip => {
    chip.addEventListener('click', () => {
      container.querySelectorAll('.chip').forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      state.typeFilter = chip.dataset.type;
      renderList('vehicleList', document.getElementById('vehicleSearch').value);
    });
  });
}

// ── Vehicle search setup ─────────────────────────────────────────
function setupSearch(inputId, listId, selectedId, onSelect) {
  const inp  = document.getElementById(inputId);
  const list = document.getElementById(listId);

  list._onSelect = (id) => {
    onSelect(id);
    showSelected(selectedId, listId, inputId, id);
  };

  inp.addEventListener('focus', () => renderList(listId, inp.value));
  inp.addEventListener('input', () => renderList(listId, inp.value));
  document.addEventListener('click', (e) => {
    if (!inp.contains(e.target) && !list.contains(e.target)) list.classList.remove('open');
  });
}

function renderList(listId, query = '') {
  const list = document.getElementById(listId);
  const q = query.toLowerCase();
  list.innerHTML = '';

  const filtered = Object.entries(state.vehicles).filter(([, v]) => {
    const matchType = state.typeFilter === 'All' || v.type === state.typeFilter;
    const matchQ    = !q || v.name.toLowerCase().includes(q) || v.type.toLowerCase().includes(q);
    return matchType && matchQ;
  });

  if (!filtered.length) {
    list.innerHTML = `<div style="padding:1rem;text-align:center;color:var(--muted);font-size:.85rem;">No vehicles found</div>`;
  } else {
    filtered.forEach(([id, v]) => {
      const item = document.createElement('div');
      item.className = 'vitem';
      const logoSvg = getBrandLogo(v.name);
      const logoHtml = logoSvg
        ? `<div class="vi-logo-svg">${logoSvg}</div>`
        : `<span class="vi-icon">${v.icon}</span>`;
      item.innerHTML = `
        <div class="vi-thumb">${logoHtml}</div>
        <div>
          <div class="vi-name">${v.name}</div>
          <div class="vi-type">${v.type}</div>
        </div>
        <div class="vi-right">
          <div class="vi-tp">🏭 ${v.tailpipe} kg/km</div>
          <div class="vi-lca">🔄 ${v.lca} kg/km</div>
          <div class="vi-disp">♻️ ${v.disposable} kg/km</div>
        </div>`;
      item.addEventListener('click', () => { if (list._onSelect) list._onSelect(id); });
      list.appendChild(item);
    });
  }
  list.classList.add('open');
}

function showSelected(selectedId, listId, inputId, vehicleId) {
  const v   = state.vehicles[vehicleId];
  const el  = document.getElementById(selectedId);
  if (!v || !el) return;
  el.style.display = 'flex';
  el.innerHTML = `
    <span class="vs-icon">${v.icon}</span>
    <div class="vs-info">
      <div class="vs-name">${v.name}</div>
      <div class="vs-factors">
        <span class="tp">🏭 Tailpipe: ${v.tailpipe}</span>
        <span class="lca">🔄 LCA: ${v.lca}</span>
        <span class="dp">♻️ Disp: ${v.disposable} kg/km</span>
      </div>
    </div>
    <span class="vs-change">Change ✎</span>`;
  document.getElementById(listId).classList.remove('open');
  document.getElementById(inputId).value = '';

  el.querySelector('.vs-change').addEventListener('click', () => {
    el.style.display = 'none';
    if (selectedId === 'vSelected') state.selectedId  = null;
    if (selectedId === 'selA')      state.selectedIdA = null;
    if (selectedId === 'selB')      state.selectedIdB = null;
    document.getElementById(inputId).focus();
    renderList(listId, '');
  });
}

// ── Calculate ────────────────────────────────────────────────────
async function doCalculate() {
  if (!state.selectedId)  { alert('Please select a vehicle.'); return; }
  const dist = parseFloat(document.getElementById('distance').value);
  if (!dist || dist <= 0) { alert('Please enter a valid distance.'); return; }

  try {
    const res = await fetch('/api/calculate', {
      method: 'POST', headers: {'Content-Type':'application/json'},
      body: JSON.stringify({ vehicle_id: state.selectedId, distance: dist, frequency: state.freq, emission_mode: state.emMode }),
    });
    const data = await res.json();
    showResults(data);
  } catch(e) { alert('Server error. Is the backend running?'); }
}

// ── Compare ──────────────────────────────────────────────────────
async function doCompare() {
  if (!state.selectedIdA || !state.selectedIdB) { alert('Please select both vehicles.'); return; }
  if (state.selectedIdA === state.selectedIdB)  { alert('Please pick two different vehicles.'); return; }
  const dist = parseFloat(document.getElementById('distanceC').value);
  if (!dist || dist <= 0) { alert('Please enter a valid distance.'); return; }

  try {
    const res = await fetch('/api/compare', {
      method: 'POST', headers: {'Content-Type':'application/json'},
      body: JSON.stringify({ vehicle1: state.selectedIdA, vehicle2: state.selectedIdB, distance: dist, frequency: state.freqC, emission_mode: state.emMode }),
    });
    const data = await res.json();
    showCompareResults(data);
  } catch(e) { alert('Server error. Is the backend running?'); }
}

// ── Show single results ──────────────────────────────────────────
function showResults(d) {
  const card = document.getElementById('resultsCard');
  card.style.display = 'block';
  document.getElementById('compareResultsCard').style.display = 'none';
  card.scrollIntoView({ behavior: 'smooth', block: 'start' });

  // Header
  document.getElementById('resVehicleName').textContent = `${d.vehicle_icon} ${d.vehicle_name}`;
  document.getElementById('resMeta').textContent = `${d.vehicle_type} · ${d.emission_mode.toUpperCase()} mode · ${d.factor_used} kg CO₂/km`;

  // Rating
  const pill = document.getElementById('ratingPill');
  pill.textContent = d.rating;
  pill.style.cssText = `background:${d.rating_color}22;color:${d.rating_color};border:1px solid ${d.rating_color}55;padding:.38rem 1rem;border-radius:50px;font-family:'Syne',sans-serif;font-size:.85rem;font-weight:700;`;

  // Big number (animated)
  animateNum('co2Num', d.annual_co2_kg);

  // Breakdown bars (all 3 measures always shown)
  renderBreakdown('bpRows', d);

  // Tiles
  document.getElementById('tMonthly').textContent  = d.monthly_co2_kg.toLocaleString();
  document.getElementById('tDistance').textContent  = d.annual_distance.toLocaleString();
  document.getElementById('tTrees').textContent     = d.trees_needed.toLocaleString();

  // Global bar
  const pct = Math.min((d.annual_co2_kg / 10000) * 100, 100);
  const bar  = document.getElementById('globalBar');
  bar.style.width      = pct + '%';
  bar.style.background = d.annual_co2_kg < 500  ? 'linear-gradient(90deg,#00d484,#aaff6a)'
                       : d.annual_co2_kg < 3000 ? 'linear-gradient(90deg,#fbbf24,#f97316)'
                       :                          'linear-gradient(90deg,#f97316,#ef4444)';
  document.getElementById('gcPct').textContent = d.vs_global_pct + '% of global avg';

  // Tip
  const tips = TIPS[d.vehicle_type] || [];
  document.getElementById('tipBox').innerHTML = `<strong>💡 Tip:</strong> ${tips[Math.floor(Math.random()*tips.length)] || ''}`;
}

function renderBreakdown(containerId, d) {
  const container = document.getElementById(containerId);
  const rows = [
    { label:'🏭 Tailpipe',  key:'tailpipe_factor',   cls:'tp',   factor: d.tailpipe_factor },
    { label:'🔄 LCA',       key:'lca_factor',        cls:'lca',  factor: d.lca_factor },
    { label:'♻️ Disposal',  key:'disposable_factor', cls:'disp', factor: d.disposable_factor },
  ];
  const maxVal = Math.max(d.tailpipe_factor, d.lca_factor, d.disposable_factor) || 1;
  const activeMode = d.emission_mode === 'tailpipe' ? 'tp' : d.emission_mode === 'lca' ? 'lca' : 'disp';

  container.innerHTML = rows.map(r => {
    const pct = ((r.factor / maxVal) * 100).toFixed(1);
    const isActive = r.cls === activeMode;
    return `
      <div class="bp-row">
        <span class="bp-label">${r.label}</span>
        <div class="bp-track">
          <div class="bp-fill ${r.cls}" style="width:0%" data-w="${pct}"></div>
        </div>
        <span class="bp-val">${r.factor} kg/km</span>
        <div class="${isActive ? 'bp-active-dot' : 'bp-inactive-dot'}" title="${isActive?'Currently selected mode':''}"></div>
      </div>`;
  }).join('');

  // Animate bars
  setTimeout(() => {
    container.querySelectorAll('.bp-fill').forEach(el => { el.style.width = el.dataset.w + '%'; });
  }, 80);
}

// ── Show compare results ─────────────────────────────────────────
function showCompareResults(data) {
  const card = document.getElementById('compareResultsCard');
  card.style.display = 'block';
  document.getElementById('resultsCard').style.display = 'none';
  card.scrollIntoView({ behavior: 'smooth', block: 'start' });

  document.getElementById('cmpEmTag').textContent = state.emMode.toUpperCase() + ' emissions';

  const v1 = data.vehicle1, v2 = data.vehicle2;
  const aWins = data.greener === state.selectedIdA;

  // Side-by-side boxes
  const sbs = document.getElementById('sideBySide');
  sbs.innerHTML = `
    ${sbsBox('A', v1, aWins  ? 'winner' : 'loser')}
    <div class="sbs-divider">${aWins ? '← GREENER' : 'GREENER →'}</div>
    ${sbsBox('B', v2, !aWins ? 'winner' : 'loser')}
  `;

  // Breakdown comparison
  const vA = state.vehicles[state.selectedIdA];
  const vB = state.vehicles[state.selectedIdB];
  document.getElementById('cmpBreakdown').innerHTML = `
    <div class="cbt-title">Full Emission Breakdown — per km driven</div>
    <div class="cbt-row header">
      <div class="cbt-label">Type</div>
      <div>${vA ? vA.name : 'Vehicle A'}</div>
      <div>${vB ? vB.name : 'Vehicle B'}</div>
    </div>
    ${[
      {label:'🏭 Tailpipe', k:'tailpipe', cls:'tp'},
      {label:'🔄 LCA',      k:'lca',      cls:'lca'},
      {label:'♻️ Disposal', k:'disposable',cls:'disp'},
    ].map(r => `
      <div class="cbt-row">
        <div class="cbt-label">${r.label}</div>
        <div class="cbt-cell"><span class="dot ${r.cls}"></span>${vA?vA[r.k]:'-'} kg/km</div>
        <div class="cbt-cell"><span class="dot ${r.cls}"></span>${vB?vB[r.k]:'-'} kg/km</div>
      </div>`).join('')}
  `;

  // Bar chart
  const maxV = Math.max(v1.annual_co2_kg, v2.annual_co2_kg) || 1;
  document.getElementById('chartSection').innerHTML = `
    <div class="ch-row">
      <span class="ch-name">${v1.vehicle_name}</span>
      <div class="ch-track"><div class="ch-fill a" id="chA" style="width:0%"></div></div>
      <span class="ch-val">${v1.annual_co2_kg.toLocaleString()} kg</span>
    </div>
    <div class="ch-row">
      <span class="ch-name">${v2.vehicle_name}</span>
      <div class="ch-track"><div class="ch-fill b" id="chB" style="width:0%"></div></div>
      <span class="ch-val">${v2.annual_co2_kg.toLocaleString()} kg</span>
    </div>
  `;
  setTimeout(() => {
    document.getElementById('chA').style.width = (v1.annual_co2_kg / maxV * 100) + '%';
    document.getElementById('chB').style.width = (v2.annual_co2_kg / maxV * 100) + '%';
    if (aWins) {
      document.getElementById('chA').style.background = 'linear-gradient(90deg,#00d484,#aaff6a)';
    } else {
      document.getElementById('chB').style.background = 'linear-gradient(90deg,#00d484,#aaff6a)';
      document.getElementById('chA').style.background = 'linear-gradient(90deg,#f97316,#ef4444)';
    }
  }, 80);

  // Verdict
  const greenerName = aWins ? v1.vehicle_name : v2.vehicle_name;
  const pctSaved    = Math.round((data.diff_kg / Math.max(v1.annual_co2_kg, v2.annual_co2_kg)) * 100);
  const treesSaved  = Math.round(data.diff_kg / 21);
  document.getElementById('verdictBox').innerHTML = `
    🌿 <strong>${greenerName}</strong> emits <strong>${data.diff_kg.toLocaleString()} kg less CO₂ per year</strong> — that's <strong>${pctSaved}% cleaner</strong> on ${state.emMode.toUpperCase()} measure.<br>
    Choosing it saves the equivalent of planting <strong>${treesSaved} trees</strong> every year. 🌳
  `;
}

function sbsBox(label, v, cls) {
  return `
    <div class="sbs-box ${cls}">
      <div class="sbs-name">${v.vehicle_icon} ${v.vehicle_name}</div>
      <div class="sbs-co2">${v.annual_co2_kg.toLocaleString()}</div>
      <span class="sbs-unit">kg CO₂ / year</span>
      <div class="sbs-rating" style="background:${v.rating_color}22;color:${v.rating_color};border:1px solid ${v.rating_color}55">${v.rating}</div>
      <div class="sbs-trees">🌳 ${v.trees_needed} trees to offset</div>
    </div>`;
}

// ── Load history ─────────────────────────────────────────────────
async function loadHistory() {
  const list = document.getElementById('historyList');
  list.innerHTML = '<div class="loading-text">Loading...</div>';
  try {
    const res  = await fetch('/api/history');
    const data = await res.json();
    if (!data.length) { list.innerHTML = '<div class="loading-text">No calculations yet. Try calculating something!</div>'; return; }
    list.innerHTML = data.map(d => `
      <div class="hist-item">
        <span class="hist-icon">${iconForType(d.vehicle_name)}</span>
        <div class="hist-info">
          <div class="hist-name">${d.vehicle_name}</div>
          <div class="hist-meta">${d.emission_mode?.toUpperCase()} · ${d.distance}km · ${d.frequency} · ${formatDate(d.timestamp)}</div>
        </div>
        <div>
          <div class="hist-co2">${d.annual_co2_kg?.toLocaleString()}</div>
          <div class="hist-unit">kg CO₂/yr</div>
        </div>
      </div>`).join('');
  } catch(e) { list.innerHTML = '<div class="loading-text">Could not load history.</div>'; }
}

function iconForType(name) {
  if (!name) return '🚗';
  const n = name.toLowerCase();
  if (n.includes('bus'))   return '🚌';
  if (n.includes('train') || n.includes('metro')) return '🚆';
  if (n.includes('rickshaw')) return '🛺';
  if (n.includes('harley') || n.includes('enfield') || n.includes('pulsar') || n.includes('activa') || n.includes('yamaha') || n.includes('ktm')) return '🏍️';
  return '🚗';
}

function formatDate(iso) {
  if (!iso) return '';
  try { return new Date(iso).toLocaleString(); } catch { return iso; }
}

// ── Animated counter ──────────────────────────────────────────────
function animateNum(id, to) {
  const el  = document.getElementById(id);
  const dur = 1100;
  const t0  = performance.now();
  const tick = (now) => {
    const p = Math.min((now - t0) / dur, 1);
    const v = to * (1 - Math.pow(1 - p, 3));
    el.textContent = v.toLocaleString(undefined, { maximumFractionDigits: 1 });
    if (p < 1) requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
}

// ── Boot ─────────────────────────────────────────────────────────
init();
