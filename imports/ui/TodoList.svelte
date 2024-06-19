<script>
  import { onMount } from "svelte";
  import { Todos } from "../api/collections";
  import TodoItem from "./TodoItem.svelte";
  import { Tracker } from "meteor/tracker";

  export let roomCode;
  let todos = [];

  onMount(() => {
    const handle = Meteor.subscribe("todos", roomCode);
    Tracker.autorun(() => {
      todos = Todos.find({ roomCode }).fetch();
    });
    return () => handle.stop();
  });
</script>

<ul>
  {#each todos as todo}
    <TodoItem {todo} />
  {/each}
</ul>

<style>
  ul {
    list-style-type: none;
    padding: 0;
  }
</style>
