export interface Employee {
  employeeid?: string;
  employeecode: string;
  name: string;
  department: string;
  status: 'Active' | 'Inactive';
}