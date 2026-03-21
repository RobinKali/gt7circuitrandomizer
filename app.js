// ═══════════════════════════════════════════════════════════════════════════
//  GT7 Random Circuit Selector — app.js
//  Includes: Standard Randomizer + Race Seasons + Car Class Randomizer
// ═══════════════════════════════════════════════════════════════════════════

// ─── Car Class Data ───────────────────────────────────────────────────────────
const carClasses = ["Gr.1", "Gr.2", "Gr.3", "Gr.4", "Gr.B", "Road Car", "Hypercar", "GT500", "VGT", "Kart", "Electric Car"];
const carClassesGTOnly = ["Gr.1", "Gr.2", "Gr.3", "Gr.4"];

// ─── Circuit Database ────────────────────────────────────────────────────────
const CIRCUITS = [
  { name: "Alsace", layout: "Test Course", length_km: 2.0, category: "Short", hasReverse: true },
  { name: "Alsace", layout: "Village", length_km: 5.4, category: "Medium", hasReverse: true },
  { name: "Autodrome Lago Maggiore", layout: "Center", length_km: 1.7, category: "Short", hasReverse: true },
  { name: "Autodrome Lago Maggiore", layout: "East", length_km: 3.6, category: "Medium", hasReverse: true },
  { name: "Autodrome Lago Maggiore", layout: "East End", length_km: 2.0, category: "Short", hasReverse: true },
  { name: "Autodrome Lago Maggiore", layout: "Full Course", length_km: 5.8, category: "Long", hasReverse: true },
  { name: "Autodrome Lago Maggiore", layout: "West", length_km: 4.2, category: "Medium", hasReverse: true },
  { name: "Autodrome Lago Maggiore", layout: "West End", length_km: 2.5, category: "Short", hasReverse: true },
  { name: "Autódromo de Interlagos", layout: "Full Course", length_km: 4.3, category: "Medium" },
  { name: "Autodromo Nazionale Monza", layout: "Full Course", length_km: 5.8, category: "Long" },
  { name: "Autodromo Nazionale Monza", layout: "No Chicane", length_km: 5.7, category: "Long" },
  { name: "Autopolis", layout: "International Racing Course", length_km: 4.7, category: "Medium" },
  { name: "Autopolis", layout: "Shortcut Course", length_km: 3.0, category: "Short" },
  { name: "Blue Moon Bay Speedway", layout: "Full Course", length_km: 3.2, category: "Short", hasReverse: true },
  { name: "Blue Moon Bay Speedway", layout: "Infield A", length_km: 3.3, category: "Short", hasReverse: true },
  { name: "Blue Moon Bay Speedway", layout: "Infield B", length_km: 2.8, category: "Short", hasReverse: true },
  { name: "Brands Hatch", layout: "Grand Prix Circuit", length_km: 3.9, category: "Medium" },
  { name: "Brands Hatch", layout: "Indy Circuit", length_km: 1.9, category: "Short" },
  { name: "Broad Bean Raceway", layout: "Full Course", length_km: 1.7, category: "Short", hasReverse: true },
  { name: "Circuit de Barcelona-Catalunya", layout: "GP Layout No Chicane", length_km: 4.7, category: "Medium" },
  { name: "Circuit de Barcelona-Catalunya", layout: "Grand Prix Layout", length_km: 4.7, category: "Medium" },
  { name: "Circuit de Barcelona-Catalunya", layout: "National Layout", length_km: 3.0, category: "Short" },
  { name: "Circuit de Barcelona-Catalunya", layout: "Rallycross Layout", length_km: 1.1, category: "Short", isRally: true },
  { name: "Circuit de la Sarthe", layout: "24h Layout", length_km: 13.6, category: "Long" },
  { name: "Circuit de la Sarthe", layout: "No Chicane", length_km: 13.5, category: "Long" },
  { name: "Circuit de Sainte-Croix", layout: "Layout A", length_km: 9.5, category: "Long", hasReverse: true },
  { name: "Circuit de Sainte-Croix", layout: "Layout B", length_km: 7.0, category: "Long", hasReverse: true },
  { name: "Circuit de Sainte-Croix", layout: "Layout C", length_km: 10.8, category: "Long", hasReverse: true },
  { name: "Circuit de Spa-Francorchamps", layout: "Full Course", length_km: 7.0, category: "Long" },
  { name: "Circuit Gilles-Villeneuve", layout: "Full Course", length_km: 4.4, category: "Medium" },
  { name: "Colorado Springs", layout: "Lake", length_km: 3.0, category: "Short", isRally: true, hasReverse: true },
  { name: "Daytona", layout: "Road Course", length_km: 5.7, category: "Long" },
  { name: "Daytona", layout: "Tri-Oval", length_km: 4.0, category: "Medium" },
  { name: "Deep Forest Raceway", layout: "Full Course", length_km: 4.2, category: "Medium", hasReverse: true },
  { name: "Dragon Trail", layout: "Gardens", length_km: 4.4, category: "Medium", hasReverse: true },
  { name: "Dragon Trail", layout: "Seaside", length_km: 5.2, category: "Medium", hasReverse: true },
  { name: "Eiger Nordwand", layout: "Full Course", length_km: 2.4, category: "Short", hasReverse: true },
  { name: "Fishermans Ranch", layout: "Full Course", length_km: 6.9, category: "Long", isRally: true, hasReverse: true },
  { name: "Fuji International Speedway", layout: "Full Course", length_km: 4.6, category: "Medium" },
  { name: "Fuji International Speedway", layout: "GT", length_km: 4.5, category: "Medium" },
  { name: "Goodwood Motor Circuit", layout: "Full Course", length_km: 3.8, category: "Medium" },
  { name: "Grand Valley Highway 1", layout: "Full Course", length_km: 5.1, category: "Medium", hasReverse: true },
  { name: "Grand Valley Highway 1", layout: "South", length_km: 2.0, category: "Short", hasReverse: true },
  { name: "High Speed Ring", layout: "Full Course", length_km: 4.0, category: "Medium", hasReverse: true },
  { name: "Kyoto Driving Park", layout: "Miyabi", length_km: 2.6, category: "Short", hasReverse: true },
  { name: "Kyoto Driving Park", layout: "Yamagiwa", length_km: 4.9, category: "Medium", hasReverse: true },
  { name: "Kyoto Driving Park", layout: "Yamagiwa + Miyabi", length_km: 6.8, category: "Long" },
  { name: "Lake Louise", layout: "Long Track", length_km: 3.7, category: "Medium", isRally: true, hasReverse: true },
  { name: "Lake Louise", layout: "Short Track", length_km: 2.6, category: "Short", isRally: true, hasReverse: true },
  { name: "Lake Louise", layout: "Tri-Oval", length_km: 0.5, category: "Short", isRally: true, hasReverse: true },
  { name: "Michelin Raceway Road Atlanta", layout: "Full Course", length_km: 4.1, category: "Medium" },
  { name: "Mount Panorama", layout: "Motor Racing Circuit", length_km: 6.2, category: "Long" },
  { name: "Northern Isle Speedway", layout: "Speedway", length_km: 0.9, category: "Short", hasReverse: true },
  { name: "Nürburgring", layout: "24h", length_km: 25.4, category: "Long" },
  { name: "Nürburgring", layout: "Endurance", length_km: 24.4, category: "Long" },
  { name: "Nürburgring", layout: "GP", length_km: 5.1, category: "Medium" },
  { name: "Nürburgring", layout: "Nordschleife", length_km: 20.8, category: "Long" },
  { name: "Nürburgring", layout: "Sprint", length_km: 3.6, category: "Medium" },
  { name: "Okayama International Circuit", layout: "Full Course", length_km: 3.7, category: "Medium" },
  { name: "Okayama International Circuit", layout: "Piper", length_km: 3.7, category: "Medium" },
  { name: "Red Bull Ring", layout: "Full Course", length_km: 4.3, category: "Medium" },
  { name: "Red Bull Ring", layout: "Short Course", length_km: 2.3, category: "Short" },
  { name: "Sardegna - Road Track", layout: "A", length_km: 5.1, category: "Medium", hasReverse: true },
  { name: "Sardegna - Road Track", layout: "B", length_km: 3.9, category: "Medium", hasReverse: true },
  { name: "Sardegna - Road Track", layout: "C", length_km: 2.7, category: "Short", hasReverse: true },
  { name: "Sardegna - Windmills", layout: "Full Course", length_km: 3.3, category: "Short", isRally: true },
  { name: "Special Stage Route X", layout: "Full Course", length_km: 30.3, category: "Long" },
  { name: "Suzuka Circuit", layout: "East Course", length_km: 2.2, category: "Short" },
  { name: "Suzuka Circuit", layout: "Full Course", length_km: 5.8, category: "Long" },
  { name: "Tokyo Expressway", layout: "Central Inner Loop", length_km: 4.4, category: "Medium" },
  { name: "Tokyo Expressway", layout: "Central Outer Loop", length_km: 4.4, category: "Medium" },
  { name: "Tokyo Expressway", layout: "East Inner Loop", length_km: 7.3, category: "Long" },
  { name: "Tokyo Expressway", layout: "East Outer Loop", length_km: 7.3, category: "Long" },
  { name: "Tokyo Expressway", layout: "South Inner Loop", length_km: 5.2, category: "Medium" },
  { name: "Tokyo Expressway", layout: "South Outer Loop", length_km: 5.2, category: "Medium" },
  { name: "Trial Mountain Circuit", layout: "Full Course", length_km: 5.4, category: "Medium", hasReverse: true },
  { name: "Tsukuba Circuit", layout: "Full Course", length_km: 2.1, category: "Short" },
  { name: "Watkins Glen", layout: "Long Course", length_km: 5.5, category: "Medium" },
  { name: "Watkins Glen", layout: "Short Course", length_km: 3.9, category: "Medium" },
  { name: "WeatherTech Raceway Laguna Seca", layout: "Full Course", length_km: 3.6, category: "Medium" },
  { name: "Willow Springs", layout: "Big Willow", length_km: 4.0, category: "Medium" },
  { name: "Willow Springs", layout: "Horse Thief Mile", length_km: 1.0, category: "Short", hasReverse: true },
  { name: "Willow Springs", layout: "Streets of Willow Springs", length_km: 2.5, category: "Short", hasReverse: true },
  { name: "Yas Marina Circuit", layout: "Full Course (2021)", length_km: 5.3, category: "Medium" }
];

