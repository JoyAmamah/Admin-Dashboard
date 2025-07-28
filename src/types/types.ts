import { type JSX } from 'react';

const Types = () => {
  return null; 
};

export type Employee = {
  id: string;
  data: Employee[], 
  filename: string
  name: string;
  department: string;
  role: string;
  contractType: "permanent" | "contract" | "intern";
  supervisor: string;
  hireDate: string;
  phone: string;
  email: string;
  emergencyContact: string;
};

export type CardData = {
  title: string;
  value: number;
  icon: JSX.Element;
  description?: string;
  color?: string;
  hoverColor?: string;
};
export type entry = {
  label: string;
  value: number;
};

export type ModalProps = {
  isOpen: boolean;
  title: string;
  onClose: () => void;
  children: React.ReactNode;
};



export type Department = {
  id: string;
   hireDate?: string;
  name?: string;
  description?: string;
  department: string;
};

export type Status = 'Active' | 'Inactive' | 'Terminated';
export type ContractType = 'Permanent' | 'Contract' | 'Intern';

export default Types;
