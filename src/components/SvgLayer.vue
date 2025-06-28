<template>
    <div
        :class="[
            'flex flex-row items-center justify-center h-full bg-gradient-to-br',
            selected
                ? 'bg-gradient-to-br from-blue-400 to-blue-500'
                : 'from-blue-200 to-blue-100',
        ]"
        @dblclick="selectPath(item)"
    >
        <div class="bg-white shadow-sm w-12 h-12 p-1 rounded-md">
            <div class="w-full h-full">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="100%"
                    height="100%"
                    :viewBox="viewbox"
                >
                    <path :d="item.path" />
                </svg>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import type IPath from "../types/IPath";
import { useSvgStore } from "../stores/svgStore";
import { mapActions, mapState } from "pinia";
import {
    Settings2,
    X,
    AlignCenterHorizontal,
    AlignCenterVertical,
    AlignStartHorizontal,
    AlignStartVertical,
    AlignEndHorizontal,
    AlignEndVertical,
} from "lucide-vue-next";

export default {
    name: "SvgLayer",
    components: {
        Settings2,
        X,
        AlignCenterHorizontal,
        AlignCenterVertical,
        AlignStartHorizontal,
        AlignStartVertical,
        AlignEndHorizontal,
        AlignEndVertical,
    },
    props: {
        item: {
            type: Object as () => IPath,
            required: true,
        },
    },
    computed: {
        ...mapState(useSvgStore, ["selectedPath", "gridUnit"]),
        // Dynamically compute the viewBox based on the item's properties
        viewbox(): string {
            return `${this.item.viewBoxX} ${this.item.viewBoxY} ${this.item.viewBoxWidth} ${this.item.viewBoxHeight}`;
        },
        selected(): boolean {
            return this.selectedPath?.uuid === this.item.uuid;
        },
    },
    methods: {
        ...mapActions(useSvgStore, ["selectPath"]),
    },
};
</script>