// ═══════════════════════════════════════════════════════════════════════════
//  STANDARD RANDOMIZER
// ═══════════════════════════════════════════════════════════════════════════

// ─── State ───────────────────────────────────────────────────────────────────
let activeCategory = 'All';
let isAnimating = false;
let lastRollResult = null;

// ─── DOM References ──────────────────────────────────────────────────────────
const filterBtns = document.querySelectorAll('.filter-btn');
const rollBtn = document.getElementById('roll-btn');
const resultCard = document.getElementById('result-card');
const slotDisplay = document.getElementById('slot-display');
const trackName = document.getElementById('track-name');
const trackLayout = document.getElementById('track-layout');
const trackLength = document.getElementById('track-length');
const trackCategory = document.getElementById('track-category');
const reverseToggle = document.getElementById('reverse-toggle');
const rallyToggle = document.getElementById('rally-toggle');
const poolCount = document.getElementById('pool-count');
const emptyState = document.getElementById('empty-state');
const btnWhatsAppShareRandom = document.getElementById('btn-whatsapp-share-random');

// ─── Helpers ─────────────────────────────────────────────────────────────────
function getFilteredPool() {
  let pool = [...CIRCUITS];

  // 1. Filter by Rally
  const isRallyChecked = rallyToggle && rallyToggle.checked;
  pool = pool.filter(c => isRallyChecked ? true : !c.isRally);

  // 2. Filter by Category
  if (activeCategory !== 'All') {
    pool = pool.filter(c => c.category === activeCategory);
  }

  // 3. Handle Reverse Layouts (Only for tracks that support it)
  if (reverseToggle && reverseToggle.checked) {
    const revs = pool
      .filter(c => c.hasReverse)
      .map(c => ({ ...c, layout: c.layout + ' (Reverse)', isReverse: true }));
    pool = [...pool, ...revs];
  }

  return pool;
}

