// ═══════════════════════════════════════════════
//  NEW MODULES — Pronunciation, Listening, Idioms,
//  Speaking Timer, Writing Templates
// ═══════════════════════════════════════════════

// ── PRONUNCIATION ─────────────────────────────
let currentPronLevel = 'all';

function renderPronunciation() {
  const grid = document.getElementById('pron-grid');
  const filtered = PRONUNCIATION.filter(p => currentPronLevel === 'all' || p.level === currentPronLevel);
  grid.innerHTML = filtered.map(p => `
    <div class="pron-card">
      <span class="pron-level ${p.level}">${p.level}</span>
      <div class="pron-word">${p.word}</div>
      <div class="pron-phonetic">${p.phonetic}</div>
      <div class="pron-syllables">${p.syllables}</div>
      <div class="pron-tip">💡 ${p.tip}</div>
      <div class="pron-example">"${p.example}"</div>
      <button class="btn-secondary pron-speak-btn" onclick="speakWord('${p.word}', '${p.syllables}')">
        🔊 Listen & Practice
      </button>
    </div>
  `).join('');
}

function speakWord(word, syllables) {
  const u = new SpeechSynthesisUtterance(word);
  u.lang = 'en-US'; u.rate = 0.75;
  speechSynthesis.speak(u);
  setTimeout(() => {
    const u2 = new SpeechSynthesisUtterance(syllables);
    u2.lang = 'en-US'; u2.rate = 0.6;
    speechSynthesis.speak(u2);
  }, 1200);
}

document.getElementById('pron-filter').addEventListener('click', e => {
  const tab = e.target.closest('[data-plevel]');
  if (!tab) return;
  currentPronLevel = tab.dataset.plevel;
  document.querySelectorAll('#pron-filter .filter-tab').forEach(t => t.classList.remove('active'));
  tab.classList.add('active');
  renderPronunciation();
});

// ── LISTENING ──────────────────────────────────
let currentListening = 0;
let listenAnswers = {};
let listenScores = {};
let isPlaying = false;
let currentUtterance = null;

function renderListeningTabs() {
  const tabs = document.getElementById('listening-tabs');
  tabs.innerHTML = LISTENING_SCRIPTS.map((s, i) => `
    <button class="listening-tab ${i === 0 ? 'active' : ''}" data-li="${i}">
      ${i===0?'🟢':i===1?'🟡':'🔴'} ${s.title}
    </button>
  `).join('');
  tabs.addEventListener('click', e => {
    const tab = e.target.closest('[data-li]');
    if (!tab) return;
    currentListening = parseInt(tab.dataset.li);
    document.querySelectorAll('.listening-tab').forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    listenAnswers = {};
    renderListeningCard();
  });
}

function renderListeningCard() {
  const s = LISTENING_SCRIPTS[currentListening];
  const card = document.getElementById('listening-card');
  card.innerHTML = `
    <div class="listening-card-header">
      <div>
        <h3>${s.title}</h3>
        <div class="listening-meta">
          <span>📊 ${s.level}</span>
          <span>💬 ${s.topic}</span>
          <span>⏱️ ${s.duration}</span>
        </div>
      </div>
    </div>
    <div class="listening-player">
      <div class="player-controls">
        <button class="play-btn" id="play-btn-${currentListening}" onclick="togglePlay(${currentListening})">▶</button>
        <div class="player-info">
          <div class="player-title">${s.title}</div>
          <div class="player-duration">Click play to hear the answer read aloud</div>
        </div>
        <button class="script-toggle" onclick="toggleScript(${currentListening})">📄 Show Script</button>
      </div>
      <div class="script-box" id="script-box-${currentListening}">${s.text}</div>
    </div>
    <div class="listening-questions">
      <h4>Comprehension Questions</h4>
      ${s.questions.map((q, qi) => `
        <div class="listen-q" id="lq-${qi}">
          <p>${qi+1}. ${q.q}</p>
          <div class="listen-opts">
            ${q.opts.map((opt, oi) => `
              <button class="listen-opt" id="lo-${qi}-${oi}" onclick="answerListen(${currentListening},${qi},${oi})">${opt}</button>
            `).join('')}
          </div>
        </div>
      `).join('')}
      <div class="listening-score-row" id="listening-score-row">
        🎯 You scored <strong id="listen-score-text">0/0</strong> — <span id="listen-score-msg"></span>
      </div>
    </div>
  `;
}

