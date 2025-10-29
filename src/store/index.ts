import { applyEdgeChanges, applyNodeChanges } from '@xyflow/react';
import { v4 as uuidv4 } from 'uuid';
import { devtools } from 'zustand/middleware';
import { createWithEqualityFn } from 'zustand/traditional';
import type { GraphEdge, GraphNode } from '../interfaces/graph';
import type { Store } from '../types/store';

export const useGraphStore = createWithEqualityFn<Store>()(
    devtools(
        (set, get) => ({
            // Initial state
            nodes: [],
            edges: [],
            selectedNodeId: null,
            selectedEdgeId: null,
            selectedNodes: [],
            isOnline: false,
            lastSync: undefined,
            isDirty: false,
            isSnap: true,
            version: 1,

            // React Flow handlers (following their docs pattern)
            onNodesChange: (changes) => {
                set({
                    nodes: applyNodeChanges(changes, get().nodes),
                    isDirty: true,
                }, false, 'onNodesChange');
            },

            onEdgesChange: (changes) => {
                set({
                    edges: applyEdgeChanges(changes, get().edges),
                    isDirty: true,
                }, false, 'onEdgesChange');
            },

            onConnect: (connection) => {
                if (connection.source && connection.target) {
                    const id = uuidv4();
                    const newEdge: GraphEdge = {
                        id,
                        source: connection.source,
                        target: connection.target,
                        sourceHandle: connection.sourceHandle,
                        targetHandle: connection.targetHandle,
                        type: 'floating',
                        data: {
                            weight: 1,
                            isDirected: true,
                            color: '#b1b1b7',
                        },
                    };
                    console.log('Creating edge:', newEdge);
                    set({
                        edges: [...get().edges, newEdge],
                        isDirty: true,
                    }, false, 'onConnect');
                }
            },

            // Node actions
            addNode: (nodeData) => {
                const id = uuidv4();
                const newNode: GraphNode = {
                    ...nodeData,
                    id,
                    style: nodeData.style || {
                        width: 150,
                        height: 80,
                    }
                };

                set({
                    nodes: [...get().nodes, newNode],
                    isDirty: true,
                }, false, 'addNode');
                return newNode;
            },

            updateNode: (id, updates) => {
                set({
                    nodes: get().nodes.map((node) => {
                        if (node.id === id) {
                            const updatedNode = { ...node };

                            if ('label' in updates || 'color' in updates || 'weight' in updates || 'handles' in updates) {
                                updatedNode.data = {
                                    ...node.data,
                                    ...(updates.label !== undefined && { label: updates.label }),
                                    ...(updates.color !== undefined && { color: updates.color }),
                                    ...(updates.weight !== undefined && { weight: updates.weight }),
                                    ...(updates.handles !== undefined && { handles: [...(updates.handles || [])] })
                                };
                            }

                            if (updates.style) {
                                updatedNode.style = {
                                    ...node.style,
                                    ...updates.style
                                };
                            }

                            console.log('Updated node:', updatedNode);
                            return updatedNode;
                        }
                        return node;
                    }),
                    isDirty: true,
                }, false, `updateNode: ${id}`);
            },

            setNodes: (nodes) => {
                set({
                    nodes,
                    isDirty: true,
                }, false, 'setNodes');
            },

            setEdges: (edges) => {
                set({
                    edges,
                    isDirty: true,
                }, false, 'setEdges');
            },

            deleteNode: (id) => {
                set((state) => ({
                    nodes: state.nodes.filter((node) => node.id !== id),
                    edges: state.edges.filter((edge) => edge.source !== id && edge.target !== id),
                    selectedNodeId: state.selectedNodeId === id ? null : state.selectedNodeId,
                    isDirty: true,
                }), false, `deleteNode: ${id}`);
            },

            setSelectedNode: (id) => {
                set({ selectedNodeId: id, selectedEdgeId: null }, false, 'setSelectedNode');
            },

            setSelectedNodes: (selectedNodes) => {
                set({ selectedNodes }, false, 'setSelectedNodes');
            },

            onSelectionChange: (params) => {
                set({ selectedNodes: params.nodes }, false, 'onSelectionChange');
            },

            // Edge actions
            addEdge: (edgeData) => {
                const id = uuidv4();
                const newEdge: GraphEdge = {
                    ...edgeData,
                    id,
                    type: edgeData.type || 'floating',
                };
                set({
                    edges: [...get().edges, newEdge],
                    isDirty: true,
                }, false, 'addEdge');
                return newEdge;
            },

            updateEdge: (id, updates) => {
                set({
                    edges: get().edges.map((edge) => {
                        if (edge.id === id) {
                            const updatedEdge = { ...edge };

                            // Handle data field updates
                            if (updates && ('label' in updates || 'color' in updates || 'weight' in updates || 'isDirected' in updates)) {
                                updatedEdge.data = {
                                    ...edge.data,
                                    ...(updates.label !== undefined && { label: updates.label }),
                                    ...(updates.color !== undefined && { color: updates.color }),
                                    ...(updates.weight !== undefined && { weight: updates.weight }),
                                    ...(updates.isDirected !== undefined && { isDirected: updates.isDirected })
                                };
                            }

                            console.log('Updated edge:', updatedEdge);
                            return updatedEdge;
                        }
                        return edge;
                    }),
                    isDirty: true,
                }, false, `updateEdge: ${id}`);
            },

            deleteEdge: (id) => {
                set({
                    edges: get().edges.filter((edge) => edge.id !== id),
                    selectedEdgeId: get().selectedEdgeId === id ? null : get().selectedEdgeId,
                    isDirty: true,
                }, false, `deleteEdge: ${id}`);
            },

            setSelectedEdge: (id) => {
                set({ selectedEdgeId: id, selectedNodeId: null }, false, 'setSelectedEdge');
            },

            // Graph actions
            clearGraph: () => {
                set({
                    nodes: [],
                    edges: [],
                    selectedNodeId: null,
                    selectedEdgeId: null,
                    isDirty: true,
                }, false, 'clearGraph');
            },

            loadGraph: (nodes, edges) => {
                set({
                    nodes,
                    edges,
                    selectedNodeId: null,
                    selectedEdgeId: null,
                    isDirty: false,
                }, false, 'loadGraph');
            },

            // App state
            setOnlineStatus: (isOnline) => {
                set({ isOnline }, false, 'setOnlineStatus');
            },

            setSnap: (isSnap) => {
                set({ isSnap }, false, 'setSnap');
            },

            toggleSnap: () => {
                set((state) => ({ isSnap: !state.isSnap }), false, 'toggleSnap');
            },

            markDirty: () => {
                set({ isDirty: true }, false, 'markDirty');
            },

            markClean: () => {
                set({ isDirty: false }, false, 'markClean');
            },
        }),
        { name: 'graph-editor-store' }
    )
);

export const graphStoreApi = useGraphStore;