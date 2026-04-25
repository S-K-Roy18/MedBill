// scripts/theme.js
// Shared dark/light mode logic for all MBMS pages
// Include this script in every page's <head> with defer or at end of body

(function () {
  // Apply saved theme IMMEDIATELY to avoid white flash on dark mode pages
  if (localStorage.getItem('mbmsTheme') === 'dark') {
    document.documentElement.classList.add('dark');
    document.addEventListener('DOMContentLoaded', function () {
      document.body.classList.add('dark');
    });
  }
})();

// Called by the toggle button on any page
function toggleTheme() {
  const isDark = document.body.classList.toggle('dark');
  document.documentElement.classList.toggle('dark', isDark);
  localStorage.setItem('mbmsTheme', isDark ? 'dark' : 'light');
  _updateIcons();
}

function _updateIcons() {
  const isDark = document.body.classList.contains('dark');
  // Update sun/moon icons on any page
  document.querySelectorAll('.theme-icon').forEach(function (el) {
    el.className = 'theme-icon ' + (isDark ? 'fas fa-sun' : 'fas fa-moon');
    el.title = isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode';
  });
  // Update Dashboard checkbox (if present)
  const cb = document.getElementById('switch-mode');
  if (cb) cb.checked = isDark;
}

// Run after DOM is ready
document.addEventListener('DOMContentLoaded', function () {
  // Sync body class with documentElement class (set in IIFE above)
  if (document.documentElement.classList.contains('dark')) {
    document.body.classList.add('dark');
  }
  _updateIcons();

  // Wire the Dashboard checkbox if present
  const cb = document.getElementById('switch-mode');
  if (cb) {
    cb.addEventListener('change', function () {
      const isDark = this.checked;
      document.body.classList.toggle('dark', isDark);
      document.documentElement.classList.toggle('dark', isDark);
      localStorage.setItem('mbmsTheme', isDark ? 'dark' : 'light');
      _updateIcons();
    });
  }
});