function togglePlay(idx) {
  const s = LISTENING_SCRIPTS[idx];
  const btn = document.getElementById(`play-btn-${idx}`);
  if (isPlaying) {
    speechSynthesis.cancel();
    isPlaying = false;
    btn.textContent = '▶';
    return;
  }
  currentUtterance = new SpeechSynthesisUtterance(s.text);
  currentUtterance.lang = 'en-US';
  currentUtterance.rate = 0.9;
  currentUtterance.onend = () => { isPlaying = false; btn.textContent = '▶'; };
  speechSynthesis.speak(currentUtterance);
  isPlaying = true;
  btn.textContent = '⏸';
}

function toggleScript(idx) {
  const box = document.getElementById(`script-box-${idx}`);
  box.classList.toggle('visible');
}

function answerListen(scriptIdx, qi, oi) {
  if (listenAnswers[qi] !== undefined) return;
  listenAnswers[qi] = oi;
  const q = LISTENING_SCRIPTS[scriptIdx].questions[qi];
  document.querySelectorAll(`#lq-${qi} .listen-opt`).forEach((btn, i) => {
    btn.disabled = true;
    if (i === q.ans) btn.classList.add('correct');
    if (i === oi && oi !== q.ans) btn.classList.add('wrong');
  });
  const total = LISTENING_SCRIPTS[scriptIdx].questions.length;
  if (Object.keys(listenAnswers).length === total) {
    const correct = Object.entries(listenAnswers).filter(([qi, oi]) =>
      oi === LISTENING_SCRIPTS[scriptIdx].questions[qi].ans
    ).length;
    const scoreRow = document.getElementById('listening-score-row');
    document.getElementById('listen-score-text').textContent = `${correct}/${total}`;
    document.getElementById('listen-score-msg').textContent =
      correct === total ? '🏆 Perfect!' : correct >= total/2 ? '👍 Good job!' : '📚 Keep practicing!';
    scoreRow.style.display = 'block';
  }
}

// ── IDIOMS ────────────────────────────────────
let currentIdiomLevel = 'all';

function renderIdioms() {
  const grid = document.getElementById('idioms-grid');
  const filtered = IDIOMS.filter(i => currentIdiomLevel === 'all' || i.level === currentIdiomLevel);
  grid.innerHTML = filtered.map(idiom => `
    <div class="idiom-card">
      <div class="idiom-title">"${idiom.idiom}"</div>
      <span class="idiom-level ${idiom.level}">${idiom.level}</span>
      <div class="idiom-meaning">📖 ${idiom.meaning}</div>
      <div class="idiom-example">"${idiom.example}"</div>
      <div class="idiom-usage">🎯 ${idiom.usage}</div>
    </div>
  `).join('');
}

document.getElementById('idiom-filter').addEventListener('click', e => {
  const tab = e.target.closest('[data-ilevel]');
  if (!tab) return;
  currentIdiomLevel = tab.dataset.ilevel;
  document.querySelectorAll('#idiom-filter .filter-tab').forEach(t => t.classList.remove('active'));
  tab.classList.add('active');
  renderIdioms();
});

// ── SPEAKING TIMER ────────────────────────────
let currentChallenge = null;
let timerInterval = null;
let timerElapsed = 0;
let timerRunning = false;

function renderSpeakingGrid() {
  const grid = document.getElementById('speaking-grid');
  grid.innerHTML = SPEAKING_CHALLENGES.map(c => `
    <div class="speaking-card" onclick="openChallenge(${c.id})">
      <div class="speaking-card-icon">${c.icon}</div>
      <h3>${c.title}</h3>
      <p>${c.prompt.substring(0, 100)}...</p>
      <span class="time-badge">⏱️ ${c.timeSeconds >= 60 ? Math.floor(c.timeSeconds/60)+' min' : c.timeSeconds+' sec'}</span>
    </div>
  `).join('');
}

function openChallenge(id) {
  currentChallenge = SPEAKING_CHALLENGES.find(c => c.id === id);
  timerElapsed = 0; timerRunning = false;
  clearInterval(timerInterval);
  document.getElementById('speaking-grid').style.display = 'none';
  document.getElementById('speaking-workspace').style.display = 'block';
  document.getElementById('challenge-title').textContent = currentChallenge.title;
  document.getElementById('challenge-prompt').innerHTML = `<p>${currentChallenge.prompt}</p>`;
  document.getElementById('challenge-tips').innerHTML = currentChallenge.tips.map(t =>
    `<div class="challenge-tip-item">✓ ${t}</div>`
  ).join('');
  document.getElementById('sample-answer').style.display = 'none';
  document.getElementById('sample-answer').textContent = currentChallenge.sampleAnswer;
  document.getElementById('show-sample-btn').textContent = '👁️ Show Sample Answer';
  document.getElementById('timer-start-btn').style.display = 'inline-flex';
  document.getElementById('timer-reset-btn').style.display = 'none';
  updateTimerDisplay();
}

