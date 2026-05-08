/* =============================================
   InterviewAI — app.js (Part 1/2)
   Nav · Theme · Progress · Questions · Phrases
   ============================================= */

// ─── STATE ───────────────────────────────────
const state = {
  apiKey: localStorage.getItem('iai_apiKey') || '',
  theme: localStorage.getItem('iai_theme') || 'dark',
  level: 'beginner',
  interviewType: 'general',
  chatHistory: [],
  interviewStarted: false,
  currentQuiz: 'vocabulary',
  quizIndex: 0,
  quizScore: 0,
  quizAnswers: [],
  progress: JSON.parse(localStorage.getItem('iai_progress') || JSON.stringify({
    sessions: 0, quizzesTaken: 0, bestScore: null,
    streak: 0, lastDate: null, history: [], activeDays: []
  }))
};

function saveProgress() {
  localStorage.setItem('iai_progress', JSON.stringify(state.progress));
}

// ─── THEME ────────────────────────────────────
function initTheme() {
  document.documentElement.setAttribute('data-theme', state.theme);
  document.getElementById('theme-toggle').textContent = state.theme === 'dark' ? '🌙' : '☀️';
}
document.getElementById('theme-toggle').addEventListener('click', () => {
  state.theme = state.theme === 'dark' ? 'light' : 'dark';
  localStorage.setItem('iai_theme', state.theme);
  initTheme();
});

// ─── MOBILE MENU ──────────────────────────────
document.getElementById('menu-toggle').addEventListener('click', () => {
  document.getElementById('main-nav').classList.toggle('open');
});
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => document.getElementById('main-nav').classList.remove('open'));
});

// ─── NAV ACTIVE STATE ─────────────────────────
const sections = ['coach','questions','quiz','phrases','progress'];
const navLinks = document.querySelectorAll('.nav-link');
const observer = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      const id = e.target.id;
      navLinks.forEach(l => l.classList.toggle('active', l.dataset.section === id));
    }
  });
}, { threshold: 0.3 });
sections.forEach(id => { const el = document.getElementById(id); if (el) observer.observe(el); });

// ─── API KEY ──────────────────────────────────
function initApiKey() {
  const banner = document.getElementById('api-banner');
  const dot = document.getElementById('status-dot');
  const txt = document.getElementById('status-text');
  if (state.apiKey) {
    banner.classList.add('hidden');
    dot.classList.add('ok');
    txt.textContent = 'API key active ✓';
  } else {
    dot.classList.remove('ok');
    txt.textContent = 'No API key';
  }
}
document.getElementById('api-key-save').addEventListener('click', () => {
  const val = document.getElementById('api-key-input').value.trim();
  if (!val.startsWith('sk-')) { showToast('Invalid key format', 'error'); return; }
  state.apiKey = val;
  localStorage.setItem('iai_apiKey', val);
  initApiKey();
  showToast('API key saved! 🎉', 'success');
});
document.getElementById('api-banner-close').addEventListener('click', () => {
  document.getElementById('api-banner').classList.add('hidden');
});

// ─── TOAST ────────────────────────────────────
function showToast(msg, type = 'info') {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.className = `toast show ${type}`;
  setTimeout(() => { t.className = 'toast'; }, 3000);
}

// ─── MODAL ────────────────────────────────────
function openModal(html) {
  document.getElementById('modal-content').innerHTML = html;
  document.getElementById('modal-overlay').style.display = 'flex';
}
function closeModal() {
  document.getElementById('modal-overlay').style.display = 'none';
}
document.getElementById('modal-close').addEventListener('click', closeModal);
document.getElementById('modal-overlay').addEventListener('click', e => {
  if (e.target === document.getElementById('modal-overlay')) closeModal();
});

// ─── HERO STATS ───────────────────────────────
function updateHeroStats() {
  document.getElementById('stat-sessions').textContent = state.progress.sessions;
  document.getElementById('stat-streak').textContent = state.progress.streak;
  document.getElementById('stat-score').textContent =
    state.progress.bestScore !== null ? `${state.progress.bestScore}/10` : '—';
}

// ─── STREAK / DATE ────────────────────────────
function updateStreak() {
  const today = new Date().toISOString().split('T')[0];
  if (state.progress.lastDate === today) return;
  const yesterday = new Date(Date.now() - 864e5).toISOString().split('T')[0];
  state.progress.streak = state.progress.lastDate === yesterday ? state.progress.streak + 1 : 1;
  state.progress.lastDate = today;
  if (!state.progress.activeDays.includes(today)) state.progress.activeDays.push(today);
  saveProgress();
}

