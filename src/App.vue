<template>
    <div class="flex flex-row h-full w-full">
        <!-- Layers & Settings Panel -->
        <div class="h-full bg-white drop-shadow-md flex flex-col w-52">
            <!-- Settings -->
            <div class="header"><Settings2 /> Settings</div>
            <div class="border-r border-gray-300 flex flex-col gap-2 p-2">
                <div class="grid grid-cols-2 gap-2 items-baseline">
                    <label for="snap-to-grid" class="text-sm"
                        >Snap to grid</label
                    >
                    <select
                        id="grid-unit"
                        v-model="snapToGridWrapper"
                        class="select text-sm"
                    >
                        <option
                            v-for="item in [
                                { value: false, label: 'No' },
                                { value: true, label: 'Yes' },
                            ]"
                            :value="item.value"
                        >
                            {{ item.label }}
                        </option>
                    </select>
                    <label for="grid-unit" class="text-sm">Grid Unit</label>
                    <select
                        id="grid-unit"
                        v-model="gridUnitWrapper"
                        class="select text-sm"
                    >
                        <option
                            v-for="item in [1, 0.5, 0.25, 0.1]"
                            :key="item"
                            :value="item"
                        >
                            {{ item }}
                        </option>
                    </select>
                </div>
            </div>
            <!-- Layers -->
            <div class="header"><Layers /> Layers</div>
            <div
                class="border-r border-gray-300 flex-grow grid grid-cols-2 gap-2 p-2"
            >
                <div class="flex flex-col gap-2">
                    <div class="w-full sidepanel">
                        <button
                            id="trash"
                            class="button flex-col items-center sidepanel-item w-full"
                        >
                            <Trash2 /> Drop layer to delete
                        </button>
                    </div>
                    <!-- GridStack Container -->
                    <div
                        ref="gridstack"
                        class="grid-stack border-2 border-dashed border-blue-500 flex-grow rounded-lg overflow-y-auto"
                    ></div>
                </div>
                <div class="flex flex-col gap-2">
                    <!-- Import Button -->
                    <button
                        class="button flex-col items-center w-full"
                        @click="addWidget"
                    >
                        <ClipboardPaste /> Paste SVG to import
                    </button>
                    <DialogWindow
                        description="Search and add icons from FontAwesome Free"
                    >
                        <template #title>
                            <FileSearch class="inline" /> FontAwesome Free
                        </template>
                        <template #trigger>
                            <button class="button flex-col items-center w-full">
                                <FileSearch /> Search Icons
                            </button>
                        </template>
                        <template #content="{ close }">
                            <input
                                type="search"
                                class="input w-full"
                                placeholder="Search icons..."
                                @keydown.enter="searchFaIcons($event)"
                            />
                            <Pagination
                                :items="faSearchResult"
                                :items-per-page="16"
                            >
                                <template #prepend="{ page }">
                                    <div class="grid grid-cols-4 gap-4 py-4">
                                        <button
                                            v-for="icon in page"
                                            class="button flex-col flex items-center justify-center aspect-square"
                                            @click="
                                                () => {
                                                    string2svg(icon);
                                                    close();
                                                }
                                            "
                                        >
                                            <div
                                                class="w-full h-full p-2 icon"
                                                v-html="icon"
                                            ></div>
                                        </button>
                                    </div>
                                </template>
                            </Pagination>
                        </template>
                        <template #actions>
                            <a
                                class="button"
                                href="https://fontawesome.com/license/free"
                                target="_BLANK"
                                >FontAwesome is the property of Fonticons,
                                Inc.</a
                            >
                        </template>
                    </DialogWindow>
                </div>
            </div>
            <!-- Property Dialog -->
            <PropertyDialog v-if="selectedPath" />
        </div>
        <div class="flex-grow h-full">
            <SplitterGroup direction="horizontal">
                <SplitterPanel class="bg-white flex flex-col">
                    <div class="header"><Paintbrush /> CSS Editor</div>
                    <div class="flex-grow overflow-hidden">
                        <VueMonacoEditor
                            v-if="isGridInitialized"
                            v-model:value="cssWrapper"
                            language="css"
                            :options="{
                                automaticLayout: true,
                                readOnly: false,
                            }"
                        />
                    </div>
                </SplitterPanel>
                <SplitterResizeHandle>
                    <div
                        class="w-1 h-full flex items-center justify-center relative bg-gradient-to-b from-gray-300 to-gray-300 via-gray-500 from-25% to-75% hover:via-blue-500 transition delay-200"
                    >
                        <div
                            class="w-1 h-8 bg-gray-200 flex items-center justify-center relative"
                        >
                            <GripVertical class="absolute text-blue-500" />
                        </div>
                    </div>
                </SplitterResizeHandle>
                <SplitterPanel class="flex flex-col">
                    <div class="header relative">
                        <Tangent /> Renderer & Editor
                        <div class="absolute right-1 flex flex-row gap-1 z-20">
                            <button
                                class="button text-sm"
                                @click="downloadSvg(false)"
                            >
                                <ArrowDownToLine /> SVG
                            </button>
                            <button
                                class="button text-sm"
                                @click="downloadSvg(true)"
                            >
                                <ArrowDownToLine /> SVG + CSS
                            </button>
                            <a
                                class="button text-sm"
                                href="https://github.com/ExYgnizem"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        class=""
                                        d="M9.305 15.5498046875C9.305 16.5703125 8.759999999999998 18.240234375000004 7.469999999999999 18.240234375000004S5.634999999999998 16.570312500000004 5.634999999999998 15.5498046875S6.179999999999999 12.859375 7.469999999999999 12.859375S9.305 14.529296874999998 9.305 15.5498046875zM24 13.083984375C24 14.6416015625 23.84 16.2919921875 23.125 17.72265625C21.230000000000004 21.462890625 16.02 21.375 12.290000000000001 21.375C8.5 21.375 2.9800000000000013 21.5068359375 1.010000000000001 17.72265625C0.2800000000000009 16.306640625 8.881784197001252e-16 14.6416015625 8.881784197001252e-16 13.083984375C8.881784197001252e-16 11.0380859375 0.6950000000000008 9.1044921875 2.0750000000000006 7.537109375C1.8150000000000006 6.765625 1.6900000000000006 5.955078125 1.6900000000000006 5.154296875C1.6900000000000006 4.1044921875 1.9350000000000003 3.5771484375 2.420000000000001 2.625C4.6850000000000005 2.625 6.135000000000001 3.0644531250000004 7.86 4.3828125C9.31 4.0458984375 10.8 3.89453125 12.295 3.89453125C13.645000000000001 3.89453125 15.005 4.036132812500001 16.315000000000005 4.343750000000001C18.015 3.0400390625000004 19.465 2.625 21.705000000000002 2.625C22.195000000000004 3.5771484375 22.435000000000006 4.1044921875 22.435000000000006 5.154296875C22.435000000000006 5.955078125 22.305000000000003 6.750976562500001 22.050000000000008 7.5078125C23.425000000000008 9.089843750000002 24.000000000000007 11.038085937500002 24.000000000000007 13.083984375zM20.784999999999997 15.5498046875C20.784999999999997 13.406250000000002 19.45 11.5166015625 17.11 11.5166015625C16.165000000000003 11.5166015625 15.259999999999998 11.6826171875 14.309999999999999 11.8095703125C13.565000000000001 11.921875000000002 12.819999999999999 11.9658203125 12.055 11.9658203125C11.295 11.9658203125 10.55 11.921875 9.8 11.8095703125C8.865000000000002 11.6826171875 7.95 11.5166015625 7 11.5166015625C4.66 11.5166015625 3.3249999999999997 13.406250000000002 3.3249999999999997 15.5498046875C3.3249999999999997 19.8369140625 7.345000000000001 20.49609375 10.845 20.49609375H13.255C16.77 20.49609375 20.785000000000004 19.841796875000004 20.785000000000004 15.5498046875zM16.655 12.859375C15.365000000000002 12.859375 14.82 14.529296874999998 14.82 15.5498046875S15.365000000000002 18.240234375000004 16.655 18.240234375000004S18.490000000000002 16.570312500000004 18.490000000000002 15.5498046875S17.945 12.859375 16.655 12.859375z"
                                    />
                                </svg>
                            </a>
                        </div>
                    </div>
                    <div
                        class="flex flex-grow flex-col items-center justify-center"
                    >
                        <!-- SVG Editor -->
                        <SvgRenderer
                            class="w-96 h-96"
                            :nodes="
                                (grid?.engine.nodes ?? []) as IGridStackWidget[]
                            "
                            :editable="true"
                        />
                    </div>
                    <div class="flex-shrink">
                        <!-- SVG Preview -->
                        <div
                            class="grid grid-cols-4 p-4 gap-2 items-center justify-items-center"
                        >
                            <label>1.5rem (24px)</label>
                            <label>2.0rem (32px)</label>
                            <label>3.0rem (48px)</label>
                            <label>4.0rem (64px)</label>
                            <SvgRenderer class="w-6 h-6" />
                            <SvgRenderer class="w-8 h-8" />
                            <SvgRenderer class="w-12 h-12" />
                            <SvgRenderer class="w-16 h-16" />
                        </div>
                    </div>
                </SplitterPanel>
            </SplitterGroup>
        </div>
    </div>
