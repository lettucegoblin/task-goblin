<script>
  import { Meteor } from "meteor/meteor";
  import { createEventDispatcher } from "svelte";

  export let roomCode;
  let text = "";
  const dispatch = createEventDispatcher();

  const addTodo = () => {
    if (text.trim()) {
      console.log(`Adding todo: ${text}`);
      Meteor.call("todos.insert", text, roomCode, (error) => {
        if (error) {
          console.error("Error inserting todo:", error);
        } else {
          console.log("Todo added successfully");
        }
      });
    }
  };
</script>

<div>
  <input
    type="text"
    bind:value={text}
    placeholder="Add a new to-do"
    on:keydown={(e) => e.key === "Enter" && addTodo()}
  />
  <button on:click={addTodo}>Add</button>
</div>

<style>
  div {
    display: flex;
    gap: 0.5rem;
    margin-bottom: 1rem;
  }
</style>