// ─── QUESTIONS ────────────────────────────────
let currentCat = 'all';
let currentSearch = '';
let visibleCount = 24;
const PAGE_SIZE = 24;

function getFiltered() {
  return QUESTIONS.filter(q => {
    const matchCat = currentCat === 'all' || q.cat === currentCat;
    const matchSearch = !currentSearch || q.text.toLowerCase().includes(currentSearch.toLowerCase());
    return matchCat && matchSearch;
  });
}

function renderQuestions(reset = true) {
  const grid = document.getElementById('questions-grid');
  const cats = ['behavioral','situational','technical','strength','culture'];
  document.getElementById('badge-all').textContent = QUESTIONS.length;
  cats.forEach(c => {
    const el = document.getElementById('badge-' + c);
    if (el) el.textContent = QUESTIONS.filter(q => q.cat === c).length;
  });

  if (reset) visibleCount = PAGE_SIZE;
  const filtered = getFiltered();
  const slice = filtered.slice(0, visibleCount);
  const hasMore = filtered.length > visibleCount;

  const cardsHTML = slice.map(q => `
    <div class="q-card" id="qcard-${q.id}">
      <div class="q-card-header">
        <span class="q-cat-badge cat-${q.cat}">${q.cat}</span>
        <span class="q-number">#${q.id}</span>
      </div>
      <p>${q.text}</p>
      <div class="q-card-actions">
        <button class="btn-primary btn-sm" onclick="practiceQuestion(${q.id})">🤖 Practice with AI</button>
        <button class="btn-secondary btn-sm" onclick="showTips(${q.id})">💡 Tips</button>
      </div>
    </div>
  `).join('');

  const loadMoreHTML = hasMore ? `
    <div style="grid-column:1/-1;text-align:center;padding:1rem">
      <button class="btn-secondary" id="load-more-btn" onclick="loadMoreQuestions()">
        Show more (${filtered.length - visibleCount} remaining)
      </button>
    </div>` : '';

  grid.innerHTML = slice.length
    ? cardsHTML + loadMoreHTML
    : '<p class="empty-state" style="grid-column:1/-1">No questions match your search.</p>';
}

function loadMoreQuestions() {
  visibleCount += PAGE_SIZE;
  renderQuestions(false);
}



document.getElementById('q-filter-tabs').addEventListener('click', e => {
  const tab = e.target.closest('[data-cat]');
  if (!tab) return;
  currentCat = tab.dataset.cat;
  document.querySelectorAll('#q-filter-tabs .filter-tab').forEach(t => t.classList.remove('active'));
  tab.classList.add('active');
  renderQuestions();
});

// debounced search
let searchTimer;
document.getElementById('q-search').addEventListener('input', e => {
  clearTimeout(searchTimer);
  searchTimer = setTimeout(() => {
    currentSearch = e.target.value;
    renderQuestions();
  }, 220);
});

function practiceQuestion(id) {
  const q = QUESTIONS.find(x => x.id === id);
  if (!q) return;
  document.getElementById('coach').scrollIntoView({ behavior: 'smooth' });
  setTimeout(() => {
    if (!state.interviewStarted) startInterview();
    setTimeout(() => addMessage('bot', `Let's practice this question:\n\n**"${q.text}"**\n\nTake your time and answer as fully as you can. I'll give you detailed feedback!`), 600);
  }, 600);
}

function showTips(id) {
  const q = QUESTIONS.find(x => x.id === id);
  const tips = {
    behavioral: "Use the **STAR method**: Situation → Task → Action → Result. Be specific and quantify results when possible.",
    situational: "Think out loud about your reasoning process. Show how you would prioritize and communicate.",
    technical: "Demonstrate both your knowledge and your learning mindset. It's OK to say 'I'd research this further.'",
    strength: "Be honest but strategic. Back every strength with a specific example, and frame weaknesses as growth areas.",
    culture: "Research the company beforehand. Align your answers with their stated values and mission."
  };
  openModal(`
    <h3>💡 Tips for: ${q.cat.charAt(0).toUpperCase() + q.cat.slice(1)} Questions</h3>
    <p style="margin-bottom:1rem;padding:.75rem 1rem;background:var(--bg3);border-radius:8px;font-style:italic">"${q.text}"</p>
    <p>${tips[q.cat]}</p>
    <div style="margin-top:1rem;padding:1rem;background:rgba(124,58,237,.08);border-radius:8px;border:1px solid rgba(124,58,237,.2)">
      <strong style="color:#a78bfa">Pro tip:</strong>
      <p style="margin-top:.5rem">Always end your answer by connecting back to the role you're applying for. Ask yourself: "How does this example show I'm the right fit?"</p>
    </div>
  `);
}

