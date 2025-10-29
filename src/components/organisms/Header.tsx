import { Space, Tooltip, Typography } from 'antd';
import { Magnet, Plus, Trash2 } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { useNotification } from '../../hooks/useNotification';
import IconButton from '../atoms/IconButton';
import { ConfirmationModal } from '../atoms/Modal';

const { Text } = Typography;

interface HeaderProps {
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
    onClearGraph,
    onAddNode,
    onMagnetToggle,
    isDirty,
    isSnap = false,
}: HeaderProps) {
    const prevIsDirty = useRef<boolean | undefined>(undefined);
    const notificationTimeoutRef = useRef<number | null>(null);
    const { success } = useNotification();
    const [showClearConfirmation, setShowClearConfirmation] = useState(false)

    useEffect(() => {
        if (prevIsDirty.current === true && isDirty === false) {
            if (notificationTimeoutRef.current) {
                clearTimeout(notificationTimeoutRef.current);
            }

            notificationTimeoutRef.current = window.setTimeout(() => {
                success('Saved ✔');
                notificationTimeoutRef.current = null;
            }, 300);
        }

        if (isDirty && notificationTimeoutRef.current) {
            clearTimeout(notificationTimeoutRef.current);
            notificationTimeoutRef.current = null;
        }

        prevIsDirty.current = isDirty;
    }, [isDirty, success]);

    const handleClearGraphClick = () => {
        setShowClearConfirmation(true);
    };

    const handleConfirmClear = () => {
        setShowClearConfirmation(false);
        onClearGraph?.();
    };

    const handleCancelClear = () => {
        setShowClearConfirmation(false);
    };
    return (
        <>
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
                        {title}
                    </Text>
                </div>
            </div>

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
                    {/* Divider */}
                    <div style={{
                        width: '1px',
                        height: '24px',
                        backgroundColor: 'rgba(0, 0, 0, 0.1)',
                        margin: '0 4px',
                    }} />
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
                            onClick={handleClearGraphClick}
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
            <ConfirmationModal
                open={showClearConfirmation}
                title="Clear Graph"
                message={
                    <div>
                        <p style={{ marginBottom: '12px' }}>
                            Are you sure you want to clear the entire graph?
                        </p>
                        <p style={{
                            marginBottom: '0',
                            padding: '8px 12px',
                            backgroundColor: '#fff2f0',
                            border: '1px solid #ffccc7',
                            borderRadius: '6px',
                            color: '#cf1322',
                            fontSize: '13px',
                        }}>
                            <strong>Warning:</strong> This action will permanently delete all nodes, edges, and saved data. This cannot be undone.
                        </p>
                    </div>
                }
                confirmText="Delete All Data"
                cancelText="Cancel"
                danger={true}
                onConfirm={handleConfirmClear}
                onCancel={handleCancelClear}
            />
        </>
    );
}