import { PlusOutlined } from '@ant-design/icons';
import { Background, Controls, ReactFlow, ReactFlowProvider } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { FloatingActionButton } from '../atoms';

export interface GraphCanvasProps {
    fullScreen?: boolean;
    headerHeight?: number;
    onAddNode?: () => void;
    children?: React.ReactNode;
}

export default function GraphCanvas({
    fullScreen = false,
    headerHeight = 60,
    onAddNode,
    children
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
                {children || (
                    <ReactFlow
                        nodes={[]}
                        edges={[]}
                        fitView
                        className="react-flow-canvas"
                    >
                        <Background
                            color="#13161b"
                            gap={20}
                            size={1}
                        />
                        <Controls
                            position="bottom-left"
                            style={{
                                display: fullScreen ? 'none' : 'block'
                            }}
                        />
                    </ReactFlow>
                )}
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