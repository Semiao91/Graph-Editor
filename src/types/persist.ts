import type { GraphEdge, GraphNode } from "../interfaces/graph";

export interface PersistData {
    nodes: GraphNode[];
    edges: GraphEdge[];
    meta?: {
        savedAt: number;
        version: number;
    };
}