// ─── PHRASES ──────────────────────────────────
let currentPCat = 'all';

function renderPhrases() {
  const grid = document.getElementById('phrases-grid');
  const filtered = PHRASES.filter(p => currentPCat === 'all' || p.cat === currentPCat);
  grid.innerHTML = filtered.map((p, i) => `
    <div class="phrase-card" id="phrase-${i}" onclick="this.classList.toggle('flipped')">
      <div class="phrase-card-inner">
        <div class="phrase-front">
          <span class="phrase-tag">${p.cat}</span>
          <p>${p.front}</p>
          <span class="flip-hint">👆 Tap to flip</span>
        </div>
        <div class="phrase-back">
          <span class="phrase-tag">English Phrase</span>
          <p>${p.back}</p>
          <p class="phrase-example">${p.example}</p>
        </div>
      </div>
    </div>
  `).join('');
}

document.getElementById('phrases-filter').addEventListener('click', e => {
  const tab = e.target.closest('[data-pcat]');
  if (!tab) return;
  currentPCat = tab.dataset.pcat;
  document.querySelectorAll('#phrases-filter .filter-tab').forEach(t => t.classList.remove('active'));
  tab.classList.add('active');
  renderPhrases();
});

// ─── PROGRESS PAGE ────────────────────────────
function renderProgress() {
  const p = state.progress;
  document.getElementById('prog-streak').textContent = p.streak;
  document.getElementById('prog-sessions').textContent = p.sessions;
  document.getElementById('prog-quizzes').textContent = p.quizzesTaken;
  document.getElementById('prog-best').textContent = p.bestScore !== null ? `${p.bestScore}/10` : '—';

  // Streak calendar — last 28 days
  const cal = document.getElementById('streak-calendar');
  const days = [];
  for (let i = 27; i >= 0; i--) {
    const d = new Date(Date.now() - i * 864e5).toISOString().split('T')[0];
    days.push(d);
  }
  cal.innerHTML = days.map(d => `
    <div class="cal-day ${p.activeDays.includes(d) ? 'active' : ''}" title="${d}">
      ${new Date(d).getDate()}
    </div>
  `).join('');

  // Quiz history
  const hist = document.getElementById('quiz-history');
  if (!p.history.length) {
    hist.innerHTML = '<p class="empty-state">No quizzes completed yet. Go practice!</p>';
  } else {
    hist.innerHTML = [...p.history].reverse().map(h => `
      <div class="history-item">
        <span>📝 ${h.quiz}</span>
        <span style="color:var(--text2);font-size:.8rem">${h.date}</span>
        <span class="history-score">${h.score}/10</span>
      </div>
    `).join('');
  }
}

document.getElementById('reset-progress-btn').addEventListener('click', () => {
  if (!confirm('Reset all progress? This cannot be undone.')) return;
  state.progress = { sessions:0, quizzesTaken:0, bestScore:null, streak:0, lastDate:null, history:[], activeDays:[] };
  saveProgress();
  renderProgress();
  updateHeroStats();
  showToast('Progress reset', 'info');
});

