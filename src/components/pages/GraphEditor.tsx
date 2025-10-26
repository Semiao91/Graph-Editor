import { useCallback, useEffect } from 'react';
import { useEdge } from '../../hooks/useEdge';
import { useNode } from '../../hooks/useNode';
import { useGraphStore } from '../../store';
import GraphCanvas from '../organisms/GraphCanvas';
import Header from '../organisms/Header';

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
        addNode,
        addEdge
    } = useGraphStore();

    // Header handlers
    const handleNewGraph = () => {
        clearGraph();
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
        const newNode = createNodeAtCenter();
        console.log('Created node:', newNode);
        console.log('All nodes after creation:', nodes);
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

                const position = screenToFlowPosition({
                    x: clientX,
                    y: clientY,
                });

                // Create the new node
                const newNode = {
                    type: 'ResizableNode',
                    position,
                    data: {
                        label: `Node ${nodes.length + 1}`,
                        color: '#ffffff',
                        weight: 1,
                    },
                };

                const createdNode = addNode(newNode);

                // Create edge between the source node and new node
                if (createdNode) {
                    const newEdge = {
                        source: connectionState.fromNode.id,
                        target: createdNode.id,
                        type: 'default',
                        data: {
                            weight: 1,
                            isDirected: true,
                        },
                    };

                    addEdge(newEdge);
                }
            }
        }, [addNode, addEdge, nodes.length]),
    };

    // Keyboard handlers for delete
    const handleKeyDown = useCallback((event: KeyboardEvent) => {
        if (event.key === 'Delete' || event.key === 'Backspace') {
            event.preventDefault();

            if (selectedNodeId) {
                removeNode(selectedNodeId);
            } else if (selectedEdgeId) {
                removeEdge(selectedEdgeId);
            }
        }
    }, [selectedNodeId, selectedEdgeId, removeNode, removeEdge]);

    // Add keyboard event listener
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
                isDirty={isDirty}
                fixed={true}
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