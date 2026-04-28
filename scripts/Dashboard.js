const allSideMenu = document.querySelectorAll('#sidebar .side-menu.top li a');

allSideMenu.forEach(item => {
	const li = item.parentElement;
	item.addEventListener('click', function () {
		allSideMenu.forEach(i => { i.parentElement.classList.remove('active'); });
		li.classList.add('active');
	});
});

// ── SIDEBAR TOGGLE ─────────────────────────────────────────
const menuBar = document.querySelector('#content nav .bx.bx-menu');
const sidebar = document.getElementById('sidebar');

// Create a translucent overlay for mobile drawer
const overlay = document.createElement('div');
overlay.id = 'sidebar-overlay';
overlay.style.cssText = 'display:none;position:fixed;inset:0;background:rgba(0,0,0,0.5);z-index:1999;backdrop-filter:blur(2px);';
document.body.appendChild(overlay);

if (menuBar) {
	menuBar.addEventListener('click', function () {
		if (window.innerWidth <= 768) {
			// Mobile: slide-in full drawer
			const isOpen = sidebar.classList.toggle('show-mobile');
			overlay.style.display = isOpen ? 'block' : 'none';
		} else {
			sidebar.classList.toggle('hide');
		}
	});
}

overlay.addEventListener('click', function () {
	sidebar.classList.remove('show-mobile');
	overlay.style.display = 'none';
});

// ── SEARCH BAR ─────────────────────────────────────────────
const searchButton = document.querySelector('#content nav form .form-input button');
const searchButtonIcon = document.querySelector('#content nav form .form-input button .bx');
const searchForm = document.querySelector('#content nav form');

if (searchButton) {
	searchButton.addEventListener('click', function (e) {
		if (window.innerWidth < 576) {
			e.preventDefault();
			searchForm.classList.toggle('show');
			if (searchForm.classList.contains('show')) {
				searchButtonIcon.classList.replace('bx-search', 'bx-x');
			} else {
				searchButtonIcon.classList.replace('bx-x', 'bx-search');
			}
		}
	});
}

// ── INITIAL STATE ──────────────────────────────────────────
if (window.innerWidth < 768) {
	sidebar.classList.add('hide');
} else if (searchButtonIcon) {
	searchButtonIcon.classList.replace('bx-x', 'bx-search');
	if (searchForm) searchForm.classList.remove('show');
}

window.addEventListener('resize', function () {
	if (this.innerWidth > 768) {
		sidebar.classList.remove('show-mobile');
		overlay.style.display = 'none';
	}
	if (this.innerWidth > 576 && searchButtonIcon) {
		searchButtonIcon.classList.replace('bx-x', 'bx-search');
		if (searchForm) searchForm.classList.remove('show');
	}
});

// ── DARK MODE (persist via localStorage) ───────────────────
const switchMode = document.getElementById('switch-mode');

if (switchMode) {
	// Restore saved preference on load
	if (localStorage.getItem('mbms-theme') === 'dark') {
		document.body.classList.add('dark');
		switchMode.checked = true;
	}

	switchMode.addEventListener('change', function () {
		if (this.checked) {
			document.body.classList.add('dark');
			localStorage.setItem('mbms-theme', 'dark');
		} else {
			document.body.classList.remove('dark');
			localStorage.setItem('mbms-theme', 'light');
		}
	});
}