function pickRandom(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function getCategoryColor(cat) {
  const map = { Short: '#22c55e', Medium: '#f59e0b', Long: '#ef4444' };
  return map[cat] || '#0066cc';
}

function updatePoolCount() {
  if (poolCount) poolCount.textContent = getFilteredPool().length;
}

// ─── Category Filter ──────────────────────────────────────────────────────────
filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    if (isAnimating) return;
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    activeCategory = btn.dataset.category;
    updatePoolCount();
    resultCard.classList.remove('visible');
    slotDisplay.classList.remove('visible');
  });
});

// ─── Slot Machine Animation ───────────────────────────────────────────────────
function runSlotAnimation(finalCircuit, pool, slotEl) {
  return new Promise(resolve => {
    slotEl.classList.add('visible');

    const DURATION = 1500;
    const START_INT = 50;
    const END_INT = 160;
    const start = performance.now();

    function tick(now) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / DURATION, 1);
      const interval = START_INT + (END_INT - START_INT) * (progress ** 2);

      if (progress < 1) {
        const random = pickRandom(pool);
        slotEl.textContent = `${random.name} — ${random.layout}`;
        slotEl.style.color = getCategoryColor(random.category);
        setTimeout(() => requestAnimationFrame(tick), interval);
      } else {
        slotEl.textContent = `${finalCircuit.name} — ${finalCircuit.layout}`;
        slotEl.style.color = getCategoryColor(finalCircuit.category);
        setTimeout(() => {
          slotEl.classList.remove('visible');
          resolve();
        }, 200);
      }
    }
    requestAnimationFrame(tick);
  });
}

// ─── Roll Logic ───────────────────────────────────────────────────────────────
rollBtn.addEventListener('click', async () => {
  if (isAnimating) return;
  const pool = getFilteredPool();
  if (pool.length === 0) { emptyState && (emptyState.style.display = 'block'); return; }
  emptyState && (emptyState.style.display = 'none');

  isAnimating = true;
  rollBtn.disabled = true;
  rollBtn.classList.add('rolling');

  const chosen = pickRandom(pool);
  await runSlotAnimation(chosen, pool, slotDisplay);

  trackName.textContent = chosen.name;
  trackLayout.textContent = chosen.layout;
  trackLength.textContent = chosen.length_km.toFixed(1) + ' km';
  trackCategory.textContent = chosen.category;

  const catEl = document.getElementById('track-category');
  catEl.style.setProperty('--cat-color', getCategoryColor(chosen.category));

  resultCard.classList.add('visible');
  lastRollResult = chosen;

  isAnimating = false;
  rollBtn.disabled = false;
  rollBtn.classList.remove('rolling');
});

if (btnWhatsAppShareRandom) {
  btnWhatsAppShareRandom.addEventListener('click', () => {
    if (lastRollResult) shareTrackToWhatsApp(lastRollResult);
  });
}

