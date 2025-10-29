import { Modal } from 'antd';
import { AlertTriangle } from 'lucide-react';
import type { ReactNode } from 'react';

interface ConfirmationModalProps {
    open: boolean;
    title: string;
    message: string | ReactNode;
    confirmText?: string;
    cancelText?: string;
    danger?: boolean;
    onConfirm: () => void;
    onCancel: () => void;
}

export function ConfirmationModal({
    open,
    title,
    message,
    confirmText = 'Confirm',
    cancelText = 'Cancel',
    danger = false,
    onConfirm,
    onCancel,
}: ConfirmationModalProps) {
    return (
        <Modal
            open={open}
            title={
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    {danger && (
                        <AlertTriangle
                            size={20}
                            style={{ color: '#ff4d4f' }}
                        />
                    )}
                    <span style={{ fontSize: '16px', fontWeight: 600 }}>
                        {title}
                    </span>
                </div>
            }
            onCancel={onCancel}
            onOk={onConfirm}
            okText={confirmText}
            cancelText={cancelText}
            okButtonProps={{
                danger: danger,
                style: {
                    backgroundColor: danger ? '#ff4d4f' : '#1890ff',
                    borderColor: danger ? '#ff4d4f' : '#1890ff',
                },
            }}
            cancelButtonProps={{
                style: {
                    borderColor: '#d9d9d9',
                },
            }}
            centered
            width={400}
            styles={{
                content: {
                    borderRadius: '12px',
                    padding: '24px',
                },
                header: {
                    marginBottom: '16px',
                    padding: '0',
                },
                body: {
                    padding: '0',
                },
                footer: {
                    marginTop: '24px',
                    padding: '0',
                    textAlign: 'right',
                },
            }}
        >
            <div style={{
                fontSize: '14px',
                lineHeight: '1.5',
                color: '#595959',
            }}>
                {message}
            </div>
        </Modal>
    );
}