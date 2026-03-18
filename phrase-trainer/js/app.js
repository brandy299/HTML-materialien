// ─── Business English Phrase Trainer · App Logic ─────────────────────────────

// ── State ──────────────────────────────────────────────────────────────────
let state = {
  mode: 'de-en',          // 'de-en' | 'en-func'
  currentTopic: null,
  queue: [],              // cards to study this session
  queueIndex: 0,
  flipped: false,
  sessionDone: 0,
  streak: 0,
  lastStudyDate: null,
};

// ── LocalStorage keys ─────────────────────────────────────────────────────
const LS_REVIEWS = 'pt_reviews';   // { cardId: { interval, ease, reps, due } }
const LS_STREAK  = 'pt_streak';
const LS_LASTDAY = 'pt_lastday';

function loadReviews() { return JSON.parse(localStorage.getItem(LS_REVIEWS) || '{}'); }
function saveReviews(r) { localStorage.setItem(LS_REVIEWS, JSON.stringify(r)); }
function loadStreak() {
  const s = parseInt(localStorage.getItem(LS_STREAK) || '0');
  const last = localStorage.getItem(LS_LASTDAY);
  const today = todayStr();
  if (last === today) return s;
  if (last === yesterdayStr()) return s; // streak continues
  return 0; // broken
}
function todayStr() { return new Date().toISOString().slice(0,10); }
function yesterdayStr() {
  const d = new Date(); d.setDate(d.getDate()-1);
  return d.toISOString().slice(0,10);
}

// ── Due cards ──────────────────────────────────────────────────────────────
function getDueCards(topicKey) {
  const reviews = loadReviews();
  const now = Date.now();
  return PHRASES[topicKey].cards.filter(card => {
    const r = reviews[card.id];
    if (!r) return true;          // never seen
    return r.due <= now;          // due now
  });
}

function getAllDueCount() {
  const reviews = loadReviews();
  const now = Date.now();
  return Object.values(PHRASES).reduce((acc, topic) =>
    acc + topic.cards.filter(c => { const r = reviews[c.id]; return !r || r.due <= now; }).length, 0);
}

function getMasteredCount() {
  const reviews = loadReviews();
  return Object.values(PHRASES).reduce((acc, topic) =>
    acc + topic.cards.filter(c => { const r = reviews[c.id]; return r && r.interval >= 7; }).length, 0);
}

// ── Interval label ─────────────────────────────────────────────────────────
function intervalLabel(days) {
  if (days < 1) return '< 1 Tag';
  if (days === 1) return '1 Tag';
  if (days < 7) return `${days} Tage`;
  if (days < 30) return `${Math.round(days/7)} Wo.`;
  return `${Math.round(days/30)} Mon.`;
}

// ── Mode ──────────────────────────────────────────────────────────────────
function setMode(mode) {
  state.mode = mode;
  document.querySelectorAll('.mode-btn').forEach(b => {
    b.classList.toggle('active', b.dataset.mode === mode);
  });
}

// ── Home screen ───────────────────────────────────────────────────────────
function renderHome() {
  const reviews = loadReviews();
  const now = Date.now();

  // Stats bar
  const total = Object.values(PHRASES).reduce((a, t) => a + t.cards.length, 0);
  document.getElementById('stat-total').textContent = total;
  document.getElementById('stat-due').textContent = getAllDueCount();
  document.getElementById('stat-mastered').textContent = getMasteredCount();

  // Streak
  const streak = loadStreak();
  document.getElementById('streak-count').textContent = streak;

  // Topic cards
  const grid = document.getElementById('topic-grid');
  grid.innerHTML = '';
  for (const [key, topic] of Object.entries(PHRASES)) {
    const due = getDueCards(key).length;
    const total = topic.cards.length;
    const seen = topic.cards.filter(c => reviews[c.id]).length;
    const pct = total > 0 ? Math.round((seen / total) * 100) : 0;

    const card = document.createElement('div');
    card.className = 'topic-card fade-up';
    card.style.setProperty('--topic-color', topic.color);
    card.onclick = () => startStudy(key);
    card.innerHTML = `
      ${due > 0 ? `<div class="topic-due-badge">${due} fällig</div>` : ''}
      <div class="topic-icon">${topic.icon}</div>
      <div class="topic-name">${topic.label}</div>
      <div class="topic-count">${total} Phrasen · ${pct}% gesehen</div>
      <div class="topic-progress">
        <div class="topic-progress-fill" style="width:${pct}%; background:${topic.color}"></div>
      </div>
    `;
    grid.appendChild(card);
  }
}

