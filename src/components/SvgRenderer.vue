<template>
  <div class="checkerboard relative select-none">
    <div v-if="editable" class="absolute left-[-25%] right-[-25%] top-[-25%] bottom-[-25%]">
        <SvgAxis />
    </div>
    <div v-if="selectedPath && editable" class="absolute left-[-100%] right-[-100%] top-[-100%] bottom-[-100%] z-10">
        <svg
            v-if="selectedPath && editable"
            xmlns="http://www.w3.org/2000/svg"
            width="100%"
            height="100%"
            viewBox="-24 -24 72 72"
            >
        <!-- Bounding box if path is selected -->
        <g v-if="selectedPath">
            <rect
            :x="selectedPath.x - 0.1"
            :y="selectedPath.y - 0.1"
            :width="selectedPath.viewBoxWidth * selectedPath.scaleX + 0.1"
            :height="selectedPath.viewBoxHeight * selectedPath.scaleY + 0.2"
            class="movingOffset cursor-move"
            fill="white"
            fill-opacity="0"
            stroke="black"
            stroke-width="0.05"
            stroke-dasharray="0.4,0.2"
            stroke-dashoffset="0.4"
            @mousedown="onMouseDown($event, 'dragging')"
            />
            <rect
                :x="selectedPath.x + (selectedPath.viewBoxWidth * selectedPath.scaleX) - 0.25"
                :y="selectedPath.y + (selectedPath.viewBoxHeight * selectedPath.scaleY) - 0.25"
                :width="0.5"
                :height="0.5"
                class="cursor-nwse-resize"
                fill="white"
                fill-opacity="0"
                stroke="black"
                stroke-width="0.05"
                @mousedown="onMouseDown($event, 'resizing')"
                />
            <!-- Update selectedPath.x and selectedPath.y when moving this handle -->
            <circle
                :cx="selectedPath.x"
                :cy="selectedPath.y"
                class="cursor-move"
                r="0.2"
                stroke-width="0.1"
                fill="black"
                />
        </g>
        </svg>
    </div>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="100%"
      height="100%"
      viewBox="0 0 24 24"
      :id="editable ? 'svg-renderer' : undefined"
    >
        <defs data-svg="css" v-if="css" v-html="`<style>${css}</style>`" />
        <g data-svg="bg">
            <g v-for="(_row, rowIndex) in rows" :key="rowIndex" v-if="gridUnit >= 0.25">
                <rect
                    v-for="(_col, colIndex) in cols"
                    :key="colIndex"
                    :x="colIndex * gridUnit"
                    :y="rowIndex * gridUnit"
                    :width="gridUnit"
                    :height="gridUnit"
                    :fill="(rowIndex + colIndex) % 2 === 0 ? '#f0f0f0' : '#e0e0e0'"
                />
            </g>
        </g>
      <!-- Render all paths -->
      <path
        v-for="(item, index) in nodes.slice().reverse()"
        :key="index"
        :class="item.data.class"
        :d="renderPath(item.data)"
      />
    </svg>
  </div>
</template>

<script lang="ts">
import SvgAxis from "./SvgAxis.vue";
import { defineComponent } from "vue";
import { SVGPathData, SVGPathDataTransformer } from "svg-pathdata";
import type IPath from "../types/IPath";
import { useSvgStore } from "../stores/svgStore";
import { mapState } from "pinia";

export default defineComponent({
  name: "SvgRenderer",
    components: {
        SvgAxis,
    },
  props: {
    editable: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
        isDragging: false,
        isResizing: false,
        mouseStartX: 0,
        mouseStartY: 0,
        originalX: 0,
        originalY: 0,
    };
  },
  computed: {
    ...mapState(useSvgStore, ['nodes', 'selectedPath', 'snapToGrid', 'gridUnit', 'css']),
    rows(): number {
      return Math.ceil(24/this.gridUnit);
    },
    cols(): number {
      return Math.ceil(24/this.gridUnit);
    },
  },
  methods: {
    renderPath(ipath: IPath): string {
      return new SVGPathData(ipath.path)
        .toAbs()
        .transform(SVGPathDataTransformer.SCALE(ipath.scaleX, ipath.scaleY))
        .transform(SVGPathDataTransformer.TRANSLATE(ipath.x, ipath.y))
        .encode();
    },
    onMouseDown(event: MouseEvent, action: 'dragging' | 'resizing') {
        event.preventDefault();
        if(!this.selectedPath) return;
        if(this.isDragging || this.isResizing) return;
        this.mouseStartX = event.clientX;
        this.mouseStartY = event.clientY;
        if(action === 'resizing') {
            this.isResizing = true;
            this.originalX = this.selectedPath.x + (this.selectedPath.viewBoxWidth * this.selectedPath.scaleX);
            this.originalY = this.selectedPath.y + (this.selectedPath.viewBoxHeight * this.selectedPath.scaleY);
        } else if(action === 'dragging') {
            this.isDragging = true;
            this.originalX = this.selectedPath.x;
            this.originalY = this.selectedPath.y;
        }
    },
    onMouseMve(event: MouseEvent) {
        if(!this.selectedPath) return;
        if(this.isDragging) {
            const dx = event.clientX - this.mouseStartX;
            const dy = event.clientY - this.mouseStartY;
            this.selectedPath.x = this.snapValue( this.originalX + (dx * 36 / 573));
            this.selectedPath.y = this.snapValue(this.originalY + (dy * 36 / 573));
        } else if(this.isResizing) {
            let dx = event.clientX - this.mouseStartX;
            let dy = event.clientY - this.mouseStartY;
            if(event.shiftKey) {
                if(dy>dx) {
                    dx = dy;
                } else {
                    dy = dx;
                }
            }
            const newWidth = this.snapValue(this.originalX + dx * 36 / 573) - this.selectedPath.x;
            const newHeight = this.snapValue(this.originalY + dy * 36 / 573) - this.selectedPath.y;
            const newScaleX = newWidth / this.selectedPath.viewBoxWidth;
            const newScaleY = newHeight / this.selectedPath.viewBoxHeight;
            if(newScaleX > 0 && newScaleY > 0) {
                this.selectedPath.scaleX = newScaleX;
                this.selectedPath.scaleY = newScaleY;
            }
        }
    },
    onMouseUp() {
        if(this.isDragging) {
            this.isDragging = false;
        } else if(this.isResizing) {
            this.isResizing = false;
        }
    },
    snapValue(value: number): number {
        if(!this.snapToGrid) return value;
        if (this.gridUnit === 0) return value; // Avoid divide-by-zero

        const remainder = value % this.gridUnit;
        const half = this.gridUnit / 2;

        let snapped = value - remainder;
        if (Math.abs(remainder) >= half) {
            snapped += this.gridUnit * Math.sign(value);
        }

        return +snapped.toFixed(6); // optional: clean floating point
    }
  },
  mounted() {
    document.addEventListener('mousemove', this.onMouseMve);
    document.addEventListener('mouseup', this.onMouseUp);
  },
  beforeUnmount() {
    document.removeEventListener('mousemove', this.onMouseMve);
    document.removeEventListener('mouseup', this.onMouseUp);
  },
});
</script>