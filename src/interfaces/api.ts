import type { GraphEdge, GraphNode } from "./graph";

export interface SyncStatus {
    status: 'online' | 'offline' | 'syncing' | 'synced' | 'error';
    lastSync?: Date;
    pendingChanges?: number;
    errorMessage?: string;
}

export interface ApiResponse<T = unknown> {
    success: boolean;
    data?: T;
    error?: string;
    timestamp: number;
}

export interface GraphData {
    nodes: GraphNode[];
    edges: GraphEdge[];
    meta: {
        version: number;
        lastModified: number;
        checksum: string;
    };
}