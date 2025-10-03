// JS für Theme-Umschaltung (Dark <-> Light)

// Wurzelelement
const root = document.documentElement;

// gespeicherte Einstellung laden
const saved = localStorage.getItem("theme");
if (saved) {
  root.dataset.theme = saved;
}

// Button-Element holen
const toggleBtn = document.getElementById("themeToggle");

if (toggleBtn) {
  toggleBtn.addEventListener("click", () => {
    // wenn gerade Light aktiv ist -> Dark setzen, sonst umgekehrt
    const isLight = root.dataset.theme === "light";

    if (isLight) {
      root.removeAttribute("data-theme");     // Dark = Default
      localStorage.removeItem("theme");
    } else {
      root.setAttribute("data-theme", "light");
      localStorage.setItem("theme", "light");
    }
  });
}
