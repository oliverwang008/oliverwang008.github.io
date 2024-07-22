// script.js

// Define margins and dimensions for the chart
const margin = { top: 150, right: 150, bottom: 150, left: 150 };
const width = 800 - margin.left - margin.right;
const height = 800 - margin.top - margin.bottom;

// Parse the date/time
//const parseDate = d3.timeParse("%Y-%m-%d");

// Set up scales
const xScale = d3.scaleTime().range([0, width]);
const yScale = d3.scaleLinear().range([height, 0]);

// Create the line
const line = d3.line()
    .x(d => xScale(d.year))
    .y(d => yScale(d.value));

// Append SVG and group elements
const svg = d3.select("#chart")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`);

// Load the data
d3.csv("eu_life.csv", d => {
    return {
        date: d.year,
        value: +d.value
    };
}).then(data => {
    // Set domains for scales
    xScale.domain(d3.extent(data, d => d.year));
    yScale.domain([0, d3.max(data, d => d.value)]);

    // Add the line path
    svg.append("path")
        .datum(data)
        .attr("fill", "none")
        .attr("stroke", "steelblue")
        .attr("stroke-width", 2)
        .attr("d", line);

    // Add x axis
    svg.append("g")
        .attr("transform", `translate(0,${height})`)
        .call(d3.axisBottom(xScale));

    // Add y axis
    svg.append("g")
        .call(d3.axisLeft(yScale));
});
