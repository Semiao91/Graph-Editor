import GraphCanvas from '../organisms/GraphCanvas';
import Header from '../organisms/Header';

export default function GraphEditor() {
    const handleNewGraph = () => {
        console.log('New graph');
    };

    const handleSaveGraph = () => {
        console.log('Save graph');
    };

    const handleLoadGraph = () => {
        console.log('Load graph');
    };

    const handleClearGraph = () => {
        console.log('Clear graph');
    };

    const handleAddNode = () => {
        console.log('Add node');
    };

    return (
        <>
            <Header
                title="Graph Editor"
                onNewGraph={handleNewGraph}
                onSaveGraph={handleSaveGraph}
                onLoadGraph={handleLoadGraph}
                onClearGraph={handleClearGraph}
                isDirty={false}
            />

            <GraphCanvas
                height="500px"
                onAddNode={handleAddNode}
            />
        </>
    );
}