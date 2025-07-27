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
  FaUserTie: <FaUserTie />,
  FaUserClock: <FaUserClock />,
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
  className={`p-4 rounded shadow transition-colors ${color} ${hoverColor ? `hover:${hoverColor}` : ""} dark:bg-gray-800 dark:text-white`}
    >
      <div className="text-2xl mb-2">{icon}</div>
      <h2 className="text-lg font-bold">{title}</h2>
      <p className="text-3xl">{value}</p>
      <p className="text-sm text-gray-600 dark:text-gray-300">{description}</p>
    </div>
  );
};

export default DashboardCard;
