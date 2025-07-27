import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import AdminDashboard from './Pages/AdminDashboard';
import EmployeeTable from './Components/EmployeeTable';
import SignUpPage from './Pages/SignUpPage';
import SignInPage from './Pages/SignInPage';
import Department from './Components/Department';
// import DarkModeToggle from './Hooks/DarkModeToggle';

const App = () => {
  
  // <DarkModeToggle />
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/signup" />} />

        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/signin" element={<SignInPage />} />

        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/employeetable" element={<EmployeeTable />} />
        <Route path="/department" element={<Department />} />

        <Route path="*" element={<Navigate to="/signup" />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
