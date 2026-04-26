/* ============================================================
   IMP Final Portfolio — interactions
   - Theme toggle (dark / light)
   - Language toggle (EN / VI)
   - Expandable class cards
   - Auto-detect missing assets and swap in graceful placeholders
   ============================================================ */

/* ------------------------------------------------------------
   i18n — Vietnamese translations.
   Keys map to data-i18n attributes in index.html.
   English text lives in the HTML directly.
   ------------------------------------------------------------ */
const i18n = {
  vi: {
    hero_kicker: "INTO Suffolk · Chương trình Thạc sĩ Tích hợp",
    hero_title: "Hồ Sơ Cuối Khóa",
    hero_sub: "Tổng hợp các bài tập học thuật, chuyên môn và bài phản ánh được hoàn thành trong các lớp AE051, AE052, AE061 và AE065 — minh chứng cho sự sẵn sàng học sau đại học tại Đại học Suffolk.",
    hero_student: "Sinh viên:",
    hero_major: "Chuyên ngành dự kiến:",
    hero_major_value: "[Chuyên ngành]",

    intro_title: "Giới Thiệu",
    intro_body: "Chào mừng đến với hồ sơ cuối khóa của tôi cho Chương trình Thạc sĩ Tích hợp INTO Suffolk. Trang web này tập hợp các bài tập, bài phản ánh và tài liệu chuyên môn ghi lại sự phát triển của tôi với tư cách là một người viết, người giao tiếp và người học cấp sau đại học. Bài thuyết trình giới thiệu một phút bên dưới đóng vai trò là phần giới thiệu về tôi và những mục tiêu tôi dự định theo đuổi sau chương trình AE.",
    intro_pitch_title: "Bài Thuyết Trình Giới Thiệu (1 phút)",

    classes_title: "Các Môn Học",
    classes_sub: "Nhấp vào một môn học để mở rộng và xem các bài tập.",

    ae051_title: "Giao Tiếp Sau Đại Học Liên Ngành",
    ae051_sub: "Phản ánh video · 4 bài thuyết trình",
    ae051_reflection_title: "Video Phản Ánh",
    ae051_informative_title: "Bài Thuyết Trình Cung Cấp Thông Tin (Video)",
    ae051_presentations_title: "Bài Thuyết Trình",
    ae051_presentations_note: "Cả bốn bài thuyết trình đều được bao gồm (AE051 chỉ yêu cầu hai).",

    ae052_title: "Thành Công Học Tập Sau Đại Học",
    ae052_sub: "Phân tích phê bình · Bài luận phản ánh · Bản ghi nhớ",
    ae052_critical_title: "Bài Luận Phân Tích Phê Bình",
    ae052_reflective_title: "Bài Luận Phản Ánh",
    ae052_memo_title: "Bản Ghi Nhớ Chuyên Môn",
    ae052_narrative_title: "Bài Luận Tự Sự — \"Du Học\"",
    ae052_narrative_note: "Tài liệu bổ sung — bài tự sự cá nhân về việc chuyển từ Việt Nam đến Boston.",

    ae061_title: "Kỹ Năng Viết & Nghiên Cứu Sau Đại Học",
    ae061_sub: "Phản ánh · Thư mục chú giải · Bài nghiên cứu",
    ae061_reflection_title: "Phản Ánh Khóa Học (150 từ)",
    ae061_bib_title: "Thư Mục Chú Giải",
    ae061_paper_title: "Bài Nghiên Cứu",
    ae061_paper_note: "Bao gồm trang tiêu đề và tài liệu tham khảo.",

    ae065_title: "Giao Tiếp Sau Đại Học Liên Ngành Nâng Cao",
    ae065_sub: "Sơ yếu lý lịch · Thư xin việc · LinkedIn · Bài thuyết trình cuối",
    ae065_resume_title: "Sơ Yếu Lý Lịch",
    ae065_resume_note: "Đang được chỉnh sửa — sẽ tải lên khi hoàn thành.",
    ae065_cover_title: "Thư Xin Việc",
    ae065_linkedin_title: "Hồ Sơ LinkedIn",
    ae065_interview_title: "Yêu Cầu Phỏng Vấn Thông Tin",
    ae065_final_title: "Bài Thuyết Trình Cuối",
    ae065_pitch_title: "Bài Thuyết Trình Giới Thiệu (1 phút)",
    ae065_pitch_note: "Cùng một video với phần Giới thiệu ở trên.",

    imp_title: "Phản Ánh IMP",
    imp_video_title: "Video Phản Ánh 2 Phút",
    imp_video_body: "Một bản ghi mô tả con đường của tôi trong chương trình IMP — ấn tượng ban đầu, những trở ngại gặp phải, mục tiêu đặt ra và mục tiêu đạt được.",
    imp_written_title: "Bài Phản Ánh Viết (500 từ)",

    footer: "Chương trình Thạc sĩ Tích hợp INTO Suffolk",

    // Placeholder strings (used by file-probe fallbacks)
    placeholder_elevator: "Bài thuyết trình giới thiệu — sẽ được ghi sau",
    placeholder_video: "Video — sẽ được ghi sau",
    status_available: "Có sẵn",
    status_coming: "Sắp có"
  },
  en: {
    placeholder_elevator: "Elevator pitch video — to be recorded",
    placeholder_video: "Video — to be recorded",
    status_available: "Available",
    status_coming: "Coming soon"
  }
};

/* In-memory store of original English HTML for each translatable element,
   so we can switch back without losing it. */
const originalText = new WeakMap();

function captureOriginals() {
  document.querySelectorAll('[data-i18n]').forEach(el => {
    if (!originalText.has(el)) originalText.set(el, el.innerHTML);
  });
}

