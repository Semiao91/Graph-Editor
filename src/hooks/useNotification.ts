import { useContext } from 'react';
import { NotificationContext } from '../context';
import type { NotificationContextType } from '../interfaces/notification';

export function useNotification(): NotificationContextType {
    const context = useContext(NotificationContext);
    if (!context) {
        throw new Error('useNotification must be used within a NotificationProvider');
    }
    return context;
}