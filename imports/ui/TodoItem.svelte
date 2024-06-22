<script>
  import { Meteor } from "meteor/meteor";
  export let todo;

  const toggleComplete = () => {
    Meteor.call("todos.toggleComplete", todo._id);
  };

  const removeTodo = () => {
    // prevent default form submission
    event.preventDefault();
    Meteor.call("todos.remove", todo._id);
  };
</script>

<div>
  <label>
    <input
      type="checkbox"
      checked={todo.completed}
      on:change={toggleComplete}
    />
    <span class={todo.completed ? "completed" : ""}>{todo.text}</span>
  </label>
  <a class="delete-todo secondary-content" on:click={removeTodo} >
    <i class="material-icons">delete</i>
  </a>
</div>

<style>
  .delete-todo {
    cursor: pointer;
  }
  .completed {
    text-decoration: line-through;
    color: grey;
  }
</style>
