// ═══════════════════════════════════════════════════════════════════════════
//  GT7 Random Circuit Selector — app.js
// ═══════════════════════════════════════════════════════════════════════════

// ─── Circuit Database ────────────────────────────────────────────────────────
const CIRCUITS = [
  { name: "Alsace", layout: "Village", length_km: 5.4, category: "Medium" },
  { name: "Alsace", layout: "Test Course", length_km: 1.9, category: "Short" },
  { name: "Autodrome Lago Maggiore", layout: "Full Course", length_km: 5.8, category: "Long" },
  { name: "Autodrome Lago Maggiore", layout: "East End", length_km: 3.6, category: "Medium" },
  { name: "Autodrome Lago Maggiore", layout: "Center", length_km: 1.7, category: "Short" },
  { name: "Autopolis", layout: "International Racing Course", length_km: 4.6, category: "Medium" },
  { name: "Autopolis", layout: "Shortcut Course", length_km: 3.0, category: "Short" },
  { name: "Blue Moon Bay Speedway", layout: "Infield A", length_km: 3.3, category: "Short" },
  { name: "Brands Hatch", layout: "Grand Prix Circuit", length_km: 3.9, category: "Medium" },
  { name: "Brands Hatch", layout: "Indy Circuit", length_km: 1.9, category: "Short" },
  { name: "Broad Bean Raceway", layout: "Full Course", length_km: 1.6, category: "Short" },
  { name: "Circuit de Barcelona-Catalunya", layout: "Grand Prix Layout", length_km: 4.6, category: "Medium" },
  { name: "Circuit de la Sarthe", layout: "24h Layout", length_km: 13.6, category: "Long" },
  { name: "Circuit de la Sarthe", layout: "No Chicane", length_km: 13.5, category: "Long" },
  { name: "Circuit de Sainte-Croix", layout: "Layout A", length_km: 9.4, category: "Long" },
  { name: "Circuit de Spa-Francorchamps", layout: "24h Layout", length_km: 7.0, category: "Long" },
  { name: "Colorado Springs", layout: "Lake", length_km: 2.9, category: "Short" },
  { name: "Daytona International Speedway", layout: "Road Course", length_km: 5.7, category: "Long" },
  { name: "Daytona International Speedway", layout: "Tri-Oval", length_km: 4.0, category: "Medium" },
  { name: "Deep Forest Raceway", layout: "Full Course", length_km: 4.2, category: "Medium" },
  { name: "Dragon Trail", layout: "Seaside", length_km: 5.2, category: "Medium" },
  { name: "Dragon Trail", layout: "Gardens", length_km: 4.3, category: "Medium" },
  { name: "Fuji International Speedway", layout: "Full Course", length_km: 4.5, category: "Medium" },
  { name: "Grand Valley Highway 1", layout: "Full Course", length_km: 5.0, category: "Medium" },
  { name: "Grand Valley Highway 1", layout: "South", length_km: 2.0, category: "Short" },
  { name: "High Speed Ring", layout: "Full Course", length_km: 4.0, category: "Medium" },
  { name: "Interlagos", layout: "Full Course", length_km: 4.3, category: "Medium" },
  { name: "Kyoto Driving Park", layout: "Yamagiwa", length_km: 4.9, category: "Medium" },
  { name: "Kyoto Driving Park", layout: "Miyabi", length_km: 2.6, category: "Short" },
  { name: "Lake Maggiore", layout: "West End", length_km: 4.1, category: "Medium" },
  { name: "Michelin Raceway Road Atlanta", layout: "Full Course", length_km: 4.0, category: "Medium" },
  { name: "Mount Panorama", layout: "Motor Racing Circuit", length_km: 6.2, category: "Long" },
  { name: "Monza", layout: "No Chicane", length_km: 5.7, category: "Long" },
  { name: "Northern Isle Festival", layout: "Speedway", length_km: 0.9, category: "Short" },
  { name: "Nürburgring", layout: "Nordschleife", length_km: 20.8, category: "Long" },
  { name: "Nürburgring", layout: "24h", length_km: 25.3, category: "Long" },
  { name: "Nürburgring", layout: "GP", length_km: 5.1, category: "Medium" },
  { name: "Red Bull Ring", layout: "Full Course", length_km: 4.3, category: "Medium" },
  { name: "Sardegna", layout: "Road Track - A", length_km: 5.1, category: "Medium" },
  { name: "Sardegna", layout: "Windmills", length_km: 3.3, category: "Short" },
  { name: "Special Stage Route X", layout: "Full Course", length_km: 30.2, category: "Long" },
  { name: "Suzuka Circuit", layout: "Full Course", length_km: 5.8, category: "Long" },
  { name: "Suzuka Circuit", layout: "East Course", length_km: 2.2, category: "Short" },
  { name: "Tokyo Expressway", layout: "East Outer Loop", length_km: 7.3, category: "Long" },
  { name: "Trial Mountain", layout: "Full Course", length_km: 5.4, category: "Medium" },
  { name: "Tsukuba Circuit", layout: "Full Course", length_km: 2.0, category: "Short" },
  { name: "Watkins Glen", layout: "Long Course", length_km: 5.4, category: "Medium" },
  { name: "Watkins Glen", layout: "Short Course", length_km: 3.9, category: "Medium" }
];

