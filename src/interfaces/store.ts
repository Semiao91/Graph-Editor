import type { GraphEdge, GraphNode } from "./graph";

// Store slice interfaces
export interface NodeState {
    nodes: GraphNode[];
    selectedNodeId: string | null;
    selectedNodes: GraphNode[];
}

export interface EdgeState {
    edges: GraphEdge[];
    selectedEdgeId: string | null;
}

export interface AppState {
    isOnline: boolean;
    isDirty: boolean;
    isSnap: boolean;
}