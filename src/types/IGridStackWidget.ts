import { type GridStackWidget } from "gridstack";
import type IPath from "./IPath";

export default interface IGridStackWidget extends GridStackWidget {
  data: IPath;
}