import { Space, Tooltip, Typography } from 'antd';
import { FileText, FolderOpen, Magnet, Plus, Save, Trash2 } from 'lucide-react';
import IconButton from '../atoms/IconButton';

const { Text } = Typography;

export interface HeaderProps {
    title: string;
    onNewGraph?: () => void;
    onSaveGraph?: () => void;
    onMagnetToggle?: () => void;
    onLoadGraph?: () => void;
    onClearGraph?: () => void;
    onAddNode?: () => void;
    isDirty?: boolean;
    isSnap?: boolean;
    fixed?: boolean;
}

export default function Header({
    title,
    onNewGraph,
    onSaveGraph,
    onLoadGraph,
    onClearGraph,
    onAddNode,
    onMagnetToggle,
    isDirty,
    isSnap = false,
}: HeaderProps) {
    return (
        <>
            {/* App Title - Top Left */}
            <div style={{
                position: 'fixed',
                top: '20px',
                left: '20px',
                zIndex: 1001,
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
            }}>
                <div style={{
                    backgroundColor: 'rgba(255, 255, 255, 0.95)',
                    backdropFilter: 'blur(10px)',
                    borderRadius: '12px',
                    padding: '8px 16px',
                    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
                    border: '1px solid rgba(0, 0, 0, 0.05)',
                }}>
                    <Text strong style={{ color: '#1f2937', fontSize: '14px' }}>
                        {title} {isDirty && <span style={{ color: '#f59e0b' }}>●</span>}
                    </Text>
                </div>
            </div>

            {/* Main Floating Toolbar - Top Center */}
            <div style={{
                position: 'fixed',
                top: '20px',
                left: '50%',
                transform: 'translateX(-50%)',
                zIndex: 1001,
                display: 'flex',
                alignItems: 'center',
                backgroundColor: 'rgba(255, 255, 255, 0.95)',
                backdropFilter: 'blur(10px)',
                borderRadius: '16px',
                padding: '8px 12px',
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.12)',
                border: '1px solid rgba(0, 0, 0, 0.08)',
                gap: '4px',
            }}>
                <Space size={4}>
                    {/* File Operations */}

                    <Tooltip title="New Graph" placement="bottom">
                        <IconButton
                            icon={<FileText size={16} />}
                            size="small"
                            onClick={onNewGraph}
                            style={{
                                width: '36px',
                                height: '36px',
                                borderRadius: '10px',
                                border: 'none',
                                backgroundColor: 'transparent',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                transition: 'all 0.2s ease',
                            }}
                        />
                    </Tooltip>

                    <Tooltip title="Save Graph" placement="bottom">
                        <IconButton
                            icon={<Save size={16} />}
                            size="small"
                            onClick={onSaveGraph}
                            style={{
                                width: '36px',
                                height: '36px',
                                borderRadius: '10px',
                                border: 'none',
                                backgroundColor: 'transparent',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                transition: 'all 0.2s ease',
                            }}
                        />
                    </Tooltip>

                    <Tooltip title="Load Graph" placement="bottom">
                        <IconButton
                            icon={<FolderOpen size={16} />}
                            size="small"
                            onClick={onLoadGraph}
                            style={{
                                width: '36px',
                                height: '36px',
                                borderRadius: '10px',
                                border: 'none',
                                backgroundColor: 'transparent',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                transition: 'all 0.2s ease',
                            }}
                        />
                    </Tooltip>

                    {/* Divider */}
                    <div style={{
                        width: '1px',
                        height: '24px',
                        backgroundColor: 'rgba(0, 0, 0, 0.1)',
                        margin: '0 4px',
                    }} />

                    {/* Tools */}

                    <Tooltip title="Add Node" placement="bottom">
                        <IconButton
                            icon={<Plus size={16} />}
                            size="small"
                            onClick={onAddNode}
                            style={{
                                width: '36px',
                                height: '36px',
                                borderRadius: '10px',
                                border: 'none',
                                backgroundColor: '#1890ff',
                                color: 'white',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                transition: 'all 0.2s ease',
                            }}
                        />
                    </Tooltip>


                    <Tooltip title={isSnap ? "Disable Snap to Grid" : "Enable Snap to Grid"} placement="bottom">
                        <IconButton
                            icon={<Magnet size={16} />}
                            size="small"
                            onClick={onMagnetToggle}
                            style={{
                                width: '36px',
                                height: '36px',
                                borderRadius: '10px',
                                border: 'none',
                                backgroundColor: isSnap ? '#1890ff' : 'transparent',
                                color: isSnap ? 'white' : 'inherit',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                transition: 'all 0.2s ease',
                            }}
                        />
                    </Tooltip>

                    {/* Divider */}
                    <div style={{
                        width: '1px',
                        height: '24px',
                        backgroundColor: 'rgba(0, 0, 0, 0.1)',
                        margin: '0 4px',
                    }} />

                    {/* Danger Zone */}

                    <Tooltip title="Clear Graph" placement="bottom">
                        <IconButton
                            icon={<Trash2 size={16} />}
                            size="small"
                            onClick={onClearGraph}
                            style={{
                                width: '36px',
                                height: '36px',
                                borderRadius: '10px',
                                border: 'none',
                                backgroundColor: 'transparent',
                                color: '#ff4d4f',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                transition: 'all 0.2s ease',
                            }}
                        />
                    </Tooltip>
                </Space>
            </div>
        </>
    );
}