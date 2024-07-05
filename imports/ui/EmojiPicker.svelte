<script>
  import "emoji-picker-element";
  import { createEventDispatcher, onMount } from "svelte";

  export let isVisible = false;
  let emoji = "🚀";
  const dispatch = createEventDispatcher();


  function handleEmojiClick(event) {
    emoji = event.detail.unicode;
    // Dispatch an event with the selected emoji
    dispatch('emojiSelected', { emoji });
  }

  function toggleVisibility() {
    isVisible = !isVisible;
  }

  onMount(() => {
    var elems = document.querySelectorAll(".collapsible");
    var instances = M.Collapsible.init(elems, { accordion: false });
  });


</script>

<button
  class="emoji-picker btn waves-effect waves-light"
  on:click={toggleVisibility}
>
  {emoji}
</button>
{#if isVisible}
  <emoji-picker placeholder="Select an emoji" on:emoji-click={handleEmojiClick}
  ></emoji-picker>
{/if}

<style>
  emoji-picker {
    position: absolute;
    z-index: 9999;
    margin-top: 60px;
  }
</style>
