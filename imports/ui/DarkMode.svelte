<script>
  import { theme } from "../stores/store.js";
  import { applyTheme } from "../stores/theme.js";

  // https://github.com/material-components/material-web/blob/main/docs/components/switch.md
  $: applyTheme(); // Call applyTheme() when theme changes
  // Derived reactive value for binding
  let isDarkMode = $theme === "dark";

  // Watch for changes in theme and adjust isDarkMode accordingly
  $: isDarkMode = $theme === "dark";

  function toggleTheme() {
    theme.set(isDarkMode ? "light" : "dark");
  }

  function handleKeyDown(event) {
    // Trigger toggleTheme on Enter or Space key press
    if (event.key === "Enter" || event.key === " ") {
      toggleTheme();
      event.preventDefault(); // Prevent scrolling on Space key press
    }
  }
</script>

<div class="fixed-action-btn">
  <a
    id="theme-switch"
    class="btn-floating btn-large waves-effect waves-light"
    on:click={toggleTheme}
    on:keydown={handleKeyDown}
    tabindex="0"
    aria-label="Toggle dark mode"
    role="switch"
    aria-checked={isDarkMode}
  >
    <i class="material-icons">{isDarkMode ? "wb_sunny" : "brightness_2"}</i>
  </a>
</div>
