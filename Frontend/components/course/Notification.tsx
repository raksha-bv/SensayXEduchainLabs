import React from "react";
import { CheckIcon, XIcon } from "lucide-react";

interface NotificationProps {
  notification: {
    show: boolean;
    message: string;
    type: string;
  };
  setNotification: (notification: {
    show: boolean;
    message: string;
    type: string;
  }) => void;
}

export const Notification: React.FC<NotificationProps> = ({
  notification,
  setNotification,
}) => {
  if (!notification.show) return null;

  return (
    <div
      className={`fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg flex items-center ${
        notification.type === "success"
          ? "bg-green-600 text-white"
          : "bg-red-600 text-white"
      }`}
    >
      <div className="mr-3">
        {notification.type === "success" ? (
          <CheckIcon className="w-5 h-5" />
        ) : (
          <XIcon className="w-5 h-5" />
        )}
      </div>
      <div className="flex-1">{notification.message}</div>
      <button
        className="ml-4 text-white hover:text-gray-200"
        onClick={() => setNotification({ show: false, message: "", type: "" })}
      >
        <XIcon className="w-4 h-4" />
      </button>
    </div>
  );
};

export default Notification;
