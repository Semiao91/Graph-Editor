import {
    DeleteOutlined,
    LoadingOutlined,
    SaveOutlined
} from '@ant-design/icons';
import { Space, Typography } from 'antd';
import { Button, IconButton } from '../atoms';

const { Title } = Typography;

export interface HeaderProps {
    title: string;
    onNewGraph?: () => void;
    onSaveGraph?: () => void;
    onLoadGraph?: () => void;
    onClearGraph?: () => void;
    isDirty?: boolean;
    fixed?: boolean;
}

export default function Header({
    title,
    onNewGraph,
    onSaveGraph,
    onLoadGraph,
    onClearGraph,
    isDirty,
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
                <Button type="primary" onClick={onNewGraph} size="small">
                    New Graph
                </Button>
                <IconButton
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
                />
                <IconButton
                    icon={<DeleteOutlined />}
                    tooltip="Clear Graph"
                    size="small"
                    danger
                    onClick={onClearGraph}
                />
            </Space>
        </div>
    );
}