/* ============================================================
   IMP Final Portfolio — interactions
   - Tab switching between views (Introduction / Classes)
   - Theme toggle (dark / light) with localStorage
   - Language toggle (EN / VI) with localStorage
   - Singleton class cards: only one open at a time
   - File-existence probes — missing assets get a "Coming soon" state
   - Footer year + back-to-top button
   ============================================================ */

/* ------------------------------------------------------------
   i18n dictionary
   English text lives in HTML directly via data-i18n attributes.
   We only store Vietnamese strings here; English = original HTML.
   Per project rules, essay/blockquote bodies are NOT translated.
   ------------------------------------------------------------ */
const i18n = {
  vi: {
    /* Nav */
    nav_intro: "Giới Thiệu",
    nav_classes: "Các Môn Học",

    /* Hero */
    hero_kicker: "INTO Suffolk · Chương trình Thạc sĩ Tích hợp",
    hero_title: "Hồ Sơ Cuối Khóa",
    hero_sub: "Tổng hợp các bài tập học thuật, chuyên môn và bài phản ánh — minh chứng cho sự sẵn sàng học sau đại học tại Đại học Suffolk.",
    hero_major: "Chuyên ngành:",

    /* Generic */
    action_download: "Tải xuống",
    action_open: "Mở",
    action_coming: "Sắp có",

    /* Introduction */
    intro_title: "Giới Thiệu",
    intro_body: "Chào mừng đến với hồ sơ cuối khóa của tôi cho Chương trình Thạc sĩ Tích hợp INTO Suffolk. Trang web này tập hợp các bài tập, bài phản ánh và tài liệu chuyên môn ghi lại sự phát triển của tôi với tư cách là một người viết, người giao tiếp và người học cấp sau đại học.",

    /* Reflection */
    reflection_title: "Bài Phản Ánh",
    reflection_doc_title: "Bài Phản Ánh Viết",
    reflection_video_title: "Video Phản Ánh",

    /* Elevator Pitch */
    pitch_title: "Bài Thuyết Trình Giới Thiệu",
    pitch_file_title: "Video Bài Thuyết Trình Giới Thiệu",

    /* Classes */
    classes_title: "Các Môn Học",
    classes_sub: "Nhấp vào một môn học để xem các bài tập.",

    /* AE051 */
    ae051_title: "Giao Tiếp Sau Đại Học Liên Ngành",
    ae051_reflection_title: "Video Phản Ánh",
    ae051_demo_title: "Bài Thuyết Trình Minh Họa",
    ae051_informative_title: "Bài Thuyết Trình Cung Cấp Thông Tin",
    ae051_persuasive_title: "Bài Thuyết Trình Thuyết Phục",
    ae051_group_title: "Dự Án Nhóm",

    /* AE052 */
    ae052_title: "Thành Công Học Tập Sau Đại Học",
    ae052_critical_title: "Bài Luận Phân Tích Phê Bình",
    ae052_reflective_title: "Bài Luận Phản Ánh",
    ae052_memo_title: "Bản Ghi Nhớ Chuyên Môn",
    ae052_narrative_title: "Bài Luận Tự Sự",

    /* AE061 */
    ae061_title: "Kỹ Năng Viết & Nghiên Cứu Sau Đại Học",
    ae061_bib_title: "Thư Mục Chú Giải",
    ae061_paper_title: "Bài Nghiên Cứu",

    /* AE065 */
    ae065_title: "Giao Tiếp Sau Đại Học Liên Ngành Nâng Cao",
    ae065_resume_title: "Sơ Yếu Lý Lịch",
    ae065_cover_title: "Thư Xin Việc",
    ae065_linkedin_title: "Hồ Sơ LinkedIn",
    ae065_interview_title: "Dự Án Phỏng Vấn Thông Tin",
    ae065_final_title: "Bài Thuyết Trình Cuối",

    /* Footer */
    footer: "Chương trình Thạc sĩ Tích hợp INTO Suffolk"
  },
  en: {
    action_download: "Download",
    action_open: "Open",
    action_coming: "Coming soon"
  }
};

