import { PlusOutlined } from '@ant-design/icons';
import {
    ReactFlowProvider
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import FloatingActionButton from '../atoms/FloatingActionButton';
import { GraphCanvasInner } from '../molecules/GraphCanvasInner';

export interface GraphCanvasProps {
    fullScreen?: boolean;
    onAddNode?: () => void;
}

export default function GraphCanvas({
    fullScreen = false,
    onAddNode,
}: GraphCanvasProps) {
    const canvasStyle = fullScreen
        ? {
            width: '100vw',
            height: '100vh',
            position: 'absolute' as const,
            top: 0,
            left: 0,
        }
        : {
            height: '500px',
            border: '2px dashed #d9d9d9',
            borderRadius: '6px',
            position: 'relative' as const,
        };

    return (
        <div style={canvasStyle}>
            <ReactFlowProvider>
                <GraphCanvasInner />
            </ReactFlowProvider>

            <FloatingActionButton
                icon={<PlusOutlined />}
                tooltip="Add Node"
                type="primary"
                onClick={onAddNode}
                style={{
                    position: 'fixed',
                    right: 24,
                    bottom: 24,
                    zIndex: 1000,
                }}
            />
        </div>
    );
}