const express = require("express");
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

// view all Employees
app.get('/api/employees', (req, res) => {
    const sql = `SELECT * FROM Employee_db`
    db.query(sql, (err, rows) => {
        if(err){
            res.status(500).jason({err: err.message});
            return;
        }
        res.json({
            message: 'success',
            data: rows
        });
    })
})

// View All Roles
app.get('/api/roles', (req, res) => {
    const sql = `SELECT * FROM roles_db`
    db.query(sql, (err, rows) => {
        if(err){
            res.status(500).jason({err: err.message});
            return;
        }
        res.json({
            message: 'success',
            data: rows
        });
    })
})
// view all departments
app.get('/api/deparments', (req, res) => {
    const sql = `SELECT * FROM deparments_db`
    db.query(sql, (err, rows) => {
        if(err){
            res.status(500).jason({err: err.message});
            return;
        }
        res.json({
            message: 'success',
            data: rows
        });
    })
})

// Add Employee
app.post('/api/new-employee', ({body}, res) => {
    const sql = `INSERT INTO employee(first_name, last_name)`;
    const params = [body.first_name, body.last_name];
    db.query(sql, params, (err, rows) => {
        if(err){
            res.status(500).jason({err: err.message});
            return;
        }
        res.json({
            message: 'success',
            data: body
        });
    })
})

//  Add Role
app.post('/api/new-role', ({body}, res) => {
    const sql = `INSERT INTO roles(title, salary)`
    const params = [body.title, body.salary];
    db.query(sql, params,(err, rows) => {
        if(err){
            res.status(500).jason({err: err.message});
            return;
        }
        res.json({
            message: 'success',
            data: body
        });
    })     
})

//add department
app.post('/api/new-department', ({body}, res) => {
    const sql = `INSERT INTO department(name)`
    const params = [body.title];
    db.query(sql, params, (err, rows) => {
        if(err){
            res.status(500).jason({err: err.message});
            return;
        }
        res.json({
            message: 'success',
            data: body
        });
    })      
})

// Update Employee Role
app.put('/api/', (req, res) => {
    db.query(sql, (err, rows) => {
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
})

