import type { ReactNode } from 'react';
import { NotificationProvider } from './NotificationContext';

interface AppContextProps {
    children: ReactNode;
}

export function AppProvider({ children }: AppContextProps) {
    return (
        <NotificationProvider>
            {children}
        </NotificationProvider>
    );
}