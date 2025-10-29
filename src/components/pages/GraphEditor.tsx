import { useCallback, useEffect, useRef } from 'react';
import { useEdge } from '../../hooks/useEdge';
import { useNode } from '../../hooks/useNode';
import { useSync } from '../../hooks/useSynch';
import { useGraphStore } from '../../store';
import { initPersistence } from '../../utils/persist';
import GraphCanvas from '../organisms/GraphCanvas';
import Header from '../organisms/Header';
import { NodePropertiesOverlay } from '../organisms/NodePropertiesOverLay';

export const GraphEditor = () => {
    const persistenceRef = useRef<ReturnType<typeof initPersistence> | null>(null);

    const {
        createNodeAtCenter,
        removeNode,
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
    } = useGraphStore();


    const handleMagnetToggle = () => {
        toggleSnap();
    };

    const handleClearGraph = async () => {
        if (persistenceRef.current) {
            await persistenceRef.current.clear();
        }
        clearGraph();
    };

    const handleAddNode = () => {
        createNodeAtCenter();
    };

    useSync()

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
        if (!persistenceRef.current) {
            persistenceRef.current = initPersistence(useGraphStore);
        }

        return () => {
            if (persistenceRef.current) {
                persistenceRef.current.dispose();
                persistenceRef.current = null;
            }
        };
    }, []);

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
                onClearGraph={handleClearGraph}
                onAddNode={handleAddNode}
                onMagnetToggle={handleMagnetToggle}
                isSnap={isSnap}
                isDirty={isDirty}
            />

            <NodePropertiesOverlay
            />

            <GraphCanvas
                fullScreen={true}
                onAddNode={handleAddNode}
            />

        </>
    );
}