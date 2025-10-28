import { createContext, useCallback, useContext, useState, type ReactNode } from 'react';
import type { NotificationContextType, NotificationData } from '../interfaces/notification';

const NotificationContext = createContext<NotificationContextType | null>(null);

// Provider
interface NotificationProviderProps {
    children: ReactNode;
}

export function NotificationProvider({ children }: NotificationProviderProps) {
    const [notifications, setNotifications] = useState<NotificationData[]>([]);

    const addNotification = useCallback((notificationData: Omit<NotificationData, 'id'>) => {
        const id = Math.random().toString(36).substring(2, 15);
        const notification: NotificationData = {
            ...notificationData,
            id,
            duration: notificationData.duration ?? (notificationData.type === 'error' ? 5000 : 3000),
        };

        setNotifications(prev => [...prev, notification]);

        if (notification.duration && notification.duration > 0) {
            setTimeout(() => {
                removeNotification(id);
            }, notification.duration);
        }
    }, []);

    const removeNotification = useCallback((id: string) => {
        setNotifications(prev => prev.filter(n => n.id !== id));
    }, []);

    const success = useCallback((title: string, message?: string) => {
        addNotification({ type: 'success', title, message });
    }, [addNotification]);

    const error = useCallback((title: string, message?: string) => {
        addNotification({ type: 'error', title, message });
    }, [addNotification]);

    const warning = useCallback((title: string, message?: string) => {
        addNotification({ type: 'warning', title, message });
    }, [addNotification]);

    const info = useCallback((title: string, message?: string) => {
        addNotification({ type: 'info', title, message });
    }, [addNotification]);

    const value: NotificationContextType = {
        notifications,
        addNotification,
        removeNotification,
        success,
        error,
        warning,
        info,
    };

    return (
        <NotificationContext.Provider value={value}>
            {children}
        </NotificationContext.Provider>
    );
}

// Hook
export function useNotification(): NotificationContextType {
    const context = useContext(NotificationContext);
    if (!context) {
        throw new Error('useNotification must be used within a NotificationProvider');
    }
    return context;
}