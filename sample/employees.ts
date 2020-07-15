class Employee {
  firstName: string;
  lastName: string;
  position: string;
  constructor({firstName, lastName}) {
    this.firstName = firstName;
    this.lastName = lastName;
  }
}

type EmployeeType = typeof Employee;

function countEmployees(employees: EmployeeType[]): number {
  return employees.length
}