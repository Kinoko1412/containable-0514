// ================= 假資料 =================
const books = [
  {
    title: '普通化學（第十版）',
    course: 'Chang & Goldsby · 普通化學 課程',
    emoji: '⚗️',
    bg: 'linear-gradient(135deg,#60a5fa,#3b82f6)',
    cycle: 4,
    carbon: '3.2',
    priceHint: '100 點',
    isbn: '978-1259638138',
    keywords: ['化學', '化学', 'chemistry', 'chem', 'chang', 'goldsby', '普化'],
    tags: [{ text: '良好', cls: 'green' }, { text: '化學系' }, { text: '大一必修' }]
  },
  {
    title: '普通物理學',
    course: 'Halliday · 大一物理必修',
    emoji: '⚛️',
    bg: 'linear-gradient(135deg,#34d399,#10b981)',
    cycle: 6,
    carbon: '4.8',
    priceHint: '免費領取',
    isbn: '978-4714011524',
    keywords: ['物理', '物理學', 'physics', 'halliday', '普物', '力學', '電磁'],
    tags: [{ text: '良好', cls: 'green' }, { text: '物理系' }, { text: '大一必修' }]
  },
  {
    title: '微積分（Stewart）',
    course: 'James Stewart · 通識數學',
    emoji: '∫',
    bg: 'linear-gradient(135deg,#a78bfa,#7c3aed)',
    cycle: 8,
    carbon: '6.4',
    priceHint: '80 點',
    isbn: '978-0357042922',
    keywords: ['微積分', 'calculus', 'stewart', '數學', '数学'],
    tags: [{ text: '普通' }, { text: '通識' }, { text: '熱門' }]
  },
  {
    title: '線性代數導論',
    course: 'Gilbert Strang · 電機系課程',
    emoji: '📐',
    bg: 'linear-gradient(135deg,#fbbf24,#f59e0b)',
    cycle: 12,
    carbon: '9.6',
    priceHint: '120 點',
    isbn: '978-0980232776',
    keywords: ['線性', '代數', 'linear', 'algebra', 'strang', '矩陣', '電機'],
    tags: [{ text: '良好', cls: 'green' }, { text: '電機系' }, { text: '熱門 No.1' }]
  },
  {
    title: '經濟學原理',
    course: 'N. Gregory Mankiw · 經濟系',
    emoji: '💰',
    bg: 'linear-gradient(135deg,#ec4899,#db2777)',
    cycle: 9,
    carbon: '7.2',
    priceHint: '90 點',
    isbn: '978-1305585126',
    keywords: ['經濟', '经济', 'economics', 'mankiw', '個經', '總經'],
    tags: [{ text: '普通' }, { text: '經濟系' }, { text: '熱門' }]
  },
  {
    title: '資料結構與演算法',
    course: '資工系 · 大二必修',
    emoji: '💻',
    bg: 'linear-gradient(135deg,#06b6d4,#0891b2)',
    cycle: 7,
    carbon: '5.6',
    priceHint: '免費',
    isbn: '978-9862769485',
    keywords: ['資料結構', '演算法', 'algorithm', 'dsa', '資工', '程式'],
    tags: [{ text: '良好', cls: 'green' }, { text: '資工系' }, { text: '免費' }]
  },
  {
    title: '普通生物學',
    course: 'Campbell · 生科系必修',
    emoji: '🧬',
    bg: 'linear-gradient(135deg,#84cc16,#65a30d)',
    cycle: 6,
    carbon: '4.8',
    priceHint: '110 點',
    isbn: '978-1292170435',
    keywords: ['生物', 'biology', 'campbell', '細胞', '遺傳'],
    tags: [{ text: '良好', cls: 'green' }, { text: '生科系' }]
  }
];

/**
 * 校內自動化回收櫃站點（經緯度由使用者提供）
 * fillLevel：櫃體「已使用」比例 0–100（剩餘空間 = 100 - fillLevel）
 */
