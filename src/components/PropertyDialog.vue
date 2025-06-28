<template>
    <div>
        <div class="header"><Settings2 /> Properties</div>
        <div
            class="border-r border-gray-300 flex-grow flex flex-col gap-1 py-1 px-2"
        >
            <div class="grid grid-cols-2 gap-y-1 gap-x-2">
                <label class="text-sm">Position.X</label>
                <label class="text-sm">Position.Y</label>
                <input
                    readonly
                    class="input text-sm"
                    v-model="selectedPathWrapper.x"
                />
                <input
                    readonly
                    class="input text-sm"
                    v-model="selectedPathWrapper.y"
                />
                <label class="text-sm">Scale.X</label>
                <label class="text-sm">Scale.Y</label>
                <input
                    readonly
                    class="input text-sm"
                    v-model="selectedPathWrapper.scaleX"
                />
                <input
                    readonly
                    class="input text-sm"
                    v-model="selectedPathWrapper.scaleY"
                />
                <label class="text-sm">Classes :</label>
                <input
                    v-model="selectedPathWrapper.class"
                    type="text"
                    class="input text-sm col-span-2"
                    placeholder="Enter CSS classes"
                />
            </div>
            <label>X Axis Auto Align</label>
            <div class="flex justify-center gap-2">
                <button class="button" @click="selectedPathWrapper.x = 0">
                    <AlignStartVertical />
                </button>
                <button
                    class="button"
                    @click="
                        selectedPathWrapper.x =
                            (24 -
                                selectedPathWrapper.viewBoxWidth *
                                    selectedPathWrapper.scaleX) /
                            2
                    "
                >
                    <AlignCenterVertical />
                </button>
                <button
                    class="button"
                    @click="
                        selectedPathWrapper.x =
                            24 -
                            selectedPathWrapper.viewBoxWidth *
                                selectedPathWrapper.scaleX
                    "
                >
                    <AlignEndVertical />
                </button>
            </div>
            <label>Y Axis Auto Align</label>
            <div class="flex justify-center gap-2">
                <button class="button" @click="selectedPathWrapper.y = 0">
                    <AlignStartHorizontal />
                </button>
                <button
                    class="button"
                    @click="
                        selectedPathWrapper.y =
                            (24 -
                                selectedPathWrapper.viewBoxHeight *
                                    selectedPathWrapper.scaleY) /
                            2
                    "
                >
                    <AlignCenterHorizontal />
                </button>
                <button
                    class="button"
                    @click="
                        selectedPathWrapper.y =
                            24 -
                            selectedPathWrapper.viewBoxHeight *
                                selectedPathWrapper.scaleY
                    "
                >
                    <AlignEndHorizontal />
                </button>
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
        AlignCenterHorizontal,
        AlignCenterVertical,
        AlignStartHorizontal,
        AlignStartVertical,
        AlignEndHorizontal,
        AlignEndVertical,
    },
    computed: {
        ...mapState(useSvgStore, ["selectedPath", "gridUnit"]),
        selectedPathWrapper: {
            get(): IPath {
                return this.selectedPath as IPath;
            },
            set(value: IPath) {
                this.selectPath(value);
            },
        },
    },
    methods: {
        ...mapActions(useSvgStore, ["selectPath"]),
    },
};
</script>
