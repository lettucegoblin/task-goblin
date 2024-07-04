<script>
  import { onMount } from "svelte";
  import EmojiPicker from "./EmojiPicker.svelte";
  /*
    Design:
    Add a new recurring task:
    [text input] Task name
    Every [minute numeric input] mins
    [default uncheck checkbox] Start immediately when day starts
    Emoji [Emoji selector]
    Interval [Interval numeric input] mins (description: The interval between the recurring task)
  */
  let selectedEmoji = "🚀"; // Default emoji

  function onEmojiSelected(event) {
    selectedEmoji = event.detail.emoji;
  }
  onMount(() => {
    var elems = document.querySelectorAll(".modal");
    var instances = M.Modal.init(elems, {});
  });
</script>

<div class="tasks-title">
  <h4>Recurring Tasks</h4>
  <button data-target="recurring-task-modal" class="btn modal-trigger">
    <i class="material-icons">add</i>
  </button>
</div>
<div id="recurring-task-modal" class="modal modal-fixed-footer">
  <div class="modal-content">
    <h4>Add a new recurring task</h4>
    <div>
      <div class="row">
        <div class="row">
          <!-- Task Name Input -->
          <div class="input-field col s12">
            <input id="task_name" type="text" class="validate" />
            <label for="task_name">Task Name</label>
          </div>

          <!-- Minutes Interval Input -->
          <div class="input-field col s12 m6">
            <input id="minute_interval" type="number" class="validate" />
            <label for="minute_interval">Every (mins)</label>
          </div>

          <!-- Start Immediately Checkbox -->
          <div class="col s12 m6">
            <label>
              <input type="checkbox" id="start_immediately" />
              <span>Start immediately when day starts</span>
            </label>
          </div>

          <!-- Emoji Selector (Simple text input as placeholder) -->
          <div class="input-field col s12">
            <h2>Selected Emoji: {selectedEmoji}</h2>
            <EmojiPicker on:emojiSelected={onEmojiSelected} />
          </div>

          <!-- Interval Input -->
          <div class="input-field col s12 m6">
            <input id="interval" type="number" class="validate" />
            <label for="interval">Interval (mins)</label>
            <span class="helper-text"
              >The interval between the recurring task</span
            >
          </div>

          <!-- Submit Button -->
          <div class="col s12">
            <button
              class="btn waves-effect waves-light"
              type="submit"
              name="action"
              >Add Task
              <i class="material-icons right pl-2">send</i>
            </button>
          </div>
        </div>
      </div>
    </div>
    <div class="modal-footer">
      <a href="#!" class="modal-close waves-effect btn-flat">Agree</a>
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