const RECYCLING_CABINETS = [
  { id: 'dorm', name: '學生宿舍', lng: 120.278621, lat: 22.735409, fillLevel: 72, accepts: ['教材', '小型材料'], hub: '收集為主' },
  { id: 'eng', name: '工學院', lng: 120.276331, lat: 22.732598, fillLevel: 45, accepts: ['教材', '模組材料包'], hub: '收集／歸還' },
  { id: 'main-bldg', name: '綜合大樓', lng: 120.2771982, lat: 22.7314743, fillLevel: 38, accepts: ['教材', '薄型模型材'], hub: '收集／歸還' },
  { id: 'human', name: '人文社會學院', lng: 120.2815451, lat: 22.7353283, fillLevel: 55, accepts: ['教材', '設計類模型材'], hub: '收集／歸還' },
  { id: 'sci', name: '理學院', lng: 120.284714, lat: 22.735784, fillLevel: 33, accepts: ['教材', '實驗相關紙本'], hub: '收集／歸還' },
  { id: 'mgmt', name: '管理學院', lng: 120.288224, lat: 22.732792, fillLevel: 68, accepts: ['教材'], hub: '歸還為主' },
  { id: 'admin', name: '行政大樓', lng: 120.2846559, lat: 22.7339097, fillLevel: 41, accepts: ['教材'], hub: '收集／歸還' },
  { id: 'activity', name: '活動中心', lng: 120.281262, lat: 22.732462, fillLevel: 29, accepts: ['教材'], hub: '歸還' }
];

const MAPBOX_GL_VERSION = 'v3.9.4';
let _mapboxLoadPromise = null;

function loadMapboxGL() {
  if (typeof window.mapboxgl !== 'undefined') return Promise.resolve();
  if (_mapboxLoadPromise) return _mapboxLoadPromise;
  _mapboxLoadPromise = new Promise((resolve, reject) => {
    const cssHref = `https://api.mapbox.com/mapbox-gl-js/${MAPBOX_GL_VERSION}/mapbox-gl.css`;
    if (!document.querySelector(`link[data-mapbox-gl-css="${MAPBOX_GL_VERSION}"]`)) {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = cssHref;
      link.setAttribute('data-mapbox-gl-css', MAPBOX_GL_VERSION);
      document.head.appendChild(link);
    }
    const s = document.createElement('script');
    s.src = `https://api.mapbox.com/mapbox-gl-js/${MAPBOX_GL_VERSION}/mapbox-gl.js`;
    s.async = true;
    s.dataset.mapboxGl = MAPBOX_GL_VERSION;
    s.onload = () => resolve();
    s.onerror = () => {
      _mapboxLoadPromise = null;
      reject(new Error('無法載入 Mapbox 腳本，請檢查網路。'));
    };
    document.body.appendChild(s);
  });
  return _mapboxLoadPromise;
}

