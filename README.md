# Employee Manager

## Description
Employee Manager is a command-line application that allows business owners and managers to manage employee data, roles, and departments within their company. With this application, you can view, add, and update departments, roles, and employees, making it easier to organize and plan the workforce efficiently.

This application is built with Node.js, PostgreSQL, and the Inquirer package to create an interactive interface. The system provides a simple command-line interface (CLI) to interact with the database and manage data.

## Table of Contents
- [Features](#features)
- [Video Walkthrough](#video-walkthrough)
- [Installation](#installation)
- [Usage](#usage)
- [Database Schema](#database-schema)
- [Contributing](#contributing)
- [Technology Used](#technology-used)
- [Questions](#questions)


## Features

- View All Departments: Displays a table of all departments with their IDs and names.

- View All Roles: Displays a table of roles with job titles, salaries, and the departments they belong to.

 - View All Employees: Displays employee details, including first names, last names, roles, departments, and managers.

 - View Employees By Department: Displays a table of employees in a specified department.

 - View Employees By Manager: Displays a table of employees asscoiated with a specified manager.
    
 - Add or Delete a Department: Add a new department to the company or delete an existing department. Any roles and employees assigned to that department will automatically be deleted. 

 - Add or delete a Role: Add a new role, including title, salary, and department. Delete a role. Any employees assigned that role will also be deleted.

 - Add or delete an Employee: Add a new employee, including their first name, last name, role, and manager or delete an employee. 

 - Update Employee Role: Update the role and associated details assigned to an employee.

 - Update Employee Manager: Update the manager assigned to an employee.

 - Update Employee Role: Update the role assigned to an employee.

 - Total Salary by Department: Displays a table listing the total salaries of each department.

 ## Video Walkthrough
 -  [Video Walkthrough](https://drive.google.com/file/d/1A9OF5VKEh8UCRyl7rxp294oydKIAMIjz/view?usp=sharing)   


## Installation
1. Clone the repository to your local machine:
   ```bash
   git clone git@github.com:TanyaH-create/employee-manager.git
   ```

2. Navigate to the project directory 
   ```bash
   cd employee-manager
   ```

3. Install required dependencies:
   ```bash
   npm install
   ```

4. Set up PostgresSQL
  - Install PostgresSQL on your machine
    
  - Create a new database using the following commands:
    ```bash
    psql -U postgres
    \i schema.sql
    ```
  
  - Optional: Use the seeds.sql file to populate the database with initial data and run with the following command:
    ```bash
    \i seeds.sql
    ```

 - Create a .env file in the root project directory:
   ```bash
   DB_NAME=employee_db
   DB_USER=postgres or username
   DB_PASSWORD=(insert your password)
   ```

5. Navigate to the /dist directory and run application:
```bash
cd ./dist
node index.js
```

## Usage
1. After running the aplication, you will be presented with a menu of options. Use the arrow keys to scroll up and down through the menu and hit enter to make a selection.

![Header_Main_Menu](https://github.com/user-attachments/assets/789bcb7d-df67-4b5c-889b-3582d924b4f3)


2. You will be prompted to select actions and provide input based on your choices.
- For the viewing all departments, roles and employees, a table will be displayed:
     
![Viewing_Options_resized](https://github.com/user-attachments/assets/3eb7d96b-3bac-4303-899e-c2efe1239356)

- For viewing by department, you will be prompted for the name of the department:

![ViewEmployeesByDeaprtmentRaw](https://github.com/user-attachments/assets/ba55a504-d6a0-4111-99dd-d12391118343)

- For viewing by manager, you will be prompted for the employee id of the manager:

![ViewEmployeesByManagerRaw](https://github.com/user-attachments/assets/36cdc210-4fe0-441e-b9e4-d6de8f0b63d6)

- For adding a department, you will be prompted for the name of the department.  The department will be added to the table and a department id will be assigned:

![Add_department_prompt_raw](https://github.com/user-attachments/assets/0ab6c681-d690-4f04-90c4-d3cf9ee32bed)

- For adding a role, you will be prompted for the title, salary and the id for the department that role will be assigned to:

![Add_role_prompt_raw](https://github.com/user-attachments/assets/875f144f-111e-4023-b590-da92f3ed1a14)


- For adding an employee, you will be prompted for the first name, the last name, for the id of the role the new employee will be assigned to and the employee id of the manager that will be assigned to the employee (leave blank if no manager will be assigned to the employee)

![Add_employee_prompt_raw](https://github.com/user-attachments/assets/5be8c2dc-e835-4027-8e29-75813dc5d78a)

- For deleteing a department, role or employee you will be prompted for the id of the department, role or employee to be deleted.

  - Deleteing a department will delete all roles and employees assigned to that department. Deleteing a role will delete all employees assigned to that role. Use 'update employee role' to change the role of an employee from the department or role to be deleted. Assign a role that is associated with a different department.

![Delete_dept_raw](https://github.com/user-attachments/assets/8e9e8352-4ba1-4285-a3c8-0b67e889b39c)

![delet_role_raw](https://github.com/user-attachments/assets/1f20bb4a-1a70-490a-b09f-af11e700739e)

![Delete_employee_raw](https://github.com/user-attachments/assets/2a6e04e3-1860-4c0b-ac33-d4accdabf1f3)


- For updating employee role, you will be prompted for the employee's id and the id of their new role:

![UPdate_employee_raw](https://github.com/user-attachments/assets/d0b70e31-8cc8-4bd5-a93c-c3d65b6246e4)


- For updating employee manager, you will be prompted for the employee's id and the employee id of the new manager:

![Update_manager_raw](https://github.com/user-attachments/assets/5c502281-3f3e-4c4b-b2f1-eae0bc96ce03)

- Total salary by department will display a table listing the departments and the total salary of all employees in that department:

 ![TotalRaw](https://github.com/user-attachments/assets/ea045d2d-9fca-4201-ae3e-cc4976098d23)


## Database Schema

This application uses a PostgreSQL database with three tables: `department`, `role`, and `employee`.

### `department` Table

| Column Name | Data Type   | Constraints         | Description                    |
|-------------|-------------|---------------------|--------------------------------|
| `id`        | `SERIAL`    | PRIMARY KEY         | Auto-incrementing ID           |
| `name`      | `VARCHAR(30)` | UNIQUE, NOT NULL   | Name of the department         |

---

### `role` Table

| Column Name     | Data Type   | Constraints         | Description                                |
|------------------|-------------|---------------------|--------------------------------------------|
| `id`            | `SERIAL`    | PRIMARY KEY         | Auto-incrementing ID                       |
| `title`         | `VARCHAR(30)` | UNIQUE, NOT NULL   | Job title of the role                     |
| `salary`        | `DECIMAL`   | NOT NULL            | Salary for the role                       |
| `department_id` | `INTEGER`   | NOT NULL, FOREIGN KEY | References `department(id)`               |

---

### `employee` Table

| Column Name  | Data Type   | Constraints         | Description                                        |
|--------------|-------------|---------------------|----------------------------------------------------|
| `id`         | `SERIAL`    | PRIMARY KEY         | Auto-incrementing ID                               |
| `first_name` | `VARCHAR(30)` | NOT NULL          | Employee's first name                             |
| `last_name`  | `VARCHAR(30)` | NOT NULL          | Employee's last name                              |
| `role_id`    | `INTEGER`   | NOT NULL, FOREIGN KEY         | References `role(id)`                             |
| `manager_id` | `INTEGER`   | NULLABLE, FOREIGN KEY | References another employee's `id` as their manager |

## Contributing
Contributions are welcome! Please follow these steps:
1.	Fork the repository.
2.	Create a new branch for your feature or bug fix:
    ```bash
    git checkout -b feature-name
3.	Commit your changes:
    ```bash
    git commit -m "Add feature-name"
4.	Push your branch:
    ```bash
    git push origin feature-name
5.	Submit a pull request.

## Technology Used

- Node.js: JavaScript runtime for server-side deployment.
- PostgreSQL: Database to store employee, role and department data.
- Inquirer.js: CLI library to interact with user.
- pg: PostgreSQL client for Node.js to connect and query the database.

## Questions

 If you have any questions, feel free to contact me at dougtanyah@gmail.com.

 You can also find me on GitHub at [TanyaH-create](https://github.com/TanyaH-create).




 
