<script>
    import { onMount } from 'svelte';
    import * as d3 from 'd3';
  
    export let task;
  
    let startTime = new Date(task.createdAt).getTime();
    let endTime = new Date().setHours(24, 0, 0, 0); // Midnight tonight
  
    onMount(() => {
      const remainingHours = (endTime - Date.now()) / 3600000;
      const container = d3.select(`.timeline-container.${task._id}`);
      const containerWidth = document.querySelector(`.timeline-container.${task._id}`).clientWidth;
      const svg = container.append('svg')
                           .attr('width', containerWidth)
                           .attr('height', 50); // Adjust height as needed
  
      const xScale = d3.scaleLinear()
                       .domain([startTime, endTime])
                       .range([0, containerWidth]);
  
      // Draw hour markers
      svg.selectAll('.marker')
         .data(d3.range(0, remainingHours)) // Create an array of hours remaining
         .enter()
         .append('line')
         .attr('class', 'marker')
         .attr('x1', d => xScale(startTime + d * 3600000)) // 1 hour in milliseconds
         .attr('x2', d => xScale(startTime + d * 3600000))
         .attr('y1', 0)
         .attr('y2', 50)
         .style('stroke', 'black')
         .style('stroke-width', '1px');
  
      // Initial emoji position
      let emoji = svg.append('text')
                     .attr('class', 'emoji')
                     .attr('y', 25)
                     .text(task.task.emoji)
                     .style('font-size', '24px');
  
      // Update emoji position every second
      setInterval(() => {
        const currentTime = Date.now();
        let nextOccurrence = startTime + task.task.interval * 60000;
        emoji.transition()
             .duration(1000) // smooth transition for 1 second
             .attr('x', xScale(currentTime));
      }, 1000);
    });
  </script>
  
  <div class="timeline-container {task._id}"></div>
  