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

<div>
  <label for="dark-mode-switch"> 
    {#if isDarkMode}
      Dark Mode
    {:else}
      Light Mode
    {/if}
  </label>
  <md-switch
    id="dark-mode-switch"
    tabindex="0"
    icons
    bind:this={isDarkMode}
    on:click={toggleTheme}
    on:keydown={handleKeyDown}
    role="switch"
    aria-label="Toggle Dark Mode"
    aria-checked={isDarkMode}>Dark Mode</md-switch
  >
</div>


<style>
  div {
    display: flex;
    align-items: center;
    margin-bottom: 1rem;
  }

  label {
    font-size: 1.5rem;
    margin-right: 1rem;
  }
</style>