// ─── State ───────────────────────────────────────────────────────────────────
let activeCategory = 'All';
let isAnimating = false;

// ─── DOM References ──────────────────────────────────────────────────────────
const filterBtns      = document.querySelectorAll('.filter-btn');
const rollBtn         = document.getElementById('roll-btn');
const resultCard      = document.getElementById('result-card');
const slotDisplay     = document.getElementById('slot-display');
const trackName       = document.getElementById('track-name');
const trackLayout     = document.getElementById('track-layout');
const trackLength     = document.getElementById('track-length');
const trackCategory   = document.getElementById('track-category');
const reverseToggle   = document.getElementById('reverse-toggle');
const poolCount       = document.getElementById('pool-count');
const emptyState      = document.getElementById('empty-state');

// ─── Helpers ─────────────────────────────────────────────────────────────────
function getFilteredPool() {
  let pool = [...CIRCUITS];

  // Category filter
  if (activeCategory !== 'All') {
    pool = pool.filter(c => c.category === activeCategory);
  }

  // Add reverse variants if toggled
  if (reverseToggle && reverseToggle.checked) {
    const reverseVariants = pool.map(c => ({
      ...c,
      layout: c.layout + ' (Reverse)',
      isReverse: true
    }));
    pool = [...pool, ...reverseVariants];
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
  const pool = getFilteredPool();
  if (poolCount) poolCount.textContent = pool.length;
}

// ─── Category Filter ──────────────────────────────────────────────────────────
filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    if (isAnimating) return;
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    activeCategory = btn.dataset.category;
    updatePoolCount();
    // Reset result card on filter change
    resultCard.classList.remove('visible');
    slotDisplay.classList.remove('visible');
  });
});

// ─── Slot Machine Animation ───────────────────────────────────────────────────
function runSlotAnimation(finalCircuit, pool) {
  return new Promise(resolve => {
    slotDisplay.classList.add('visible');
    resultCard.classList.remove('visible');

    const DURATION   = 1500; // ms
    const START_INTERVAL = 50;
    const END_INTERVAL   = 160;
    const start = performance.now();

    let rafId;

    function tick(now) {
      const elapsed  = now - start;
      const progress = Math.min(elapsed / DURATION, 1);

      // Ease-out: slow down as progress → 1
      const interval = START_INTERVAL + (END_INTERVAL - START_INTERVAL) * (progress ** 2);

      if (progress < 1) {
        // Show a random circuit name during the spin
        const random = pickRandom(pool);
        slotDisplay.textContent = `${random.name} — ${random.layout}`;
        slotDisplay.style.color = getCategoryColor(random.category);

        setTimeout(() => {
          rafId = requestAnimationFrame(tick);
        }, interval);
      } else {
        // Final reveal
        slotDisplay.textContent = `${finalCircuit.name} — ${finalCircuit.layout}`;
        slotDisplay.style.color = getCategoryColor(finalCircuit.category);

        setTimeout(() => {
          slotDisplay.classList.remove('visible');
          resolve();
        }, 200);
      }
    }

    rafId = requestAnimationFrame(tick);
  });
}

// ─── Roll Logic ───────────────────────────────────────────────────────────────
rollBtn.addEventListener('click', async () => {
  if (isAnimating) return;

  const pool = getFilteredPool();

  if (pool.length === 0) {
    emptyState && (emptyState.style.display = 'block');
    return;
  }
  emptyState && (emptyState.style.display = 'none');

  isAnimating = true;
  rollBtn.disabled = true;
  rollBtn.classList.add('rolling');

  const chosen = pickRandom(pool);

  await runSlotAnimation(chosen, pool);

  // Populate result card
  trackName.textContent     = chosen.name + (chosen.isReverse ? '' : '');
  trackLayout.textContent   = chosen.layout;
  trackLength.textContent   = chosen.length_km.toFixed(1) + ' km';
  trackCategory.textContent = chosen.category;

  // Color-code the category badge
  const catEl = document.getElementById('track-category');
  catEl.style.setProperty('--cat-color', getCategoryColor(chosen.category));

  resultCard.classList.add('visible');

  isAnimating = false;
  rollBtn.disabled = false;
  rollBtn.classList.remove('rolling');
});

// ─── Reverse toggle updates pool count ───────────────────────────────────────
reverseToggle && reverseToggle.addEventListener('change', updatePoolCount);

// ─── Init ─────────────────────────────────────────────────────────────────────
updatePoolCount();

// ─── Service Worker Registration ─────────────────────────────────────────────
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./service-worker.js')
      .then(reg => console.log('[SW] Registered, scope:', reg.scope))
      .catch(err => console.warn('[SW] Registration failed:', err));
  });
}
