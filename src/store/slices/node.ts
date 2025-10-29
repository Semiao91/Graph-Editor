import type { Edge } from '@xyflow/react';
import { v4 as uuidv4 } from 'uuid';
import type { StateCreator } from 'zustand';
import type { GraphNode } from '../../interfaces/graph';
import type { NodeSlice } from '../../interfaces/node';

export const createNodeSlice: StateCreator<
    NodeSlice & { isDirty: boolean; edges: Edge[]; selectedEdgeId: string | null },
    [],
    [],
    NodeSlice
> = (set) => ({
    // State
    nodes: [],
    selectedNodeId: null,
    selectedNodes: [],

    // Actions
    addNode: (nodeData) => {
        const id = uuidv4();
        const newNode: GraphNode = {
            ...nodeData,
            id,
            style: nodeData.style || {
                width: 150,
                height: 80,
            }
        } as GraphNode;

        set((state) => ({
            nodes: [...state.nodes, newNode],
            isDirty: true,
        }));

        return newNode;
    },

    updateNode: (id, updates) => {
        set((state) => ({
            nodes: state.nodes.map((node) => {
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
        }));
    },

    deleteNode: (id) => {
        set((state) => ({
            nodes: state.nodes.filter((node) => node.id !== id),
            edges: state.edges.filter((edge: any) => edge.source !== id && edge.target !== id),
            selectedNodeId: state.selectedNodeId === id ? null : state.selectedNodeId,
            isDirty: true,
        }));
    },

    setNodes: (nodes) => {
        set({
            nodes,
            isDirty: true,
        });
    },

    setSelectedNode: (id) => {
        set({
            selectedNodeId: id,
            selectedEdgeId: null
        });
    },

    setSelectedNodes: (selectedNodes) => {
        set({ selectedNodes });
    },

    onSelectionChange: (params) => {
        set({ selectedNodes: params.nodes });
    },
});