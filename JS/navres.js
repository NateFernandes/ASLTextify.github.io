document.addEventListener('DOMContentLoaded', function() {
    // Set up initial state for all dropdowns
    document.querySelectorAll('.sidebar .dropdown').forEach(dropdown => {
        const dropdownContent = dropdown.querySelector('.dropdown-content');
        const arrow = dropdown.querySelector('.dropdown-arrow');
        if (dropdown.classList.contains('active')) {
            dropdownContent.style.maxHeight = dropdownContent.scrollHeight + 'px';
            dropdownContent.style.opacity = '1';
            arrow.style.transform = 'rotate(180deg)';
        } else {
            dropdownContent.style.maxHeight = '0';
            dropdownContent.style.opacity = '0';
            arrow.style.transform = 'rotate(0deg)';
        }
    });
});

function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    const hamburger = document.querySelector('.hamburger-icon');

    // Toggle sidebar visibility
    sidebar.classList.toggle('active');

    // Toggle hamburger icon visibility
    if (sidebar.classList.contains('active')) {
        hamburger.style.display = 'none'; // Hide hamburger when sidebar is active
    } else {
        hamburger.style.display = 'block'; // Show hamburger when sidebar is closed
    }
}

function toggleDropdown(element) {
    const dropdown = element.parentNode;
    const dropdownContent = dropdown.querySelector('.dropdown-content');
    const arrow = element.querySelector('.dropdown-arrow'); // Get the dropdown arrow

    // Close all other dropdowns
    document.querySelectorAll('.sidebar .dropdown').forEach(d => {
        if (d !== dropdown && d.classList.contains('active')) {
            d.classList.remove('active');
            const content = d.querySelector('.dropdown-content');
            content.style.maxHeight = '0';
            content.style.opacity = '0';
            const arrow = d.querySelector('.dropdown-arrow');
            arrow.style.transform = 'rotate(0deg)';
        }
    });

    // Toggle the clicked dropdown
    if (dropdown.classList.contains('active')) {
        dropdown.classList.remove('active');
        dropdownContent.style.maxHeight = '0';
        dropdownContent.style.opacity = '0';
        arrow.style.transform = 'rotate(0deg)';
    } else {
        dropdown.classList.add('active');
        dropdownContent.style.maxHeight = dropdownContent.scrollHeight + 'px';
        dropdownContent.style.opacity = '1';
        arrow.style.transform = 'rotate(180deg)';
    }
}

window.addEventListener('resize', function() {
    const hamburger = document.querySelector('.hamburger-icon');
    const sidebar = document.getElementById('sidebar');

    if (window.innerWidth > 900) {
        hamburger.style.display = 'none'; // Hide hamburger on larger screens
        sidebar.classList.remove('active'); // Close sidebar if it's open
    } else {
        hamburger.style.display = 'block'; // Show hamburger on smaller screens
    }
});

// Close sidebar when clicking outside of it
document.addEventListener('click', function(event) {
    const sidebar = document.getElementById('sidebar');
    const hamburger = document.querySelector('.hamburger-icon');

    if (sidebar.classList.contains('active') && !sidebar.contains(event.target) && !hamburger.contains(event.target)) {
        toggleSidebar(); // Close sidebar if click is outside of it
    }
});
