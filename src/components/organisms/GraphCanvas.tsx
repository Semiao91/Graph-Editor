import { PlusOutlined } from '@ant-design/icons';
import { FloatingActionButton } from '../atoms';

export interface GraphCanvasProps {
    height?: string | number;
    onAddNode?: () => void;
    children?: React.ReactNode;
}

export default function GraphCanvas({
    height = '500px',
    onAddNode,
    children
}: GraphCanvasProps) {
    return (
        <div style={{
            height,
            border: '2px dashed #d9d9d9',
            borderRadius: '6px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#fafafa',
            color: '#8c8c8c',
            fontSize: '16px',
            position: 'relative'
        }}>
            {children || 'Graph Canvas Will Go Here'}

            <FloatingActionButton
                icon={<PlusOutlined />}
                tooltip="Add Node"
                type="primary"
                onClick={onAddNode}
                style={{
                    position: 'absolute',
                    right: 24,
                    bottom: 24
                }}
            />
        </div>
    );
}