// ── Study session ─────────────────────────────────────────────────────────
function startStudy(topicKey) {
  const topic = PHRASES[topicKey];
  state.currentTopic = topicKey;
  state.sessionDone = 0;
  state.flipped = false;

  // Build queue: due cards first, then new, shuffle each group
  const reviews = loadReviews();
  const now = Date.now();
  const due = topic.cards.filter(c => { const r = reviews[c.id]; return r && r.due <= now; });
  const newCards = topic.cards.filter(c => !reviews[c.id]);
  state.queue = [...shuffle(due), ...shuffle(newCards)];

  if (state.queue.length === 0) {
    alert('Alle Karten dieses Themas sind gelernt! Schau morgen wieder vorbei. 🎉');
    return;
  }

  state.queueIndex = 0;

  // Update study header
  document.getElementById('study-topic-label').textContent = topic.icon + ' ' + topic.label;
  updateStudyProgress();

  showScreen('screen-study');
  showCard();
}

function showCard() {
  const card = state.queue[state.queueIndex];
  if (!card) { endSession(); return; }

  state.flipped = false;
  const inner = document.getElementById('card-inner');
  inner.classList.remove('flipped');

  // Front
  const modeTag = document.getElementById('card-mode-tag');
  const prompt  = document.getElementById('card-prompt');
  if (state.mode === 'de-en') {
    modeTag.textContent = '🇩🇪 Deutsch → Englisch';
    prompt.textContent = card.de;
  } else {
    modeTag.textContent = '🇬🇧 Phrase → Funktion';
    prompt.textContent = card.en;
  }

  // Back
  const answer = document.getElementById('card-answer');
  const func   = document.getElementById('card-function');
  if (state.mode === 'de-en') {
    answer.textContent = card.en;
    func.textContent = card.function;
  } else {
    answer.textContent = card.function;
    func.textContent = card.en;
  }

  // Preview intervals on rating buttons
  const reviews = loadReviews();
  const current = reviews[card.id] || {};
  [0,1,2,3].forEach(r => {
    const next = nextReview(current, r);
    document.getElementById(`int-${r}`).textContent = intervalLabel(next.interval);
  });

  // Hide rating, show card
  document.getElementById('rating-area').style.display = 'none';
  document.getElementById('flashcard').style.pointerEvents = 'auto';

  // Animate in
  const cardEl = document.getElementById('flashcard');
  cardEl.classList.remove('fade-up');
  void cardEl.offsetWidth;
  cardEl.classList.add('fade-up');
}

function flipCard() {
  if (state.flipped) return;
  state.flipped = true;
  document.getElementById('card-inner').classList.add('flipped');
  document.getElementById('flashcard').style.pointerEvents = 'none';

  setTimeout(() => {
    const ra = document.getElementById('rating-area');
    ra.style.display = 'block';
    ra.classList.remove('fade-up');
    void ra.offsetWidth;
    ra.classList.add('fade-up');
  }, 200);
}

function rate(rating) {
  const card = state.queue[state.queueIndex];
  const reviews = loadReviews();
  const current = reviews[card.id] || {};
  reviews[card.id] = nextReview(current, rating);
  saveReviews(reviews);

  state.sessionDone++;

  // If 'Again', push card to end of queue
  if (rating === 0) {
    state.queue.push(card);
  }

  state.queueIndex++;
  updateStudyProgress();

  if (state.queueIndex >= state.queue.length) {
    endSession();
  } else {
    showCard();
  }
}

function updateStudyProgress() {
  const done = Math.min(state.queueIndex, state.queue.length);
  const total = state.queue.length;
  const pct = total > 0 ? (done / total) * 100 : 0;
  document.getElementById('progress-bar').style.width = pct + '%';
  document.getElementById('study-done').textContent = done;
  document.getElementById('study-total').textContent = total;
}

