<script>
  import { onMount } from "svelte";

  // import css
  import "../css/global.css";
  import "../css/dark.css";
  import "../css/light.css";

  import TodoList from "./TodoList.svelte";
  import AddTodo from "./AddTodo.svelte";
  import DarkMode from "./DarkMode.svelte";
  import { uniqueNamesGenerator, Config, adjectives, colors, animals } from 'unique-names-generator';

  const customConfig = {
    dictionaries: [adjectives, colors],
    separator: '-',
    length: 2,
  };

  let roomCode = "defaultRoom";
  let isReady = false; // Control variable for rendering components

  onMount(() => {
    const params = new URLSearchParams(window.location.search);
    const urlRoomCode = params.get('roomCode');
    if (urlRoomCode) {
      roomCode = urlRoomCode;
      isReady = true; // Set ready to true as the room code is already set
    } else {
      roomCode = uniqueNamesGenerator(customConfig);
      window.history.pushState({}, '', `?roomCode=${roomCode}`);
      isReady = true; // Set ready to true after setting the room code
    }
  });
</script>

<main class="container">
  <DarkMode />
  {#if isReady}
    <AddTodo {roomCode} />
    <TodoList {roomCode} />
  {/if}
</main>