document.getElementById('export-progress-btn').addEventListener('click', () => {
  const data = JSON.stringify(state.progress, null, 2);
  const blob = new Blob([data], { type: 'application/json' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = 'interviewai-progress.json';
  a.click();
  showToast('Exported!', 'success');
});

// ─── QUIZ ENGINE ──────────────────────────────
let quizQuestions = [];

function getQuizQuestions() {
  return [...QUIZZES[state.currentQuiz].questions].sort(() => Math.random() - 0.5);
}

function initQuizUI() {
  const qz = QUIZZES[state.currentQuiz];
  document.getElementById('quiz-start-title').textContent = qz.title;
  document.getElementById('quiz-start-desc').textContent = qz.desc;
  showScreen('quiz-start-screen');
}

function showScreen(id) {
  ['quiz-start-screen','quiz-question-screen','quiz-result-screen'].forEach(s => {
    document.getElementById(s).style.display = s === id ? 'block' : 'none';
  });
}

document.querySelectorAll('.quiz-tab').forEach(tab => {
  tab.addEventListener('click', () => {
    document.querySelectorAll('.quiz-tab').forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    state.currentQuiz = tab.dataset.quiz;
    initQuizUI();
  });
});

document.getElementById('quiz-start-btn').addEventListener('click', () => {
  quizQuestions = getQuizQuestions();
  state.quizIndex = 0;
  state.quizScore = 0;
  state.quizAnswers = [];
  showScreen('quiz-question-screen');
  renderQuizQuestion();
});

function renderQuizQuestion() {
  const q = quizQuestions[state.quizIndex];
  const total = quizQuestions.length;
  const pct = (state.quizIndex / total) * 100;
  document.getElementById('quiz-progress-fill').style.width = pct + '%';
  document.getElementById('quiz-current').textContent = state.quizIndex + 1;
  document.getElementById('quiz-total').textContent = total;
  document.getElementById('quiz-q-tag').textContent = QUIZZES[state.currentQuiz].title.replace(' Quiz','');
  document.getElementById('quiz-question-text').textContent = q.q;
  document.getElementById('quiz-explanation').style.display = 'none';
  document.getElementById('quiz-next-btn').style.display = 'none';
  document.getElementById('quiz-options').innerHTML = q.opts.map((opt, i) => `
    <button class="quiz-option" onclick="answerQuiz(${i})" id="opt-${i}">${opt}</button>
  `).join('');
}

function answerQuiz(chosen) {
  const q = quizQuestions[state.quizIndex];
  const correct = q.ans;
  const isCorrect = chosen === correct;
  if (isCorrect) state.quizScore++;
  state.quizAnswers.push({ q: q.q, chosen, correct, isCorrect });
  document.querySelectorAll('.quiz-option').forEach((btn, i) => {
    btn.disabled = true;
    if (i === correct) btn.classList.add('correct');
    if (i === chosen && !isCorrect) btn.classList.add('wrong');
  });
  const exp = document.getElementById('quiz-explanation');
  exp.innerHTML = `<strong>${isCorrect ? '✅ Correct!' : '❌ Incorrect.'}</strong> ${q.exp}`;
  exp.style.display = 'block';
  document.getElementById('quiz-next-btn').style.display = 'block';
}

document.getElementById('quiz-next-btn').addEventListener('click', () => {
  state.quizIndex++;
  if (state.quizIndex >= quizQuestions.length) {
    finishQuiz();
  } else {
    renderQuizQuestion();
  }
});

function finishQuiz() {
  const score = state.quizScore;
  const total = quizQuestions.length;
  // update progress
  state.progress.quizzesTaken++;
  if (state.progress.bestScore === null || score > state.progress.bestScore) {
    state.progress.bestScore = score;
  }
  state.progress.history.push({
    quiz: QUIZZES[state.currentQuiz].title,
    score,
    date: new Date().toLocaleDateString()
  });
  updateStreak();
  saveProgress();
  updateHeroStats();
  renderProgress();

  const pct = score / total;
  const titles = ['Keep Practicing!','Good Effort!','Well Done!','Excellent!','Perfect Score! 🏆'];
  const titleIdx = Math.min(Math.floor(pct * 5), 4);
  document.getElementById('result-score').textContent = score;
  document.getElementById('result-title').textContent = titles[titleIdx];
  document.getElementById('result-message').textContent =
    pct >= 0.8 ? 'Outstanding! You have strong command of professional English.' :
    pct >= 0.6 ? 'Good job! Review the explanations for the ones you missed.' :
    'Keep practicing — review the explanations and try again soon!';

  // circle animation
  const offset = 251 - (251 * pct);
  setTimeout(() => { document.getElementById('result-circle-fill').style.strokeDashoffset = offset; }, 100);

  // review
  document.getElementById('result-review').innerHTML = state.quizAnswers.map(a => `
    <div class="review-item ${a.isCorrect ? 'ok' : 'fail'}">
      <span>${a.isCorrect ? '✅' : '❌'}</span>
      <span>${a.q}</span>
    </div>
  `).join('');

  showScreen('quiz-result-screen');
}

document.getElementById('quiz-retry-btn').addEventListener('click', () => {
  quizQuestions = getQuizQuestions();
  state.quizIndex = 0; state.quizScore = 0; state.quizAnswers = [];
  showScreen('quiz-question-screen');
  renderQuizQuestion();
});

document.getElementById('quiz-next-quiz-btn').addEventListener('click', () => {
  const quizList = Object.keys(QUIZZES);
  const next = quizList[(quizList.indexOf(state.currentQuiz) + 1) % quizList.length];
  state.currentQuiz = next;
  document.querySelectorAll('.quiz-tab').forEach(t => t.classList.toggle('active', t.dataset.quiz === next));
  initQuizUI();
});

// ─── INIT ─────────────────────────────────────
initTheme();
initApiKey();
renderQuestions();
renderPhrases();
renderProgress();
updateHeroStats();
updateStreak();
initQuizUI();

document.getElementById('hero-start-btn').addEventListener('click', e => {
  e.preventDefault();
  document.getElementById('coach').scrollIntoView({ behavior: 'smooth' });
});

// ═══════════════════════════════════════════════
//  AI COACH — Chat Engine
// ═══════════════════════════════════════════════

const SYSTEM_PROMPTS = {
  beginner: {
    general: `You are a friendly English interview coach helping a beginner-level English speaker practice job interviews. Keep your language simple and encouraging. After each user response: 1) Acknowledge what they did well, 2) Correct any grammar mistakes gently with the correct version, 3) Suggest 1-2 vocabulary improvements, 4) Give a score out of 10. Keep responses concise. Always end by asking your next interview question or prompting them to continue.`,
    tech: `You are a friendly English interview coach for tech roles, helping a beginner English speaker. Focus on technical communication in simple English. After each answer: correct grammar gently, suggest clearer technical phrasing, give a score out of 10. Ask real tech interview questions (projects, tools, problem-solving). Keep it encouraging and simple.`,
    marketing: `You are a friendly English interview coach for marketing roles, helping a beginner English speaker. After each answer: correct grammar gently, suggest more professional marketing vocabulary, give a score out of 10. Ask questions about campaigns, metrics, creativity. Be encouraging.`,
    design: `You are a friendly English interview coach for design roles, helping a beginner English speaker. After each answer: correct grammar gently, suggest design-specific vocabulary, give a score out of 10. Ask about process, portfolio, user research. Be encouraging.`,
    finance: `You are a friendly English interview coach for finance roles, helping a beginner English speaker. After each answer: correct grammar gently, suggest financial vocabulary, give a score out of 10. Ask about analysis, reporting, attention to detail. Be encouraging.`
  },
  intermediate: {
    general: `You are a professional English interview coach for intermediate speakers. After each answer: 1) Highlight 1-2 strong points, 2) Correct any grammar or vocabulary issues with precise explanations, 3) Suggest how to use the STAR method better, 4) Recommend more sophisticated vocabulary alternatives, 5) Give a score out of 10 with brief justification. Push the user to be more specific and quantify results. Ask progressively harder questions.`,
    tech: `You are a professional English interview coach for intermediate-level English speakers applying to tech roles. Evaluate answers on: technical accuracy, communication clarity, use of STAR method, professional vocabulary. Correct grammar issues precisely. Suggest stronger technical communication. Score out of 10. Ask progressively harder tech questions.`,
    marketing: `You are a professional English interview coach for intermediate-level speakers applying to marketing roles. Evaluate on: clarity, use of data/metrics, professional marketing vocabulary, STAR structure. Correct grammar. Suggest stronger phrasing. Score out of 10.`,
    design: `You are a professional English interview coach for intermediate-level speakers applying to design roles. Evaluate on: process explanation clarity, design vocabulary, storytelling, STAR structure. Correct grammar. Score out of 10.`,
    finance: `You are a professional English interview coach for intermediate-level speakers applying to finance roles. Evaluate on: precision, financial vocabulary, analytical clarity, professionalism. Correct grammar. Score out of 10.`
  },
  advanced: {
    general: `You are a demanding English interview coach for advanced speakers aiming for senior/executive roles. Be a tough but fair interviewer. After each answer: 1) Analyze executive presence and persuasiveness, 2) Point out any subtle grammar or register issues, 3) Evaluate STAR usage and impact storytelling, 4) Challenge vague statements — ask follow-up questions, 5) Score out of 10 with detailed breakdown. Use sophisticated vocabulary. Ask complex behavioral, strategic, and leadership questions.`,
    tech: `You are a demanding English interview coach for advanced speakers targeting senior tech roles. Act as a FAANG-level interviewer. Challenge every answer — ask for specifics, metrics, architectural decisions. Correct subtle grammar/register issues. Score out of 10 with detailed breakdown. Ask system design, leadership, and technical depth questions.`,
    marketing: `You are a demanding English interview coach for advanced speakers targeting senior marketing roles. Challenge strategic thinking, data literacy, and executive communication. Correct subtle language issues. Score out of 10. Ask about brand strategy, P&L, team leadership.`,
    design: `You are a demanding English interview coach for advanced speakers targeting senior design roles. Challenge design thinking, leadership, cross-functional influence, and communication precision. Score out of 10. Ask about design systems, team building, business impact.`,
    finance: `You are a demanding English interview coach for advanced speakers targeting senior finance roles. Challenge analytical rigor, executive communication, and precision. Score out of 10. Ask about financial modeling, strategic decisions, stakeholder management.`
  }
};

// ─── VOICE (PRO FEATURE) ──────────────────────
function speak(text) {
  if (!document.getElementById('tog-voice').checked) return;
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = 'en-US';
  utterance.rate = 1.0;
  speechSynthesis.speak(utterance);
}

// ─── CHIP SELECTION ───────────────────────────
document.getElementById('level-chips').addEventListener('click', e => {
  const chip = e.target.closest('.chip');
  if (!chip) return;
  state.level = chip.dataset.value;
  document.querySelectorAll('#level-chips .chip').forEach(c => c.classList.remove('active'));
  chip.classList.add('active');
});

document.getElementById('type-chips').addEventListener('click', e => {
  const chip = e.target.closest('.chip');
  if (!chip) return;
  state.interviewType = chip.dataset.value;
  document.querySelectorAll('#type-chips .chip').forEach(c => c.classList.remove('active'));
  chip.classList.add('active');
});

// ─── CHAT RENDERING ───────────────────────────
function addMessage(role, text, extraClass = '') {
  const msgs = document.getElementById('chat-messages');
  // Clear welcome screen on first message
  const welcome = msgs.querySelector('.chat-welcome');
  if (welcome) welcome.remove();

  const div = document.createElement('div');
  div.className = role === 'bot' ? 'msg-bot' : 'msg-user';

  // Parse simple markdown: **bold**, score badge
  let html = text
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\n/g, '<br>');

  // Extract score if present (e.g. "Score: 8/10")
  let scoreHTML = '';
  const scoreMatch = html.match(/[Ss]core[:\s]+(\d+)\s*\/\s*10/);
  if (scoreMatch && document.getElementById('tog-score').checked) {
    const s = parseInt(scoreMatch[1]);
    const stars = s >= 8 ? '🌟' : s >= 6 ? '⭐' : '💪';
    scoreHTML = `<div class="msg-score">${stars} ${s}/10</div>`;
  }

  div.innerHTML = `
    <div class="msg-avatar">${role === 'bot' ? '🤖' : '👤'}</div>
    <div>
      <div class="msg-bubble ${extraClass}">${html}</div>
      ${scoreHTML}
    </div>
  `;

  msgs.appendChild(div);
  msgs.scrollTop = msgs.scrollHeight;
  return div;
}

function setTyping(show) {
  document.getElementById('chat-typing').style.display = show ? 'flex' : 'none';
  const msgs = document.getElementById('chat-messages');
  msgs.scrollTop = msgs.scrollHeight;
}

function getSystemPrompt() {
  const level = state.level;
  const type = state.interviewType;
  const features = [];
  if (document.getElementById('tog-grammar').checked) features.push('grammar corrections');
  if (document.getElementById('tog-vocab').checked) features.push('vocabulary suggestions');
  if (document.getElementById('tog-star').checked) features.push('STAR method feedback');
  if (document.getElementById('tog-score').checked) features.push('a score out of 10');

  let base = SYSTEM_PROMPTS[level][type];
  base += `\n\nALWAYS provide: ${features.join(', ')}. Keep your response under 200 words unless the answer requires detailed breakdown.`;
  return base;
}

// ─── CLAUDE API CALL ──────────────────────────
async function callClaude(userMessage) {
  if (!state.apiKey) {
    showToast('Please add your Anthropic API key first', 'error');
    document.getElementById('api-banner').classList.remove('hidden');
    return null;
  }

  state.chatHistory.push({ role: 'user', content: userMessage });

  try {
    const resp = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': state.apiKey,
        'anthropic-version': '2023-06-01',
        'anthropic-dangerous-direct-browser-access': 'true'
      },
      body: JSON.stringify({
        model: 'claude-haiku-4-5',
        max_tokens: 600,
        system: getSystemPrompt(),
        messages: state.chatHistory
      })
    });

    if (!resp.ok) {
      const err = await resp.json().catch(() => ({}));
      throw new Error(err.error?.message || `HTTP ${resp.status}`);
    }

    const data = await resp.json();
    const reply = data.content[0].text;
    state.chatHistory.push({ role: 'assistant', content: reply });
    return reply;

  } catch (err) {
    console.error('Claude error:', err);
    showToast('API error: ' + err.message, 'error');
    state.chatHistory.pop(); // remove failed user message
    return null;
  }
}

