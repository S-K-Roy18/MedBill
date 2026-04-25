document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');
    const profileDropdownToggle = document.getElementById('profileDropdownToggle');
    const dropdown = document.querySelector('.dropdown');

    // 1. Mobile Navigation Toggle
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            // Close dropdown when opening hamburger
            if (dropdown) dropdown.classList.remove('active');
        });
    }

    // 2. Profile Dropdown Toggle
    if (profileDropdownToggle && dropdown) {
        profileDropdownToggle.addEventListener('click', (e) => {
            e.preventDefault(); // Prevent default link behavior
            // Stop the click from immediately propagating to the window close listener
            e.stopPropagation(); 
            dropdown.classList.toggle('active');
            // Close mobile menu if open when opening dropdown
            if(navMenu) navMenu.classList.remove('active');
        });

        // Close dropdown when clicking outside
        window.addEventListener('click', (e) => {
            if (dropdown.classList.contains('active') && !dropdown.contains(e.target)) {
                dropdown.classList.remove('active');
            }
        });
    }
    
});