reverseToggle && reverseToggle.addEventListener('change', updatePoolCount);
rallyToggle && rallyToggle.addEventListener('change', updatePoolCount);
updatePoolCount();

// ─── Service Worker Registration ─────────────────────────────────────────────
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./service-worker.js')
      .then(reg => console.log('[SW] Registered, scope:', reg.scope))
      .catch(err => console.warn('[SW] Registration failed:', err));
  });
}

// ═══════════════════════════════════════════════════════════════════════════
//  RACE SEASONS — localStorage Data Model
// ═══════════════════════════════════════════════════════════════════════════

const LS_KEY = 'gt7_race_seasons';

/** Load all seasons from localStorage */
function loadSeasons() {
  try {
    return JSON.parse(localStorage.getItem(LS_KEY)) || [];
  } catch {
    return [];
  }
}

/** Save all seasons to localStorage */
function saveSeasons(seasons) {
  localStorage.setItem(LS_KEY, JSON.stringify(seasons));
}

/**
 * Season schema:
 * {
 *   id: string (uuid-ish),
 *   name: string,
 *   raceCount: number,
 *   circuits: [{ name, layout, length_km, category, completed }]
 * }
 */
function createSeasonObj(name, raceCount, selectedCircuits) {
  return {
    id: Date.now().toString(36) + Math.random().toString(36).slice(2, 6),
    name: name.trim(),
    raceCount,
    circuits: selectedCircuits.map(c => ({ ...c, completed: false }))
  };
}

// ═══════════════════════════════════════════════════════════════════════════
//  VIEW ROUTER
// ═══════════════════════════════════════════════════════════════════════════

const views = {
  randomizer: document.getElementById('view-randomizer'),
  seasons: document.getElementById('view-seasons'),
  createSeason: document.getElementById('view-create-season'),
  seasonDetail: document.getElementById('view-season-detail'),
  sharedSeason: document.getElementById('view-shared-season'),
  carClass: document.getElementById('view-carclass'),
};

function showView(name) {
  Object.values(views).forEach(v => v && v.classList.remove('active'));
  if (views[name]) views[name].classList.add('active');
}

// ─── Init: check URL for shared season param ─────────────────────────────────
(function initURLCheck() {
  const params = new URLSearchParams(window.location.search);
  const seasonParam = params.get('season');
  if (seasonParam) tryLoadSharedSeason(seasonParam);
})();

// ─── Nav Tabs ─────────────────────────────────────────────────────────────────
const navRandomizer = document.getElementById('nav-randomizer');
const navSeasons = document.getElementById('nav-seasons');
const navCarClass = document.getElementById('nav-carclass');

function setActiveNav(activeEl) {
  [navRandomizer, navSeasons, navCarClass].forEach(el => {
    el.classList.toggle('active', el === activeEl);
    el.setAttribute('aria-pressed', el === activeEl ? 'true' : 'false');
  });
}

navRandomizer.addEventListener('click', () => {
  setActiveNav(navRandomizer);
  showView('randomizer');
});

navSeasons.addEventListener('click', () => {
  setActiveNav(navSeasons);
  showView('seasons');
  renderSeasonsDashboard();
});

navCarClass.addEventListener('click', () => {
  setActiveNav(navCarClass);
  showView('carClass');
});

// ═══════════════════════════════════════════════════════════════════════════
//  SEASONS DASHBOARD
// ═══════════════════════════════════════════════════════════════════════════

const seasonsList = document.getElementById('seasons-list');
const seasonsEmpty = document.getElementById('seasons-empty');
const btnOpenCreate = document.getElementById('btn-open-create');

btnOpenCreate.addEventListener('click', () => {
  openCreateFlow();
});

function renderSeasonsDashboard() {
  const seasons = loadSeasons();

  seasonsList.innerHTML = '';

  if (seasons.length === 0) {
    seasonsEmpty.style.display = 'block';
    return;
  }
  seasonsEmpty.style.display = 'none';

  seasons.forEach(season => {
    const completed = season.circuits.filter(c => c.completed).length;
    const total = season.circuits.length;
    const pct = total > 0 ? Math.round((completed / total) * 100) : 0;

    const card = document.createElement('div');
    card.className = 'season-card';
    card.setAttribute('role', 'button');
    card.setAttribute('tabindex', '0');
    card.setAttribute('aria-label', `Open season: ${season.name}`);
    card.innerHTML = `
      <div class="season-card-info">
        <div class="season-card-name">${escHtml(season.name)}</div>
        <div class="season-card-meta">${total} circuits · ${completed} completed</div>
      </div>
      <div class="season-card-progress">
        <span class="season-card-pct">${pct}%</span>
        <div class="season-mini-bar-wrap">
          <div class="season-mini-bar" style="width:${pct}%"></div>
        </div>
      </div>
      <span class="season-card-arrow" aria-hidden="true">›</span>
    `;
    card.addEventListener('click', () => openSeasonDetail(season.id));
    card.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') openSeasonDetail(season.id); });
    seasonsList.appendChild(card);
  });
}

// ═══════════════════════════════════════════════════════════════════════════
//  CREATE SEASON FLOW
// ═══════════════════════════════════════════════════════════════════════════

