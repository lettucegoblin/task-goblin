<script>
  import { theme } from "./store.js";

  function toggleTheme() {
    theme.update((current) => (current === "light" ? "dark" : "light"));
  }
</script>

<button on:click={toggleTheme}>Toggle Theme</button>
