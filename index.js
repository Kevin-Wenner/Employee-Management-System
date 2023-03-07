const express = require("express");
const inquirer = require("inquirer");
const mysql = require("mysql2");
const PORT = process.env.PORT ||3001;
const app = express();

app.use(express.urlencoded({exteded: false}));
app.use(express.json());

app.use((req, res) => {
    res.status(404).end();
  });
  
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });

const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'BankPW@1234',
        database: 'employee_db'
    },
    console.log("Connected to employee_db database")
);

const initialQuestion = [
    {
        type: "list",
        name: "action",
        massage: "What would you like to do?",
        choices: ["View all Employees", "View All Roles", "View All Departments", "Add Employee", "Add Role", "Add Department", "Update Employee Role"]
    }
]

const employeeQuestions = [
    {
        type: "input",
        name: "fist_name",
        massage: "Enter Employee's first name"
    },
    {
        type: "input",
        name: "last_name",
        message: "Enter Employee's last name"
    },
    {
        type: "list",
        name: "role",
        message: "Select and role",
        choices: ["Sales Lead", "Salesperson", "Lead engineer", "Software Engineer", "Account Manager", "Accountant", "Legal Team Lead", "Lawyer"]
    },
    {
        type: "input",
        name: "manager",
        message: "Enter Employee's Manager id"
    }
];

const roleQuestions = [
    {
        type: "input",
        name: "title",
        message: "Enter the new roles title"
    },
    {
        type: "input",
        name: "salary",
        message: "Enter the new roles title"
    },
    {
        type: "list",
        name: "dpartment_id",
        message: "Select the roles corisponding department",
        choices: ["Sales", "Marketing", "Fiance", "Egineering"]
    },
];

const departmentQuestions = [
    {
        type: "input",
        name: "name",
        message: "Enter the new Department name"
    }
];

const RoleUpdateQuestions = [

]
function init(){
    
    return inquirer 
        .prompt(initialQuestion)
        .then((response) => {
            console.log(response);
            switch(response.action){
                case "View all Employees":
                    getTable("SELECT employees.id, employees.first_name, employees.last_name, roles.title, departments.name_ AS department, roles.salary FROM employees, roles, departments WHERE departments.id = roles.department_id AND roles.id = employees.role_id ORDER BY employees.id ASC", "Employees");
                    break;
                case "View All Roles":
                    getTable("SELECT roles.id, roles.title, departments.name_ AS department From roles INNER JOIN departments ON roles.department_id = department_id", "Roles"); 
                    break;
                case "View All Departments":
                    getTable('SELECT departments.id AS id, departments.name_ AS department FROM departments', "Departments");            
                    break;
                case "Add Employee":
                    addColum(`INSERT INTO employee(first_name, last_name, roles_id, manager_id)`, employeeQuestions);
                    break;
                case "Add Role":
                    addColum(`INSERT INTO roles(title, salary)`, roleQuestions);
                    break;
                case "Add Department":
                    addColum(`INSERT INTO department(name)`, departmentQuestions);
                    break;
                case "Update Employee Role":
                    updateColum('UPDATE roles SET role = ? WHERE id = ?', RoleUpdateQuestions);
                    break;
                default:
                    break;
            }
        })
}

function getTable(sql, table){
    db.query(sql, (err, rows) => {
        if(err){
            throw err;
        }
        console.log("\n--------------------------------------");
        console.log(`List of ${table}:\n`);
        console.table(rows);
    })
    console.log("--------------------------------------");
    init();
}

function addColum(sql, questions){
    return inquirer
    .prompt(questions)
        .then((response) => {
            // make an obj that can pass KVP to query
            
            switch (sql) {
                case `INSERT INTO employees(first_name, last_name, roles_id, manager_id)`:
                    sql += " VALUES (?, ?, ?, ?)";
                    temp.push(response.first_name, response.last_name, response.role, response.manager);
                    view = "SELECT employees.id, employees.first_name, employees.last_name, roles.title, departments.name_ AS department, roles.salary FROM employees, roles, departments WHERE departments.id = roles.department_id AND roles.id = employees.role_id ORDER BY employees.id ASC";
                    table = "Employees"
                    break;
                case `INSERT INTO roles(title, salary)`:
                    sql += " VALUES (?, ? , ?)";
                    temp.push(response.title, response.salary, response.deparment_id);
                    view = "SELECT roles.id, roles.title, departments.name_ AS department From roles INNER JOIN departments ON roles.department_id = department_id";
                    table = "Roles"
                    break;
                case `INSERT INTO departments(name)`:
                    sql += " VALUES (?)";
                    temp.push(response.name);
                    view = 'SELECT departments.id AS id, departments.name_ AS department FROM departments';
                    table = "Department"
                    break;
                default:
                    break;
            }         
            db.query(sql, temp, (err, data)=>{
                console.log(sql);
                console.log(temp);
                if (err) {
                    throw err;
                } 
            console.log("Employee successfully added");
            getTable(view, table);
            })
        })
    init();
}

function updateColum(sql, questions){
    db.query(sql, params,(err, result) => {
        if (err) {
            throw err;
        } else if (!result.affectedRows) {
            console.log("Employee not found");
        } else {
            
        }
    })
    init();
}
console.log("--------------------------------------");
console.log("|     EMPLOYEE MANAGEMENT SYSTEM     |");
console.log("--------------------------------------");
init();