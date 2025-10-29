import { useNotification } from "../../hooks/useNotification";
import type { NotificationData } from "../../interfaces/notification";
import { NotificationItem } from "../atoms/NotificationDisplay";

export const NotificationDisplay = () => {
    const { notifications, removeNotification } = useNotification();

    return (
        <div className="notification-container">
            {notifications.map((notification: NotificationData) => (
                <NotificationItem
                    key={notification.id}
                    notification={notification}
                    onRemove={removeNotification}
                />
            ))}
        </div>
    );
}