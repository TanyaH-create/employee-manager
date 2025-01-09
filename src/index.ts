import inquirer from "inquirer";
import {pool} from './connection.js';
import queries from './db/queries.js';



// create main menu function - anonymous, will run right away
async function mainMenu() {
    //display the  main menu in the terminal
    // deconstruct action from prompt response (retrieve the user input)
    console.log ('.-----------------------------------------------------------------------------.')
    console.log ('|                                                                             |')
    console.log ('|                E M P L O Y E E     M A N A G E R                            |')
    console.log ('|                                                                             |')
    console.log ("'-----------------------------------------------------------------------------'")
    const {action} = await inquirer.prompt([

        {
            type: 'list',
            name: 'action',
            message: 'What would you like to do?',
            choices: [
                'View All Departments',
                'View All Roles',
                'View All Employees',
                'View Employees By Department',
                'View Employees By Manager',
                'Add Department',
                'Delete Department',
                'Add Role',
                'Delete Role',
                'Add Employee',
                'Delete Employee',
                'Update Employee Role',
                'Update Employee Manager',
                'Total Salary By Department',
                'Exit',
            ]
        }

    ]);
    // execute queries from queries.js based on choice  
    switch (action) {
        case 'View All Departments':
            await viewAllDepartments();
            break;
        case 'View All Roles':
            await viewAllRoles();
            break;
        case 'View All Employees':
            await viewAllEmployees();
            break;
        case 'View Employees By Department':
            await viewEmployeesByDepartment();
            break;
        case 'View Employees By Manager':
            await viewEmployeesByManager();
            break;   
        case 'Add Department':
            await addDepartment();
            break;
        case 'Delete Department':
            await deleteDepartment();
            break;  
        case 'Add Role':
            await addRole();
            break;
        case 'Delete Role':
            await deleteRole();
            break;            
        case 'Add Employee':
            await addEmployee();
            break;
        case 'Delete Employee':
            await deleteEmployee();
            break;  
        case 'Update Employee Role':
            await updateEmployeeRole();
            break;
        case 'Update Employee Manager':
            await updateEmployeeManager();
            break;
        case 'Total Salary By Department':
            await getTotalDeptSalary();
            break;
        default:
            console.log('Exiting Menu')
            //close the connection pool
            pool.end()
            process.exit();
    }
    //go back to main menu
    await mainMenu();
}

//
//call query SQL using the key set up in queries object
//copy into response variable then output to the console
async function viewAllDepartments() {
  try{
   const res = await pool.query(queries.getAllDepartments);
   //write row array of results to console in table form
   console.table(res.rows);
  } catch (error) {
   console.error('Error fetching departments:', error)
  }
}

async function viewAllRoles() {
  try {
    const res = await pool.query(queries.getAllRoles);
    console.table(res.rows);
   } catch (error) {
    console.error('Error fetching roles:', error)
   } 
}

async function viewAllEmployees() {
  try {
    const res = await pool.query(queries.getAllEmployees);
    console.table(res.rows);
   } catch (error) {
    console.error('Error fetching employees:', error)
   }   
}

async function viewEmployeesByDepartment() {
    const {name} = await inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: 'Enter the name of department:',
        },
    ]);
 try {
    const res = await pool.query(queries.getEmployeesByDepartment, [name]);
    if (res.rows.length > 0) {
    console.table(res.rows);
    } else {
        console.log('No employees found for the specified department.')
    }
    } catch (error) {
        console.error('Error fetching employees by department:', error);
    }
 }  

 async function viewEmployeesByManager() {
    const {id} = await inquirer.prompt([
        {
            type: 'input',
            name: 'id',
            message: "Enter the manager's employee id:",
        },
    ]);
 try {
    const res = await pool.query(queries.getEmployeesByManager, [id]);
    if (res.rows.length > 0) {
    console.table(res.rows);
    } else {
        console.log('No employees found for the specified manager.')
    }
    } catch (error) {
        console.error('Error fetching employees by manager:', error);
    }
 }  


