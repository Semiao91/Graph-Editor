import { Handle, Position, useConnection } from '@xyflow/react';
import { memo } from 'react';

interface CustomNodeProps {
    id: string;
    data?: {
        label?: string;
        color?: string;
        weight?: number;
    };
    selected?: boolean;
}

export const CustomNode = memo(({ id, data, selected }: CustomNodeProps) => {
    console.log('Rendering CustomNode:', id, 'Selected:', selected, 'data', data);
    const connection = useConnection();
    const isTarget = connection.inProgress && connection.fromNode.id !== id;

    return (
        <div style={{
            padding: '12px 20px',
            backgroundColor: data?.color || '#ffffff',
            border: selected ? '2px solid #1890ff' : '2px solid #d9d9d9',
            borderRadius: '8px',
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            fontWeight: 'bold',
            color: '#333',
            position: 'relative',
            boxShadow: selected ? '0 4px 12px rgba(24, 144, 255, 0.3)' : '0 2px 8px rgba(0, 0, 0, 0.1)',
            transition: 'all 0.2s ease',
            boxSizing: 'border-box',
        }}>
            {!connection.inProgress && (
                <Handle
                    position={Position.Right}
                    type="source"
                    style={{
                        background: '#1890ff',
                        border: '2px solid #fff',
                        width: '12px',
                        height: '12px',
                        borderRadius: '50%',
                    }}
                />
            )}

            {(!connection.inProgress || isTarget) && (
                <Handle
                    position={Position.Left}
                    type="target"
                    isConnectableStart={false}
                    style={{
                        background: '#52c41a',
                        border: '2px solid #fff',
                        width: '12px',
                        height: '12px',
                        borderRadius: '50%',
                    }}
                />
            )}

            {/* Node content */}
            <div style={{
                fontSize: `${Math.max(12, Math.min(32, (data?.weight || 20) / 1.5))}px`,
                wordBreak: 'break-word',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
            }}>
                {data?.label || ''}
            </div>
        </div>
    );
});

CustomNode.displayName = 'CustomNode';