// ── Session end ───────────────────────────────────────────────────────────
function endSession() {
  // Update streak
  const today = todayStr();
  const lastDay = localStorage.getItem(LS_LASTDAY);
  let streak = loadStreak();
  if (lastDay !== today) { streak++; }
  localStorage.setItem(LS_STREAK, streak);
  localStorage.setItem(LS_LASTDAY, today);

  // Done screen
  document.getElementById('done-emoji').textContent = streak >= 7 ? '🏆' : '🎉';
  document.getElementById('done-title').textContent = state.sessionDone >= 10 ? 'Klasse gemacht!' : 'Session abgeschlossen!';
  document.getElementById('done-sub').textContent =
    `Du hast ${state.sessionDone} Karten in dieser Session gelernt. Komm morgen wieder für die nächste Runde!`;
  document.getElementById('done-cards').textContent = state.sessionDone;
  document.getElementById('done-streak').textContent = streak;
  document.getElementById('streak-count').textContent = streak;

  // More cards button
  const moreBtn = document.getElementById('btn-study-more');
  const allDue = getAllDueCount();
  moreBtn.style.display = allDue > 0 ? 'block' : 'none';

  showScreen('screen-done');
  launchConfetti();
}

function studyMoreToday() {
  // Find topic with most due cards
  let best = null, bestCount = 0;
  for (const key of Object.keys(PHRASES)) {
    const count = getDueCards(key).length;
    if (count > bestCount) { bestCount = count; best = key; }
  }
  if (best) startStudy(best);
  else { alert('Keine weiteren fälligen Karten heute. 🎉'); goHome(); }
}

// ── Navigation ────────────────────────────────────────────────────────────
function showScreen(id) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  document.getElementById(id).classList.add('active');
  window.scrollTo(0, 0);
}

function goHome() {
  renderHome();
  showScreen('screen-home');
}

function confirmReset() {
  if (confirm('Wirklich den gesamten Lernfortschritt zurücksetzen?\nDiese Aktion kann nicht rückgängig gemacht werden.')) {
    localStorage.removeItem(LS_REVIEWS);
    localStorage.removeItem(LS_STREAK);
    localStorage.removeItem(LS_LASTDAY);
    renderHome();
    document.getElementById('streak-count').textContent = '0';
    alert('Fortschritt zurückgesetzt. Viel Erfolg beim Neustarten! 💪');
  }
}

// ── Utilities ─────────────────────────────────────────────────────────────
function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// ── Confetti ──────────────────────────────────────────────────────────────
function launchConfetti() {
  const canvas = document.createElement('canvas');
  canvas.id = 'confetti-canvas';
  document.body.appendChild(canvas);
  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const colors = ['#6366f1','#8b5cf6','#f59e0b','#10b981','#f43f5e'];
  const particles = Array.from({ length: 80 }, () => ({
    x: Math.random() * canvas.width,
    y: -10,
    vx: (Math.random() - 0.5) * 3,
    vy: 2 + Math.random() * 3,
    size: 6 + Math.random() * 8,
    color: colors[Math.floor(Math.random() * colors.length)],
    rot: Math.random() * 360,
    rSpeed: (Math.random() - 0.5) * 8,
  }));

  let frame;
  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    let alive = false;
    particles.forEach(p => {
      if (p.y > canvas.height + 20) return;
      alive = true;
      p.x += p.vx; p.y += p.vy; p.vy += 0.05;
      p.rot += p.rSpeed;
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rot * Math.PI / 180);
      ctx.fillStyle = p.color;
      ctx.fillRect(-p.size/2, -p.size/4, p.size, p.size/2);
      ctx.restore();
    });
    if (alive) frame = requestAnimationFrame(draw);
    else { cancelAnimationFrame(frame); canvas.remove(); }
  }
  draw();
  setTimeout(() => { cancelAnimationFrame(frame); canvas.remove(); }, 4000);
}

// ── Init ──────────────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  renderHome();
});
