<script>
  import TodoItem from "./TodoItem.svelte";
  import { dndzone } from "svelte-dnd-action";
  import { flip } from "svelte/animate";
  import { overrideItemIdKeyNameBeforeInitialisingDndZones } from "svelte-dnd-action";
  import { Todos } from "../api/collections";
  import { onMount } from "svelte";

  overrideItemIdKeyNameBeforeInitialisingDndZones("_id");

  export let todos;  // Receive todos as a prop
  let dragList = []; // Local copy for drag and drop
  const flipDurationMs = 200;

  onMount(() => {
    console.log('TodoList mounted', todos);
    // Subscribe to changes in todos store
    const unsubscribe = todos.subscribe(value => {
      dragList = value;
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
