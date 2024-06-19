<script>
  import TodoList from "./TodoList.svelte";
  import AddTodo from "./AddTodo.svelte";

  let roomCode = "defaultRoom";
</script>

<main>
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
