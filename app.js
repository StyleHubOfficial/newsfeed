// State Management
const state = {
  currentScreen: 'welcome',
  timeLimit: 20, // minutes
  selectedInterests: [],
  sessionStartTime: null,
  sessionElapsed: 0,
  timerInterval: null,
  currentArticle: null,
  readArticles: new Set(),
  bookmarkedArticles: new Set(),
  settings: {
    fontSize: 'medium',
    theme: 'light',
    audioSpeed: 1.0
  },
  audio: {
    synthesis: null,
    utterance: null,
    isPlaying: false,
    currentText: '',
    currentPosition: 0
  }
};

// Sample Data
const articles = [
  {
    id: 1,
    category: "Technology",
    headline: "AI Language Models Show Improved Reasoning Capabilities",
    summary: "Recent developments in artificial intelligence have led to language models with enhanced logical reasoning. Researchers report significant improvements in problem-solving tasks. These advances could impact education and professional fields.",
    source: "TechNews Daily",
    readingTime: "3 min",
    publishedDate: "2 hours ago",
    fullText: "Recent developments in artificial intelligence have led to language models with enhanced logical reasoning capabilities. Researchers at leading AI laboratories report significant improvements in problem-solving tasks and mathematical reasoning. The new models demonstrate better understanding of context and can break down complex problems into manageable steps. These advances could have far-reaching impacts across education, healthcare, and professional fields. However, experts caution that challenges remain in ensuring AI systems are reliable and transparent in their decision-making processes."
  },
  {
    id: 2,
    category: "Health",
    headline: "Study Links Regular Exercise to Better Sleep Quality",
    summary: "A new research study found that people who exercise regularly experience 40% better sleep quality. The study followed 2,000 participants over two years. Experts recommend 30 minutes of moderate exercise most days.",
    source: "Health Science Journal",
    readingTime: "2 min",
    publishedDate: "5 hours ago",
    fullText: "A comprehensive new research study has found that people who exercise regularly experience significantly better sleep quality compared to sedentary individuals. The study, which followed 2,000 participants over two years, found that those who engaged in at least 30 minutes of moderate exercise on most days had 40% better sleep quality scores. Researchers noted improvements in sleep duration, reduced time to fall asleep, and fewer nighttime awakenings. The findings add to growing evidence of exercise benefits beyond physical fitness. Sleep experts recommend incorporating regular physical activity into daily routines, particularly in the morning or early afternoon, while avoiding intense exercise close to bedtime."
  },
  {
    id: 3,
    category: "Environment",
    headline: "Renewable Energy Reaches Record 30% of Global Electricity",
    summary: "Solar and wind power now account for 30% of worldwide electricity generation. This milestone represents a 50% increase from five years ago. The trend is expected to continue as costs decline and technology improves.",
    source: "Global Energy Report",
    readingTime: "4 min",
    publishedDate: "1 day ago",
    fullText: "Renewable energy sources have reached a historic milestone, now accounting for 30% of global electricity generation according to new international data. Solar and wind power led the growth, with solar installations increasing by 25% year-over-year. This achievement represents a 50% increase from five years ago and marks significant progress in the transition to clean energy. Industry analysts attribute the growth to declining technology costs, supportive government policies, and increasing corporate commitments to carbon neutrality. The International Energy Agency projects that renewable energy could reach 45% of global electricity by 2030 if current trends continue. However, challenges remain including energy storage, grid infrastructure upgrades, and ensuring reliable power supply during periods of low renewable generation."
  },
  {
    id: 4,
    category: "Business",
    headline: "Remote Work Leads to 25% Increase in Productivity, Survey Finds",
    summary: "Major companies report higher productivity with remote work arrangements. A survey of 500 businesses shows improved employee satisfaction and reduced overhead costs. The hybrid model is becoming the new standard.",
    source: "Business Weekly",
    readingTime: "3 min",
    publishedDate: "3 hours ago",
    fullText: "A comprehensive survey of 500 businesses has revealed that remote work arrangements have led to an average 25% increase in employee productivity. The study, conducted over 18 months, found that companies embracing flexible work policies reported not only higher productivity but also improved employee satisfaction, better work-life balance, and reduced overhead costs. Employees cited fewer office distractions, eliminated commute time, and greater autonomy as key factors. However, the research also identified challenges including communication difficulties, feelings of isolation among some workers, and the need for better digital collaboration tools. Most companies are now adopting hybrid models that combine remote work with occasional in-office collaboration, which appears to offer the best of both approaches."
  },
  {
    id: 5,
    category: "Science",
    headline: "Scientists Discover Potential Treatment for Antibiotic-Resistant Bacteria",
    summary: "Researchers have identified a new compound that shows promise against drug-resistant infections. Lab tests demonstrate effectiveness against several dangerous bacteria strains. Clinical trials are planned for next year.",
    source: "Medical Science Today",
    readingTime: "4 min",
    publishedDate: "6 hours ago",
    fullText: "In a breakthrough that could help combat the growing threat of antibiotic-resistant bacteria, scientists have identified a new compound that shows significant promise in laboratory testing. The compound, derived from a previously unknown soil microorganism, has demonstrated effectiveness against several dangerous drug-resistant bacteria strains, including MRSA and certain gram-negative bacteria. Preliminary tests show the compound works through a novel mechanism that bacteria are less likely to develop resistance against. The research team emphasizes that while results are promising, extensive clinical trials are needed to confirm safety and efficacy in humans. If successful, the treatment could provide a crucial new tool in fighting infections that have become increasingly difficult to treat with existing antibiotics. Clinical trials are planned to begin next year pending regulatory approval."
  },
  {
    id: 6,
    category: "World News",
    headline: "International Summit Announces New Climate Cooperation Framework",
    summary: "World leaders unveiled a comprehensive plan for climate action at the annual summit. The framework includes funding for developing nations and technology sharing commitments. Implementation will begin in early 2026.",
    source: "World Report",
    readingTime: "5 min",
    publishedDate: "8 hours ago",
    fullText: "World leaders attending the annual international climate summit have announced a new comprehensive cooperation framework aimed at accelerating global climate action. The agreement includes significant commitments for climate finance to developing nations, technology sharing provisions, and coordinated emission reduction targets. Key provisions include $200 billion in annual climate funding by 2027, establishing a global network for clean technology transfer, and quarterly progress reviews with transparent reporting mechanisms. Developed nations committed to phasing out coal power by 2035, while providing transition support for countries still dependent on fossil fuels. Environmental groups cautiously welcomed the announcement while emphasizing the importance of rapid implementation and accountability. The framework will officially take effect in early 2026 following ratification by member states."
  },
  {
    id: 7,
    category: "Technology",
    headline: "Quantum Computing Breakthrough Achieved by Research Team",
    summary: "Scientists demonstrated a quantum computer solving a problem impossible for classical computers. The achievement marks progress toward practical quantum applications. Commercial deployment may be possible within five years.",
    source: "Tech Innovation News",
    readingTime: "3 min",
    publishedDate: "12 hours ago",
    fullText: "A research team has announced a significant quantum computing breakthrough, successfully demonstrating a quantum computer solving a complex optimization problem that would be impossible for even the most powerful classical supercomputers. The achievement, involving a 1,000-qubit quantum processor, maintained quantum coherence for a record-breaking duration and performed calculations with unprecedented accuracy. This milestone brings practical quantum computing applications closer to reality, with potential uses in drug discovery, materials science, financial modeling, and cryptography. However, researchers caution that substantial engineering challenges remain before quantum computers become commercially viable. The team estimates that practical, large-scale quantum computing for business applications may be possible within five to ten years with continued investment and development."
  },
  {
    id: 8,
    category: "Arts & Culture",
    headline: "Museum Launches Virtual Reality Art Exhibition Experience",
    summary: "A major museum debuts immersive VR experience allowing remote visitors to explore exhibitions. The technology enables detailed interaction with artworks from anywhere in the world. Initial response from users has been overwhelmingly positive.",
    source: "Culture Review",
    readingTime: "2 min",
    publishedDate: "1 day ago",
    fullText: "A leading international museum has launched an innovative virtual reality experience that allows remote visitors to explore its exhibitions in immersive detail from anywhere in the world. The VR platform enables users to examine artworks at unprecedented resolution, access curator commentary, and interact with educational content in ways not possible during physical visits. The technology uses high-resolution 3D scanning and advanced rendering to recreate gallery spaces with remarkable fidelity. Early user feedback has been overwhelmingly positive, with particular praise for accessibility features that make art more available to those unable to travel. Museum directors view the initiative as complementing rather than replacing physical visits, noting that virtual access has increased interest in eventual in-person attendance. Several other cultural institutions have announced plans to develop similar VR experiences."
  },
  {
    id: 9,
    category: "Sports",
    headline: "Athlete Recovery Technology Shows Measurable Performance Gains",
    summary: "New recovery methods using cold therapy and compression are proving effective for athletes. Research shows 15% faster recovery times and reduced injury rates. Professional teams are rapidly adopting these technologies.",
    source: "Sports Science Review",
    readingTime: "3 min",
    publishedDate: "18 hours ago",
    fullText: "Advanced athlete recovery technologies combining targeted cold therapy, compression, and monitoring systems are showing measurable performance improvements according to new research. Studies involving professional athletes across multiple sports demonstrate 15% faster recovery times, reduced inflammation, and lower injury rates compared to traditional recovery methods. The technologies use precise temperature control, adjustable compression levels, and biometric monitoring to optimize recovery protocols for individual athletes. Professional teams are rapidly adopting these systems, with early adopters reporting reduced time lost to injuries and improved practice performance. While the technology is currently expensive and primarily available to elite athletes, developers are working on more affordable consumer versions. Sports medicine experts emphasize that these tools work best when integrated into comprehensive training and recovery programs rather than used in isolation."
  },
  {
    id: 10,
    category: "Health",
    headline: "Meditation Apps Show Measurable Mental Health Benefits in Long-Term Study",
    summary: "Researchers found that consistent use of meditation apps led to significant reductions in anxiety and stress. The five-year study tracked 3,000 users across different demographics. Benefits increased with regular practice over time.",
    source: "Mental Health Research",
    readingTime: "4 min",
    publishedDate: "2 days ago",
    fullText: "A comprehensive five-year study tracking 3,000 users of meditation and mindfulness apps has found significant measurable mental health benefits from consistent practice. Participants who used meditation apps regularly showed meaningful reductions in anxiety symptoms, perceived stress levels, and reported improvements in emotional regulation and sleep quality. The research, conducted across diverse demographics and age groups, found that benefits increased progressively with regular practice, with the most substantial improvements appearing after six months of consistent use. Neuroimaging studies on a subset of participants showed measurable changes in brain regions associated with stress response and emotional regulation. Mental health professionals note that while apps cannot replace professional treatment for serious conditions, they can serve as valuable complementary tools and make mindfulness practices more accessible. The study also found that guided meditations of 10-15 minutes produced similar benefits to longer sessions, making the practice more sustainable for busy individuals."
  }
];

