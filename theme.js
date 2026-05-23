// theme.js — shared dark mode toggle logic

// Apply saved theme immediately (also called inline before body renders, but kept here for completeness)
(function () {
  const saved = localStorage.getItem('theme');
  if (saved === 'dark' || (!saved && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    document.documentElement.setAttribute('data-theme', 'dark');
  }
})();

function isDark() {
  return document.documentElement.getAttribute('data-theme') === 'dark';
}

function updateToggleBtn() {
  const icon = document.getElementById('themeIcon');
  const label = document.getElementById('themeLabel');
  if (!icon || !label) return;
  if (isDark()) {
    icon.textContent = '☀️';
    label.textContent = 'Light';
  } else {
    icon.textContent = '🌙';
    label.textContent = 'Dark';
  }
}

// Tell Cusdis which theme to use and reload its iframe
function updateCusdisTheme() {
  const thread = document.getElementById('cusdis_thread');
  if (!thread) return;
  thread.setAttribute('data-theme', isDark() ? 'dark' : 'light');
  // CUSDIS global is set by their script — call renderTo to re-render with new theme
  if (window.CUSDIS && typeof window.CUSDIS.renderTo === 'function') {
    window.CUSDIS.renderTo(thread);
  }
}

document.addEventListener('DOMContentLoaded', function () {
  // Set Cusdis theme before their script renders the iframe
  const thread = document.getElementById('cusdis_thread');
  if (thread) thread.setAttribute('data-theme', isDark() ? 'dark' : 'light');
  updateToggleBtn();
  updateCusdisTheme();

  const btn = document.getElementById('themeToggle');
  if (!btn) return;

  btn.addEventListener('click', function () {
    const dark = isDark();
    document.documentElement.setAttribute('data-theme', dark ? 'light' : 'dark');
    localStorage.setItem('theme', dark ? 'light' : 'dark');
    updateToggleBtn();
    updateCusdisTheme();
  });
});