import { createContext } from "react";
import type { NotificationContextType } from "../interfaces/notification";

export const NotificationContext = createContext<NotificationContextType | undefined>(undefined);