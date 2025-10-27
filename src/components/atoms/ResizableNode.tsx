import { Handle, NodeResizer, Position } from '@xyflow/react';
import { memo } from 'react';

type ResizableNodeData = {
    label: string;
    color?: string;
    weight?: number;
};

const ResizableNode = ({ data, selected }: { data: ResizableNodeData; selected: boolean }) => {
    const nodeData = data as ResizableNodeData;
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
            <Handle type="target" position={Position.Top} />
            <Handle type="target" position={Position.Left} />

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

            <Handle type="source" position={Position.Bottom} />
            <Handle type="source" position={Position.Right} />
        </>
    );
};

export default memo(ResizableNode);