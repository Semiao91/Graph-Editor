import type { Connection } from '@xyflow/react';
import { useCallback } from 'react';
import { useGraphStore } from '../store';

export const useEdge = () => {
    const {
        edges,
        addEdge,
        updateEdge,
        deleteEdge,
        setSelectedEdge,
        selectedEdgeId,
    } = useGraphStore();

    const onConnect = useCallback((connection: Connection) => {
        if (connection.source && connection.target) {
            const newEdge = {
                source: connection.source,
                target: connection.target,
                type: 'default' as const,
                data: {
                    weight: 1,
                    isDirected: true,
                },
            };
            addEdge(newEdge);
        }
    }, [addEdge]);

    const updateEdgeData = useCallback((edgeId: string, updates: Partial<{
        weight: number;
        isDirected: boolean;
    }>) => {
        updateEdge(edgeId, updates);
    }, [updateEdge]);

    const removeEdge = useCallback((edgeId?: string) => {
        const targetId = edgeId || selectedEdgeId;
        if (targetId) {
            deleteEdge(targetId);
        }
    }, [deleteEdge, selectedEdgeId]);

    return {
        edges,
        selectedEdgeId,
        onConnect,
        updateEdgeData,
        removeEdge,
        selectEdge: setSelectedEdge,
    };
};