const createStep1 = document.getElementById('create-step-1');
const createStep2 = document.getElementById('create-step-2');
const seasonNameInput = document.getElementById('season-name-input');
const seasonRaceCountInput = document.getElementById('season-race-count-input');
const btnGoToStep2 = document.getElementById('btn-go-to-step2');
const btnBackFromCreate = document.getElementById('btn-back-from-create');
const btnBackToStep1 = document.getElementById('btn-back-to-step1');
const btnSaveSeason = document.getElementById('btn-save-season');
const trackSelectList = document.getElementById('track-select-list');
const trackSelectCount = document.getElementById('track-select-count');
const trackSelectTarget = document.getElementById('track-select-target');
const createStep1Error = document.getElementById('create-step1-error');
const createStep2Error = document.getElementById('create-step2-error');
const createStep2Title = document.getElementById('create-step2-title');

let createTargetCount = 0;
let createSelectedIds = new Set(); // indices into CIRCUITS

function openCreateFlow() {
  // Reset form
  seasonNameInput.value = '';
  seasonRaceCountInput.value = '';
  createStep1Error.textContent = '';
  createStep2Error.textContent = '';
  createStep1.style.display = 'flex';
  createStep2.style.display = 'none';
  createSelectedIds.clear();
  showView('createSeason');
}

btnBackFromCreate.addEventListener('click', () => {
  showView('seasons');
  renderSeasonsDashboard();
});

btnBackToStep1.addEventListener('click', () => {
  createStep2.style.display = 'none';
  createStep1.style.display = 'flex';
});

btnGoToStep2.addEventListener('click', () => {
  const name = seasonNameInput.value.trim();
  const count = parseInt(seasonRaceCountInput.value, 10);

  createStep1Error.textContent = '';

  if (!name) {
    createStep1Error.textContent = '⚠ Please enter a season name.';
    return;
  }
  if (!count || count < 1 || count > 24) {
    createStep1Error.textContent = `⚠ Number of races must be between 1 and 24.`;
    return;
  }

  createTargetCount = count;
  createSelectedIds.clear();

  createStep2Title.textContent = `Pick ${count} Circuit${count !== 1 ? 's' : ''}`;
  trackSelectTarget.textContent = count;
  trackSelectCount.textContent = 0;
  btnSaveSeason.disabled = true;
  createStep2Error.textContent = '';

  renderTrackSelectList();

  createStep1.style.display = 'none';
  createStep2.style.display = 'flex';
});

function renderTrackSelectList() {
  trackSelectList.innerHTML = '';

  CIRCUITS.forEach((circuit, idx) => {
    const isSelected = createSelectedIds.has(idx);
    const isMaxed = !isSelected && createSelectedIds.size >= createTargetCount;

    const item = document.createElement('div');
    item.className = 'track-select-item' +
      (isSelected ? ' selected' : '') +
      (isMaxed ? ' disabled-max' : '');
    item.setAttribute('role', 'checkbox');
    item.setAttribute('aria-checked', isSelected ? 'true' : 'false');
    item.setAttribute('tabindex', isMaxed && !isSelected ? '-1' : '0');
    item.dataset.idx = idx;

    item.innerHTML = `
      <div class="track-select-check" aria-hidden="true">${isSelected ? '✓' : ''}</div>
      <div class="track-select-info">
        <div class="track-select-name">${escHtml(circuit.name)}</div>
        <div class="track-select-layout">${escHtml(circuit.layout)}</div>
      </div>
      <span class="track-select-cat ${circuit.category}">${circuit.category}</span>
    `;

    item.addEventListener('click', () => toggleTrackSelection(idx));
    item.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggleTrackSelection(idx); }
    });

    trackSelectList.appendChild(item);
  });
}

function toggleTrackSelection(idx) {
  if (createSelectedIds.has(idx)) {
    createSelectedIds.delete(idx);
  } else {
    if (createSelectedIds.size >= createTargetCount) return; // max reached
    createSelectedIds.add(idx);
  }
  trackSelectCount.textContent = createSelectedIds.size;
  btnSaveSeason.disabled = createSelectedIds.size !== createTargetCount;
  renderTrackSelectList(); // re-render to update disabled states
}

btnSaveSeason.addEventListener('click', () => {
  if (createSelectedIds.size !== createTargetCount) {
    createStep2Error.textContent = `⚠ Please select exactly ${createTargetCount} circuits.`;
    return;
  }

  const name = seasonNameInput.value.trim();
  const selected = [...createSelectedIds].map(i => CIRCUITS[i]);
  const season = createSeasonObj(name, createTargetCount, selected);

  const seasons = loadSeasons();
  seasons.push(season);
  saveSeasons(seasons);

  showView('seasons');
  renderSeasonsDashboard();

  // Switch nav tab to seasons
  setActiveNav(navSeasons);
});

// ═══════════════════════════════════════════════════════════════════════════
//  SEASON DETAIL VIEW
// ═══════════════════════════════════════════════════════════════════════════