document.getElementById('back-to-challenges').addEventListener('click', () => {
  clearInterval(timerInterval);
  timerRunning = false;
  document.getElementById('speaking-grid').style.display = 'grid';
  document.getElementById('speaking-workspace').style.display = 'none';
});

document.getElementById('timer-start-btn').addEventListener('click', () => {
  if (!currentChallenge) return;
  timerRunning = true;
  timerElapsed = 0;
  document.getElementById('timer-start-btn').style.display = 'none';
  document.getElementById('timer-reset-btn').style.display = 'inline-flex';
  timerInterval = setInterval(() => {
    timerElapsed++;
    updateTimerDisplay();
    if (timerElapsed >= currentChallenge.timeSeconds) {
      clearInterval(timerInterval);
      timerRunning = false;
      document.getElementById('timer-text').textContent = '✓';
      const fill = document.getElementById('timer-ring-fill');
      fill.classList.remove('warning','danger');
      fill.classList.add('done');
      speechSynthesis.speak(new SpeechSynthesisUtterance("Time's up! Great job!"));
    }
  }, 1000);
});

document.getElementById('timer-reset-btn').addEventListener('click', () => {
  clearInterval(timerInterval);
  timerElapsed = 0; timerRunning = false;
  document.getElementById('timer-start-btn').style.display = 'inline-flex';
  document.getElementById('timer-reset-btn').style.display = 'none';
  const fill = document.getElementById('timer-ring-fill');
  fill.classList.remove('warning','danger','done');
  updateTimerDisplay();
});

document.getElementById('show-sample-btn').addEventListener('click', () => {
  const box = document.getElementById('sample-answer');
  const btn = document.getElementById('show-sample-btn');
  const visible = box.style.display !== 'none';
  box.style.display = visible ? 'none' : 'block';
  btn.textContent = visible ? '👁️ Show Sample Answer' : '🙈 Hide Sample Answer';
});

function updateTimerDisplay() {
  if (!currentChallenge) return;
  const total = currentChallenge.timeSeconds;
  const remaining = Math.max(0, total - timerElapsed);
  const m = Math.floor(remaining / 60);
  const s = remaining % 60;
  document.getElementById('timer-text').textContent = `${m}:${s.toString().padStart(2,'0')}`;
  const progress = timerElapsed / total;
  const circumference = 339;
  const offset = circumference - (progress * circumference);
  const fill = document.getElementById('timer-ring-fill');
  fill.style.strokeDashoffset = offset;
  fill.classList.remove('warning','danger','done');
  if (progress > 0.75) fill.classList.add('danger');
  else if (progress > 0.5) fill.classList.add('warning');
}

// ── WRITING TEMPLATES ─────────────────────────
let currentTemplate = 0;

function renderWritingTabs() {
  const tabs = document.getElementById('writing-tabs');
  tabs.innerHTML = WRITING_TEMPLATES.map((t, i) => `
    <button class="writing-tab ${i===0?'active':''}" data-wt="${i}">
      ${t.icon} ${t.title}
    </button>
  `).join('');
  tabs.addEventListener('click', e => {
    const tab = e.target.closest('[data-wt]');
    if (!tab) return;
    currentTemplate = parseInt(tab.dataset.wt);
    document.querySelectorAll('.writing-tab').forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    renderTemplate();
  });
}

function renderTemplate() {
  const t = WRITING_TEMPLATES[currentTemplate];
  document.getElementById('template-meta').innerHTML =
    `<strong>${t.icon} ${t.title}</strong> — ${t.desc}`;
  document.getElementById('template-textarea').value = t.template;
}

document.getElementById('copy-template-btn').addEventListener('click', () => {
  const ta = document.getElementById('template-textarea');
  navigator.clipboard.writeText(ta.value).then(() => {
    showToast('Template copied! 📋 Now paste and customize it.', 'success');
  }).catch(() => {
    ta.select();
    document.execCommand('copy');
    showToast('Template copied!', 'success');
  });
});

// ── INIT NEW MODULES ──────────────────────────
renderPronunciation();
renderListeningTabs();
renderListeningCard();
renderIdioms();
renderSpeakingGrid();
renderWritingTabs();
renderTemplate();
