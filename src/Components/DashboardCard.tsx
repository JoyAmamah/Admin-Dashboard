import { FaUserTie, FaUserClock } from "react-icons/fa";
import { type FC } from "react";

export interface DashboardCardProps {
  title: string;
  value: number | string;
  iconName: "FaUserTie" | "FaUserClock";
  description?: string;
  color?: string;
  hoverColor?: string;
}

const iconMap = {
  FaUserTie: <FaUserTie className="text-blue-600 dark:text-blue-300 text-3xl" />,
  FaUserClock: <FaUserClock className="text-green-600 dark:text-green-300 text-3xl" />,
};

const DashboardCard: FC<DashboardCardProps> = ({
  title,
  value,
  iconName,
  description,
  color = "bg-white",
  hoverColor = "",
}) => {
  const icon = iconMap[iconName];

  return (
    <div
      className={`transition-all duration-300 transform hover:scale-[1.02] rounded-2xl shadow-md p-5 ${color} ${
        hoverColor ? `hover:${hoverColor}` : ""
      } dark:bg-gray-800 dark:text-white`}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="text-xl font-semibold">{title}</div>
        <div className="">{icon}</div>
      </div>

      <div className="text-4xl font-bold mb-2">{value}</div>
      {description && (
        <p className="text-sm text-gray-600 dark:text-gray-400">{description}</p>
      )}
    </div>
  );
};

export default DashboardCard;
