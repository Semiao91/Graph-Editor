import type { NodeActions } from "./graph";
import type { NodeState } from "./store";

export interface NodeSlice extends NodeState, NodeActions { }