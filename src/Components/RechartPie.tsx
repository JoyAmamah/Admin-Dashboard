import {
  ResponsiveContainer,
  Tooltip,
  PieChart,
  Cell,
  Legend,
  Pie,
} from "recharts";
import { usePersistedState } from "../Hooks/usePersistedState";
import type { Employee, Department } from "../types/types";

const RechartPie = () => {
  const [employees] = usePersistedState<Employee[]>("employees", []);
  const [departments] = usePersistedState<Department[]>("departments", []);
  const COLORS = ["#4F46E5", "#22C55E", "#F97316"];

  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();

  const totalEmployees = employees.length;
  const totalDepartments = departments.length;
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
    <div className="w-full h-80 p-4 bg-white dark:bg-gray-800 rounded-2xl shadow">
      <h2 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">
        Organization Summary
      </h2>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={chartData}
            dataKey="value"
            nameKey="label"
            outerRadius={90}
            label={({ name }) => name}
          >
            {chartData.map((_, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{
              backgroundColor: "#fff",
              border: "1px solid #e2e8f0",
              borderRadius: "6px",
            }}
            labelStyle={{ color: "#1f2937" }}
            itemStyle={{ color: "#111827" }}
          />
          <Legend
            wrapperStyle={{
              fontSize: "14px",
              color: "#374151",
            }}
            formatter={(value) => (
              <span className="text-gray-700 dark:text-gray-300">{value}</span>
            )}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default RechartPie;