const detailSeasonName = document.getElementById('detail-season-name');
const detailProgressBar = document.getElementById('detail-progress-bar');
const detailProgressLabel = document.getElementById('detail-progress-label');
const seasonCircuitsList = document.getElementById('season-circuits-list');
const seasonRollBtn = document.getElementById('season-roll-btn');
const seasonSlotDisplay = document.getElementById('season-slot-display');
const seasonResultCard = document.getElementById('season-result-card');
const seasonTrackName = document.getElementById('season-track-name');
const seasonTrackLayout = document.getElementById('season-track-layout');
const seasonTrackLength = document.getElementById('season-track-length');
const seasonTrackCategory = document.getElementById('season-track-category');
const seasonEmptyState = document.getElementById('season-empty-state');
const btnBackFromDetail = document.getElementById('btn-back-from-detail');
const btnResetSeason = document.getElementById('btn-reset-season');
const btnDeleteSeason = document.getElementById('btn-delete-season');

let currentSeasonId = null;
let isSeasonAnimating = false;

btnBackFromDetail.addEventListener('click', () => {
  currentSeasonId = null;
  seasonResultCard.classList.remove('visible');
  seasonSlotDisplay.classList.remove('visible');
  showView('seasons');
  renderSeasonsDashboard();
});

function openSeasonDetail(seasonId) {
  currentSeasonId = seasonId;
  seasonResultCard.classList.remove('visible');
  seasonSlotDisplay.classList.remove('visible');
  renderSeasonDetail();
  showView('seasonDetail');
}

function renderSeasonDetail() {
  const seasons = loadSeasons();
  const season = seasons.find(s => s.id === currentSeasonId);
  if (!season) { showView('seasons'); return; }

  const completed = season.circuits.filter(c => c.completed).length;
  const total = season.circuits.length;
  const pct = total > 0 ? Math.round((completed / total) * 100) : 0;
  const remaining = total - completed;

  detailSeasonName.textContent = season.name;
  detailProgressBar.style.width = `${pct}%`;
  detailProgressLabel.textContent = `${completed} / ${total} completed (${pct}%)`;

  // Roll button state
  const hasRemaining = remaining > 0;
  seasonRollBtn.disabled = !hasRemaining || isSeasonAnimating;

  // Empty state
  seasonEmptyState.style.display = hasRemaining ? 'none' : 'block';

  // Build circuit list
  seasonCircuitsList.innerHTML = '';
  season.circuits.forEach((circuit, idx) => {
    const li = document.createElement('li');
    li.className = 'season-circuit-item' + (circuit.completed ? ' completed' : '');

    const btn = document.createElement('button');
    btn.className = 'circuit-complete-btn';
    btn.type = 'button';
    btn.setAttribute('aria-label', circuit.completed
      ? `Mark ${circuit.name} as incomplete`
      : `Mark ${circuit.name} as complete`);
    btn.innerHTML = circuit.completed ? '✓' : '';
    btn.addEventListener('click', () => toggleCircuitComplete(idx));

    const info = document.createElement('div');
    info.className = 'circuit-item-info';
    info.innerHTML = `
      <div class="circuit-item-name">${escHtml(circuit.name)}</div>
      <div class="circuit-item-layout">${escHtml(circuit.layout)}</div>
    `;

    const badge = document.createElement('span');
    badge.className = `circuit-item-badge ${circuit.category}`;
    badge.textContent = circuit.category;

    li.appendChild(btn);
    li.appendChild(info);
    li.appendChild(badge);
    seasonCircuitsList.appendChild(li);
  });
}

function toggleCircuitComplete(circuitIdx) {
  const seasons = loadSeasons();
  const season = seasons.find(s => s.id === currentSeasonId);
  if (!season) return;

  season.circuits[circuitIdx].completed = !season.circuits[circuitIdx].completed;
  saveSeasons(seasons);
  renderSeasonDetail();
}

// ─── Season Roll ──────────────────────────────────────────────────────────────
seasonRollBtn.addEventListener('click', async () => {
  if (isSeasonAnimating) return;

  const seasons = loadSeasons();
  const season = seasons.find(s => s.id === currentSeasonId);
  if (!season) return;

  const remaining = season.circuits.filter(c => !c.completed);
  if (remaining.length === 0) return;

  isSeasonAnimating = true;
  seasonRollBtn.disabled = true;
  seasonRollBtn.classList.add('rolling');

  const chosen = pickRandom(remaining);

  await runSlotAnimation(chosen, remaining.length > 1 ? remaining : CIRCUITS, seasonSlotDisplay);

  // Mark as completed in data
  const idx = season.circuits.findIndex(c => c.name === chosen.name && c.layout === chosen.layout && !c.completed);
  if (idx !== -1) {
    season.circuits[idx].completed = true;
    saveSeasons(seasons);
  }

  // Show result card
  seasonTrackName.textContent = chosen.name;
  seasonTrackLayout.textContent = chosen.layout;
  seasonTrackLength.textContent = chosen.length_km.toFixed(1) + ' km';
  seasonTrackCategory.textContent = chosen.category;

  const seasonCatEl = document.getElementById('season-track-category');
  seasonCatEl.style.setProperty('--cat-color', getCategoryColor(chosen.category));

  seasonResultCard.classList.add('visible');

  // Enable WhatsApp share button with this circuit's data
  const shareBtn = document.getElementById('btn-share-track');
  if (shareBtn) {
    shareBtn.onclick = () => shareTrackToWhatsApp(chosen);
  }

  isSeasonAnimating = false;
  renderSeasonDetail(); // refresh list + progress
});

