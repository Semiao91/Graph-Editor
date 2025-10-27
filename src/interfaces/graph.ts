
export interface GraphActions {
    // React Flow handlers (following their docs pattern)
    onNodesChange: (changes: any[]) => void;
    onEdgesChange: (changes: any[]) => void;
    onConnect: (connection: any) => void;
    onSelectionChange: (params: { nodes: GraphNode[]; edges: GraphEdge[] }) => void;

    // Node actions
    addNode: (node: Omit<GraphNode, 'id'>) => GraphNode;
    setNodes: (nodes: GraphNode[]) => void;
    updateNode: (id: string, updates: Partial<GraphNode['data']> & { style?: Partial<GraphNode['style']> }) => void;
    deleteNode: (id: string) => void;
    setSelectedNode: (id: string | null) => void;
    setSelectedNodes: (selectedNodes: GraphNode[]) => void;

    // Edge actions
    addEdge: (edge: Omit<GraphEdge, 'id'>) => GraphEdge;
    setEdges: (edges: GraphEdge[]) => void;
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
    setSnap: (isSnap: boolean) => void;
    toggleSnap: () => void;
}

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

export interface HandleConfig {
    id: string;
    position: 'top' | 'right' | 'bottom' | 'left';
    type: 'source' | 'target';
}

export interface GraphNode {
    id: string;
    type: string;
    position: { x: number; y: number };
    style?: {
        width?: number;
        height?: number;
    };
    data: {
        label: string;
        color: string;
        weight: number;
        handles?: HandleConfig[];
        style?: React.CSSProperties;
    };
}

export interface GraphEdge {
    id: string;
    source: string;
    target: string;
    sourceHandle?: string | null;
    targetHandle?: string | null;
    type?: string;
    data?: {
        weight?: number;
        isDirected?: boolean;
        label?: string;
        color?: string;
    };
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