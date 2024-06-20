<script>
  import { Meteor } from "meteor/meteor";
  export let todo;

  const toggleComplete = () => {
    Meteor.call("todos.toggleComplete", todo._id);
  };

  const removeTodo = () => {
    Meteor.call("todos.remove", todo._id);
  };
</script>

<md-list-item>
  <md-checkbox slot="start" checked={todo.completed} on:change={toggleComplete}
  ></md-checkbox>
  <span slot="headline" class={todo.completed ? "completed" : ""}
    >{todo.text}</span
  >
  <md-icon-button slot="end" icon="delete" on:click={removeTodo}
  ></md-icon-button>
</md-list-item>

<style>
  md-list-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .completed {
    text-decoration: line-through;
    color: grey;
  }
</style>
