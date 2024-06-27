<script>
  import { onMount } from "svelte";

  import { Todos } from "../api/collections";
  import { todos, roomCode } from "../stores/store";
  import { Tracker } from "meteor/tracker";
  import {
    uniqueNamesGenerator,
    Config,
    adjectives,
    colors,
  } from "unique-names-generator";

  import "../css/global.css";
  import "../css/dark.css";
  import "../css/light.css";

  import TodoList from "./TodoList.svelte";
  import AddTodo from "./AddTodo.svelte";
  import DarkMode from "./DarkMode.svelte";
  import NavBar from "./NavBar.svelte";
  import TodoHistory from "./TodoHistory.svelte";

  let isReady = false;

  const customConfig = {
    dictionaries: [adjectives, colors],
    separator: "-",
    length: 2,
  };

  onMount(() => {
    handleRoomCode();
    return handleTodos();
  });

  function handleTodos() {
    const handle = Meteor.subscribe("todos", $roomCode);
    Tracker.autorun(() => {
      const fetchedTodos = Todos.find(
        { roomCode: $roomCode },
        { sort: { order: 1 } }
      ).fetch();
      todos.set( fetchedTodos); // This is a Svelte store update
      console.log($roomCode, fetchedTodos);
      isReady = true;
    });
    return () => handle.stop();
  }

  function handleRoomCode() {
    const params = new URLSearchParams(window.location.search);
    const urlRoomCode = params.get("roomCode");
    if (urlRoomCode) {
      roomCode.set(urlRoomCode);
    } else {
      roomCode.set(uniqueNamesGenerator(customConfig));
      window.history.pushState({}, "", `?roomCode=${roomCode}`);
    }
  }
</script>

<main class="container">
  <DarkMode />
  {#if isReady}
    <AddTodo />
    <TodoList />
    <TodoHistory />
  {/if}
</main>
