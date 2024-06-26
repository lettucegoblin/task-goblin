<script>
  import { Meteor } from "meteor/meteor";
  import { roomCode } from "../stores/store";

  let text = "";

  const addTodo = () => {
    event.preventDefault();
    if (text.trim()) {
      console.log(`Adding todo: ${text}`);
      Meteor.call("todos.insert", text, $roomCode, (error) => {
        if (error) {
          console.error("Error inserting todo:", error);
        } else {
          console.log("Todo added successfully");
          // clear the input field
          text = "";
        }
      });
    }
  };
</script>

<form class="row">
  <div class="s12">
    <div class="input-field inline valign-wrapper">
      <input
        id="add_todo"
        type="text"
        bind:value={text}
        placeholder=" "
        autocomplete="off" 
      />
      <label for="add_todo">Add a new to-do</label>
      <span class="helper-text" data-error="wrong" data-success="right"></span>
      <button on:click={addTodo} class="btn waves-effect waves-light"
        >Add</button
      >
    </div>
  </div>
</form>

<style>
  .btn {
    background-color: var(--md-sys-color-primary-container);
  }
  .valign-wrapper{
    align-items: end;
  }
  div {

    gap: 0.5rem;
    margin-bottom: 1rem;
  }
</style>
