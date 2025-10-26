import GraphCanvas from '../organisms/GraphCanvas';
import Header from '../organisms/Header';
import ZoomControls from '../organisms/ZoomControls';

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

    const handleZoomIn = () => {
        console.log('Zoom in');
    };

    const handleZoomOut = () => {
        console.log('Zoom out');
    };

    const handleFitView = () => {
        console.log('Fit view');
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
                fixed={true}
            />

            <GraphCanvas
                fullScreen={true}
                headerHeight={60}
                onAddNode={handleAddNode}
            />

            <ZoomControls
                onZoomIn={handleZoomIn}
                onZoomOut={handleZoomOut}
                onFitView={handleFitView}
                zoomLevel={1}
            />
        </>
    );
}