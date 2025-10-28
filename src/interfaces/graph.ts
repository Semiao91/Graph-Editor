import type { Edge, Node } from '@xyflow/react';
import type { AppState, EdgeState, NodeState } from './store';


// Action interfaces
export interface NodeActions {
    // Node CRUD
    addNode: (nodeData: Omit<GraphNode, 'id'>) => GraphNode;
    updateNode: (id: string, updates: NodeUpdateData) => void;
    deleteNode: (id: string) => void;
    setNodes: (nodes: GraphNode[]) => void;

    // Node selection
    setSelectedNode: (id: string | null) => void;
    setSelectedNodes: (selectedNodes: GraphNode[]) => void;
    onSelectionChange: (params: { nodes: GraphNode[]; edges: GraphEdge[] }) => void;
}

export interface EdgeActions {
    // Edge CRUD
    addEdge: (edgeData: Omit<GraphEdge, 'id'>) => GraphEdge;
    updateEdge: (id: string, updates: EdgeUpdateData) => void;
    deleteEdge: (id: string) => void;
    setEdges: (edges: GraphEdge[]) => void;

    // Edge selection
    setSelectedEdge: (id: string | null) => void;
}

export interface ReactFlowActions {
    // ReactFlow handlers
    onNodesChange: (changes: any[]) => void;
    onEdgesChange: (changes: any[]) => void;
    onConnect: (connection: any) => void;
}

export interface AppActions {
    // App state
    setOnlineStatus: (isOnline: boolean) => void;
    markDirty: () => void;
    markClean: () => void;
    setSnap: (isSnap: boolean) => void;
    toggleSnap: () => void;

    // Graph operations
    clearGraph: () => void;
    loadGraph: (nodes: GraphNode[], edges: GraphEdge[]) => void;
}

// Combined interfaces
export interface GraphState extends NodeState, EdgeState, AppState { }

export interface GraphActions extends NodeActions, EdgeActions, ReactFlowActions, AppActions { }

export interface GraphHandlers {
    onNodeClick?: (event: React.MouseEvent, node: any) => void;
    onNodeDrag?: (event: React.MouseEvent, node: any) => void;
    onPaneClick?: () => void;
    onConnect?: (connection: any) => void;
    onConnectEnd?: (
        event: MouseEvent | TouchEvent,
        connectionState: { fromNode: { id: string }; isValid: boolean },
        screenToFlowPosition: (pos: { x: number; y: number }) => { x: number; y: number }
    ) => void;
    onNodesChange?: (changes: any[]) => void;
    onEdgesChange?: (changes: any[]) => void;
    onEdgeClick?: (event: React.MouseEvent, edge: any) => void;
    onNodeDragStart?: (event: React.MouseEvent, node: any) => void;
    onNodeDragStop?: (event: React.MouseEvent, node: any) => void;
}

// Base types
export interface Position {
    x: number;
    y: number;
}

export interface HandleConfig {
    id: string;
    position: 'top' | 'right' | 'bottom' | 'left';
    type: 'source' | 'target';
}

export interface NodeStyle extends React.CSSProperties {
    width?: number | string;
    height?: number | string;
}

export interface NodeData extends Record<string, unknown> {
    label: string;
    color: string;
    weight: number;
    handles?: HandleConfig[];
    style?: React.CSSProperties;
}

export interface EdgeData extends Record<string, unknown> {
    weight?: number;
    isDirected?: boolean;
    label?: string;
    color?: string;
}

// Main graph entities - extend ReactFlow's types for compatibility
export interface GraphNode extends Node<NodeData> {
    type: string;
    data: NodeData;
}

export interface GraphEdge extends Edge<EdgeData> {
    data?: EdgeData;
}

// Update types for partial updates
export interface NodeUpdateData {
    label?: string;
    color?: string;
    weight?: number;
    handles?: HandleConfig[];
    style?: React.CSSProperties;
}

export interface EdgeUpdateData {
    weight?: number;
    isDirected?: boolean;
    label?: string;
    color?: string;
}

export interface GraphState {
    nodes: GraphNode[];
    edges: GraphEdge[];
    selectedNodeId: string | null;
    selectedEdgeId: string | null;
    selectedNodes: GraphNode[];
    isOnline: boolean;
    isDirty: boolean;
    isSnap: boolean;
}