// ─── INTERVIEW SESSION ────────────────────────
async function startInterview() {
  state.chatHistory = [];
  state.interviewStarted = true;

  // Show send/next buttons, hide start
  document.getElementById('start-interview-btn').style.display = 'none';
  document.getElementById('send-btn').style.display = 'flex';
  document.getElementById('next-question-btn').style.display = 'flex';

  // Update progress
  state.progress.sessions++;
  updateStreak();
  saveProgress();
  updateHeroStats();
  renderProgress();

  const opener = `Hello! I'm your AI interview coach today. We'll be doing a **${state.interviewType}** interview at the **${state.level}** level.\n\nI'll ask you real interview questions, then give you feedback on your English, grammar, vocabulary, and answer structure.\n\nLet's begin!\n\n**"Tell me about yourself. Please give me a brief professional introduction."**`;
  addMessage('bot', opener);
  state.chatHistory.push({ role: 'assistant', content: opener });
}

async function sendMessage() {
  const input = document.getElementById('chat-input');
  const text = input.value.trim();
  if (!text) return;

  input.value = '';
  input.style.height = 'auto';
  addMessage('user', text);
  setTyping(true);
  document.getElementById('send-btn').disabled = true;

  const reply = await callClaude(text);
  setTyping(false);
  document.getElementById('send-btn').disabled = false;

  if (reply) addMessage('bot', reply);
}

