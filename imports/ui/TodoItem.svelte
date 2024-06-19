<script>
    import { Meteor } from 'meteor/meteor';
  
    export let todo;
  
    const toggleComplete = () => {
      Meteor.call('todos.toggleComplete', todo._id);
    };
  
    const removeTodo = () => {
      Meteor.call('todos.remove', todo._id);
    };
  </script>
  
  <li>
    <input type="checkbox" checked={todo.completed} on:change={toggleComplete} />
    <span>{todo.text}</span>
    <button on:click={removeTodo}>Remove</button>
  </li>
  
  <style>
    li {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      margin-bottom: 0.5rem;
    }
  
    span {
      flex-grow: 1;
    }
  
    button {
      background-color: #ff4d4d;
      border: none;
      padding: 0.25rem 0.5rem;
      cursor: pointer;
    }
  </style>
  