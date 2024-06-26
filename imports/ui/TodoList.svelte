<script>
  import TodoItem from "./TodoItem.svelte";
  import { dndzone } from "svelte-dnd-action";
  import { flip } from "svelte/animate";
  import { overrideItemIdKeyNameBeforeInitialisingDndZones } from "svelte-dnd-action";
  import { Todos } from "../api/collections";
  import { onMount } from "svelte";
  import { todos } from '../stores/store'; // assuming your todos store is in this file

  overrideItemIdKeyNameBeforeInitialisingDndZones("_id");

  let dragList = []; // Local copy for drag and drop
  const flipDurationMs = 200;
  let TodaysDate = new Date().toLocaleDateString();

  onMount(() => {
    console.log('TodoList mounted', todos);
    // Subscribe to changes in todos store
    const unsubscribe = todos.subscribe(value => {
      // reduce the todos to only show todays todos
      dragList = value.filter(todo => {
        const date = new Date(todo.createdAt).toLocaleDateString();
        return date === TodaysDate;
      });
    });
  });

  function handleSort(e) {
    dragList = e.detail.items; // Update dragList during sorting
  }

  function handleDndFinalize(e) {
    dragList = e.detail.items;
    // Update the server with new order based on dragList
    dragList.forEach((todo, index) => {
      Todos.update(todo._id, { $set: { order: index } });
    });
  }
</script>

<ul
  class="collection"
  use:dndzone={{ items: dragList, flipDurationMs }}
  on:consider={handleSort}
  on:finalize={handleDndFinalize}
>
  {#each dragList as todo (todo._id)}
    <li class="collection-item" animate:flip={{ duration: flipDurationMs }}>
      <TodoItem {todo} />
    </li>
  {/each}
</ul>
