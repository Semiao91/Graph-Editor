import { Button, Space, Typography } from 'antd';
import { Magnet } from 'lucide-react';
import IconButton from '../atoms/IconButton';

const { Title } = Typography;

export interface HeaderProps {
    title: string;
    onNewGraph?: () => void;
    onSaveGraph?: () => void;
    onMagnetToggle?: () => void;
    onLoadGraph?: () => void;
    onClearGraph?: () => void;
    isDirty?: boolean;
    isSnap?: boolean;
    fixed?: boolean;
}

export default function Header({
    title,
    onNewGraph,
    onMagnetToggle,
    isDirty,
    isSnap = false,
    fixed = false
}: HeaderProps) {
    const headerStyle = {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '12px 24px',
        backgroundColor: '#ffffff',
        borderBottom: '1px solid #f0f0f0',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.06)',
        zIndex: 1000,
        ...(fixed && {
            position: 'fixed' as const,
            top: 0,
            left: 0,
            right: 0,
            width: '100%',
        }),
    };

    return (
        <div style={headerStyle}>
            <Title level={3} style={{ margin: 0, color: '#1f2937' }}>
                {title} {isDirty && <span style={{ color: '#f59e0b' }}>*</span>}
            </Title>

            <Space size="small">
                <IconButton
                    icon={<Magnet />}
                    tooltip={isSnap ? "Disable Snap to Grid" : "Enable Snap to Grid"}
                    size="small"
                    onClick={onMagnetToggle}
                    type={isSnap ? "primary" : "default"}
                    style={{
                        backgroundColor: isSnap ? '#1890ff' : 'transparent',
                        color: isSnap ? 'white' : 'inherit',
                    }}
                />
                <Button type="primary" onClick={onNewGraph} size="small">
                    New Graph
                </Button>
                {/* <IconButton
                    icon={<SaveOutlined />}
                    tooltip="Save Graph"
                    size="small"
                    onClick={onSaveGraph}
                />
                <IconButton
                    icon={<LoadingOutlined />}
                    tooltip="Load Graph"
                    size="small"
                    onClick={onLoadGraph}
                /> */}

                {/* <IconButton
                    icon={<DeleteOutlined />}
                    tooltip="Clear Graph"
                    size="small"
                    danger
                    onClick={onClearGraph}
                /> */}
            </Space>
        </div>
    );
}