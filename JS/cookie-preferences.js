document.addEventListener("DOMContentLoaded", () => {
    const cookieBanner = document.getElementById("cookieBanner");
    const acceptBtn = document.getElementById("acceptCookies");
    const manageBtn = document.getElementById("manageCookies");
    const acceptAllBtn = document.getElementById("accept-all");
    const savePreferencesBtn = document.getElementById("save-preferences");
    const dismissBtn = document.getElementById("dismiss-modal");
    const closeBtn = document.getElementById("close-modal");
    const cookieModal = document.getElementById("cookie-modal");
    const cookiesLink = document.querySelector(".legal a[href='#']");
    const cookieSettingsLink = document.querySelector(".footer-links a[href='#']");

    // Check localStorage if cookies are accepted, hide banner if true
    if (localStorage.getItem("cookiesAccepted") === "true") {
        cookieBanner.style.display = "none"; // Don't show banner if accepted
    } else {
        cookieBanner.style.display = "flex"; // Show banner if not accepted
    }

    // Accept All Cookies - Save all cookies as accepted
    acceptAllBtn.addEventListener("click", () => {
        acceptAllCookies();
        saveAllCookiePreferences();
        closeCookieModal();
        hideBanner();
    });

    // Accept Cookies from the banner - Save all cookies as accepted
    acceptBtn.addEventListener("click", () => {
        acceptAllCookies();
        saveAllCookiePreferences();
        hideBanner(); 
    });

    // Manage Cookies - Opens the cookie preferences modal
    manageBtn.addEventListener("click", () => {
        openCookieModal();
        initializeToggleSwitches();
    });

    // Cookie Link in Footer
    if (cookiesLink) {
        cookiesLink.addEventListener("click", (e) => {
            e.preventDefault();

            // Open the modal and initialize settings
            openCookieModal();
            initializeToggleSwitches();
            console.log("Footer Cookie Link Clicked");
        });
    }

    // Cookie Settings Link in Footer
    if (cookieSettingsLink) {
        cookieSettingsLink.addEventListener("click", (e) => {
            e.preventDefault();

            // Open the modal
            openCookieModal();

            // Initialize toggle switches to sync preferences
            initializeToggleSwitches();
            console.log("Cookie Settings Link Clicked");
        });
    }

    // Event listeners for modal buttons
    savePreferencesBtn.addEventListener("click", saveCookiePreferences);
    dismissBtn.addEventListener("click", closeCookieModal);
    closeBtn.addEventListener("click", closeCookieModal);

    // Initialize toggle switches based on existing cookies or localStorage state
    function initializeToggleSwitches() {
        const savedState = loadState();
        const analyticsCookie = getCookie("analyticsEnabled");
        const marketingCookie = getCookie("marketingEnabled");

        document.getElementById("analytics-cookies").checked = savedState ? savedState.analytics === "true" : analyticsCookie !== "false";
        document.getElementById("marketing-cookies").checked = savedState ? savedState.marketing === "true" : marketingCookie !== "false";
        document.getElementById("essential-cookies").checked = true;
    }

    // Function to accept all cookies
    function acceptAllCookies() {
        setCookie("essential", "true", 365);
        setCookie("analyticsEnabled", "true", 365);
        setCookie("marketingEnabled", "true", 365);
        setCookie("cookiesAccepted", "true", 365);
        localStorage.setItem("cookiesAccepted", "true"); // Save to localStorage
    }

    // Automatically save all cookies preferences when accepting all
    function saveAllCookiePreferences() {
        saveState("true", "true");
    }

    // Save selected preferences for each cookie type
    function saveCookiePreferences() {
        const analytics = document.getElementById("analytics-cookies").checked ? "true" : "false";
        const marketing = document.getElementById("marketing-cookies").checked ? "true" : "false";

        setCookie("essential", "true", 365);
        setCookie("analyticsEnabled", analytics, 365);
        setCookie("marketingEnabled", marketing, 365);
        setCookie("cookiesAccepted", "true", 365);
        localStorage.setItem("cookiesAccepted", "true"); // Save to localStorage

        saveState(analytics, marketing);
        closeCookieModal();
        hideBanner();
    }

    // Save the state of the preferences
    function saveState(analytics, marketing) {
        localStorage.setItem('cookieState', JSON.stringify({ analytics, marketing }));
    }

    // Load the state of the preferences (when modal opens)
    function loadState() {
        const state = localStorage.getItem('cookieState');
        if (state) {
            return JSON.parse(state);
        }
        return null;
    }

    // Hide the banner
    function hideBanner() {
        cookieBanner.style.display = "none";
    }

    // Function to open the preferences modal
    function openCookieModal() {
        cookieModal.style.display = "block";
        document.body.classList.add("lock-scroll");
        document.documentElement.classList.add("lock-scroll");
    }

    // Function to close the preferences modal
    function closeCookieModal() {
        cookieModal.style.display = "none";
        document.body.classList.remove("lock-scroll");
        document.documentElement.classList.remove("lock-scroll");
    }

    // Utility: Set cookie
    function setCookie(name, value, days) {
        const d = new Date();
        d.setTime(d.getTime() + (days * 24 * 60 * 60 * 1000));
        document.cookie = `${name}=${value}; expires=${d.toUTCString()}; path=/`;
    }

    // Utility: Get cookie
    function getCookie(name) {
        const cookies = document.cookie.split("; ");
        for (let cookie of cookies) {
            const [cookieName, cookieValue] = cookie.split("=");
            if (cookieName === name) return cookieValue;
        }
        return null;
    }
});
