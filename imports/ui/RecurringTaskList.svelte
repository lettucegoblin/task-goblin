<script>
    import RecurringTask from "./RecurringTaskItem.svelte";
    import { dndzone } from "svelte-dnd-action";
    import { flip } from "svelte/animate";
    import { overrideItemIdKeyNameBeforeInitialisingDndZones } from "svelte-dnd-action";
    import { RecurringTasks } from "../api/collections";
    import { onMount } from "svelte";
    import { recurringTasks } from '../stores/store'; // assuming your todos store is in this file

    overrideItemIdKeyNameBeforeInitialisingDndZones("_id");

    let dragList = []; // Local copy for drag and drop
    const flipDurationMs = 200;
    
    onMount(() => {
        console.log('RecurringTaskList mounted', recurringTasks);

        const unsubscribe = recurringTasks.subscribe(value => {
            dragList = value;
        });
    });

    function handleSort(e) {
        dragList = e.detail.items; // Update dragList during sorting
    }

    function handleDndFinalize(e) {
        dragList = e.detail.items;
        // Update the server with new order based on dragList
        dragList.forEach((task, index) => {
            RecurringTasks.update(task._id, { $set: { order: index } });
        });
    }
</script>

<ul
    class="collection"
    use:dndzone={{ items: dragList, flipDurationMs }}
    on:consider={handleSort}
    on:finalize={handleDndFinalize}
    >
    {#each dragList as task (task._id)}
        <li class="collection-item" animate:flip={{ duration: flipDurationMs }}>
            <RecurringTask {task} />
        </li>
    {/each}

</ul>