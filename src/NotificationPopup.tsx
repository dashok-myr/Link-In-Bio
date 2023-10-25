interface INotificationPopup {
  icon: string;
  label: string;
}

export default function NotificationPopup({ icon, label }: INotificationPopup) {
  return (
    <div className="absolute bottom-0 left-0 right-0 flex justify-center items-center">
      <div className="relative flex items-center mb-5">
        <img className="absolute pl-2.5" src={icon} alt="clipboard" />
        <div className="flex justify-center items-center bg-dark h-12 w-96 rounded-lg text-white">
          {label}
        </div>
      </div>
    </div>
  );
}
