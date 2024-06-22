<script>
  import { onMount } from "svelte";
  import { Todos } from "../api/collections";
  import TodoItem from "./TodoItem.svelte";
  import { Tracker } from "meteor/tracker";
  import { dndzone } from "svelte-dnd-action";
  import { flip } from "svelte/animate";
  import { overrideItemIdKeyNameBeforeInitialisingDndZones } from "svelte-dnd-action";

  overrideItemIdKeyNameBeforeInitialisingDndZones("_id");

  export let roomCode;
  let todos = [];
  let dragList = []; // Local copy for drag and drop
  const flipDurationMs = 200;

  onMount(() => {
    const handle = Meteor.subscribe("todos", roomCode);
    Tracker.autorun(() => {
      todos = Todos.find({ roomCode }, { sort: { order: 1 } }).fetch();
      dragList = [...todos]; // Clone todos to dragList
      console.log(todos);
    });
    return () => handle.stop();
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
    <li class="collection-item"  animate:flip={{ duration: flipDurationMs }}>
      <TodoItem {todo} />
    </li>
  {/each}
</ul>
