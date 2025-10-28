import type { AppActions, EdgeActions, GraphActions, GraphState, NodeActions } from "../interfaces/graph";
import type { AppState, EdgeState, NodeState } from "../interfaces/store";

// Store Type
export type Store = GraphState & GraphActions;

// Slice types
export type NodeSlice = NodeState & NodeActions;
export type EdgeSlice = EdgeState & EdgeActions;
export type AppSlice = AppState & AppActions;