/* In-memory store of original English HTML for translatable elements */
const originalText = new WeakMap();

function captureOriginals() {
  document.querySelectorAll('[data-i18n]').forEach(el => {
    if (!originalText.has(el)) originalText.set(el, el.innerHTML);
  });
}

function pickLabel(lang, key) {
  return (i18n[lang] && i18n[lang][key]) || (i18n.en && i18n.en[key]) || key;
}

/* ------------------------------------------------------------
   Language
   ------------------------------------------------------------ */
function applyLanguage(lang) {
  document.documentElement.lang = lang;

  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (lang === 'en') {
      const orig = originalText.get(el);
      if (orig !== undefined) el.innerHTML = orig;
    } else {
      const t = (i18n[lang] || {})[key];
      if (t !== undefined) el.innerHTML = t;
      else {
        const orig = originalText.get(el);
        if (orig !== undefined) el.innerHTML = orig;
      }
    }
  });

  // Re-apply correct download/coming labels after language switch
  document.querySelectorAll('[data-doc-action]').forEach(el => {
    const link = el.closest('a');
    if (link && link.classList.contains('missing')) {
      el.textContent = pickLabel(lang, 'action_coming');
    } else {
      el.textContent = pickLabel(lang, 'action_download');
    }
  });

  const label = document.getElementById('lang-label');
  if (label) label.textContent = lang.toUpperCase();
  const btn = document.getElementById('lang-toggle');
  if (btn) btn.setAttribute('aria-label',
    lang === 'vi' ? 'Chuyển sang tiếng Anh' : 'Switch to Vietnamese');

  try { localStorage.setItem('portfolio-lang', lang); } catch (e) { /* ignore */ }
}

/* ------------------------------------------------------------
   Theme
   ------------------------------------------------------------ */
function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  const icon = document.getElementById('theme-icon');
  if (icon) icon.textContent = theme === 'dark' ? '☀️' : '🌙';
  const btn = document.getElementById('theme-toggle');
  if (btn) btn.setAttribute('aria-label',
    theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme');
  try { localStorage.setItem('portfolio-theme', theme); } catch (e) { /* ignore */ }
}

/* ------------------------------------------------------------
   View switching (singleton-style tabs)
   ------------------------------------------------------------ */
function showView(name) {
  document.querySelectorAll('.view').forEach(v => {
    v.classList.toggle('active', v.dataset.view === name);
  });
  document.querySelectorAll('.nav-tab').forEach(b => {
    const isActive = b.dataset.view === name;
    b.classList.toggle('active', isActive);
    b.setAttribute('aria-selected', isActive ? 'true' : 'false');
  });
  // When leaving the Classes view, collapse any open class cards
  if (name !== 'classes') {
    document.querySelectorAll('.class-card.open').forEach(c => {
      c.classList.remove('open');
      const h = c.querySelector('.panel-header');
      if (h) h.setAttribute('aria-expanded', 'false');
    });
  }
  try { localStorage.setItem('portfolio-view', name); } catch (e) { /* ignore */ }
  // Scroll back to the top of the content so the user sees the view start
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function installNavTabs() {
  document.querySelectorAll('.nav-tab').forEach(btn => {
    btn.addEventListener('click', () => showView(btn.dataset.view));
  });
}

/* ------------------------------------------------------------
   Class cards — singleton expand (only one open at a time)
   ------------------------------------------------------------ */
function installClassCards() {
  const cards = document.querySelectorAll('.class-card');
  cards.forEach(card => {
    const header = card.querySelector(':scope > .panel-header');
    if (!header) return;

    const toggle = (e) => {
      e.stopPropagation();
      const willOpen = !card.classList.contains('open');
      // Close every other card first
      cards.forEach(c => {
        if (c !== card && c.classList.contains('open')) {
          c.classList.remove('open');
          const h = c.querySelector('.panel-header');
          if (h) h.setAttribute('aria-expanded', 'false');
        }
      });
      card.classList.toggle('open', willOpen);
      header.setAttribute('aria-expanded', willOpen ? 'true' : 'false');
    };

    header.addEventListener('click', toggle);
    header.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        toggle(e);
      }
    });
  });
}

