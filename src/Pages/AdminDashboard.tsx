import DashboardCard from "../Components/DashboardCard";
import SideBar from "./SideBar";
import { usePersistedState } from "../Hooks/usePersistedState";
import RechartsTable from "../Components/RechartsTable";
import RechartPie from "../Components/RechartPie";

const AdminDashboard = () => {
  const [employees] = usePersistedState("employees", []);
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
    <main className="flex">
      <SideBar />
      <section className="flex-1 p-6">
        <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <DashboardCard
            title="Total Employees"
            value={totalEmployees}
            iconName="FaUserTie"
            description="All registered employees"
            color="bg-red-200"
            hoverColor= "bg-red-400"
          />
          <DashboardCard
            title="Departments"
            value={totalDepartments}
            iconName="FaUserTie"
            description="Total unique departments"
           color="bg-blue-200"
            hoverColor= "bg-blue-400"

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
     <div className="flex flex-row">
      <RechartsTable />
       <RechartPie />
     </div>
      </section>
    </main>
  );
};

export default AdminDashboard;
