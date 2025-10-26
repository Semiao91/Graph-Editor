import type { Edge } from "../types/edge";
import type { Node } from "../types/node";

export interface GraphActions {
    // Node actions
    addNode: (node: Omit<GraphNode, 'id'>) => void;
    updateNode: (id: string, updates: Partial<GraphNode['data']>) => void;
    deleteNode: (id: string) => void;
    setSelectedNode: (id: string | null) => void;

    // Edge actions
    addEdge: (edge: Omit<GraphEdge, 'id'>) => void;
    updateEdge: (id: string, updates: Partial<GraphEdge['data']>) => void;
    deleteEdge: (id: string) => void;
    setSelectedEdge: (id: string | null) => void;

    // Graph actions
    clearGraph: () => void;
    loadGraph: (nodes: GraphNode[], edges: GraphEdge[]) => void;

    // App state
    setOnlineStatus: (isOnline: boolean) => void;
    markDirty: () => void;
    markClean: () => void;
}

export interface GraphNode extends Node {
    id: string;
    type: 'custom';
    position: { x: number; y: number };
    data: {
        label: string;
        color: string;
        weight: number;
    };
}

export interface GraphEdge extends Edge {
    id: string;
    source: string;
    target: string;
    type?: 'default' | 'straight' | 'step' | 'smoothstep';
    data?: {
        weight?: number;
        isDirected?: boolean;
    };
}

export interface GraphState {
    nodes: GraphNode[];
    edges: GraphEdge[];
    selectedNodeId: string | null;
    selectedEdgeId: string | null;
    isOnline: boolean;
    isDirty: boolean;
}