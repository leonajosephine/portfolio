// Multi-Theme Switcher
// Nutzbar mit: 
//  - mehreren Buttons: <button class="theme-btn" data-theme="light">Light</button>
//  - optional einem Cycle-Button: <button id="themeToggle">Change Theme</button>

(function () {
    const root = document.documentElement;
    const storageKey = "theme";
  
    // Alle verfügbaren Themes aus Buttons lesen (Fallback auf Standardliste)
    const btns = Array.from(document.querySelectorAll(".theme-btn"));
    const THEMES = btns.length
      ? btns.map(b => b.dataset.theme).filter(Boolean)
      : ["dark", "light", "red", "girly", "minimal", "artsy"];
  
    // Dark als Default (ohne data-theme Attribut)
    function applyTheme(theme) {
      if (!theme || theme === "dark") {
        root.removeAttribute("data-theme");
        localStorage.removeItem(storageKey);
      } else {
        root.setAttribute("data-theme", theme);
        localStorage.setItem(storageKey, theme);
      }
      syncActive();
    }
  
    function currentTheme() {
      return root.dataset.theme || "dark";
    }
  
    function syncActive() {
      const cur = currentTheme();
      btns.forEach(b => b.classList.toggle("is-active", b.dataset.theme === cur));
    }
  
    // Startzustand: gespeichertes Theme oder Systempräferenz
    const saved = localStorage.getItem(storageKey);
    if (saved) {
      applyTheme(saved);
    } else {
      const prefersLight = window.matchMedia?.("(prefers-color-scheme: light)")?.matches;
      if (prefersLight && THEMES.includes("light")) applyTheme("light");
      else applyTheme("dark");
    }
  
    // Klick-Handling für einzelne Theme-Buttons
    btns.forEach(btn => {
      btn.addEventListener("click", () => {
        const theme = btn.dataset.theme;
        applyTheme(theme);
      });
    });
  
    // Optional: ein einzelner Cycle-Button (#themeToggle) rotiert durch alle Themes
    const cycleBtn = document.getElementById("themeToggle");
    if (cycleBtn) {
      cycleBtn.addEventListener("click", () => {
        const cur = currentTheme();
        const idx = THEMES.indexOf(cur);
        const next = THEMES[(idx + 1) % THEMES.length];
        applyTheme(next);
      });
    }
  
    // Optional: Sync über mehrere Tabs
    window.addEventListener("storage", (e) => {
      if (e.key === storageKey) {
        applyTheme(e.newValue || "dark");
      }
    });
  })();
  