import DashboardCard from "../Components/DashboardCard";
import SideBar from "./SideBar";
import { usePersistedState } from "../Hooks/usePersistedState";
import RechartsTable from "../Components/RechartsTable";
import RechartPie from "../Components/RechartPie";
import type { Employee } from "../types/types";

const AdminDashboard = () => {
  const [employees] = usePersistedState<Employee[]>("employees", []);
  const today = new Date();

  const totalEmployees = employees.length;
  const departments = [...new Set(employees.map(emp => emp.department))];
  const totalDepartments = departments.length;

  const newHires = employees.filter(emp => {
    const hireDate = new Date(emp.hireDate);
    const daysDiff = (today.getTime() - hireDate.getTime()) / (1000 * 3600 * 24);
    return daysDiff <= 30;
  }).length;

  return (
    <main className="flex min-h-screen bg-gray-50 dark:bg-gray-900">
      <SideBar />

      <section className="flex-1 p-4 sm:p-6 overflow-auto">
        <h1 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">
          Admin Dashboard
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          <DashboardCard
            title="Total Employees"
            value={totalEmployees}
            iconName="FaUserTie"
            description="All registered employees"
            color="bg-red-200"
            hoverColor="bg-red-400"
          />
          <DashboardCard
            title="Departments"
            value={totalDepartments}
            iconName="FaUserTie"
            description="Total employee departments"
            color="bg-blue-200"
            hoverColor="bg-blue-400"
          />
          <DashboardCard
            title="New Hires"
            value={newHires}
            iconName="FaUserClock"
            description="Hired in last 30 days"
            color="bg-green-200"
            hoverColor="bg-green-400"
          />
        </div>

        <div className="flex flex-col lg:flex-row gap-4">
          <div className="w-full lg:w-2/3 bg-white dark:bg-gray-800 rounded-xl shadow p-4">
            <h2 className="text-lg font-semibold text-gray-700 dark:text-white mb-2">
              Employee by Department
            </h2>
            <RechartsTable />
          </div>

          <div className="w-full lg:w-1/3 bg-white dark:bg-gray-800 rounded-xl shadow p-4">
            <h2 className="text-lg font-semibold text-gray-700 dark:text-white mb-2">
              Department Distribution
            </h2>
            <RechartPie />
          </div>
        </div>
      </section>
    </main>
  );
};

export default AdminDashboard;
