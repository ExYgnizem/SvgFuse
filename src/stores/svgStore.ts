import { defineStore } from 'pinia';
import { GridStack } from "gridstack";
import type IGridStackWidget from '../types/IGridStackWidget';
import type IPath from '../types/IPath';

const __BASECSS__ = 
`/* VS Icons Base Colors */
svg {
    --grey: #212121;
    --blue: #005dba;
    --yellow: #996f00;
    --green: #1f801f;
    --sky: #0077a0;
    --teal: #006758;
    --purple: #6936aa;
    --orange: #b73d18;
    --red: #c50b17;
    --svgColor: var(--grey);
}
.grey { --svgColor: var(--grey); }
.blue { --svgColor: var(--blue); }
.yellow { --svgColor: var(--yellow); }
.green { --svgColor: var(--green); }
.sky { --svgColor: var(--sky); }
.teal { --svgColor: var(--teal); }
.purple { --svgColor: var(--purple); }
.orange { --svgColor: var(--orange); }
.red { --svgColor: var(--red); }
.white { --svgColor: #ffffff; }
.black { --svgColor: #000000; }
/* Fill */
.f-100 { fill: var(--svgColor); fill-opacity: 1; }
.f-90 { fill: var(--svgColor); fill-opacity: 0.9; }
.f-80 { fill: var(--svgColor); fill-opacity: 0.8; }
.f-70 { fill: var(--svgColor); fill-opacity: 0.7; }
.f-60 { fill: var(--svgColor); fill-opacity: 0.6; }
.f-50 { fill: var(--svgColor); fill-opacity: 0.5; }
.f-40 { fill: var(--svgColor); fill-opacity: 0.4; }
.f-30 { fill: var(--svgColor); fill-opacity: 0.3; }
.f-20 { fill: var(--svgColor); fill-opacity: 0.2; }
.f-10 { fill: var(--svgColor); fill-opacity: 0.1; }
.f-0 { fill: none; }
/* Stroke */
.s-xs { stroke: var(--svgColor); stroke-width: 0.25; }
.s-sm { stroke: var(--svgColor); stroke-width: 0.5; }
.s-md { stroke: var(--svgColor); stroke-width: 1; }
.s-lg { stroke: var(--svgColor); stroke-width: 2; }
.s-xl { stroke: var(--svgColor); stroke-width: 4; }
.s-w-xs { stroke: white; stroke-width: 0.25; }
.s-w-sm { stroke: white; stroke-width: 0.5; }
.s-w-md { stroke: white; stroke-width: 1; }
.s-w-lg { stroke: white; stroke-width: 2; }
.s-w-xl { stroke: white; stroke-width: 4; }
/* Opacity */
.o-100 { opacity: 1; }
.o-90 { opacity: 0.9; }
.o-80 { opacity: 0.8; }
.o-70 { opacity: 0.7; }
.o-60 { opacity: 0.6; }
.o-50 { opacity: 0.5; }
.o-40 { opacity: 0.4; }
.o-30 { opacity: 0.3; }
.o-20 { opacity: 0.2; }
.o-10 { opacity: 0.1; }
`;

export const useSvgStore = defineStore('svgStore', {
    state: () => ({
        _grid: null as GridStack | null,
        _selectedPath: null as IPath | null,
        _gridUnit: 1 as number,
        _snapToGrid: true as boolean,
        _css: __BASECSS__ as string,
    }),
    actions: {
        setGrid(grid: GridStack) {
            this._grid = grid;
        },
        selectPath(path: IPath | null) {
            this._selectedPath = path;
        },
        clearGrid() {
            this._grid = null;
        },
        setGridUnit(unit: number) {
            this._gridUnit = unit;
        },
        setSnapToGrid(snap: boolean) {
            this._snapToGrid = snap;
        },
        setCss(css: string) {
            this._css = css;
        },
    },
    getters: {
        isGridInitialized: (state) => state._grid !== null,
        grid: (state) => state._grid,
        selectedPath: (state) => state._selectedPath,
        nodes: (state) => {
            if (!state._grid) return [];
            return state._grid.engine.nodes as IGridStackWidget[];
        },
        gridUnit: (state) => state._gridUnit,
        snapToGrid: (state) => state._snapToGrid,
        css: (state) => state._css,
    },
});