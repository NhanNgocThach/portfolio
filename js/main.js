/* ============================================================
   IMP Final Portfolio — interactions
   - Theme toggle (dark / light) with localStorage
   - Language toggle (EN / VI) with localStorage
   - Click-to-expand panels (top-level sections AND class cards)
   - File-existence probes — missing assets get a "Coming soon" state
   - Footer year + back-to-top button
   ============================================================ */

/* ------------------------------------------------------------
   i18n dictionary
   English text lives in HTML directly via data-i18n attributes.
   We only store the Vietnamese strings here; English = original HTML.
   Per project rules, essay/blockquote bodies are NOT translated —
   so reflection_body and ae061_reflection_body are absent on purpose.
   ------------------------------------------------------------ */
const i18n = {
  vi: {
    /* Hero */
    hero_kicker: "INTO Suffolk · Chương trình Thạc sĩ Tích hợp",
    hero_title: "Hồ Sơ Cuối Khóa",
    hero_sub: "Tổng hợp các bài tập học thuật, chuyên môn và bài phản ánh — minh chứng cho sự sẵn sàng học sau đại học tại Đại học Suffolk.",
    hero_student: "Sinh viên:",
    hero_major: "Chuyên ngành dự kiến:",
    hero_major_value: "[Chuyên ngành]",

    /* Generic */
    section_label: "Mục",
    action_download: "Tải xuống",
    action_open: "Mở",
    action_coming: "Sắp có",

    /* Introduction */
    intro_title: "Giới Thiệu",
    intro_body: "Chào mừng đến với hồ sơ cuối khóa của tôi cho Chương trình Thạc sĩ Tích hợp INTO Suffolk. Trang web này tập hợp các bài tập, bài phản ánh và tài liệu chuyên môn ghi lại sự phát triển của tôi với tư cách là một người viết, người giao tiếp và người học cấp sau đại học.",

    /* Reflection */
    reflection_title: "Bài Phản Ánh",
    reflection_video_title: "Video Phản Ánh",

    /* Elevator Pitch */
    pitch_title: "Bài Thuyết Trình Giới Thiệu",
    pitch_body: "Một bài giới thiệu ngắn về tôi và những mục tiêu tôi dự định theo đuổi sau chương trình AE.",
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
    ae052_narrative_title: "Bài Luận Tự Sự — \"Du Học\"",

    /* AE061 */
    ae061_title: "Kỹ Năng Viết & Nghiên Cứu Sau Đại Học",
    ae061_reflection_title: "Phản Ánh Khóa Học",
    ae061_assignments_title: "Bài Tập",
    ae061_bib_title: "Thư Mục Chú Giải",
    ae061_paper_title: "Bài Nghiên Cứu",

    /* AE065 */
    ae065_title: "Giao Tiếp Sau Đại Học Liên Ngành Nâng Cao",
    ae065_resume_title: "Sơ Yếu Lý Lịch",
    ae065_cover_title: "Thư Xin Việc",
    ae065_linkedin_title: "Hồ Sơ LinkedIn",
    ae065_interview_title: "Yêu Cầu Phỏng Vấn Thông Tin",
    ae065_final_title: "Bài Thuyết Trình Cuối",

    /* Footer */
    footer: "Chương trình Thạc sĩ Tích hợp INTO Suffolk"
  },
  en: {
    /* English fallbacks for action labels (used by the file-probe code
       when it has to swap text dynamically) */
    action_download: "Download",
    action_open: "Open",
    action_coming: "Coming soon"
  }
};

/* In-memory store of the original English HTML for each translatable
   element, so we can switch back to EN without losing inline markup. */
const originalText = new WeakMap();

function captureOriginals() {
  document.querySelectorAll('[data-i18n]').forEach(el => {
    if (!originalText.has(el)) originalText.set(el, el.innerHTML);
  });
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
      // If a translation exists, use it. Otherwise leave English in place
      // (this is what we want for essay/blockquote bodies).
      if (t !== undefined) el.innerHTML = t;
      else {
        const orig = originalText.get(el);
        if (orig !== undefined) el.innerHTML = orig;
      }
    }
  });

  // Action labels on download links may have been overwritten by the
  // file-probe code to "Coming soon". Re-apply the right label.
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

function pickLabel(lang, key) {
  return (i18n[lang] && i18n[lang][key]) || (i18n.en && i18n.en[key]) || key;
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
   Click-to-expand panels (works for both top-level sections and
   the nested .class-card panels inside the Classes section).
   ------------------------------------------------------------ */
function installPanelToggles() {
  document.querySelectorAll('.panel').forEach(panel => {
    // Each panel must have a direct .panel-header child (button) and a
    // direct .panel-body child. We use direct-child checks so that
    // nested panels (class cards inside Classes) don't double-bind.
    const header = panel.querySelector(':scope > .panel-header');
    if (!header) return;

    const toggle = (e) => {
      // Don't toggle if the click started on something inside the body
      // (shouldn't happen since header is its own element, but be safe)
      e.stopPropagation();
      const isOpen = panel.classList.toggle('open');
      header.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
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
   File-existence probes for download links.
   For each <a data-doc-check> we HEAD-request the asset; if it's
   missing, we mark the link .missing and swap the action label.
   ------------------------------------------------------------ */
function installDocProbes() {
  document.querySelectorAll('a[data-doc-check]').forEach(link => {
    const href = link.getAttribute('href');
    if (!href) return;

    fetch(href, { method: 'HEAD' })
      .then(r => {
        if (!r.ok) markMissing(link);
      })
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
  // Block navigation to the 404
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

  // Restore saved theme + language (dark + EN by default)
  let savedTheme = 'dark';
  let savedLang  = 'en';
  try {
    savedTheme = localStorage.getItem('portfolio-theme') || 'dark';
    savedLang  = localStorage.getItem('portfolio-lang')  || 'en';
  } catch (e) { /* ignore */ }
  applyTheme(savedTheme);
  applyLanguage(savedLang);

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

  // Wire panels and probe files
  installPanelToggles();
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
