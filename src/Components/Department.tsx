import React, { useState } from "react";
import Modal from "./Modal";
import type { Department } from "../types/Types";
import SideBar from "../Pages/SideBar";
import { usePersistedState } from "../Hooks/usePersistedState";
import { FaEdit, FaTrash } from "react-icons/fa";

const DepartmentPage = () => {
  const [departments, setDepartments] = usePersistedState<Department[]>("departments", []);
  const [modalOpen, setModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [editDepartment, setEditDepartment] = useState<Department | null>(null);

  const handleAdd = () => {
    setEditDepartment(null);
    setModalOpen(true);
  };

  const handleEdit = (dept: Department) => {
    setEditDepartment(dept);
    setModalOpen(true);
  };

  const handleDelete = (id: string) => {
    setDepartments(departments.filter((d) => d.id !== id));
  };

  const handleSave = (dept: Department) => {
    setDepartments((prev) => {
      const exists = prev.find((d) => d.id === dept.id);
      if (exists) {
        return prev.map((d) => (d.id === dept.id ? dept : d));
      }
      return [...prev, dept];
    });
    setModalOpen(false);
  };
  

  const filteredDepartments = departments.filter((d) =>
    d.department.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <section className="flex min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-100">
      <SideBar />
      <div className="w-full p-6 space-y-6">
<h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
  Department Management
</h1>
       <div className="flex flex-row justify-between">
         <div className="flex flex-wrap items-center gap-3">
          <input
            type="text"
            placeholder="Search departments"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm text-sm w-full sm:w-80"
          />
        </div>

        <div className="flex justify-end mb-4">
          <button
            onClick={handleAdd}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md shadow-sm text-sm transition"
          >
            Add Department
          </button>
        </div>
       </div>

        <table className="w-full table-auto text-sm shadow-md rounded-lg overflow-hidden">
  <thead className="bg-blue-600 text-white uppercase text-xs">
    <tr>
      <th className="px-6 py-3 text-left">No</th>
      <th className="px-6 py-3 text-left">Department</th>
      <th className="px-6 py-3 text-center">Actions</th>
    </tr>
  </thead>
  <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
    {filteredDepartments.map((dept, index) => (
      <tr
        key={dept.id}
        className="hover:bg-gray-100 dark:hover:bg-gray-800 transition duration-150"
      >
        <td className="px-6 py-4 text-gray-800 dark:text-gray-200">{index + 1}</td>
        <td className="px-6 py-4 text-gray-800 dark:text-gray-200">{dept.department}</td>
        <td className="px-6 py-4">
          <div className="flex justify-center gap-4 text-lg">
            <button
              onClick={() => handleEdit(dept)}
              title="Edit"
              className="text-yellow-500 hover:text-yellow-600 transition"
            >
              <FaEdit />
            </button>
            <button
              onClick={() => handleDelete(dept.id)}
              title="Delete"
              className="text-red-600 hover:text-red-700 transition"
            >
              <FaTrash />
            </button>
          </div>
        </td>
      </tr>
    ))}
    {filteredDepartments.length === 0 && (
      <tr>
        <td
          colSpan={3}
          className="px-4 py-6 text-center text-gray-500 dark:text-gray-400"
        >
          No departments found.
        </td>
      </tr>
    )}
  </tbody>
</table>

      </div>

      <Modal
        isOpen={modalOpen}
        title={editDepartment ? "Edit Department" : "Add Department"}
        onClose={() => setModalOpen(false)}
      >
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const formData = new FormData(e.currentTarget);
            const name = formData.get("department")?.toString() || "";
            const newDept: Department = {
              id: editDepartment?.id || Date.now().toString(),
              department: name,
            };
            handleSave(newDept);
          }}
          className="space-y-4"
        >
          <input
            name="department"
            defaultValue={editDepartment?.department || ""}
            placeholder="Department Name"
            className="w-full px-4 py-2 border rounded-md"
            required
          />
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={() => setModalOpen(false)}
              className="px-4 py-2 text-sm bg-gray-300 rounded hover:bg-gray-400"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Save
            </button>
          </div>
        </form>
      </Modal>
    </section>
  );
};

export default DepartmentPage;
