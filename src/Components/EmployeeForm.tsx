import { useState, useEffect } from "react";
import type { Employee } from "../types/Types";

type Props = {
  onSubmit: (employee: Employee) => void;
  initialData?: Employee | null;
};

const defaultForm: Employee = {
  id: "",
  name: "",
  department: "",
  role: "",
  contractType: "permanent",
  supervisor: "",
  hireDate: "",
  phone: "",
  email: "",
  emergencyContact: "",
};

const EmployeeForm: React.FC<Props> = ({ onSubmit, initialData }) => {
  const [form, setForm] = useState<Employee>(defaultForm);

  useEffect(() => {
    if (initialData) setForm(initialData);
  }, [initialData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ ...form, id: form.id || Date.now().toString() });
    setForm(defaultForm);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
          className="px-4 py-2 border border-gray-300 rounded w-full"
        />
        <input
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className="px-4 py-2 border border-gray-300 rounded w-full"
        />
        <input
          name="phone"
          placeholder="Phone"
          value={form.phone}
          onChange={handleChange}
          className="px-4 py-2 border border-gray-300 rounded w-full"
        />
        <input
          name="hireDate"
          type="date"
          placeholder="Hire Date"
          value={form.hireDate}
          onChange={handleChange}
          className="px-4 py-2 border border-gray-300 rounded w-full"
        />
        <input
          name="role"
          placeholder="Role"
          value={form.role}
          onChange={handleChange}
          className="px-4 py-2 border border-gray-300 rounded w-full"
        />
        <input
          name="department"
          placeholder="Department"
          value={form.department}
          onChange={handleChange}
          className="px-4 py-2 border border-gray-300 rounded w-full"
        />
        <input
          name="supervisor"
          placeholder="Supervisor"
          value={form.supervisor}
          onChange={handleChange}
          className="px-4 py-2 border border-gray-300 rounded w-full"
        />
        <input
          name="emergencyContact"
          placeholder="Emergency Contact"
          value={form.emergencyContact}
          onChange={handleChange}
          className="px-4 py-2 border border-gray-300 rounded w-full"
        />

        <select
          name="contractType"
          value={form.contractType}
          onChange={handleChange}
          className="px-4 py-2 border border-gray-300 rounded w-full md:col-span-2"
        >
          <option value="permanent">Permanent</option>
          <option value="contract">Contract</option>
          <option value="intern">Intern</option>
        </select>
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-2 rounded shadow"
        >
          {form.id ? "Update" : "Add"} Employee
        </button>
      </div>
    </form>
  );
};

export default EmployeeForm;
