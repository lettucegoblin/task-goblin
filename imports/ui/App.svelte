<script>
    import { onMount } from "svelte";
    import TodoList from "./TodoList.svelte";
    import AddTodo from "./AddTodo.svelte";
    import M from "materialize-css";
    import { theme } from "./store.js";
    import { applyTheme } from './theme.js';
  
    onMount(() => {
      M.AutoInit();
    });
  
    let roomCode = "defaultRoom";
  
    $: applyTheme();  // Call applyTheme() when theme changes
  </script>
  
  <main class="container">
    <h1>Collaborative To-Do List</h1>
    <AddTodo {roomCode} />
    <TodoList {roomCode} />
    <div>
      <p>Current theme: {$theme}</p>
      <button on:click={() => theme.set("light")}>Light Mode</button>
      <button on:click={() => theme.set("dark")}>Dark Mode</button>
    </div>
  </main>
  
  <style>
    main {
      padding: 1rem;
      max-width: 800px;
      margin: 0 auto;
    }
  </style>
  