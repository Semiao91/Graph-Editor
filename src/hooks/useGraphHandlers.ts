import { useCallback } from "react";
import { useGraphStore } from "../store";

export const useGraphHandlers = () => {

    const { addNode, addEdge, nodes, isSnap } = useGraphStore();

    const onConnectEnd = useCallback((
        event: MouseEvent | TouchEvent,
        connectionState: { fromNode: { id: string }; isValid: boolean },
        screenToFlowPosition: (pos: { x: number; y: number }) => { x: number; y: number }
    ) => {
        if (!connectionState.isValid) {
            const { clientX, clientY } = 'changedTouches' in event
                ? event.changedTouches[0]
                : event;

            let position = screenToFlowPosition({
                x: clientX,
                y: clientY,
            });

            if (isSnap) {
                position = {
                    x: Math.round(position.x / 20) * 20,
                    y: Math.round(position.y / 20) * 20,
                };
            }

            const newNode = {
                type: 'custom',
                position,
                data: {
                    label: ``,
                    color: '#ffffff',
                    weight: 20,
                },
            };

            const createdNode = addNode(newNode);

            if (createdNode) {
                const newEdge = {
                    source: connectionState.fromNode.id,
                    target: createdNode.id,
                    type: 'floating',
                    data: {
                        weight: 1,
                        isDirected: true,
                        color: '#b1b1b7',
                    },
                };

                addEdge(newEdge);
            }
        }
    }, [addNode, addEdge, nodes.length, isSnap]);


    return {
        onConnectEnd,
    };

};