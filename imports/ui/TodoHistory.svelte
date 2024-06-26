<script>
  import { onMount } from "svelte";
  import TodoItem from "./TodoItem.svelte";
  import { todos } from "../stores/store";
  let groupedTodos = {};

  let TodaysDate = new Date().toLocaleDateString();

  $: groupedTodos = $todos.reduce((acc, todo) => {
    const date = new Date(todo.createdAt).toLocaleDateString();
    // remove if it's today
    if (date === TodaysDate) return acc;
    if (!acc[date]) acc[date] = [];
    acc[date].push(todo);
    return acc;
  }, {});
</script>

{#if Object.keys(groupedTodos).length >= 1}
    <h5>History</h5>
{/if}

{#each Object.keys(groupedTodos).sort().reverse() as day}
  <details>
    <summary>{day}</summary>
    <ul class="collection">
      {#each groupedTodos[day] as todo}
        <li class="collection-item">
          <TodoItem class="collection-item" {todo} isHistory={true} />
        </li>
      {/each}
    </ul>
  </details>
{/each}
