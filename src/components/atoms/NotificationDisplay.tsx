import { useEffect, useState } from 'react';
import type { NotificationData } from '../../interfaces/notification';
import '../../styles/NotificationDisplay.css';

const colorMap = {
    success: '#10b981',
    error: '#ef4444',
    warning: '#f59e0b',
    info: '#3b82f6',
};

interface NotificationItemProps {
    notification: NotificationData;
    onRemove: (id: string) => void;
}

export const NotificationItem = ({ notification }: NotificationItemProps) => {
    const [isVisible, setIsVisible] = useState(false);
    const [isExiting, setIsExiting] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setIsVisible(true), 10);
        return () => clearTimeout(timer);
    }, []);

    const color = colorMap[notification.type];

    return (
        <div
            className={`notification-item notification-${notification.type} ${isVisible ? 'notification-enter' : ''
                } ${isExiting ? 'notification-exit' : ''}`}
            style={{ borderLeftColor: color }}
        >
            <div className="notification-content">
                <div className="notification-title">{notification.title}</div>
                {notification.message && (
                    <div className="notification-message">{notification.message}</div>
                )}
            </div>
        </div>
    );
}

