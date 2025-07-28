import {
  ResponsiveContainer,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Bar,
  Cell,
} from "recharts";
import { usePersistedState } from "../Hooks/usePersistedState";
import type { Employee, Department } from "../types/types";

const RechartsTable = () => {
  const [employees] = usePersistedState<Employee[]>("employees", []);
  const [departments] = usePersistedState<Department[]>("departments", []);
  const COLORS = ["#4F46E5", "#22C55E", "#F97316"];

  const totalEmployees = employees.length;
  const totalDepartments = departments.length;

  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();

  const newlyHired = employees.filter((emp) => {
    const hireDate = new Date(emp.hireDate);
    return (
      hireDate.getMonth() === currentMonth &&
      hireDate.getFullYear() === currentYear
    );
  }).length;

  const chartData = [
    { label: "Total Employees", value: totalEmployees },
    { label: "Total Departments", value: totalDepartments },
    { label: "Newly Hired", value: newlyHired },
  ];

  return (
    <div className="w-full h-80 p-4 rounded-2xl shadow bg-white dark:bg-gray-800 dark:text-white">
      <h2 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-100">
        Organization Overview
      </h2>

      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
          <XAxis dataKey="label" stroke="#94a3b8" />
          <YAxis stroke="#94a3b8" />
          <Tooltip
            contentStyle={{
              backgroundColor: "#fff",
              border: "1px solid #e2e8f0",
              borderRadius: "6px",
            }}
            labelStyle={{ color: "#1f2937" }}
            itemStyle={{ color: "#111827" }}
          />
          <Bar dataKey="value">
            {chartData.map((_, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default RechartsTable;
