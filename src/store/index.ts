import { v4 as uuidv4 } from 'uuid';
import { create } from 'zustand';
import type { GraphActions, GraphEdge, GraphNode, GraphState } from '../interfaces/graph';

export const useGraphStore = create<GraphState & GraphActions>((set) => ({
    // Initial state
    nodes: [],
    edges: [],
    selectedNodeId: null,
    selectedEdgeId: null,
    isOnline: true,
    isDirty: false,

    // Node actions
    addNode: (nodeData) => {
        const id = uuidv4();
        const newNode: GraphNode = { ...nodeData, id };
        set((state) => ({
            nodes: [...state.nodes, newNode],
            isDirty: true,
        }));
    },

    updateNode: (id, updates) => {
        set((state) => ({
            nodes: state.nodes.map((node) =>
                node.id === id ? { ...node, data: { ...node.data, ...updates } } : node
            ),
            isDirty: true,
        }));
    },

    deleteNode: (id) => {
        set((state) => ({
            nodes: state.nodes.filter((node) => node.id !== id),
            edges: state.edges.filter((edge) => edge.source !== id && edge.target !== id),
            selectedNodeId: state.selectedNodeId === id ? null : state.selectedNodeId,
            isDirty: true,
        }));
    },

    setSelectedNode: (id) => {
        set({ selectedNodeId: id, selectedEdgeId: null });
    },

    // Edge actions
    addEdge: (edgeData) => {
        const id = uuidv4();
        const newEdge: GraphEdge = { ...edgeData, id };
        set((state) => ({
            edges: [...state.edges, newEdge],
            isDirty: true,
        }));
    },

    updateEdge: (id, updates) => {
        set((state) => ({
            edges: state.edges.map((edge) =>
                edge.id === id ? { ...edge, data: { ...edge.data, ...updates } } : edge
            ),
            isDirty: true,
        }));
    },

    deleteEdge: (id) => {
        set((state) => ({
            edges: state.edges.filter((edge) => edge.id !== id),
            selectedEdgeId: state.selectedEdgeId === id ? null : state.selectedEdgeId,
            isDirty: true,
        }));
    },

    setSelectedEdge: (id) => {
        set({ selectedEdgeId: id, selectedNodeId: null });
    },

    // Graph actions
    clearGraph: () => {
        set({
            nodes: [],
            edges: [],
            selectedNodeId: null,
            selectedEdgeId: null,
            isDirty: true,
        });
    },

    loadGraph: (nodes, edges) => {
        set({
            nodes,
            edges,
            selectedNodeId: null,
            selectedEdgeId: null,
            isDirty: false,
        });
    },

    // App state
    setOnlineStatus: (isOnline) => {
        set({ isOnline });
    },

    markDirty: () => {
        set({ isDirty: true });
    },

    markClean: () => {
        set({ isDirty: false });
    },
}));