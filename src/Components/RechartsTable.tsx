import { ResponsiveContainer, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Bar, Cell } from 'recharts';
import { usePersistedState } from '../Hooks/usePersistedState';
import type { Employee, Department } from '../types/types';



const RechartsTable = () => {
  const [employees] = usePersistedState<Employee[]>("employees", []);
  const [departments] = usePersistedState<Department[]>("departments", []);
    const COLORS = ['#4F46E5', '#22C55E', '#F97316'];


  const totalEmployees = employees.length;
  const totalDepartments = departments.length;

  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();

  const newlyHired = employees.filter(emp => {
    const hireDate = new Date(emp.hireDate);
    return (
      hireDate.getMonth() === currentMonth &&
      hireDate.getFullYear() === currentYear
    );
  }).length;

  const chartData = [
    { label: 'Total Employees', value: totalEmployees },
    { label: 'Total Departments', value: totalDepartments },
    { label: 'Newly Hired', value: newlyHired },
  ];

  return (
    <div className="w-full h-80 p-4 bg-white rounded-xl shadow">
  <h2 className="text-lg font-bold mb-4">Organization Overview</h2>
  <ResponsiveContainer width="100%" height="100%">
    <BarChart data={chartData}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="label" />
      <YAxis />
      <Tooltip />
      <Bar dataKey="value">
        {chartData?.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Bar>
    </BarChart>
  </ResponsiveContainer>
</div>

  );
};

export default RechartsTable;
