import { useCallback, useEffect } from 'react';
import { useEdge } from '../../hooks/useEdge';
import { useNode } from '../../hooks/useNode';
import { useGraphStore } from '../../store';
import GraphCanvas from '../organisms/GraphCanvas';
import Header from '../organisms/Header';
import { NodePropertiesOverlay } from '../organisms/NodePropertiesOverLay';

export default function GraphEditor() {
    const {
        createNodeAtCenter,
        removeNode,
        nodes,
        selectedNodeId
    } = useNode();
    const {
        selectedEdgeId,
        removeEdge
    } = useEdge();
    const {
        clearGraph,
        isDirty,
        isSnap,
        toggleSnap,
        addNode,
        addEdge
    } = useGraphStore();

    // Header handlers
    const handleNewGraph = () => {
        clearGraph();
    };

    const handleMagnetToggle = () => {
        toggleSnap();
        console.log('Magnet toggle clicked');
    };

    const handleSaveGraph = () => {
        console.log('Save graph');
        // TODO: Implement save functionality
    };

    const handleLoadGraph = () => {
        console.log('Load graph');
        // TODO: Implement load functionality
    };

    const handleClearGraph = () => {
        clearGraph();
    };

    const handleAddNode = () => {
        createNodeAtCenter();
    };

    const graphHandlers = {
        onConnectEnd: useCallback((
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
        }, [addNode, addEdge, nodes.length, isSnap]),
    };


    // TODO: REFACTOR TO HOOK
    const handleKeyDown = useCallback((event: KeyboardEvent) => {
        if (event.key === 'Delete') {
            event.preventDefault();

            if (selectedNodeId) {
                removeNode(selectedNodeId);
            } else if (selectedEdgeId) {
                removeEdge(selectedEdgeId);
            }
        }
    }, [selectedNodeId, selectedEdgeId, removeNode, removeEdge]);

    useEffect(() => {
        document.addEventListener('keydown', handleKeyDown);
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [handleKeyDown]);

    return (
        <>
            <Header
                title="Graph Editor"
                onNewGraph={handleNewGraph}
                onSaveGraph={handleSaveGraph}
                onLoadGraph={handleLoadGraph}
                onClearGraph={handleClearGraph}
                onMagnetToggle={handleMagnetToggle}
                isSnap={isSnap}
                isDirty={isDirty}
                fixed={true}
            />

            <NodePropertiesOverlay
            />

            <GraphCanvas
                fullScreen={true}
                headerHeight={60}
                onAddNode={handleAddNode}
                handlers={graphHandlers}
            />

        </>
    );
}