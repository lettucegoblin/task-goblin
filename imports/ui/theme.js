import { theme } from "./store.js";

export function applyTheme() {
  theme.subscribe((currentTheme) => {
    if (currentTheme === "dark") {
      document.documentElement.style.setProperty(
        "background-color",
        getComputedStyle(document.documentElement).getPropertyValue(
          "--dark-background-color"
        )
      );
      document.documentElement.style.setProperty(
        "color",
        getComputedStyle(document.documentElement).getPropertyValue(
          "--dark-text-color"
        )
      );
    } else {
      document.documentElement.style.setProperty(
        "background-color",
        getComputedStyle(document.documentElement).getPropertyValue(
          "--light-background-color"
        )
      );
      document.documentElement.style.setProperty(
        "color",
        getComputedStyle(document.documentElement).getPropertyValue(
          "--light-text-color"
        )
      );
    }
  });
}
