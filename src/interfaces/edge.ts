import type { EdgeActions } from "./graph";
import type { EdgeState } from "./store";

export interface EdgeSlice extends EdgeState, EdgeActions { }