// ─── Reset Season ─────────────────────────────────────────────────────────────
btnResetSeason.addEventListener('click', () => {
  if (!confirm('Reset all circuits in this season? Progress will be lost.')) return;
  const seasons = loadSeasons();
  const season = seasons.find(s => s.id === currentSeasonId);
  if (!season) return;
  season.circuits.forEach(c => c.completed = false);
  saveSeasons(seasons);
  seasonResultCard.classList.remove('visible');
  seasonSlotDisplay.classList.remove('visible');
  renderSeasonDetail();
});

// ─── Delete Season ────────────────────────────────────────────────────────────
btnDeleteSeason.addEventListener('click', () => {
  if (!confirm('Delete this season permanently? This cannot be undone.')) return;
  const seasons = loadSeasons().filter(s => s.id !== currentSeasonId);
  saveSeasons(seasons);
  currentSeasonId = null;
  showView('seasons');
  renderSeasonsDashboard();
  setActiveNav(navSeasons);
});

// ═══════════════════════════════════════════════════════════════════════════
//  UTILITIES
// ═══════════════════════════════════════════════════════════════════════════
function escHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

// ─── Toast ────────────────────────────────────────────────────────────────────
let _toastTimer;
function showToast(message) {
  const toast = document.getElementById('toast');
  if (!toast) return;
  clearTimeout(_toastTimer);
  toast.textContent = message;
  toast.classList.add('visible');
  _toastTimer = setTimeout(() => toast.classList.remove('visible'), 2500);
}

// ─── WhatsApp Track Share ─────────────────────────────────────────────────────
function shareTrackToWhatsApp(circuit) {
  const msg = [
    '🏁 RTW RACE DAY ANNOUNCEMENT 🏁',
    '',
    `Tonight's track is: ${circuit.name} — ${circuit.layout}!`,
    `Length: ${circuit.length_km.toFixed(1)} km  |  Category: ${circuit.category}`,
    '',
    'Get ready! 🏎️💨'
  ].join('\n');

  if (navigator.share) {
    navigator.share({
      title: 'GT7 Race Day!',
      text: msg,
      url: window.location.origin
    }).catch(() => {
      openWhatsAppURL(msg);
    });
  } else {
    openWhatsAppURL(msg);
  }
}

function openWhatsAppURL(text) {
  const encoded = encodeURIComponent(text);
  window.open('https://wa.me/?text=' + encoded, '_blank', 'noopener,noreferrer');
}

// ─── Share Season Status ──────────────────────────────────────────────────────
const btnShareSeason = document.getElementById('btn-share-season');
if (btnShareSeason) {
  btnShareSeason.addEventListener('click', () => {
    const seasons = loadSeasons();
    const season = seasons.find(s => s.id === currentSeasonId);
    if (!season) return;

    let encoded;
    try {
      encoded = btoa(unescape(encodeURIComponent(JSON.stringify(season))));
    } catch {
      showToast('⚠ Could not encode season data.');
      return;
    }

    const url = window.location.origin + window.location.pathname + '?season=' + encoded;
    const msg = `Eyeing my GT7 Race Season "${season.name}"? Check it out here:\n${url}`;

    if (navigator.share) {
      navigator.share({
        title: `GTTraxx — Race Season: ${season.name}`,
        text: msg,
        url: url
      }).catch(() => {
        // Fallback to clipboard if share fails/cancelled
        copyToClipboard(url);
      });
    } else {
      copyToClipboard(url);
    }
  });
}

function copyToClipboard(text) {
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(text)
      .then(() => showToast('🔗 Link copied!'))
      .catch(() => showToast('⚠ Copy failed — try manually.'));
  } else {
    // Ultimate fallback for very legacy browsers or insecure contexts
    const msg = `GT7 Race Season:\n${text}`;
    openWhatsAppURL(msg);
  }
}

// ═══════════════════════════════════════════════════════════════════════════
//  SHARED SEASON (Read-Only View)
// ═══════════════════════════════════════════════════════════════════════════

function tryLoadSharedSeason(encoded) {
  try {
    const season = JSON.parse(decodeURIComponent(escape(atob(encoded))));
    if (!season || typeof season.name !== 'string' || !Array.isArray(season.circuits)) {
      throw new Error('Invalid season data');
    }
    renderSharedSeasonView(season);
    showView('sharedSeason');
    // Hide nav tabs — participants can't interact with the main app
    const nav = document.querySelector('.main-nav');
    if (nav) nav.style.display = 'none';
  } catch {
    // Malformed param — silently load normal app
    console.warn('[GT7] Invalid ?season param — loading normally.');
  }
}

