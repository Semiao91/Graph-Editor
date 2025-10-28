import { v4 as uuidv4 } from 'uuid';
import type { StateCreator } from 'zustand';
import type { EdgeSlice } from '../../interfaces/edge';
import type { GraphEdge } from '../../interfaces/graph';

export const createEdgeSlice: StateCreator<
    EdgeSlice & { isDirty: boolean; selectedNodeId: string | null },
    [],
    [],
    EdgeSlice
> = (set) => ({
    // State
    edges: [],
    selectedEdgeId: null,

    // Actions
    addEdge: (edgeData) => {
        const id = uuidv4();
        const newEdge: GraphEdge = {
            ...edgeData,
            id,
            type: edgeData.type || 'floating',
        } as GraphEdge;

        set((state) => ({
            edges: [...state.edges, newEdge],
            isDirty: true,
        }));

        return newEdge;
    },

    updateEdge: (id, updates) => {
        set((state) => ({
            edges: state.edges.map((edge) => {
                if (edge.id === id) {
                    const updatedEdge = { ...edge };

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
        }));
    },

    deleteEdge: (id) => {
        set((state) => ({
            edges: state.edges.filter((edge) => edge.id !== id),
            selectedEdgeId: state.selectedEdgeId === id ? null : state.selectedEdgeId,
            isDirty: true,
        }));
    },

    setEdges: (edges) => {
        set({
            edges,
            isDirty: true,
        });
    },

    setSelectedEdge: (id) => {
        set({
            selectedEdgeId: id,
            selectedNodeId: null
        });
    },
});