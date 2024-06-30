<script>
  import "emoji-picker-element";
  import { createEventDispatcher, onMount } from "svelte";

  let isVisible = false;
  let emoji = "🚀";
  const dispatch = createEventDispatcher();


  function handleEmojiClick(event) {
    emoji = event.detail.unicode;
    // Dispatch an event with the selected emoji
    dispatch('emojiSelected', { emoji });
  }

  onMount(() => {
    var elems = document.querySelectorAll(".collapsible");
    var instances = M.Collapsible.init(elems, { accordion: false });
  });
</script>

<button
  class="btn waves-effect waves-light"
  on:click={() => {
    isVisible = !isVisible;
  }}
>
  {isVisible ? "Hide" : "Show"} Emoji Picker
</button>
{#if isVisible}
  <emoji-picker placeholder="Select an emoji" on:emoji-click={handleEmojiClick}
  ></emoji-picker>
{/if}

<style>
  emoji-picker {
    position: absolute;
    z-index: 9;
  }
</style>
