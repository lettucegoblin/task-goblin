<script>
  import { onMount } from "svelte";
  import * as d3 from "d3";
  import { recurringTasks } from "../stores/store";

  let svg;
  let xScale, yScale;
  const width = 800; // Width of the graph
  const height = 400; // Height of the graph
  const updateInterval = 1000; // Update every second

  let dayStarted = false;
  let dayStartTime = null;

  function startday() {
    dayStartTime = Date.now();
    dayStarted = true;
  }

  function initChart() {
    const container = d3
      .select("#chart")
      .append("svg")
      .attr("viewBox", `0 0 ${width} ${height}`);
    svg = container;
    svg
      .append("g")
      .attr("class", "x-axis")
      .attr("transform", `translate(0, ${height - 20})`);
  }

  $: if (dayStarted) {
    initChart();
    updateChart();
    setInterval(() => updateChart(), updateInterval); // Update every second
  }

  function handleBarClick(taskId) {
    console.log("Clicked task ID:", taskId);
    // Perform further actions based on the task ID
  }

  function updateChart() {
    const now = Date.now();
    const endOfDay = new Date().setHours(24, 0, 0, 0);
    const tasks = $recurringTasks.map((task) => ({
      ...task,
      startTime: dayStartTime,
      endTime: dayStartTime + task.task.interval * 60000,
      remainingTimeMinutes: Math.floor(
        (dayStartTime + task.task.interval * 60000 - now) / 60000
      ),
      remainingTimeSeconds: Math.floor(
        ((dayStartTime + task.task.interval * 60000 - now) % 60000) / 1000
      ),
    }));
    //console.log("tasks", tasks);

    xScale = d3.scaleTime().domain([now, endOfDay]).range([0, width]);
    yScale = d3
      .scaleBand()
      .domain(tasks.map((task) => task._id))
      .range([0, height - 20])
      .padding(0.9); // Increased padding for thinner bars

    svg
      .select(".x-axis")
      .transition()
      .duration(updateInterval)
      .call(d3.axisBottom(xScale).ticks(d3.timeHour.every(1)));

    const bars = svg.selectAll(".bar").data(tasks, (d) => d._id).on("click", (event, d) => handleBarClick(d._id));
    bars
      .enter()
      .append("rect")
      .attr("class", "bar")
      .merge(bars)
      .transition()
      .duration(updateInterval)
      .attr("x", (d) => xScale(d.startTime))
      .attr("y", (d) => yScale(d._id))
      .attr("width", (d) => xScale(d.endTime) - xScale(d.startTime))
      .attr("height", yScale.bandwidth())
      .attr("fill", "steelblue")
        

    const labels = svg.selectAll(".label").data(tasks, (d) => d._id);
    labels
      .enter()
      .append("text")
      .attr("class", "label")
      .merge(labels)
      .transition()
      .duration(updateInterval)
      .attr("x", (d) => xScale(d.endTime) + 5)
      .attr("y", (d) => yScale(d._id) + yScale.bandwidth() / 2)
      .attr("dy", ".35em")
      .attr("text-anchor", "start")
      .attr("fill", "white")
      .text(
        (d) =>
          `${d.task.emoji} ${d.task.name} (${d.remainingTimeMinutes} mins ${d.remainingTimeSeconds}s left)`
      );

    bars.exit().remove();
    labels.exit().remove();
  }
</script>

{#if !dayStarted}
  <button on:click={startday}> start day </button>
{/if}
<div id="chart"></div>
