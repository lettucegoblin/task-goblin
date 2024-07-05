<script>
  import { onMount } from "svelte";
  import { Meteor } from "meteor/meteor";
  import { roomCode } from "../stores/store";
  import EmojiPicker from "./EmojiPicker.svelte";

  let isVisible = false;
  let instances = null;
  let closeEmojiPicker = (e) => {
    if(e.target.classList.contains("emoji-picker")) return;
    isVisible = false; // Even if it's already false, this ensures assignment
    isVisible = true; // Immediately set it to true
    isVisible = false; // And back to false
  };

  // Object to store the task details
  let task = {
    name: "Exercise",
    interval: 60,
    startImmediately: false,
    duration: 30,
    emoji: "🚀" // Default emoji
  };

  function onEmojiSelected(event) {
    task = {...task, emoji: event.detail.emoji};
  }

  // submit the task to the server
  function addTask() {
    Meteor.call("recurringTasks.insert", task, $roomCode, (error) => {
      if (error) {
        console.error("Error inserting task:", error);
      } else {
        console.log("Task added successfully");
        // clear the input field
        task = {
          name: "",
          interval: 60,
          startImmediately: false,
          duration: 30,
          emoji: "🚀"
        };
        closeModal();
      }
    });
  }
  function closeModal() {
    if (Array.isArray(instances)) {
      instances.forEach((instance) => instance.close());
    } else {
      instances.close();
    }
  }

  onMount(() => {
    var elems = document.querySelectorAll(".modal");
    instances = M.Modal.init(elems, {});
  });
</script>

<div class="tasks-title">
  <h4>Recurring Tasks</h4>
  <button data-target="recurring-task-modal" class="btn modal-trigger">
    <i class="material-icons">add</i>
  </button>
</div>
<div
  id="recurring-task-modal"
  class="modal modal-fixed-footer"
  on:click={closeEmojiPicker}
>
  <div class="modal-content">
    <h4>Add a new recurring task</h4>
    <div class="row">
      <!-- Task Name Input -->
      <div class="row col s12" style="align-items: baseline;">
        <EmojiPicker on:emojiSelected={onEmojiSelected} {isVisible} />
        <div class="input-field col s10">
          <input id="task_name" type="text" class="validate" bind:value={task.name} />
          <label for="task_name">Task Name</label>
        </div>
      </div>

      <!-- Minutes Interval Input -->
      <div class="input-field col s12 m6">
        <input id="minute_interval" type="number" class="validate" bind:value={task.interval} />
        <label for="minute_interval">Every (mins)</label>
        <span class="helper-text">The interval between the recurring task</span>
      </div>

      <!-- Start Immediately Checkbox -->
      <div class="col s12 m6">
        <label>
          <input type="checkbox" id="start_immediately" bind:checked={task.startImmediately} />
          <span>Start immediately when day starts</span>
        </label>
      </div>

      <!-- Interval Input -->
      <div class="input-field col s12 m6">
        <input id="duration" type="number" class="validate" bind:value={task.duration} />
        <label for="duration">Default Duration</label>
        <span class="helper-text">The duration of the task</span>
      </div>
    </div>
  </div>
  <div class="modal-footer">
    <!-- Submit Button -->
    <div class="col s12">
      <button class="btn waves-effect waves-light" type="submit" name="action"
        on:click={addTask}
        >Add Task
        <i class="material-icons right pl-2">send</i>
      </button>
    </div>
  </div>
</div>

<style>
  .tasks-title {
    display: flex;
    flex-direction: row;
    align-items: center;
  }
  .tasks-title h4 {
    margin-right: 10px;
  }

  .tasks-title button {
    padding: 1em;
  }
  .collapsible-body .row {
    padding: 20px;
  }
</style>
