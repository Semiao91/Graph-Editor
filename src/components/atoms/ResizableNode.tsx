import { Handle, NodeResizer, Position } from '@xyflow/react';
import { memo } from 'react';
import type { ResizableNodeData } from '../../types/node';

const ResizableNode = ({ data, selected }: { data: ResizableNodeData; selected: boolean }) => {
    const nodeData = data as ResizableNodeData;
    const handles = nodeData.handles || [];

    const getPosition = (pos: string) => {
        switch (pos) {
            case 'top': return Position.Top;
            case 'right': return Position.Right;
            case 'bottom': return Position.Bottom;
            case 'left': return Position.Left;
            default: return Position.Top;
        }
    };

    return (
        <>
            <NodeResizer
                minWidth={100}
                minHeight={50}
                isVisible={selected as boolean}
                handleStyle={{
                    backgroundColor: '#1890ff',
                    width: 8,
                    height: 8,
                    borderRadius: '50%',
                }}
            />

            {handles.map((handle) => (
                <Handle
                    key={handle.id}
                    id={handle.id}
                    type={handle.type}
                    position={getPosition(handle.position)}
                    style={{
                        background: handle.type === 'source' ? '#1890ff' : '#52c41a',
                        border: '2px solid #fff',
                        width: '14px',
                        height: '14px',
                        borderRadius: '50%',
                        cursor: 'crosshair',
                    }}
                />
            ))}
            <div
                style={{
                    padding: '12px',
                    backgroundColor: nodeData.color || '#f8f9fa',
                    border: selected ? '2px solid #1890ff' : '1px solid #d9d9d9',
                    borderRadius: '6px',
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    textAlign: 'center',
                    fontWeight: 'bold',
                    boxSizing: 'border-box',
                    color: nodeData.color === '#ffffff' ? '#000' : '#333',
                    minHeight: '50px',
                }}
            >
                <div>
                    <div style={{ marginBottom: '4px', fontSize: `${data.weight}px` }}>{nodeData.label}</div>
                </div>
            </div>

        </>
    );
};

export default memo(ResizableNode);