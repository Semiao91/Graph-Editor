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

    // Generate a new node at a specific position
    const createNode = useCallback((position?: { x: number; y: number }) => {
        const defaultPosition = position || {
            x: Math.random() * 400 + 100,
            y: Math.random() * 300 + 100,
        };

        const newNode = {
            type: 'custom' as const,
            position: defaultPosition,
            data: {
                label: `Node ${nodes.length + 1}`,
                color: '#1890ff',
                weight: 1,
            },
        };

        addNode(newNode);
        return newNode;
    }, [addNode, nodes.length]);

    // Create node at center of viewport
    const createNodeAtCenter = useCallback(() => {
        const centerPosition = {
            x: window.innerWidth / 2 - 75, // Offset by approximate node width
            y: window.innerHeight / 2 - 25, // Offset by approximate node height
        };
        return createNode(centerPosition);
    }, [createNode]);

    // Create node at mouse position (for click events)
    const createNodeAtMouse = useCallback((event: React.MouseEvent) => {
        const rect = (event.currentTarget as HTMLElement).getBoundingClientRect();
        const position = {
            x: event.clientX - rect.left,
            y: event.clientY - rect.top,
        };
        return createNode(position);
    }, [createNode]);

    // Update node properties
    const updateNodeData = useCallback((nodeId: string, updates: Partial<{
        label: string;
        color: string;
        weight: number;
    }>) => {
        updateNode(nodeId, updates);
    }, [updateNode]);

    // Delete selected node or specific node
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