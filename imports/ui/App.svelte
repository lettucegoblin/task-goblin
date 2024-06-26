<script>
  import { onMount } from "svelte";
  import { writable } from 'svelte/store';

  import { Todos } from "../api/collections";
  import { Tracker } from "meteor/tracker";
  import { uniqueNamesGenerator, Config, adjectives, colors } from 'unique-names-generator';

  import "../css/global.css";
  import "../css/dark.css";
  import "../css/light.css";

  import TodoList from "./TodoList.svelte";
  import AddTodo from "./AddTodo.svelte";
  import DarkMode from "./DarkMode.svelte";
  import NavBar from "./NavBar.svelte";

  const todos = writable([]);
  let roomCode = "defaultRoom";
  let isReady = false; 

  const customConfig = {
    dictionaries: [adjectives, colors],
    separator: '-',
    length: 2,
  };

  onMount(() => {
    handleRoomCode();
    handleTodos();
  });

  function handleTodos(){
    const handle = Meteor.subscribe("todos", roomCode);
    Tracker.autorun(() => {
      const fetchedTodos = Todos.find({ roomCode }, { sort: { order: 1 } }).fetch();
      todos.set(fetchedTodos); // This is a Svelte store update
      console.log(fetchedTodos);
      isReady = true;
    });
    return () => handle.stop();
  }

  function handleRoomCode(){
    const params = new URLSearchParams(window.location.search);
    const urlRoomCode = params.get('roomCode');
    if (urlRoomCode) {
      roomCode = urlRoomCode;
    } else {
      roomCode = uniqueNamesGenerator(customConfig);
      window.history.pushState({}, '', `?roomCode=${roomCode}`);
    }
  }
</script>

<main class="container">
  <DarkMode />
  {#if isReady}
    <AddTodo {roomCode} />
    <TodoList {roomCode} {todos} />
  {/if}
</main>
