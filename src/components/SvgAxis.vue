<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="100%"
    height="100%"
    viewBox="-6 -6 36 36"
  >
    <!-- Arrowhead marker for blue (X axis) -->
    <defs>
      <marker
        id="arrow-blue"
        markerWidth="6"
        markerHeight="6"
        refX="5"
        refY="3"
        orient="auto"
        markerUnits="strokeWidth"
      >
        <path d="M0,0 L6,3 L0,6 Z" fill="blue" />
      </marker>

      <!-- Arrowhead marker for red (Y axis) -->
      <marker
        id="arrow-red"
        markerWidth="6"
        markerHeight="6"
        refX="5"
        refY="3"
        orient="auto"
        markerUnits="strokeWidth"
      >
        <path d="M0,0 L6,3 L0,6 Z" fill="red" />
      </marker>
    </defs>

    <!-- X Axis Arrow (Blue) -->
    <line
      x1="-1"
      y1="-1"
      x2="25"
      y2="-1"
      stroke="blue"
      stroke-width="0.1"
      marker-end="url(#arrow-blue)"
    />
    <text x="-1" y="-1.5" dx="0" dy="0" font-size="1" fill="blue">X Axis</text>

    <!-- Y Axis Arrow (Red) -->
    <line
      x1="-1"
      y1="-1"
      x2="-1"
      y2="25"
      stroke="red"
      stroke-width="0.1"
      marker-end="url(#arrow-red)"
    />
    <text x="-2" y="-1.5" dx="0" dy="0" font-size="1" fill="red" transform="rotate(-90, 0, 0)">Y Axis</text>
  </svg>
</template>