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

<md-list>
  <md-list-item noninteractive>
    <h4 slot="headline">Todo List</h4>
  </md-list-item>
  {#each todos as todo}
    <TodoItem {todo} />
  {/each}
</md-list>

<style>
  md-list {
    padding: 0;
  }
</style>
