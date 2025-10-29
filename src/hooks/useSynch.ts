import { useEffect, useRef } from 'react';
import { mockApi } from '../services/mockApi.service';
import { SyncManager } from '../services/syncManager.service';
import { useGraphStore } from '../store';
import { useNotification } from './useNotification';

export const useSync = () => {
    const syncManagerRef = useRef<SyncManager | null>(null);
    const isOnline = useGraphStore((state) => state.isOnline);
    const lastSync = useGraphStore((state) => state.lastSync);
    const setOnlineStatus = useGraphStore((state) => state.setOnlineStatus);
    const { success, info } = useNotification();

    useEffect(() => {
        if (!syncManagerRef.current) {
            setOnlineStatus(false);

            syncManagerRef.current = new SyncManager();
            syncManagerRef.current.startAutoSync();
        }

        return () => {
            if (syncManagerRef.current) {
                syncManagerRef.current.stopAutoSync();
                syncManagerRef.current = null;
            }
        };
    }, [setOnlineStatus]);

    const goOffline = () => {
        console.log('🔴 useSync: Going offline...');
        mockApi.goOffline();
        setOnlineStatus(false);
        info('Gone Offline', 'Simulating network disconnection');
    };

    const goOnline = () => {
        console.log('🟢 useSync: Going online...');
        mockApi.goOnline();
        setOnlineStatus(true);
        if (syncManagerRef.current) {
            syncManagerRef.current.goOnline();
        }
        success('Back Online', 'Network connection restored');
    };

    const getSyncStatus = () => mockApi.getSyncStatus();

    return {
        goOffline,
        goOnline,
        getSyncStatus,
        isOnline,
        lastSync,
    };
};