function applyLanguage(lang) {
  document.documentElement.lang = lang;
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (lang === 'en') {
      // Restore the original English HTML
      const orig = originalText.get(el);
      if (orig !== undefined) el.innerHTML = orig;
    } else {
      const t = (i18n[lang] || {})[key];
      if (t !== undefined) el.innerHTML = t;
    }
  });
  // Update labels on previously-replaced status badges and fallbacks
  document.querySelectorAll('[data-doc-status]').forEach(el => {
    if (el.dataset.state === 'ready') {
      el.textContent = (i18n[lang] && i18n[lang].status_available) || 'Available';
    } else if (el.dataset.state === 'missing') {
      el.textContent = (i18n[lang] && i18n[lang].status_coming) || 'Coming soon';
    }
  });
  document.querySelectorAll('[data-fallback-message]').forEach(el => {
    const key = el.getAttribute('data-fallback-message');
    const msg = (i18n[lang] && i18n[lang][key]) || (i18n.en[key] || 'Coming soon');
    const strong = el.querySelector('strong');
    if (strong) strong.textContent = msg;
  });

  const label = document.getElementById('lang-label');
  if (label) label.textContent = lang.toUpperCase();
  try { localStorage.setItem('portfolio-lang', lang); } catch (e) { /* ignore */ }
}

/* ------------------------------------------------------------
   Theme toggle
   ------------------------------------------------------------ */
function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  const icon = document.getElementById('theme-icon');
  if (icon) icon.textContent = theme === 'dark' ? '☀️' : '🌙';
  try { localStorage.setItem('portfolio-theme', theme); } catch (e) { /* ignore */ }
}

/* ------------------------------------------------------------
   Expandable class cards
   ------------------------------------------------------------ */
function installClassCards() {
  document.querySelectorAll('.class-card').forEach(card => {
    const header = card.querySelector('.class-card-header');
    if (!header) return;
    const toggle = () => {
      const isOpen = card.classList.toggle('open');
      header.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    };
    header.addEventListener('click', toggle);
    header.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        toggle();
      }
    });
  });
}

/* ------------------------------------------------------------
   Video fallback: if source 404s, swap in a "coming soon" card
   ------------------------------------------------------------ */
function installVideoFallbacks() {
  document.querySelectorAll('video[data-fallback-key]').forEach(video => {
    const source = video.querySelector('source');
    if (!source) return;
    const key = video.getAttribute('data-fallback-key');
    const handleMissing = () => {
      if (video.dataset.fallbackInserted) return;
      video.dataset.fallbackInserted = '1';
      const lang = document.documentElement.lang || 'en';
      const msg = (i18n[lang] && i18n[lang][key]) || i18n.en[key] || 'Coming soon';
      const div = document.createElement('div');
      div.className = 'media-placeholder';
      div.setAttribute('data-fallback-message', key);
      div.innerHTML = '<strong>' + msg + '</strong>' +
        '<code>' + source.getAttribute('src') + '</code>';
      video.replaceWith(div);
    };
    source.addEventListener('error', handleMissing);
    video.addEventListener('error', handleMissing);
    fetch(source.getAttribute('src'), { method: 'HEAD' })
      .then(r => { if (!r.ok) handleMissing(); })
      .catch(handleMissing);
  });
}

/* ------------------------------------------------------------
   Document link probes: flip the status badge per file presence
   ------------------------------------------------------------ */
function installDocStatusChecks() {
  document.querySelectorAll('a[data-doc-check]').forEach(link => {
    const status = link.closest('li')?.querySelector('[data-doc-status]');
    if (!status) return;
    const lang = document.documentElement.lang || 'en';
    fetch(link.getAttribute('href'), { method: 'HEAD' })
      .then(r => {
        if (r.ok) {
          status.textContent = (i18n[lang] && i18n[lang].status_available) || 'Available';
          status.className = 'status ready';
          status.dataset.state = 'ready';
        } else {
          status.textContent = (i18n[lang] && i18n[lang].status_coming) || 'Coming soon';
          status.className = 'status not-ready';
          status.dataset.state = 'missing';
          link.removeAttribute('href');
          link.style.cursor = 'default';
          link.style.opacity = '.6';
        }
      })
      .catch(() => {
        status.textContent = (i18n[lang] && i18n[lang].status_coming) || 'Coming soon';
        status.className = 'status not-ready';
        status.dataset.state = 'missing';
      });
  });
}

/* ------------------------------------------------------------
   Init
   ------------------------------------------------------------ */
document.addEventListener('DOMContentLoaded', () => {
  // Footer year
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Save originals BEFORE first render
  captureOriginals();

  // Restore saved theme/lang
  let savedTheme = 'dark';
  let savedLang = 'en';
  try {
    savedTheme = localStorage.getItem('portfolio-theme') || 'dark';
    savedLang  = localStorage.getItem('portfolio-lang')  || 'en';
  } catch (e) { /* ignore */ }
  applyTheme(savedTheme);
  applyLanguage(savedLang);

  // Wire toggles
  const themeBtn = document.getElementById('theme-toggle');
  if (themeBtn) themeBtn.addEventListener('click', () => {
    const next = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    applyTheme(next);
  });
  const langBtn = document.getElementById('lang-toggle');
  if (langBtn) langBtn.addEventListener('click', () => {
    const next = document.documentElement.lang === 'vi' ? 'en' : 'vi';
    applyLanguage(next);
  });

  // Interactive bits
  installClassCards();
  installVideoFallbacks();
  installDocStatusChecks();

  // Back to top
  const btn = document.getElementById('back-to-top');
  if (btn) {
    const toggleBtn = () => {
      if (window.scrollY > 400) btn.classList.add('visible');
      else btn.classList.remove('visible');
    };
    window.addEventListener('scroll', toggleBtn, { passive: true });
    btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  }
});