async function addDepartment() {
  try {
    const {name} = await inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: 'Enter the name of the new department:',
        },
    ]);
    //add data from prompt in the placeholder
    await pool.query(queries.addDepartment,[name]);
    console.log(`Added ${name} to departments.`)
  } catch (error) {
    console.error('Error adding department:', error)
  }
}

async function deleteDepartment() {
  try {
    const {id} = await inquirer.prompt([
        {
            type: 'input',
            name: 'id',
            message: 'Enter the id of the department to delete:',
        },
    ]);
    //add data from prompt in the placeholder
    await pool.query(queries.deleteDepartment,[id]);
    console.log(`Deleted department.`)
  } catch (error) {
    console.error('Error deleting department:', error)
  }
}

async function addRole() {
  try {
    const {title, salary, departmentId} = await inquirer.prompt([
        {
            type: 'input',
            name: 'title',
            message: 'Enter the new role title:'
        },
        {
            type: 'input',
            name: 'salary',
            message: "Enter the new role's salary",
        },
        {
            type: 'input',
            name: 'departmentId',
            message: "Enter the new role's department ID",
        },    
    ]);
    await pool.query(queries.addRole, [title, salary, departmentId]);
    console.log(`Added ${title} role`);
  } catch (error) {
    console.error('Error adding role:', error)
  }
}

async function deleteRole() {
  try {
    const {id} = await inquirer.prompt([
        {
            type: 'input',
            name: 'id',
            message: 'Enter the id of the role to delete:',
        },
    ]);
    //add data from prompt in the placeholder
    await pool.query(queries.deleteRole,[id]);
    console.log(`Deleted role.`)
  } catch (error) {
    console.error('Error deleting role:', error)
  }
}


async function addEmployee() {
  try {
    const { firstName, lastName, roleId, managerId } = await inquirer.prompt([
        { 
            type: 'input', 
            name: 'firstName', 
            message: "Enter the employee's first name:" 
        },
        { 
            type: 'input', 
            name: 'lastName', 
            message: "Enter the employee's last name:" 
        },
        { 
            type: 'input', 
            name: 'roleId', 
            message: "Enter the employee's role ID:" },
        { 
            type: 'input', 
            name: 'managerId', 
            message: "Enter the manager's ID (if any):" },
      ]);
      await pool.query(queries.addEmployee, [firstName, lastName, roleId, managerId || null]);
      console.log(`Added ${firstName} ${lastName}.`);
  } catch (error) {
        console.error('Error adding employee:', error)
  }     
}

async function deleteEmployee() {
  try {
    const {id} = await inquirer.prompt([
        {
            type: 'input',
            name: 'id',
            message: 'Enter the id of the employee to delete:',
        },
    ]);
    //add data from prompt in the placeholder
    await pool.query(queries.deleteEmployee,[id]);
    console.log(`Deleted role.`)
  } catch (error) {
    console.error('Error deleting employee:', error)
  }
}

async function updateEmployeeRole() {
  try {
    const { employeeId, roleId } = await inquirer.prompt([
      { 
        type: 'input', 
        name: 'employeeId',
         message: "Enter the employee's ID:" 
      },
      { 
        type: 'input', 
        name: 'roleId', 
        message: "Enter the new role ID:" 
      },
    ]);
    await pool.query(queries.updateEmployeeRole, [roleId, employeeId]);
    console.log('Updated employee role.');
 } catch (error) {
    console.error('Error updating employee:', error)
 }        
  }

 async function updateEmployeeManager() {
    try {
      const { employeeId, managerId } = await inquirer.prompt([
        { 
          type: 'input', 
          name: 'employeeId',
           message: "Enter the employee's ID:" 
        },
        { 
          type: 'input', 
          name: 'managerId', 
          message: "Enter the employee id of the new manager:" 
        },
      ]);
      await pool.query(queries.updateEmployeeManager, [employeeId, managerId]);
      console.log('Updated employee manager.');
     } catch (error) {
      console.error('Error updating manager:', error)
     }        
    }

  async function getTotalDeptSalary() {
   try {
    const res = await pool.query(queries.getTotalDeptSalary);
    console.table(res.rows);
   } catch (error) {
     console.error('Error getting total salary:', error)
   }
}

  //run main menu function
  mainMenu();