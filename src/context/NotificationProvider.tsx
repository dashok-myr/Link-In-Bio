import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import NotificationPopup from "../NotificationPopup.tsx";

interface INotification {
  label: string;
  icon: string;
  isDisplayed: boolean;
}

export const NotificationContext = createContext<{
  notification: INotification;
  setNotification: Dispatch<SetStateAction<INotification>>;
}>({
  notification: { label: "", icon: "", isDisplayed: false },
  setNotification: () => {},
});

export default function NotificationProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [notification, setNotification] = useState({
    label: "",
    icon: "",
    isDisplayed: false,
  });

  useEffect(() => {
    if (notification.isDisplayed) {
      setTimeout(() => {
        setNotification({ label: "", icon: "", isDisplayed: false });
      }, 2000);
    }
  }, [notification.isDisplayed]);

  return (
    <NotificationContext.Provider value={{ notification, setNotification }}>
      {children}
      {notification.isDisplayed && (
        <NotificationPopup
          icon={notification.icon}
          label={notification.label}
        />
      )}
    </NotificationContext.Provider>
  );
}
