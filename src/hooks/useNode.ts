import { useCallback } from 'react';
import { useGraphStore } from '../store';

export const useNode = () => {
    const {
        nodes,
        addNode,
        updateNode,
        deleteNode,
        setSelectedNode,
        selectedNodeId,
    } = useGraphStore();

    const createNode = useCallback((position?: { x: number; y: number }) => {

        const defaultPosition = position || {
            x: Math.random() * 400 + 100,
            y: Math.random() * 300 + 100,
        };

        const newNode = {
            type: 'custom',
            position: defaultPosition,
            data: {
                label: ``,
                color: '#ffffff',
                weight: 20,
            },
        };

        return addNode(newNode);
    }, [addNode, nodes.length]);

    const createNodeAtCenter = useCallback((position?: { x: number; y: number }) => {
        const centerPosition = {
            x: position?.x || window.innerWidth / 2,
            y: position?.y || window.innerHeight / 2,
        };
        return createNode(centerPosition);
    }, [createNode]);

    const createNodeAtMouse = useCallback((event: React.MouseEvent) => {
        const rect = (event.currentTarget as HTMLElement).getBoundingClientRect();
        const position = {
            x: event.clientX - rect.left,
            y: event.clientY - rect.top,
        };
        return createNode(position);
    }, [createNode]);

    const updateNodeData = useCallback((nodeId: string, updates: Partial<{
        label: string;
        color: string;
        weight: number;
    }>) => {
        updateNode(nodeId, updates);
    }, [updateNode]);

    const removeNode = useCallback((nodeId?: string) => {
        const targetId = nodeId || selectedNodeId;
        if (targetId) {
            deleteNode(targetId);
        }
    }, [deleteNode, selectedNodeId]);

    return {
        nodes,
        selectedNodeId,
        createNode,
        createNodeAtCenter,
        createNodeAtMouse,
        updateNodeData,
        removeNode,
        selectNode: setSelectedNode,
    };
};