function renderSharedSeasonView(season) {
  const completed = season.circuits.filter(c => c.completed).length;
  const total = season.circuits.length;
  const pct = total > 0 ? Math.round((completed / total) * 100) : 0;

  const nameEl = document.getElementById('shared-season-name');
  const barEl = document.getElementById('shared-progress-bar');
  const labelEl = document.getElementById('shared-progress-label');
  const listEl = document.getElementById('shared-circuits-list');
  const homeBtn = document.getElementById('btn-shared-home');

  if (nameEl) nameEl.textContent = season.name;
  if (barEl) barEl.style.width = `${pct}%`;
  if (labelEl) labelEl.textContent = `${completed} / ${total} completed (${pct}%)`;

  if (listEl) {
    listEl.innerHTML = '';
    season.circuits.forEach(circuit => {
      const li = document.createElement('li');
      li.className = 'season-circuit-item' + (circuit.completed ? ' completed' : '');

      // Bullet indicator instead of the interactive complete button
      const dot = document.createElement('span');
      dot.className = 'circuit-complete-btn';
      dot.setAttribute('aria-hidden', 'true');
      dot.innerHTML = circuit.completed ? '✓' : '';
      dot.style.pointerEvents = 'none'; // read-only

      const info = document.createElement('div');
      info.className = 'circuit-item-info';
      info.innerHTML = `
        <div class="circuit-item-name">${escHtml(circuit.name)}</div>
        <div class="circuit-item-layout">${escHtml(circuit.layout)}</div>
      `;

      const badge = document.createElement('span');
      badge.className = `circuit-item-badge ${circuit.category}`;
      badge.textContent = circuit.category;

      li.appendChild(dot);
      li.appendChild(info);
      li.appendChild(badge);
      listEl.appendChild(li);
    });
  }

  if (homeBtn) {
    homeBtn.addEventListener('click', () => {
      // Strip the ?season param and reload into the normal app
      history.replaceState(null, '', window.location.pathname);
      location.reload();
    });
  }
}

// ═══════════════════════════════════════════════════════════════════════════
//  CAR CLASS RANDOMIZER
// ═══════════════════════════════════════════════════════════════════════════

// ─── DOM References ──────────────────────────────────────────────────────────
const carclassRollBtn   = document.getElementById('carclass-roll-btn');
const carclassSlot      = document.getElementById('carclass-slot-display');
const carclassResultCard = document.getElementById('carclass-result-card');
const carclassNameEl    = document.getElementById('carclass-name');
const gtOnlyToggle      = document.getElementById('gt-only-toggle');
const btnShareCarClass  = document.getElementById('btn-share-carclass');

let isCarClassAnimating = false;
let lastCarClassResult  = null;

// ─── Slot animation for strings ──────────────────────────────────────────────
function runCarClassSlot(finalClass, pool, slotEl) {
  return new Promise(resolve => {
    slotEl.classList.add('visible');

    const DURATION = 1500;
    const START_INT = 50;
    const END_INT   = 160;
    const start     = performance.now();

    const ACCENT = '#f0c040'; // gold for car classes

    function tick(now) {
      const elapsed  = now - start;
      const progress = Math.min(elapsed / DURATION, 1);
      const interval = START_INT + (END_INT - START_INT) * (progress ** 2);

      if (progress < 1) {
        slotEl.textContent = pool[Math.floor(Math.random() * pool.length)];
        slotEl.style.color  = ACCENT;
        setTimeout(() => requestAnimationFrame(tick), interval);
      } else {
        slotEl.textContent = finalClass;
        slotEl.style.color  = ACCENT;
        setTimeout(() => {
          slotEl.classList.remove('visible');
          resolve();
        }, 200);
      }
    }
    requestAnimationFrame(tick);
  });
}

// ─── Roll Logic ───────────────────────────────────────────────────────────────
carclassRollBtn.addEventListener('click', async () => {
  if (isCarClassAnimating) return;

  const pool = gtOnlyToggle && gtOnlyToggle.checked ? carClassesGTOnly : carClasses;
  const chosen = pool[Math.floor(Math.random() * pool.length)];

  isCarClassAnimating = true;
  carclassRollBtn.disabled = true;
  carclassRollBtn.classList.add('rolling');

  await runCarClassSlot(chosen, pool, carclassSlot);

  carclassNameEl.textContent = chosen;
  carclassResultCard.classList.add('visible');
  lastCarClassResult = chosen;

  isCarClassAnimating = false;
  carclassRollBtn.disabled = false;
  carclassRollBtn.classList.remove('rolling');
});

// ─── Share ────────────────────────────────────────────────────────────────────
if (btnShareCarClass) {
  btnShareCarClass.addEventListener('click', () => {
    if (!lastCarClassResult) return;
    const msg = [
      '🏎️ RTW CAR CLASS ANNOUNCEMENT 🏎️',
      '',
      `Tonight's car class is: ${lastCarClassResult}!`,
      '',
      'Get your car ready! 💨'
    ].join('\n');

    if (navigator.share) {
      navigator.share({
        title: 'GT7 Car Class!',
        text: msg,
        url: window.location.origin
      }).catch(() => openWhatsAppURL(msg));
    } else {
      openWhatsAppURL(msg);
    }
  });
}
