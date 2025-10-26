import { PlusOutlined } from '@ant-design/icons';
import {
    ReactFlowProvider
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import type { GraphHandlers } from '../../interfaces/graph';
import FloatingActionButton from '../atoms/FloatingActionButton';
import { GraphCanvasInner } from '../molecules/GraphCanvasInner';

export interface GraphCanvasProps {
    fullScreen?: boolean;
    headerHeight?: number;
    onAddNode?: () => void;
    handlers?: GraphHandlers;
}

export default function GraphCanvas({
    fullScreen = false,
    headerHeight = 60,
    onAddNode,
    handlers,
}: GraphCanvasProps) {
    const canvasStyle = fullScreen
        ? {
            width: '100vw',
            height: `calc(100vh - ${headerHeight}px)`,
            position: 'absolute' as const,
            top: headerHeight,
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
                <GraphCanvasInner handlers={handlers} />
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