/* ------------------------------------------------------------
   Avatar — try jpg, then png, then jpeg; fall back to initials
   ------------------------------------------------------------ */
function installAvatar() {
  const img = document.getElementById('avatar-img');
  const wrap = document.getElementById('avatar');
  if (!img || !wrap) return;

  const candidates = [
    'assets/avatar.jpg',
    'assets/avatar.png',
    'assets/avatar.jpeg',
    'assets/avatar.webp'
  ];
  let i = 0;

  const tryNext = () => {
    if (i >= candidates.length) {
      wrap.classList.add('no-image');
      return;
    }
    img.src = candidates[i++];
  };

  img.addEventListener('error', tryNext);
  // Kick off the first attempt (HTML default already pointed at avatar.jpg,
  // so increment past it before retrying).
  i = 1;
}

/* ------------------------------------------------------------
   File-existence probes for download links
   ------------------------------------------------------------ */
function installDocProbes() {
  document.querySelectorAll('a[data-doc-check]').forEach(link => {
    const href = link.getAttribute('href');
    if (!href) return;
    fetch(href, { method: 'HEAD' })
      .then(r => { if (!r.ok) markMissing(link); })
      .catch(() => markMissing(link));
  });
}

function markMissing(link) {
  link.classList.add('missing');
  const action = link.querySelector('[data-doc-action]');
  if (action) {
    const lang = document.documentElement.lang || 'en';
    action.textContent = pickLabel(lang, 'action_coming');
  }
  link.addEventListener('click', e => e.preventDefault());
  link.removeAttribute('download');
}

/* ------------------------------------------------------------
   Init
   ------------------------------------------------------------ */
document.addEventListener('DOMContentLoaded', () => {
  // Footer year
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Capture English originals BEFORE any language switch
  captureOriginals();

  // Restore saved theme + language + view
  let savedTheme = 'dark';
  let savedLang  = 'en';
  let savedView  = 'intro';
  try {
    savedTheme = localStorage.getItem('portfolio-theme') || 'dark';
    savedLang  = localStorage.getItem('portfolio-lang')  || 'en';
    savedView  = localStorage.getItem('portfolio-view')  || 'intro';
  } catch (e) { /* ignore */ }
  applyTheme(savedTheme);
  applyLanguage(savedLang);
  showView(savedView);
  // showView scrolls — undo that on first load so the hero stays visible
  window.scrollTo({ top: 0, behavior: 'auto' });

  // Theme toggle
  const themeBtn = document.getElementById('theme-toggle');
  if (themeBtn) themeBtn.addEventListener('click', () => {
    const current = document.documentElement.getAttribute('data-theme') || 'dark';
    applyTheme(current === 'dark' ? 'light' : 'dark');
  });

  // Language toggle
  const langBtn = document.getElementById('lang-toggle');
  if (langBtn) langBtn.addEventListener('click', () => {
    const current = document.documentElement.lang || 'en';
    applyLanguage(current === 'vi' ? 'en' : 'vi');
  });

  // Wire navigation, class cards, avatar, file probes
  installNavTabs();
  installClassCards();
  installAvatar();
  installDocProbes();

  // Back to top
  const topBtn = document.getElementById('back-to-top');
  if (topBtn) {
    const onScroll = () => {
      if (window.scrollY > 400) topBtn.classList.add('visible');
      else topBtn.classList.remove('visible');
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    topBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
});
