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

function init(){
    
    return inquirer 
        .prompt(initialQuestion)
        .then((response) => {
            console.log(response);
            switch(response.action){
                case "View all Employees":
                    console.log("Employees Listed");
                    getTable("SELECT employees.id, employees.first_name, employees.last_name, roles.title, departments.name_ AS department, roles.salary FROM employees, roles, departments WHERE departments.id = roles.department_id AND roles.id = employees.role_id ORDER BY employees.id ASC");
                    break;
                case "View All Roles":
                    console.log("Roles Listed");
                    getTable("SELECT roles.id, roles.title, departments.name_ AS department From roles INNER JOIN departments ON roles.department_id = department_id"); 
                    break;
                case "View All Departments":
                    console.log("Departments Listed");
                    getTable('SELECT departments.id AS id, departments.name_ AS department FROM departments');            
                    break;
                case "Add Employee":
                    console.log("Adding Employee");
                    addColum(`INSERT INTO employee(first_name, last_name)`,[body.first_name, body.last_name]);
                    break;
                case "Add Role":
                    console.log("Adding Role");
                    addColum(`INSERT INTO roles(title, salary)`, [body.title, body.salary]);
                    break;
                case "Add Department":
                    console.log("Adding Department");
                    addColum(`INSERT INTO department(name)`, [body.title]);
                    break;
                case "Update Employee Role":
                    console.log("Employee's Role Updating");
                    updateColum('UPDATE roles SET role = ? WHERE id = ?', [req.body.role, req.params.id]);
                    break;
                default:
                    break;
            }
        })
}

function getTable(sql){
    db.query(sql, (err, rows) => {
        if(err){
            throw err;
        }
        console.log("--------------------------------------");
        // console.log("List of Departments:\n");
        console.log(rows);
        return rows
    })
    init();
}

function addColum(sql, params){
    db.query(sql, params, (err, rows) => {
        if(err){
            res.status(500).jason({err: err.message});
            return;
        }
        console.log(param);
        return 
    })
    init();
}

function updateColum(sql, params){
    db.query(sql, params,(err, result) => {
        if (err) {
            res.status(400).json({ error: err.message });
        } else if (!result.affectedRows) {
            res.json({
              message: 'Employee not found'
            });
        } else {
            res.json({
              message: 'success',
              data: req.body,
              changes: result.affectedRows
            });
        }
    })
    init();
}
console.log("--------------------------------------");
console.log("|     EMPLOYEE MANAGEMENT SYSTEM     |");
console.log("--------------------------------------");
init();