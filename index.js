const inquirer = require('inquirer');
const mysql = require('mysql');

const connectionConfig = {
    host: "localhost",
    port: 3306,
    user: "root",
    passwoord: "12345",
    database: "employees_db"
};

const connection = mysql.createConnection(connectionConfig);

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
                "Update Employee Roles"
            ],
        }
    ]).then((response) => {
        console.log(`You selected to ${response.initialChoice}`);
    });