const categories = [
  { name: "Technology", color: "#4A90E2", icon: "💻" },
  { name: "Health", color: "#6FCF97", icon: "🏥" },
  { name: "Environment", color: "#27AE60", icon: "🌍" },
  { name: "Business", color: "#F2994A", icon: "💼" },
  { name: "Science", color: "#9B51E0", icon: "🔬" },
  { name: "World News", color: "#EB5757", icon: "🌐" },
  { name: "Sports", color: "#56CCF2", icon: "⚽" },
  { name: "Arts & Culture", color: "#BB6BD9", icon: "🎨" }
];

// Utility Functions
function getCategoryColor(categoryName) {
  const category = categories.find(cat => cat.name === categoryName);
  return category ? category.color : '#4A90E2';
}

function formatTime(seconds) {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, '0')}`;
}

function showScreen(screenId) {
  document.querySelectorAll('.screen').forEach(screen => {
    screen.classList.remove('active');
  });
  document.getElementById(screenId).classList.add('active');
  state.currentScreen = screenId;
}

function startSessionTimer() {
  if (state.timerInterval) return;
  
  state.sessionStartTime = Date.now();
  state.timerInterval = setInterval(() => {
    state.sessionElapsed = Math.floor((Date.now() - state.sessionStartTime) / 1000);
    updateTimerDisplay();
    checkTimeLimit();
  }, 1000);
}

function updateTimerDisplay() {
  const timerEl = document.getElementById('sessionTimer');
  if (timerEl) {
    timerEl.textContent = formatTime(state.sessionElapsed);
    
    // Warn when approaching time limit
    const timeLimit = state.timeLimit * 60;
    if (state.sessionElapsed >= timeLimit * 0.8) {
      timerEl.classList.add('warning');
    }
  }
}

function checkTimeLimit() {
  const timeLimit = state.timeLimit * 60;
  if (state.sessionElapsed >= timeLimit) {
    showTimeWarning();
  }
}

function showTimeWarning() {
  if (state.timerInterval) {
    clearInterval(state.timerInterval);
    state.timerInterval = null;
  }
  document.getElementById('timeWarningModal').classList.add('active');
}

// Welcome Screen
function initWelcomeScreen() {
  const timeBtns = document.querySelectorAll('.time-btn');
  timeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      timeBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      state.timeLimit = parseInt(btn.dataset.time);
    });
  });

  document.getElementById('startBtn').addEventListener('click', () => {
    showScreen('interestScreen');
    renderCategories();
  });
}

// Interest Selection
function renderCategories() {
  const grid = document.getElementById('categoryGrid');
  grid.innerHTML = categories.map(cat => `
    <div class="category-card" data-category="${cat.name}">
      <div class="category-icon">${cat.icon}</div>
      <div class="category-name">${cat.name}</div>
    </div>
  `).join('');

  grid.querySelectorAll('.category-card').forEach(card => {
    card.addEventListener('click', () => {
      const category = card.dataset.category;
      if (state.selectedInterests.includes(category)) {
        state.selectedInterests = state.selectedInterests.filter(c => c !== category);
        card.classList.remove('selected');
      } else {
        if (state.selectedInterests.length < 5) {
          state.selectedInterests.push(category);
          card.classList.add('selected');
        }
      }
    });
  });
}

function initInterestScreen() {
  document.getElementById('skipInterests').addEventListener('click', () => {
    state.selectedInterests = [];
    showScreen('feedScreen');
    renderNewsFeed();
    startSessionTimer();
  });

  document.getElementById('startReading').addEventListener('click', () => {
    showScreen('feedScreen');
    renderNewsFeed();
    startSessionTimer();
  });
}

// News Feed
function getFilteredArticles() {
  if (state.selectedInterests.length === 0) {
    return articles;
  }
  return articles.filter(article => 
    state.selectedInterests.includes(article.category)
  );
}

function renderNewsFeed() {
  const filteredArticles = getFilteredArticles();
  const feed = document.getElementById('newsFeed');
  
  document.getElementById('feedSubtitle').textContent = 
    `${filteredArticles.length} stories for you today`;
  
  feed.innerHTML = filteredArticles.map(article => {
    const isBookmarked = state.bookmarkedArticles.has(article.id);
    return `
      <div class="news-card" data-id="${article.id}">
        <div class="news-card-header">
          <span class="news-category" style="background-color: ${getCategoryColor(article.category)}">
            ${article.category}
          </span>
          <span class="news-reading-time">${article.readingTime} read</span>
        </div>
        <h3 class="news-headline">${article.headline}</h3>
        <p class="news-summary">${article.summary}</p>
        <div class="news-actions">
          <button class="action-btn primary" data-action="read" data-id="${article.id}">
            Read Full
          </button>
          <button class="action-btn" data-action="audio" data-id="${article.id}">
            🔊 Listen
          </button>
          <button class="action-btn ${isBookmarked ? 'bookmarked' : ''}" data-action="bookmark" data-id="${article.id}">
            ${isBookmarked ? '⭐ Saved' : '⭐ Save'}
          </button>
        </div>
        <div class="news-source">From ${article.source}</div>
      </div>
    `;
  }).join('');

  // Add event listeners
  feed.querySelectorAll('[data-action="read"]').forEach(btn => {
    btn.addEventListener('click', () => {
      const articleId = parseInt(btn.dataset.id);
      openArticle(articleId);
    });
  });

  feed.querySelectorAll('[data-action="audio"]').forEach(btn => {
    btn.addEventListener('click', () => {
      const articleId = parseInt(btn.dataset.id);
      playArticleAudio(articleId);
    });
  });

  feed.querySelectorAll('[data-action="bookmark"]').forEach(btn => {
    btn.addEventListener('click', () => {
      const articleId = parseInt(btn.dataset.id);
      toggleBookmark(articleId);
    });
  });
}

function toggleBookmark(articleId) {
  if (state.bookmarkedArticles.has(articleId)) {
    state.bookmarkedArticles.delete(articleId);
  } else {
    state.bookmarkedArticles.add(articleId);
  }
  renderNewsFeed();
}

function initFeedScreen() {
  document.getElementById('settingsBtn').addEventListener('click', () => {
    showScreen('settingsScreen');
  });

  document.getElementById('viewBookmarks').addEventListener('click', () => {
    showScreen('bookmarksScreen');
    renderBookmarks();
  });
}

// Article Reading
function openArticle(articleId) {
  const article = articles.find(a => a.id === articleId);
  if (!article) return;

  state.currentArticle = article;
  state.readArticles.add(articleId);

  document.getElementById('articleCategory').textContent = article.category;
  document.getElementById('articleCategory').style.backgroundColor = getCategoryColor(article.category);
  document.getElementById('articleSource').textContent = article.source;
  document.getElementById('articleTitle').textContent = article.headline;
  document.getElementById('articleDate').textContent = article.publishedDate;
  document.getElementById('articleReadTime').textContent = article.readingTime + ' read';
  document.getElementById('articleBody').textContent = article.fullText;

  const isBookmarked = state.bookmarkedArticles.has(articleId);
  document.getElementById('articleBookmarkBtn').textContent = isBookmarked ? '⭐ Saved' : '⭐ Save';

  showScreen('articleScreen');
}

function initArticleScreen() {
  document.getElementById('backToFeed').addEventListener('click', () => {
    showScreen('feedScreen');
    updateFeedCompletion();
  });

  document.getElementById('articleAudioBtn').addEventListener('click', () => {
    if (state.currentArticle) {
      playArticleAudio(state.currentArticle.id);
    }
  });

  document.getElementById('articleBookmarkBtn').addEventListener('click', () => {
    if (state.currentArticle) {
      toggleBookmark(state.currentArticle.id);
      const isBookmarked = state.bookmarkedArticles.has(state.currentArticle.id);
      document.getElementById('articleBookmarkBtn').textContent = isBookmarked ? '⭐ Saved' : '⭐ Save';
    }
  });

  let currentSize = 1; // 0=small, 1=medium, 2=large
  document.getElementById('textSizeBtn').addEventListener('click', () => {
    const body = document.getElementById('articleBody');
    body.classList.remove('font-small', 'font-large');
    currentSize = (currentSize + 1) % 3;
    if (currentSize === 0) body.classList.add('font-small');
    if (currentSize === 2) body.classList.add('font-large');
  });
}

function updateFeedCompletion() {
  const filteredArticles = getFilteredArticles();
  const readCount = filteredArticles.filter(a => state.readArticles.has(a.id)).length;
  
  if (readCount >= filteredArticles.length || readCount >= 5) {
    document.getElementById('feedCompletion').style.display = 'block';
    document.getElementById('finalTime').textContent = formatTime(state.sessionElapsed);
    document.getElementById('storiesRead').textContent = readCount;
  }
}

// Audio Player
function playArticleAudio(articleId) {
  const article = articles.find(a => a.id === articleId);
  if (!article) return;

  // Stop any existing audio
  if (state.audio.synthesis) {
    speechSynthesis.cancel();
  }

  // Setup audio
  const text = `${article.headline}. ${article.fullText}`;
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.rate = state.settings.audioSpeed;
  
  document.getElementById('audioArticleTitle').textContent = article.headline;
  document.getElementById('audioModal').classList.add('active');
  document.querySelector('.waveform').classList.add('paused');
  
  state.audio.synthesis = speechSynthesis;
  state.audio.utterance = utterance;
  state.audio.isPlaying = false;
  state.audio.currentText = text;
  
  // Update play button
  updateAudioPlayButton();
}

function toggleAudioPlayback() {
  if (!state.audio.utterance) return;

  if (state.audio.isPlaying) {
    speechSynthesis.pause();
    state.audio.isPlaying = false;
    document.querySelector('.waveform').classList.remove('playing');
    document.querySelector('.waveform').classList.add('paused');
  } else {
    if (speechSynthesis.paused) {
      speechSynthesis.resume();
    } else {
      speechSynthesis.speak(state.audio.utterance);
    }
    state.audio.isPlaying = true;
    document.querySelector('.waveform').classList.remove('paused');
    document.querySelector('.waveform').classList.add('playing');
  }
  
  updateAudioPlayButton();
}

function updateAudioPlayButton() {
  const btn = document.getElementById('audioPlayBtn');
  const icon = btn.querySelector('.play-icon');
  icon.textContent = state.audio.isPlaying ? '⏸' : '▶';
}

function initAudioModal() {
  document.getElementById('closeAudio').addEventListener('click', () => {
    speechSynthesis.cancel();
    state.audio.isPlaying = false;
    document.getElementById('audioModal').classList.remove('active');
    document.querySelector('.waveform').classList.remove('playing', 'paused');
  });

  document.getElementById('audioPlayBtn').addEventListener('click', toggleAudioPlayback);

  document.querySelectorAll('.speed-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.speed-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const speed = parseFloat(btn.dataset.speed);
      state.settings.audioSpeed = speed;
      
      if (state.audio.utterance) {
        state.audio.utterance.rate = speed;
        if (state.audio.isPlaying) {
          speechSynthesis.cancel();
          state.audio.utterance = new SpeechSynthesisUtterance(state.audio.currentText);
          state.audio.utterance.rate = speed;
          speechSynthesis.speak(state.audio.utterance);
        }
      }
    });
  });
}

// Bookmarks
function renderBookmarks() {
  const bookmarksContent = document.getElementById('bookmarksContent');
  const emptyBookmarks = document.getElementById('emptyBookmarks');
  
  if (state.bookmarkedArticles.size === 0) {
    bookmarksContent.innerHTML = '';
    emptyBookmarks.style.display = 'block';
    return;
  }
  
  emptyBookmarks.style.display = 'none';
  const bookmarkedArticlesList = articles.filter(a => state.bookmarkedArticles.has(a.id));
  
  bookmarksContent.innerHTML = `
    <div class="news-feed">
      ${bookmarkedArticlesList.map(article => `
        <div class="news-card" data-id="${article.id}">
          <div class="news-card-header">
            <span class="news-category" style="background-color: ${getCategoryColor(article.category)}">
              ${article.category}
            </span>
            <span class="news-reading-time">${article.readingTime} read</span>
          </div>
          <h3 class="news-headline">${article.headline}</h3>
          <p class="news-summary">${article.summary}</p>
          <div class="news-actions">
            <button class="action-btn primary" data-action="read" data-id="${article.id}">
              Read Full
            </button>
            <button class="action-btn" data-action="audio" data-id="${article.id}">
              🔊 Listen
            </button>
            <button class="action-btn" data-action="remove" data-id="${article.id}">
              ✕ Remove
            </button>
          </div>
        </div>
      `).join('')}
    </div>
  `;
  
  bookmarksContent.querySelectorAll('[data-action="read"]').forEach(btn => {
    btn.addEventListener('click', () => {
      const articleId = parseInt(btn.dataset.id);
      openArticle(articleId);
    });
  });
  
  bookmarksContent.querySelectorAll('[data-action="audio"]').forEach(btn => {
    btn.addEventListener('click', () => {
      const articleId = parseInt(btn.dataset.id);
      playArticleAudio(articleId);
    });
  });
  
  bookmarksContent.querySelectorAll('[data-action="remove"]').forEach(btn => {
    btn.addEventListener('click', () => {
      const articleId = parseInt(btn.dataset.id);
      state.bookmarkedArticles.delete(articleId);
      renderBookmarks();
    });
  });
}

function initBookmarksScreen() {
  document.getElementById('closeBookmarks').addEventListener('click', () => {
    showScreen('feedScreen');
  });
  
  document.getElementById('backToFeedFromBookmarks').addEventListener('click', () => {
    showScreen('feedScreen');
  });
}

// Settings
function initSettingsScreen() {
  document.getElementById('closeSettings').addEventListener('click', () => {
    showScreen('feedScreen');
  });

  document.getElementById('editInterests').addEventListener('click', () => {
    showScreen('interestScreen');
    renderCategories();
    // Pre-select current interests
    setTimeout(() => {
      state.selectedInterests.forEach(interest => {
        const card = document.querySelector(`[data-category="${interest}"]`);
        if (card) card.classList.add('selected');
      });
    }, 100);
  });

  document.getElementById('saveSettings').addEventListener('click', () => {
    state.timeLimit = parseInt(document.getElementById('timeLimitSetting').value);
    state.settings.fontSize = document.getElementById('fontSizeSetting').value;
    state.settings.theme = document.getElementById('themeSetting').value;
    state.settings.audioSpeed = parseFloat(document.getElementById('audioSpeedSetting').value);
    showScreen('feedScreen');
  });
}

// Time Warning Modal
function initTimeWarningModal() {
  document.getElementById('extendTime').addEventListener('click', () => {
    state.timeLimit += 10; // Add 10 more minutes
    document.getElementById('timeWarningModal').classList.remove('active');
    startSessionTimer();
  });

  document.getElementById('finishSession').addEventListener('click', () => {
    document.getElementById('timeWarningModal').classList.remove('active');
    showScreen('feedScreen');
    updateFeedCompletion();
    document.getElementById('feedCompletion').style.display = 'block';
  });
}

// Initialize App
function init() {
  initWelcomeScreen();
  initInterestScreen();
  initFeedScreen();
  initArticleScreen();
  initAudioModal();
  initBookmarksScreen();
  initSettingsScreen();
  initTimeWarningModal();
  
  showScreen('welcomeScreen');
}

// Start the app when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}, userMetrics.currentStreak, 1000, '');
    
    // Display achievements
    displayCompletionAchievements();
  }
}

function animateCounter(elementId, start, end, duration, suffix = '') {
  const element = document.getElementById(elementId);
  const startTime = Date.now();
  
  function update() {
    const now = Date.now();
    const progress = Math.min((now - startTime) / duration, 1);
    const current = Math.floor(start + (end - start) * progress);
    element.textContent = current + suffix;
    
    if (progress < 1) {
      requestAnimationFrame(update);
    }
  }
  
  requestAnimationFrame(update);
}

function displayCompletionAchievements() {
  const achievementDisplay = document.getElementById('achievementDisplay');
  const readCount = state.readArticles.size;
  const categoriesCount = state.categoriesRead.size;
  
  let earnedAchievements = [];
  
  if (readCount >= 5) {
    earnedAchievements.push(achievementBadges[0]); // Focus Master
  }
  if (categoriesCount >= 3) {
    earnedAchievements.push(achievementBadges[4]); // Balanced Mind
  }
  
  if (earnedAchievements.length > 0) {
    achievementDisplay.innerHTML = `
      <div style="margin: 20px 0;">
        <h4 style="color: #667eea; margin-bottom: 12px;">🏆 Achievements Unlocked</h4>
        <div style="display: flex; gap: 12px; justify-content: center; flex-wrap: wrap;">
          ${earnedAchievements.map(a => `
            <div style="padding: 12px 20px; background: linear-gradient(135deg, rgba(102, 126, 234, 0.1), rgba(118, 75, 162, 0.1)); border-radius: 12px; border: 2px solid ${a.color};">
              <div style="font-size: 24px; margin-bottom: 4px;">${a.emoji}</div>
              <div style="font-size: 12px; font-weight: 600; color: #1a1a2e;">${a.name}</div>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }
}

function checkAchievements() {
  const readCount = state.readArticles.size;
  
  if (readCount === 3 && !state.unlockedAchievements.has('first_3')) {
    state.unlockedAchievements.add('first_3');
    showAchievementToast('Quick Learner', 'Read 3 articles! 🚀');
  }
  
  if (readCount === 5 && !state.unlockedAchievements.has('focus_master')) {
    state.unlockedAchievements.add('focus_master');
    showAchievementToast('Focus Master', 'Completed 5 articles! 🎯');
  }
}

function showAchievementToast(title, description) {
  const toast = document.getElementById('achievementToast');
  const text = document.getElementById('achievementText');
  
  toast.querySelector('div > div:first-child').textContent = title;
  text.textContent = description;
  
  toast.style.display = 'flex';
  
  setTimeout(() => {
    toast.style.display = 'none';
  }, 4000);
}

function triggerConfetti() {
  const container = document.getElementById('confettiContainer');
  const colors = ['#667eea', '#764ba2', '#00d4ff', '#51cf66', '#ffd93d', '#ff6b6b'];
  
  for (let i = 0; i < 50; i++) {
    setTimeout(() => {
      const confetti = document.createElement('div');
      confetti.className = 'confetti';
      confetti.style.left = Math.random() * 100 + '%';
      confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
      confetti.style.animationDelay = Math.random() * 0.5 + 's';
      confetti.style.animationDuration = (Math.random() * 2 + 2) + 's';
      container.appendChild(confetti);
      
      setTimeout(() => confetti.remove(), 4000);
    }, i * 30);
  }
}

// Audio Player
function playArticleAudio(articleId) {
  const article = articles.find(a => a.id === articleId);
  if (!article) return;

  // Stop any existing audio
  if (state.audio.synthesis) {
    speechSynthesis.cancel();
  }

  // Setup audio
  const text = `${article.headline}. ${article.fullText}`;
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.rate = state.settings.audioSpeed;
  
  document.getElementById('audioArticleTitle').textContent = article.headline;
  document.getElementById('audioModal').classList.add('active');
  document.querySelector('.waveform').classList.add('paused');
  
  state.audio.synthesis = speechSynthesis;
  state.audio.utterance = utterance;
  state.audio.isPlaying = false;
  state.audio.currentText = text;
  
  // Update play button
  updateAudioPlayButton();
}

function toggleAudioPlayback() {
  if (!state.audio.utterance) return;

  if (state.audio.isPlaying) {
    speechSynthesis.pause();
    state.audio.isPlaying = false;
    document.querySelector('.waveform').classList.remove('playing');
    document.querySelector('.waveform').classList.add('paused');
  } else {
    if (speechSynthesis.paused) {
      speechSynthesis.resume();
    } else {
      speechSynthesis.speak(state.audio.utterance);
    }
    state.audio.isPlaying = true;
    document.querySelector('.waveform').classList.remove('paused');
    document.querySelector('.waveform').classList.add('playing');
  }
  
  updateAudioPlayButton();
}

function updateAudioPlayButton() {
  const btn = document.getElementById('audioPlayBtn');
  const icon = btn.querySelector('.play-icon');
  icon.textContent = state.audio.isPlaying ? '⏸' : '▶';
}

function initAudioModal() {
  document.getElementById('closeAudio').addEventListener('click', () => {
    speechSynthesis.cancel();
    state.audio.isPlaying = false;
    document.getElementById('audioModal').classList.remove('active');
    document.querySelector('.waveform').classList.remove('playing', 'paused');
  });

  document.getElementById('audioPlayBtn').addEventListener('click', toggleAudioPlayback);

  document.querySelectorAll('.speed-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.speed-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const speed = parseFloat(btn.dataset.speed);
      state.settings.audioSpeed = speed;
      
      if (state.audio.utterance) {
        state.audio.utterance.rate = speed;
        if (state.audio.isPlaying) {
          speechSynthesis.cancel();
          state.audio.utterance = new SpeechSynthesisUtterance(state.audio.currentText);
          state.audio.utterance.rate = speed;
          speechSynthesis.speak(state.audio.utterance);
        }
      }
    });
  });
}

// Bookmarks
function renderBookmarks() {
  const bookmarksContent = document.getElementById('bookmarksContent');
  const emptyBookmarks = document.getElementById('emptyBookmarks');
  
  if (state.bookmarkedArticles.size === 0) {
    bookmarksContent.innerHTML = '';
    emptyBookmarks.style.display = 'block';
    return;
  }
  
  emptyBookmarks.style.display = 'none';
  const bookmarkedArticlesList = articles.filter(a => state.bookmarkedArticles.has(a.id));
  
  bookmarksContent.innerHTML = `
    <div class="news-feed">
      ${bookmarkedArticlesList.map(article => `
        <div class="news-card" data-id="${article.id}">
          <div class="news-card-header">
            <span class="news-category" style="background-color: ${getCategoryColor(article.category)}">
              ${article.category}
            </span>
            <span class="news-reading-time">${article.readingTime} read</span>
          </div>
          <h3 class="news-headline">${article.headline}</h3>
          <p class="news-summary">${article.summary}</p>
          <div class="news-actions">
            <button class="action-btn primary" data-action="read" data-id="${article.id}">
              Read Full
            </button>
            <button class="action-btn" data-action="audio" data-id="${article.id}">
              🔊 Listen
            </button>
            <button class="action-btn" data-action="remove" data-id="${article.id}">
              ✕ Remove
            </button>
          </div>
        </div>
      `).join('')}
    </div>
  `;
  
  bookmarksContent.querySelectorAll('[data-action="read"]').forEach(btn => {
    btn.addEventListener('click', () => {
      const articleId = parseInt(btn.dataset.id);
      openArticle(articleId);
    });
  });
  
  bookmarksContent.querySelectorAll('[data-action="audio"]').forEach(btn => {
    btn.addEventListener('click', () => {
      const articleId = parseInt(btn.dataset.id);
      playArticleAudio(articleId);
    });
  });
  
  bookmarksContent.querySelectorAll('[data-action="remove"]').forEach(btn => {
    btn.addEventListener('click', () => {
      const articleId = parseInt(btn.dataset.id);
      state.bookmarkedArticles.delete(articleId);
      renderBookmarks();
    });
  });
}

function initBookmarksScreen() {
  document.getElementById('closeBookmarks').addEventListener('click', () => {
    showScreen('feedScreen');
  });
  
  document.getElementById('backToFeedFromBookmarks').addEventListener('click', () => {
    showScreen('feedScreen');
  });
}

// Settings
function initSettingsScreen() {
  document.getElementById('closeSettings').addEventListener('click', () => {
    showScreen('feedScreen');
  });

  document.getElementById('editInterests').addEventListener('click', () => {
    showScreen('interestScreen');
    renderCategories();
    // Pre-select current interests
    setTimeout(() => {
      state.selectedInterests.forEach(interest => {
        const card = document.querySelector(`[data-category="${interest}"]`);
        if (card) card.classList.add('selected');
      });
    }, 100);
  });

  document.getElementById('saveSettings').addEventListener('click', () => {
    state.timeLimit = parseInt(document.getElementById('timeLimitSetting').value);
    state.settings.fontSize = document.getElementById('fontSizeSetting').value;
    state.settings.theme = document.getElementById('themeSetting').value;
    state.settings.audioSpeed = parseFloat(document.getElementById('audioSpeedSetting').value);
    showScreen('feedScreen');
  });
}

// Time Warning Modal
function initTimeWarningModal() {
  document.getElementById('extendTime').addEventListener('click', () => {
    state.timeLimit += 10; // Add 10 more minutes
    document.getElementById('timeWarningModal').classList.remove('active');
    startSessionTimer();
  });

  document.getElementById('finishSession').addEventListener('click', () => {
    document.getElementById('timeWarningModal').classList.remove('active');
    showScreen('feedScreen');
    updateFeedCompletion();
    document.getElementById('feedCompletion').style.display = 'block';
  });
}

// Initialize App
function init() {
  initWelcomeScreen();
  initInterestScreen();
  initFeedScreen();
  initArticleScreen();
  initAudioModal();
  initBookmarksScreen();
  initSettingsScreen();
  initTimeWarningModal();
  
  showScreen('welcomeScreen');
}

// Start the app when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}