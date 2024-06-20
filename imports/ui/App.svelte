<script>
  //https://m3.material.io/components/all-buttons
  import { onMount } from "svelte";
  import TodoList from "./TodoList.svelte";
  import AddTodo from "./AddTodo.svelte";
  import DarkMode from "./DarkMode.svelte";
  import M from "materialize-css";

  onMount(() => {
    M.AutoInit();
  });

  let roomCode = "defaultRoom";
</script>

<main class="container">
  <DarkMode />
  <h1>Collaborative To-Do List</h1>
  <AddTodo {roomCode} />
  <TodoList {roomCode} />
</main>

<style>
  main {
    padding: 1rem;
    max-width: 800px;
    margin: 0 auto;
  }
</style>
