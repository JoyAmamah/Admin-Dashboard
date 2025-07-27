import { useState } from "react";
import EmployeeForm from "./EmployeeForm";
import { usePersistedState } from "../Hooks/usePersistedState";
import type { Employee } from "../types/Types";
import Modal from "./Modal";
import { FaEye, FaEdit, FaTrash } from "react-icons/fa";
import SideBar from "../Pages/SideBar";
import {
  exportToExcel as downloadExcel,
  exportToJson as downloadJson,
} from "../Utils/Export";

const EmployeeTable = () => {
  const [employees, setEmployees] = usePersistedState<Employee[]>(
    "employees",
    []
  );
  const [modalOpen, setModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [editingEmployee, setEditingEmployee] = useState<Employee | null>(null);
  const [viewingEmployee, setViewingEmployee] = useState<Employee | null>(null);
  const [sortField, setSortField] = usePersistedState<
    "name" | "hireDate" | "department"
  >("sortField", "name");

  const handleAdd = () => {
    setEditingEmployee(null);
    setModalOpen(true);
  };

  const handleExportToExcel = () => {
    downloadExcel(employees, "Employees");
  };

  const handleExportToJson = () => {
    downloadJson(employees, "Employees");
  };

  const handleEdit = (employee: Employee) => {
    setEditingEmployee(employee);
    setModalOpen(true);
  };

  const handleDelete = (id: string) => {
    setEmployees(employees.filter((emp) => emp.id !== id));
  };

  const handleView = (employee: Employee) => {
    setViewingEmployee(employee);
  };

  const handleSave = (employee: Employee) => {
    setEmployees((prev) => {
      const exists = prev.find((e) => e.id === employee.id);
      if (exists) {
        return prev.map((e) => (e.id === employee.id ? employee : e));
      }
      return [...prev, employee];
    });
    setModalOpen(false);
  };

  const filteredEmployees = employees
    .filter(
      (emp) =>
        emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        emp.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
        emp.role.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (sortField === "name") {
        return a.name.localeCompare(b.name);
      } else if (sortField === "department") {
        return a.department.localeCompare(b.department);
      } else if (sortField === "hireDate") {
        return new Date(a.hireDate).getTime() - new Date(b.hireDate).getTime();
      }
      return 0;
    });

  return (
    <section className="flex min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-100">
      <SideBar />
      <div className="w-full p-6 space-y-6">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
          Employee Management
        </h1>
        <div className="flex justify-between">
        <div className="flex flex-wrap items-center gap-3">
          <input
            type="text"
            placeholder="Search by name, department, or role"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm text-sm w-full sm:w-80"
          />

          <select
            value={sortField}
            onChange={(e) =>
              setSortField(e.target.value as "name" | "hireDate" | "department")
            }
            className="border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-4 py-2 rounded-md text-sm shadow-sm"
          >
            <option value="name">Sort by Name</option>
            <option value="department">Sort by Department</option>
            <option value="hireDate">Sort by Hire Date</option>
          </select>

          <select
            onChange={(e) => {
              const value = e.target.value;
              if (value === "excel") {
                handleExportToExcel(employees, "Employees");
              } else if (value === "json") {
                handleExportToJson(employees, "Employees");
              }
            }}
            className="border border-gray-300 rounded-md px-4 py-2 text-sm shadow-sm focus:outline-none focus:ring focus:border-blue-500"
          >
            <option value="">Export As...</option>
            <option value="excel">Excel (.xlsx)</option>
            <option value="json">JSON (.json)</option>
          </select>
          </div>

          <div className="flex justify-end mb-4">
            <button
              onClick={handleAdd}
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md shadow-sm text-sm transition"
            >
              Add Employee
            </button>
          </div>
        </div>

        <div className="overflow-x-auto border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm">
          <table className="w-full text-sm text-left">
            <thead className="bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 uppercase text-xs">
              <tr>
                <th className="px-4 py-3">Name</th>
                <th className="px-4 py-3">Email</th>
                <th className="px-4 py-3">Department</th>
                <th className="px-4 py-3">Role</th>
                <th className="px-4 py-3">Contract</th>
                <th className="px-4 py-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {filteredEmployees.map((emp) => (
                <tr
                  key={emp.id}
                  className="hover:bg-gray-50 dark:hover:bg-gray-800 transition"
                >
                  <td className="px-4 py-3">{emp.name}</td>
                  <td className="px-4 py-3">{emp.email}</td>
                  <td className="px-4 py-3">{emp.department}</td>
                  <td className="px-4 py-3">{emp.role}</td>
                  <td className="px-4 py-3">{emp.contractType}</td>
                  <td className="px-4 py-3">
                    <div className="flex justify-center gap-4 text-lg">
                      <button
                        onClick={() => handleView(emp)}
                        title="View"
                        className="text-blue-500 hover:text-blue-700"
                      >
                        <FaEye />
                      </button>
                      <button
                        onClick={() => handleEdit(emp)}
                        title="Edit"
                        className="text-yellow-500 hover:text-yellow-600"
                      >
                        <FaEdit />
                      </button>
                      <button
                        onClick={() => handleDelete(emp.id)}
                        title="Delete"
                        className="text-red-600 hover:text-red-700"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredEmployees.length === 0 && (
                <tr>
                  <td
                    colSpan={6}
                    className="px-4 py-6 text-center text-gray-500 dark:text-gray-400"
                  >
                    No employees found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <Modal
          isOpen={modalOpen}
          title={editingEmployee ? "Edit Employee" : "Add Employee"}
          onClose={() => setModalOpen(false)}
        >
          <EmployeeForm onSubmit={handleSave} initialData={editingEmployee} />
        </Modal>

        <Modal
          isOpen={!!viewingEmployee}
          title="Employee Details"
          onClose={() => setViewingEmployee(null)}
        >
          {viewingEmployee && (
            <div className="space-y-2 text-sm">
              <div>
                <span className="font-semibold">Name:</span>{" "}
                {viewingEmployee.name}
              </div>
              <div>
                <span className="font-semibold">Email:</span>{" "}
                {viewingEmployee.email}
              </div>
              <div>
                <span className="font-semibold">Role:</span>{" "}
                {viewingEmployee.role}
              </div>
              <div>
                <span className="font-semibold">Department:</span>{" "}
                {viewingEmployee.department}
              </div>
              <div>
                <span className="font-semibold">Contract:</span>{" "}
                {viewingEmployee.contractType}
              </div>
              <div>
                <span className="font-semibold">Phone:</span>{" "}
                {viewingEmployee.phone}
              </div>
              <div>
                <span className="font-semibold">Hire Date:</span>{" "}
                {viewingEmployee.hireDate}
              </div>
            </div>
          )}
        </Modal>
      </div>
    </section>
  );
};

export default EmployeeTable;
