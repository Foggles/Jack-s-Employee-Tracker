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

        connection.connect((connectionError) => {
            if (connectionError) {
                throw connectionError;
            }
            else if (response.initialChoice === "Add Employee") {
                console.log(1);

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
                            connection.end();
                        });
                    });

            }
            else if (response.initialChoice === "Add Department") {
                console.log(2);

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
                            connection.end();
                        });
                    });

            }
            else if (response.initialChoice === "Add Role") {
                console.log(3);

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
                            connection.end();
                        });
                    });

            }
            else if (response.initialChoice === "View Employees") {
                console.log(4);

            }
            else if (response.initialChoice === "View Departments") {
                console.log(5);

            }
            else if (response.initialChoice === "View Roles") {
                console.log(6);

            }
            else if (response.initialChoice === "Update Employee Roles") {
                console.log(7);

            }
        })


    });