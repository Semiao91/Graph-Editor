import { Button, Card, Space, Typography } from 'antd';
import { Wifi, WifiOff } from 'lucide-react';
import { useSync } from '../../hooks/useSynch';

const { Text } = Typography;

export function NetworkSimulator() {
    const { goOffline, goOnline, getSyncStatus, isOnline } = useSync();
    const syncStatus = getSyncStatus();

    return (
        <Card
            title="Network Simulator"
            size="small"
            style={{
                position: 'fixed',
                top: '20px',
                right: '20px',
                width: '280px',
                zIndex: 1000,
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)',
            }}
        >
            <Space direction="vertical" style={{ width: '100%' }}>
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '8px 12px',
                    backgroundColor: isOnline ? '#f6ffed' : '#fff2f0',
                    borderRadius: '6px',
                    border: `1px solid ${isOnline ? '#b7eb8f' : '#ffccc7'}`,
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        {isOnline ? (
                            <Wifi size={16} style={{ color: '#52c41a' }} />
                        ) : (
                            <WifiOff size={16} style={{ color: '#ff4d4f' }} />
                        )}
                        <Text strong style={{ color: isOnline ? '#52c41a' : '#ff4d4f' }}>
                            {isOnline ? 'Online' : 'Offline'}
                        </Text>
                    </div>

                    <Text type="secondary" style={{ fontSize: '11px' }}>
                        {syncStatus.status}
                    </Text>
                </div>

                {syncStatus.lastSync && (
                    <Text type="secondary" style={{ fontSize: '11px' }}>
                        Last sync: {syncStatus.lastSync.toLocaleTimeString()}
                    </Text>
                )}

                {syncStatus.pendingChanges && syncStatus.pendingChanges > 0 && (
                    <Text type="warning" style={{ fontSize: '11px' }}>
                        {syncStatus.pendingChanges} pending changes
                    </Text>
                )}

                <Space>
                    <Button
                        size="small"
                        icon={<WifiOff size={14} />}
                        onClick={() => {
                            goOffline();
                        }}
                        disabled={!isOnline}
                    >
                        Go Offline
                    </Button>

                    <Button
                        size="small"
                        type="primary"
                        icon={<Wifi size={14} />}
                        onClick={() => {
                            goOnline();
                        }}
                        disabled={isOnline}
                    >
                        Go Online
                    </Button>
                </Space>
            </Space>
        </Card>
    );
}