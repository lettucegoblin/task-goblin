<script>
  import { onMount, createEventDispatcher } from "svelte";
  import { Meteor } from "meteor/meteor";
  import { roomCode, recurringTasks } from "../stores/store";
  import EmojiPicker from "./EmojiPicker.svelte";
  import { writable } from "svelte/store";

  export let taskId = null; // Optional prop to handle editing

  let isVisible = false;
  let instances = null;
  let isEditMode = false; // Determine if it's edit mode

  let task = writable({
    name: "",
    interval: 60,
    startImmediately: false,
    duration: 30,
    emoji: "🚀",
  });

  const dispatch = createEventDispatcher();

  onMount(() => {
    initModalOnce()
  });

  $: if (taskId) {
      
      initModalOnce()
      isEditMode = true;
    }

  function initModalOnce() {
    if (!instances) {
      const selector = taskId ? ".modal.update" : ".modal.add";
      var elems = document.querySelectorAll(selector);
      instances = M.Modal.init(elems, {});
      console.log("Modal instances:", instances);
    }
  }

  $: if (taskId && instances) {
    openModal();
    loadTaskDetails(taskId);
  }

  function loadTaskDetails(taskId) {
    console.log("Loading task details for:", taskId);
    $recurringTasks.forEach((_task) => {
      if (_task._id === taskId) {
        task.update((current) => ({ ...current, ..._task.task }));
        console.log("Task found:", _task, $task);
      }
    });
  }

  function submitTask() {
    if (isEditMode) {
      console.log("Updating task:", $task);
      Meteor.call("recurringTasks.update", taskId, $task, $roomCode);
    } else {
      console.log("Adding new task:", $task);
      Meteor.call("recurringTasks.insert", $task, $roomCode);
    }
    closeModal();
    dispatch("update");
  }

  function openModal() {
    if (Array.isArray(instances)) {
      instances.forEach((instance) => instance.open());
    } else {
      instances.open();
    }
  }

  function closeModal() {
    if (Array.isArray(instances)) {
      instances.forEach((instance) => instance.close());
    } else {
      instances.close();
    }
  }

  function closeEmojiPicker(e) {
    if (e.target.classList.contains("emoji-picker")) return;
    isVisible = false;
  }

  function onEmojiSelected(event) {
    task.update((current) => ({ ...current, emoji: event.detail.emoji }));
  }
</script>

{#if !isEditMode}
<div class="tasks-title">
  <h4>Recurring Tasks{$task.name}</h4>
  <button data-target="recurring-task-modal" class="btn modal-trigger">
    <i class="material-icons">add</i>
  </button>
</div>
{/if}
<div
  id="recurring-task-modal"
  class="modal modal-fixed-footer modal_{taskId} {taskId ? 'update' : 'add'}"
  on:click={closeEmojiPicker}
>
  <div class="modal-content">
    <h4>Add a new recurring task{$task.name}</h4>
    <div class="row">
      <!-- Task Name Input -->
      <div class="row col s12" style="align-items: baseline;">
        <EmojiPicker on:emojiSelected={onEmojiSelected} {isVisible} />
        <div class="input-field col s10">
          <input
            id="task_name"
            type="text"
            class="validate"
            bind:value={$task.name}
          />
          <label for="task_name" class="active"
            >{$task.name ? "Task Name" : ""}</label
          >
        </div>
      </div>

      <!-- Minutes Interval Input -->
      <div class="input-field col s12 m6">
        <input
          id="minute_interval"
          type="number"
          class="validate"
          bind:value={$task.interval}
        />
        <label for="minute_interval">Every (mins)</label>
        <span class="helper-text">The interval between the recurring task</span>
      </div>

      <!-- Start Immediately Checkbox -->
      <div class="col s12 m6">
        <label>
          <input
            type="checkbox"
            id="start_immediately"
            bind:checked={$task.startImmediately}
          />
          <span>Start immediately when day starts</span>
        </label>
      </div>

      <!-- Interval Input -->
      <div class="input-field col s12 m6">
        <input
          id="duration"
          type="number"
          class="validate"
          bind:value={$task.duration}
        />
        <label for="duration">Default Duration</label>
        <span class="helper-text">The duration of the task</span>
      </div>
    </div>
  </div>
  <div class="modal-footer">
    <div class="col s12">
      <button
        class="btn waves-effect waves-light"
        type="submit"
        name="action"
        on:click={submitTask}
      >
        {isEditMode ? "Update Task" : "Add Task"}
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
