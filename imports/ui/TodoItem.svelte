<script>
  import { Meteor } from "meteor/meteor";
  import { roomCode } from "../stores/store";
  export let todo;
  export let isHistory = false;

  const toggleComplete = () => {
    if (isHistory) return;
    Meteor.call("todos.toggleComplete", todo._id);
  };

  const removeTodo = () => {
    // prevent default form submission
    event.preventDefault();
    Meteor.call("todos.remove", todo._id);
  };

  // Function to add a past todo to today's list
  function addToToday(todoText) {
    Meteor.call("todos.insert", todoText, $roomCode, (error) => {
      if (error) {
        console.error("Error inserting todo:", error);
      } else {
        console.log("Todo added successfully");
        // clear the input field
        text = "";
      }
    });
  }
</script>

<div>
  <label>
    <input
      type="checkbox"
      class="disabled"
      disabled={isHistory}
      checked={todo.completed}
      on:change={toggleComplete}
    />
    <span class={todo.completed ? "completed" : ""}>{todo.text}</span>
  </label>

  {#if isHistory}
    <!-- svelte-ignore a11y-missing-attribute -->
    <a class="add-todo secondary-content" on:click={() => addToToday(todo.text)}>
      <i class="material-icons">add</i>
    </a>
  {:else}
    <!-- svelte-ignore a11y-missing-attribute -->
    <a class="delete-todo secondary-content" on:click={removeTodo}>
      <i class="material-icons">delete</i>
    </a>
  {/if}
</div>

<style>
  .delete-todo, .add-todo {
    cursor: pointer;
  }
  .completed {
    text-decoration: line-through;
    color: grey;
  }
</style>