</template>

<script lang="ts">
import {
    ClipboardPaste,
    Trash2,
    GripVertical,
    Paintbrush,
    Layers,
    Settings2,
    Tangent,
    FileSearch,
    ArrowDownToLine,
    Save,
} from "lucide-vue-next";
import VueMonacoEditor from "@guolao/vue-monaco-editor";
import SvgLayer from "./components/SvgLayer.vue";
import SvgRenderer from "./components/SvgRenderer.vue";
import DialogWindow from "./components/DialogWindow.vue";
import Pagination from "./components/Pagination.vue";
import PropertyDialog from "./components/PropertyDialog.vue";
import type IPath from "./types/IPath";
import type IGridStackWidget from "./types/IGridStackWidget";
import { ref, h, render } from "vue";
import { GridStack, type GridStackNode } from "gridstack";
import "gridstack/dist/gridstack.min.css";
import { SVGPathData, SVGPathDataTransformer } from "svg-pathdata";
import { useSvgStore } from "./stores/svgStore";
import { mapActions, mapState } from "pinia";
import { v4 as uuidv4 } from "uuid";
import type IFontAwesomeIcon from "./types/IFontAwesomeIcon";
import fa from "./assets/fa.min.json";

export default {
    name: "App",
    components: {
        ClipboardPaste,
        Trash2,
        GripVertical,
        Layers,
        Paintbrush,
        Settings2,
        Tangent,
        FileSearch,
        ArrowDownToLine,
        Save,
        SvgRenderer,
        VueMonacoEditor,
        DialogWindow,
        Pagination,
        PropertyDialog,
    },
    setup() {
        const faIcons: IFontAwesomeIcon[] = fa as IFontAwesomeIcon[];
        const faSearchResult = ref([] as string[]);
        return { faIcons, faSearchResult };
    },
    computed: {
        ...mapState(useSvgStore, [
            "grid",
            "isGridInitialized",
            "selectedPath",
            "snapToGrid",
            "gridUnit",
            "css",
        ]),
        snapToGridWrapper: {
            get() {
                return this.snapToGrid;
            },
            set(value: boolean) {
                this.setSnapToGrid(value);
            },
        },
        gridUnitWrapper: {
            get() {
                return this.gridUnit || 1; // Default to 24 if grid is not initialized
            },
            set(value: number) {
                if (this.gridUnit != value) {
                    this.setGridUnit(value);
                }
            },
        },
        cssWrapper: {
            get() {
                return this.css;
            },
            set(value: string) {
                this.setCss(value);
            },
        },
    },
    mounted() {
        window.addEventListener("paste", this.handlePaste);
        if (this.$refs.gridstack) {
            this.setGrid(
                GridStack.init(
                    {
                        column: 1,
                        float: false,
                        animate: true,
                        minRow: 1,
                        cellHeight: 68,
                        removable: "#trash",
                        margin: 4,
                        marginBottom: 0,
                        disableResize: true,
                    },
                    this.$refs.gridstack as HTMLElement,
                ),
            );
            this.grid?.on("added", (_event, items) => {
                items.forEach((item) => {
                    const itemEl = item.el;
                    const gsw: IGridStackWidget = item as IGridStackWidget;
                    if (!itemEl) return;
                    const itemElContent = itemEl.querySelector(
                        ".grid-stack-item-content",
                    );
                    if (!itemElContent) return;
                    const itemContentVNode = h(SvgLayer, {
                        item: gsw.data,
                    });
                    itemContentVNode.appContext = this.$.appContext;
                    render(itemContentVNode, itemElContent);
                    this.selectPath(gsw.data);
                });
            });
            this.grid?.on("removed", (_event, items: GridStackNode[]): void => {
                items.forEach((item) => {
                    const gsw: IGridStackWidget = item as IGridStackWidget;
                    if (gsw.data.uuid == this.selectedPath?.uuid) {
                        this.selectPath(null);
                    }
                });
                setTimeout(() => {
                    if (!this.grid) return;
                    // Force re-render to update the grid state
                    this.grid.updateOptions({
                        float: true,
                    });
                    this.grid.updateOptions({
                        float: false,
                    });
                }, 0);
            });
        }
    },
    beforeUnmount() {
        window.removeEventListener("paste", this.handlePaste);
    },
    methods: {
        ...mapActions(useSvgStore, [
            "setGrid",
            "selectPath",
            "setSnapToGrid",
            "setGridUnit",
            "setCss",
        ]),
        searchFaIcons(event: KeyboardEvent) {
            const query = (event.target as HTMLInputElement).value ?? "";
            this.faSearchResult.length = 0; // Clear previous results
            const lowerQuery = query.toLowerCase();
            this.faIcons.forEach((icon) => {
                if (
                    icon.f.some((term) =>
                        term.toLowerCase().includes(lowerQuery),
                    )
                ) {
                    Object.keys(icon.s).forEach((style) => {
                        if (icon.s[style] && icon.s[style].length > 0) {
                            this.faSearchResult.push(icon.s[style]);
                        }
                    });
                }
            });
        },
        handlePaste(event: ClipboardEvent) {
            const clipboardData = event.clipboardData;
            if (!clipboardData) return;
            const pastedText = event.clipboardData?.getData("text") || "";
            this.string2svg(pastedText);
        },
        addWidget() {
            if (!this.grid) return;
            const _svg = prompt("Paste SVG code here:");
            this.string2svg(_svg || "");
        },
        string2svg(_svg: string) {
            if (!this.grid) return;
            if (!_svg) {
                return;
            }
            const _paths = this.parseSvg(_svg);
            if (!_paths || _paths.length === 0) {
                console.warn("Invalid SVG or no paths found.");
                return;
            }

            _paths.forEach((path) => {
                const widget: IGridStackWidget = {
                    x: 0,
                    y: 0,
                    w: 1,
                    h: 1,
                    content: undefined,
                    data: path,
                };
                this.grid?.addWidget(widget);
            });
        },
        parseSvg(svgString: string): IPath[] {
            const parser = new DOMParser();
            const doc = parser.parseFromString(svgString, "image/svg+xml");
            const svg = doc.querySelector("svg");
            if (!svg) return [];
            const viewBoxAttr = svg.getAttribute("viewBox");
            if (!viewBoxAttr) return [];
            let [x, y, width, height] = viewBoxAttr.split(" ").map(Number);
            if ([x, y, width, height].some((val) => isNaN(val))) return [];
            const paths = doc.querySelectorAll("path");

            // Normalize viewBox
            let scaleX = 1;
            let scaleY = 1;
            let translateX = 0;
            let translateY = 0;

            if (isNaN(x) || isNaN(y) || isNaN(width) || isNaN(height)) {
                console.error("Invalid viewBox values:", viewBoxAttr);
                return [];
            } else if (x + width > 24 || y + height > 24) {
                const ratio = Math.min(24 / (x + width), 24 / (y + height));
                x = x * ratio;
                y = y * ratio;
                width = width * ratio;
                height = height * ratio;
                paths.forEach((path) => {
                    const d = path.getAttribute("d");
                    if (d) {
                        try {
                            const transformedPath = new SVGPathData(d)
                                .toAbs()
                                .transform(
                                    SVGPathDataTransformer.SCALE(ratio, ratio),
                                )
                                .encode();

                            path.setAttribute("d", transformedPath);
                        } catch (err) {
                            console.error("Failed to scale path:", err);
                        }
                    }
                });
            }

            if (width < 24) {
                translateX = (24 - width) / 2;
            }
            if (height < 24) {
                translateY = (24 - height) / 2;
            }

            return Array.from(paths).map((path) => {
                return {
                    viewBoxX: x,
                    viewBoxY: y,
                    viewBoxWidth: width,
                    viewBoxHeight: height,
                    x: translateX,
                    y: translateY,
                    scaleX: scaleX,
                    scaleY: scaleY,
                    path: path.getAttribute("d") || "",
                    uuid: uuidv4(),
                    class: "",
                };
            });
        },
        downloadSvg(keepCss: boolean = false) {
            const originalSvg = document.getElementById("svg-renderer");
            if (!originalSvg || !(originalSvg instanceof SVGSVGElement)) {
                console.warn(
                    'SVG with id "svg-renderer" not found or invalid.',
                );
                return;
            }
            const css = this.svg2css(originalSvg);
            const svgClone = originalSvg.cloneNode(true) as SVGSVGElement;
            // Remove the id attribute to avoid conflicts
            svgClone.removeAttribute("id");
            // Remove all html comments
            svgClone.innerHTML = svgClone.innerHTML.replace(
                /<!--[\s\S]*?-->/g,
                "",
            );
            // Remove the checkerboard background
            const bgElement = svgClone.querySelector('[data-svg="bg"]');
            if (bgElement && bgElement.parentNode) {
                bgElement.parentNode.removeChild(bgElement);
            }
            // Remove the style element
            const cssElement = svgClone.querySelector('[data-svg="css"]');
            if (cssElement && cssElement.parentNode) {
                cssElement.parentNode.removeChild(cssElement);
            }
            // Add back the cleaned up CSS if keepCss is true
            if (keepCss) {
                if (css.trim()) {
                    const defs = document.createElementNS(
                        "http://www.w3.org/2000/svg",
                        "defs",
                    );
                    const style = document.createElementNS(
                        "http://www.w3.org/2000/svg",
                        "style",
                    );
                    style.setAttribute("type", "text/css");
                    style.setAttribute("data-svg", "css");
                    style.textContent = css;
                    defs.appendChild(style);
                    svgClone.insertBefore(defs, svgClone.firstChild); // insert <defs> at top
                }
            }
            // Serialize the SVG to a string and create a Blob for download
            const serializer = new XMLSerializer();
            const svgString = serializer.serializeToString(svgClone);
            const blob = new Blob([svgString], { type: "image/svg+xml" });
            const url = URL.createObjectURL(blob);
            const link = document.createElement("a");
            link.href = url;
            link.download = "svgfuse.svg";
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            URL.revokeObjectURL(url);
        },
        svg2css(svgEl: SVGSVGElement): string {
            const styleBlocks: string[] = [];
            const SKIP_TAGS = new Set(["defs", "style", "script", "title"]);

            // Step 1: Extract existing CSS rules from the user inputted css file...
            const selectorMap = new Map<string, Set<string>>();
            if (this.css.trim()) {
                // Strip css comments first
                let css = this.css.replace(/\/\*[\s\S]*?\*\//g, "");
                // Removing empty lines and trimming
                css = css
                    .split("\n")
                    .map((line) => line.trim())
                    .filter((line) => line.length > 0)
                    .join("\n");
                // TODO :: Find a better way to parse CSS rules that does not involve regex
                const ruleRegex = /([^{]+)\s*\{\s*([^}]+)\s*\}/g;
                let match;
                while ((match = ruleRegex.exec(css)) !== null) {
                    const selector = match[1].trim();
                    const propsBlock = match[2].trim();
                    const props = new Set<string>();
                    propsBlock.split(";").forEach((declaration) => {
                        const [prop] = declaration.trim().split(":");
                        if (prop) props.add(prop.trim());
                    });
                    selectorMap.set(selector, props);
                }
            }

            // Step 2: Process SVG elements
            const allElements = svgEl.querySelectorAll<SVGElement>("*");

            allElements.forEach((el) => {
                const tag = el.tagName.toLowerCase();
                if (SKIP_TAGS.has(tag)) return;
                if (
                    el.getAttribute("data-svg") === "css" ||
                    el.getAttribute("data-svg") === "bg"
                )
                    return;

                const computed = getComputedStyle(el);

                // Gather selectors this element might match
                const selectors: string[] = [];

                if (el.id) selectors.push(`#${el.id}`);
                el.classList.forEach((cls) => selectors.push(`.${cls}`));
                selectors.push(tag);

                const matchedSelectors = selectors.filter((sel) =>
                    selectorMap.has(sel),
                );
                if (matchedSelectors.length === 0) return;

                matchedSelectors.forEach((selector) => {
                    const relevantProps = selectorMap.get(selector);
                    if (!relevantProps || relevantProps.size === 0) return;

                    const styleObj: Record<string, string> = {};

                    relevantProps.forEach((prop) => {
                        const val = computed.getPropertyValue(prop);
                        if (
                            val &&
                            val !== "initial" &&
                            val !== "none" &&
                            val !== "normal" &&
                            val !== "0px"
                        ) {
                            styleObj[prop] = val;
                        }
                    });

                    if (Object.keys(styleObj).length === 0) return;

                    let css = `${selector} {\n`;
                    for (const [prop, val] of Object.entries(styleObj)) {
                        css += `  ${prop}: ${val};\n`;
                    }
                    css += `}\n`;

                    styleBlocks.push(css);
                });
            });

            return styleBlocks.join("\n");
        },
    },
};
</script>
