const inquirer = require('inquirer');
const mysql = require('mysql');

const connectionConfig = {
    host: "localhost",
    port: 3306,
    user: "root",
    password: "12345",
    database: "employees_db"
};

const connection = mysql.createConnection(connectionConfig);

// Function to add employee
function addEmployee() {
    inquirer
        .prompt([
            {
                type: "input",
                name: "first_name",
                message: "What is the employee's first name? (30 Characters)"
            },
            {
                type: "input",
                name: "last_name",
                message: "What is the employee's last name? (30 Characters)"
            },
            {
                type: "input",
                name: "role_id",
                message: "What is the employee's role id?"
            },
            {
                type: "input",
                name: "manager_id",
                message: "What is the employee's manager's id? Can be left blank if no manager."
            }
        ]).then((response) => {
            const asd = Object.keys(response).filter(k => response[k] !== '').reduce((res, key) => {
                res[key] = response[key];
                return res;
            }, {});

            console.log('AAD', asd)

            connection.query("INSERT INTO employee SET ?", asd, (queryErr, queryResponse) => {
                if (queryErr) {
                    throw queryErr;
                }
                console.log("Success");
                startMenu();
            });
        });
};

// Function to add department
function addDepartment() {
    inquirer
        .prompt([
            {
                type: "input",
                name: "id",
                message: "What is the department's id?"
            },
            {
                type: "input",
                name: "name",
                message: "What is the department's name? (30 Characters)"
            }
        ]).then((response) => {
            const asd = Object.keys(response).filter(k => response[k] !== '').reduce((res, key) => {
                res[key] = response[key];
                return res;
            }, {});

            console.log('AAD', asd)

            connection.query("INSERT INTO department SET ?", asd, (queryErr, queryResponse) => {
                if (queryErr) {
                    throw queryErr;
                }
                console.log("Success");
                startMenu();
            });
        });
};

// Function to add a role
function addRole() {
    inquirer
        .prompt([
            {
                type: "input",
                name: "id",
                message: "What is the role's id?"
            },
            {
                type: "input",
                name: "title",
                message: "What is the title of the role? (30 Characters)"
            },
            {
                type: "input",
                name: "salary",
                message: "What is the role's salary?"
            },
            {
                type: "input",
                name: "department_id",
                message: "What is the id of the department this role belongs to?"
            }
        ]).then((response) => {
            const asd = Object.keys(response).filter(k => response[k] !== '').reduce((res, key) => {
                res[key] = response[key];
                return res;
            }, {});

            console.log('AAD', asd)

            connection.query("INSERT INTO role SET ?", asd, (queryErr, queryResponse) => {
                if (queryErr) {
                    throw queryErr;
                }
                console.log("Success");
                startMenu();
            });
        });
};

// Function to view all current employees
function viewEmployees() {
    connection.query("SELECT * FROM employee", (queryErr, queryResponse) => {

        const employees = queryResponse;
        console.table(employees);
        startMenu();
    });
};

// Function to view all current departments
function viewDepartments() {
    connection.query("SELECT * FROM department", (queryErr, queryResponse) => {

        const departments = queryResponse;
        console.table(departments);
        startMenu();
    });
};

// Function to view all current roles
function viewRoles() {
    connection.query("SELECT * FROM role", (queryErr, queryResponse) => {

        const roles = queryResponse;
        console.table(roles);
        startMenu();
    });
};

// Function to view a table with current employees, departments and roles
function viewTable() {
    connection.query("SELECT employee.*, role.*, department.* FROM employee INNER JOIN role ON employee.role_id = role.id INNER JOIN department ON role.department_id = department.id", 
    (queryErr, queryResponse) => {
        if (queryErr) throw queryErr;
        const result = queryResponse;
        console.table(result);
        startMenu();
    })
};

// Function to update a specific employee's role 
function updateEmployeeRole(id) {
    connection.query("SELECT employee.* FROM employee WHERE id = ?",
    [id],
    (queryErr, queryResponse) => {
        if (queryErr) throw (queryErr);
        console.table(queryResponse);
        inquirer  
            .prompt([
                {
                    type: "input",
                    name: "role_id",
                    message: "What is the new Role ID for this employee?"
                }
            ]).then((response) => {
                // const asd = Object.keys(response).filter(k => response[k] !== '').reduce((res, key) => {
                //     res[key] = response[key];
                //     return res;
                // }, {});

                const newRoleId = response.role_id;
                const employeeId = id;

                connection.query("UPDATE employee SET role_id = ? WHERE employee.id = ?", [newRoleId, employeeId], (queryErr, queryResponse) => {
                    if (queryErr) throw queryErr;
                    console.log("Success");
                    startMenu();
                });
            })
    })
};

// Function that handles the menu to allow user to select options
function startMenu() {
    inquirer
        .prompt([
            {
                type: "list",
                name: "initialChoice",
                choices: [
                    "Add Employee",
                    "Add Department",
                    "Add Role",
                    "View Employees",
                    "View Departments",
                    "View Roles",
                    "View Combined Table",
                    "Update Employee Roles",
                    "Exit Menu"
                ],
            }
        ]).then((response) => {
            console.log(`You selected to ${response.initialChoice}`);

            // ! Removed .connect() & .end() functions outside of the "Exit Menu" response to fix "Cannot enqueue Query after invoking quit" error.
            // connection.connect((connectionError) => {
            // if (connectionError) {
            //     throw connectionError;
            // }
            if (response.initialChoice === "Add Employee") {
                console.log(1);

                addEmployee();
            }
            else if (response.initialChoice === "Add Department") {
                console.log(2);

                addDepartment();
            }
            else if (response.initialChoice === "Add Role") {
                console.log(3);

                addRole();
            }
            else if (response.initialChoice === "View Employees") {
                console.log(4);

                viewEmployees();
            }
            else if (response.initialChoice === "View Departments") {
                console.log(5);

                viewDepartments();
            }
            else if (response.initialChoice === "View Roles") {
                console.log(6);

                viewRoles();
            }
            else if (response.initialChoice === "View Combined Table") {
                console.log(7);

                viewTable();
            }
            else if (response.initialChoice === "Update Employee Roles") {
                console.log(8);

                inquirer
                    .prompt([
                        {
                            type: "input",
                            name: "selectedEmployeeId",
                            message: "What is the id of the employee who's role you want to update?"
                        }
                    ]).then((response) => {
                        id = response.selectedEmployeeId;
                        updateEmployeeRole(id);
                    })
            }
            else {
                connection.end();
            }
        });
};

startMenu();