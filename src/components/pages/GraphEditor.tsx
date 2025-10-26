import { useNode } from '../../hooks/useNode';
import { useGraphStore } from '../../store';
import GraphCanvas from '../organisms/GraphCanvas';
import Header from '../organisms/Header';

export default function GraphEditor() {
    const { createNodeAtCenter } = useNode();
    const { clearGraph, isDirty } = useGraphStore();

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
        createNodeAtCenter();
    };

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
            />

        </>
    );
}