async function requestNextQuestion() {
  if (!state.interviewStarted) { startInterview(); return; }
  setTyping(true);
  document.getElementById('next-question-btn').disabled = true;

  const reply = await callClaude("Please ask me the next interview question.");
  setTyping(false);
  document.getElementById('next-question-btn').disabled = false;

  if (reply) addMessage('bot', reply);
}

// ─── BUTTON EVENTS ────────────────────────────
document.getElementById('start-interview-btn').addEventListener('click', startInterview);
document.getElementById('send-btn').addEventListener('click', sendMessage);
document.getElementById('next-question-btn').addEventListener('click', requestNextQuestion);

document.getElementById('chat-input').addEventListener('keydown', e => {
  if (e.key === 'Enter' && !e.shiftKey) {
    e.preventDefault();
    if (state.interviewStarted) sendMessage();
  }
});

// Auto-resize textarea
document.getElementById('chat-input').addEventListener('input', function () {
  this.style.height = 'auto';
  this.style.height = Math.min(this.scrollHeight, 150) + 'px';
});

document.getElementById('new-session-btn').addEventListener('click', () => {
  if (!confirm('Start a new session? Current chat will be cleared.')) return;
  state.chatHistory = [];
  state.interviewStarted = false;
  document.getElementById('chat-messages').innerHTML = `
    <div class="chat-welcome">
      <div class="welcome-icon">🎯</div>
      <h3>Ready to practice?</h3>
      <p>Configure your session on the left, then click <strong>Start Interview</strong> below.</p>
    </div>`;
  document.getElementById('start-interview-btn').style.display = 'flex';
  document.getElementById('send-btn').style.display = 'none';
  document.getElementById('next-question-btn').style.display = 'none';
  showToast('New session ready!', 'info');
});

