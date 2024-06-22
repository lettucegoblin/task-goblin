<script>
  //https://m3.material.io/components/all-buttons
  import { onMount } from "svelte";
  import TodoList from "./TodoList.svelte";
  import AddTodo from "./AddTodo.svelte";
  import DarkMode from "./DarkMode.svelte";

  let roomCode = "defaultRoom";
</script>

<main class="container">
  <DarkMode />
  <AddTodo {roomCode} />
  <TodoList {roomCode} />
</main>