function escapeHtml(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function getMapboxAccessToken() {
  const meta = document.querySelector('meta[name="mapbox-access-token"]');
  const fromMeta = meta?.getAttribute('content')?.trim();
  if (fromMeta) return fromMeta;
  // Mapbox 官方文件常用示範 token，正式環境請改為你在 account.mapbox.com 建立的 token
  return 'pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw';
}

function remainingSpacePercent(fillLevel) {
  return Math.max(0, Math.min(100, 100 - fillLevel));
}

function capacityHue(fillLevel) {
  const r = remainingSpacePercent(fillLevel);
  if (r >= 40) return { main: '#16a34a', label: '空間充足' };
  if (r >= 15) return { main: '#ca8a04', label: '空間偏少' };
  return { main: '#dc2626', label: '即將額滿' };
}

function makeRecyclingMarkerElement(bin) {
  const { main } = capacityHue(bin.fillLevel);
  const remain = remainingSpacePercent(bin.fillLevel);
  const wrap = document.createElement('div');
  wrap.className = 'map-bin-marker';
  wrap.innerHTML = `
    <div class="map-bin-pill" style="background:${main}">剩 ${remain}%</div>
    <div class="map-bin-dot" style="background:${main}">♻</div>
  `;
  return wrap;
}

function recyclingPopupHTML(bin) {
  const remain = remainingSpacePercent(bin.fillLevel);
  const { label } = capacityHue(bin.fillLevel);
  const badges = bin.accepts.map((t) => `<span class="map-popup-badge">${escapeHtml(t)}</span>`).join('');
  return `
    <div class="map-popup-title">${escapeHtml(bin.name)}</div>
    <div class="map-popup-row"><strong>剩餘空間</strong> 約 ${remain}% · ${label}</div>
    <div class="map-popup-row"><strong>櫃體已使用</strong> ${bin.fillLevel}%</div>
    <div class="map-popup-row"><strong>驛站類型</strong> ${escapeHtml(bin.hub)}</div>
    <div class="map-popup-badges">${badges}</div>
  `;
}

function showMapLoadError(msg) {
  const el = document.getElementById('materialBankMap');
  if (!el) return;
  el.innerHTML = `<div class="map-mapbox-error"><b>地圖無法載入</b>${msg}<br><small>請確認 Mapbox Access Token 與網路連線。</small></div>`;
}

let _recyclingMarkersOnMap = false;
const _recyclingMarkers = [];

function fitRecyclingMapBounds() {
  const map = window._materialBankMap;
  if (!map || typeof map.loaded !== 'function' || !map.loaded()) return;
  const bounds = new mapboxgl.LngLatBounds();
  RECYCLING_CABINETS.forEach((b) => bounds.extend([b.lng, b.lat]));
  map.fitBounds(bounds, { padding: 48, maxZoom: 16.2, duration: 600 });
}

function initMaterialBankMap() {
  const container = document.getElementById('materialBankMap');
  if (!container) return;

  if (window._materialBankMap) {
    window._materialBankMap.resize();
    return;
  }

  container.innerHTML = '<div class="map-loading-hint" role="status" aria-live="polite">正在載入地圖元件…</div>';

  loadMapboxGL()
    .then(() => {
      const c = document.getElementById('materialBankMap');
      if (!c) return;
      if (window._materialBankMap) {
        window._materialBankMap.resize();
        return;
      }
      c.innerHTML = '';
      createMaterialBankMapInstance();
    })
    .catch((err) => {
      showMapLoadError(escapeHtml(err.message || String(err)));
    });
}

function createMaterialBankMapInstance() {
  const container = document.getElementById('materialBankMap');
  if (!container || typeof mapboxgl === 'undefined') {
    showMapLoadError('Mapbox GL 未就緒。');
    return;
  }

  if (window._materialBankMap) {
    window._materialBankMap.resize();
    return;
  }

  mapboxgl.accessToken = getMapboxAccessToken();

  const centerLng = 120.281569;
  const centerLat = 22.73372;

  let map;
  try {
    map = new mapboxgl.Map({
      container,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [centerLng, centerLat],
      zoom: 15.2,
      pitch: 0,
      attributionControl: true,
      cooperativeGestures: false
    });
  } catch (e) {
    showMapLoadError(escapeHtml(String(e.message || e)));
    return;
  }

  window._materialBankMap = map;

  map.addControl(new mapboxgl.NavigationControl({ showCompass: false }), 'top-right');
  map.addControl(new mapboxgl.ScaleControl({ maxWidth: 100, unit: 'metric' }));

  map.on('error', (e) => {
    const err = e?.error?.message || e?.error || '';
    if (String(err).includes('Unauthorized') || String(err).includes('401')) {
      showMapLoadError('Token 無效或未授權。請在 index.html 的 meta mapbox-access-token 設定有效 token。');
    }
  });

  map.on('load', () => {
    if (_recyclingMarkersOnMap) return;
    _recyclingMarkersOnMap = true;
    _recyclingMarkers.length = 0;
    RECYCLING_CABINETS.forEach((bin) => {
      const el = makeRecyclingMarkerElement(bin);
      const popup = new mapboxgl.Popup({ offset: 18, maxWidth: '280px' }).setHTML(recyclingPopupHTML(bin));
      const marker = new mapboxgl.Marker({ element: el, anchor: 'bottom' }).setLngLat([bin.lng, bin.lat]).setPopup(popup).addTo(map);
      _recyclingMarkers.push(marker);
      el.addEventListener('click', () => {
        map.flyTo({ center: [bin.lng, bin.lat], zoom: Math.max(map.getZoom(), 16), duration: 500 });
      });
    });
    fitRecyclingMapBounds();
  });
}

function bookHaystack(book) {
  const parts = [book.title, book.course, book.isbn || '', book.priceHint || '', ...(book.keywords || [])];
  (book.tags || []).forEach((t) => parts.push(t.text));
  return parts.join(' ').toLowerCase();
}

function bookMatchesQuery(book, rawQuery) {
  const q = rawQuery.trim().toLowerCase();
  if (!q) return false;
  const hay = bookHaystack(book);
  const terms = q.split(/\s+/).filter(Boolean);
  return terms.some((term) => hay.includes(term));
}

function filterBooksByQuery(rawQuery) {
  const out = [];
  books.forEach((book, idx) => {
    if (bookMatchesQuery(book, rawQuery)) out.push({ book, idx });
  });
  return out;
}

function renderSearchRecCard(book, idx) {
  const mainTag = book.tags && book.tags[0];
  const badge = mainTag ? escapeHtml(mainTag.text) : '';
  const badgeHtml = badge ? `<span class="rec-badge">${badge}</span>` : '';
  return `
    <div class="rec-card" role="button" tabindex="0" data-book-idx="${idx}" onclick="openDetail(${idx})" onkeydown="searchResultCardKey(event,${idx})">
      <div class="rec-img" style="background:${book.bg}">
        <span class="rec-emoji" aria-hidden="true">${book.emoji}</span>
        ${badgeHtml}
      </div>
      <div class="rec-info">
        <div class="rec-title">${escapeHtml(book.title)}</div>
        <div class="rec-meta">${escapeHtml(book.course)}</div>
        <div class="rec-foot">
          <span class="rec-cycle">♻ 已循環 ${book.cycle} 次</span>
          <span class="rec-price">${escapeHtml(book.priceHint || '')}</span>
        </div>
      </div>
    </div>
  `;
}

function searchResultCardKey(e, idx) {
  if (e.key === 'Enter' || e.key === ' ') {
    e.preventDefault();
    openDetail(idx);
  }
}

function openSearchResultsPage() {
  const input = document.getElementById('searchInput');
  if (!input) return;
  const q = input.value.trim();
  if (!q) {
    showToast('請輸入關鍵字');
    input.focus();
    return;
  }
  goPage('search');
}

function renderSearchResultsPage(q) {
  const scroll = document.getElementById('pageSearchResultsScroll');
  const live = document.getElementById('searchPageLiveMsg');
  const empty = document.getElementById('searchPageEmpty');
  const queryEl = document.getElementById('searchPageQuery');
  if (!scroll || !live || !empty || !queryEl) return;

  const trimmed = (q || '').trim();
  if (!trimmed) {
    queryEl.textContent = '';
    scroll.innerHTML = '';
    empty.classList.remove('hidden');
    live.textContent = '請從首頁輸入關鍵字後再按「搜尋」。';
    return;
  }

  queryEl.textContent = `關鍵字：「${trimmed}」`;

  const matches = filterBooksByQuery(trimmed);
  if (matches.length === 0) {
    scroll.innerHTML = '';
    empty.classList.remove('hidden');
    live.textContent = '找不到符合的教材。';
    return;
  }

  empty.classList.add('hidden');
  live.textContent = `找到 ${matches.length} 本教材 · 點選可查看循環次數與點數`;
  scroll.innerHTML = matches.map((m) => renderSearchRecCard(m.book, m.idx)).join('');
}

function goHomeAndFocusSearch() {
  goPage('home');
  requestAnimationFrame(() => {
    document.getElementById('searchInput')?.focus();
  });
}

function hotTagKey(e, el) {
  if (e.key === 'Enter' || e.key === ' ') {
    e.preventDefault();
    searchTag(el);
  }
}

// ================= 頁面切換 =================
function goPage(target) {
  const pages = document.querySelectorAll('.page');
  pages.forEach(p => p.classList.remove('active'));
  const next = document.querySelector(`.page[data-page="${target}"]`);
  if (next) {
    next.classList.add('active');
    const scrollEl = next.querySelector('.page-scroll');
    if (scrollEl) scrollEl.scrollTop = 0;
  }
  document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
  const nav = document.querySelector(`.nav-item[data-target="${target}"]`);
  if (nav) nav.classList.add('active');
  else if (target === 'map' || target === 'search') {
    const homeNav = document.querySelector('.nav-item[data-target="home"]');
    if (homeNav) homeNav.classList.add('active');
  }

  if (target === 'search') {
    const q = document.getElementById('searchInput')?.value.trim() || '';
    renderSearchResultsPage(q);
  }

  if (target === 'map') {
    requestAnimationFrame(() => {
      initMaterialBankMap();
      setTimeout(() => window._materialBankMap?.resize(), 120);
      setTimeout(() => window._materialBankMap?.resize(), 400);
      setTimeout(() => window._materialBankMap?.resize(), 900);
    });
  }
}

// ================= 開啟教材詳細 =================
function openDetail(idx) {
  const book = books[idx] || books[0];
  const cover = document.getElementById('detailCover');
  const emoji = document.getElementById('detailEmoji');
  const title = document.getElementById('detailTitle');
  const course = document.getElementById('detailCourse');
  const cycle = document.getElementById('detailCycle');
  const carbon = document.getElementById('detailCarbon');
  cover.style.background = book.bg;
  emoji.textContent = book.emoji;
  title.textContent = book.title;
  course.textContent = book.course;
  cycle.textContent = book.cycle;
  carbon.innerHTML = `${book.carbon}<span>kg</span>`;

  const tagWrap = document.querySelector('.detail-tags');
  tagWrap.innerHTML = book.tags.map(t => `<span class="dt-tag ${t.cls || ''}">${t.text}</span>`).join('');

  goPage('detail');
}

// ================= Toast 提示 =================
function showToast(msg) {
  const toast = document.getElementById('toast');
  toast.textContent = msg;
  toast.classList.add('show');
  clearTimeout(window._toastT);
  window._toastT = setTimeout(() => toast.classList.remove('show'), 1800);
}

// 覆寫 alert 為 toast（更像 App）
window.alert = function (msg) {
  showToast(msg);
};

// ================= 互動 =================
function searchTag(el) {
  const input = document.getElementById('searchInput');
  if (!input) return;
  input.value = el.textContent.replace(/[🔥\s]/g, '').trim();
  openSearchResultsPage();
}

function simulateQR() {
  showToast('📷 啟動相機掃描中...');
  setTimeout(() => showToast('✓ QR Code 辨識完成，已自動填入'), 1500);
}

function addPhoto(el) {
  const colors = [
    'linear-gradient(135deg,#60a5fa,#3b82f6)',
    'linear-gradient(135deg,#34d399,#10b981)',
    'linear-gradient(135deg,#fbbf24,#f59e0b)',
    'linear-gradient(135deg,#a78bfa,#7c3aed)'
  ];
  el.style.background = colors[Math.floor(Math.random() * colors.length)];
  el.innerHTML = '<span style="font-size:36px">📚</span>';
  el.classList.add('filled');
  el.classList.remove('empty');
  showToast('✓ 照片已新增');
}

function submitUpload() {
  showToast('🎉 上架成功！已獲得 150 點');
  setTimeout(() => goPage('home'), 1500);
}

function toggleFav(btn) {
  const svg = btn.querySelector('svg path');
  if (btn.dataset.fav === 'on') {
    btn.dataset.fav = 'off';
    svg.setAttribute('fill', 'none');
    showToast('已取消收藏');
  } else {
    btn.dataset.fav = 'on';
    svg.setAttribute('fill', '#ef4444');
    svg.setAttribute('stroke', '#ef4444');
    showToast('❤ 已加入收藏');
  }
}

function updatePoints(val) {
  document.getElementById('usePoints').textContent = parseInt(val).toLocaleString();
  document.getElementById('useMoney').textContent = Math.floor(val / 10).toLocaleString();
}

// 商家點選 切換 active 高亮（chip toggle）
document.addEventListener('click', e => {
  const chip = e.target.closest('.chip-toggle');
  if (chip) {
    const siblings = chip.parentElement.querySelectorAll('.chip-toggle');
    siblings.forEach(s => s.classList.remove('active'));
    chip.classList.add('active');
  }
});

// 啟動：預設首頁
goPage('home');

(function syncRecyclingCardMeta() {
  const el = document.getElementById('recyclingMapCardMeta');
  if (el) el.textContent = `Mapbox · ${RECYCLING_CABINETS.length} 處循環驛站`;
})();
