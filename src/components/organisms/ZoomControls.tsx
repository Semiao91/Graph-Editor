import { ExpandOutlined, MinusOutlined, PlusOutlined } from '@ant-design/icons';
import { Space } from 'antd';
import { IconButton } from '../atoms';

export interface ZoomControlsProps {
    onZoomIn?: () => void;
    onZoomOut?: () => void;
    onFitView?: () => void;
    zoomLevel?: number;
}

export default function ZoomControls({
    onZoomIn,
    onZoomOut,
    onFitView,
    zoomLevel
}: ZoomControlsProps) {
    return (
        <div
            style={{
                position: 'fixed',
                bottom: '24px',
                left: '24px',
                zIndex: 1000,
                backgroundColor: '#ffffff',
                borderRadius: '8px',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                border: '1px solid #f0f0f0',
                padding: '8px',
            }}
        >
            <Space direction="vertical" size="small">
                <IconButton
                    icon={<PlusOutlined />}
                    tooltip="Zoom In"
                    size="small"
                    onClick={onZoomIn}
                />
                <IconButton
                    icon={<MinusOutlined />}
                    tooltip="Zoom Out"
                    size="small"
                    onClick={onZoomOut}
                />
                <IconButton
                    icon={<ExpandOutlined />}
                    tooltip="Fit to Screen"
                    size="small"
                    onClick={onFitView}
                />
                {zoomLevel && (
                    <div
                        style={{
                            fontSize: '12px',
                            color: '#6b7280',
                            textAlign: 'center',
                            padding: '4px',
                            borderTop: '1px solid #f0f0f0',
                            marginTop: '4px',
                            paddingTop: '8px',
                        }}
                    >
                        {Math.round(zoomLevel * 100)}%
                    </div>
                )}
            </Space>
        </div>
    );
}