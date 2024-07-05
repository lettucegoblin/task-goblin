<script>
  import { onMount } from "svelte";

  import { Todos, RecurringTasks } from "../api/collections";
  import { todos, roomCode, recurringTasks } from "../stores/store";
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
  import AddRecurringTask from "./AddRecurringTask.svelte";
  import RecurringTaskList from "./RecurringTaskList.svelte";

  let isReady = false;

  const customConfig = {
    dictionaries: [adjectives, colors],
    separator: "-",
    length: 2,
  };

  onMount(() => {
    handleRoomCode();
    handleTodos();
    return handleTasks();
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
      
    });
    return () => handle.stop();
  }

  function handleTasks() {
    const handle = Meteor.subscribe("recurringTasks", $roomCode);
    Tracker.autorun(() => {
      const fetchedTasks = RecurringTasks.find(
        { roomCode: $roomCode },
        { sort: { order: 1 } }
      ).fetch();
      recurringTasks.set(fetchedTasks); // This is a Svelte store update
      console.log($roomCode, fetchedTasks);
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
      window.history.pushState({}, "", `?roomCode=${$roomCode}`);
    }
  }
</script>

<main class="container">
  <DarkMode />
  {#if isReady}
    <AddRecurringTask />
    <RecurringTaskList />
    <AddTodo />
    <TodoList />
    <TodoHistory />
  {/if}
</main>
