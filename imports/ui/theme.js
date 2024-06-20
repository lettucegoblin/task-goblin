import { theme } from "./store.js";

export function applyTheme() {
  theme.subscribe((currentTheme) => {
    if (currentTheme === "dark") {
      // add dark class to the root html
      document.documentElement.classList.remove("light");
      document.documentElement.classList.add("dark");
      
    } else {
      // remove dark class from the root html
      document.documentElement.classList.remove("dark");
      document.documentElement.classList.add("light");
      
    }
  });
}
