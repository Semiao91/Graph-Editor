import {
    DeleteOutlined,
    LoadingOutlined,
    SaveOutlined
} from '@ant-design/icons';
import { Typography } from 'antd';
import { Button, IconButton, Toolbar } from '../atoms';

const { Title } = Typography;

export interface HeaderProps {
    title: string;
    onNewGraph?: () => void;
    onSaveGraph?: () => void;
    onLoadGraph?: () => void;
    onClearGraph?: () => void;
    isDirty?: boolean;
}

export default function Header({
    title,
    onNewGraph,
    onSaveGraph,
    onLoadGraph,
    onClearGraph,
    isDirty
}: HeaderProps) {
    return (
        <>
            <Title level={1} style={{ marginBottom: '24px' }}>
                {title} {isDirty && '*'}
            </Title>

            <Toolbar style={{ marginBottom: '24px' }}>
                <Button type="primary" onClick={onNewGraph}>
                    New Graph
                </Button>
                <IconButton
                    icon={<SaveOutlined />}
                    tooltip="Save Graph"
                    type="default"
                    onClick={onSaveGraph}
                />
                <IconButton
                    icon={<LoadingOutlined />}
                    tooltip="Load Graph"
                    type="default"
                    onClick={onLoadGraph}
                />
                <IconButton
                    icon={<DeleteOutlined />}
                    tooltip="Clear Graph"
                    type="default"
                    danger
                    onClick={onClearGraph}
                />
            </Toolbar>
        </>
    );
}