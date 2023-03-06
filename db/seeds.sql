INSERT INTO departments (name_)
VALUES  ("Sales"),
        ("Marketing"),
        ("Finance"),
        ("Egineering"),
        ("Legal");

INSERT INTO roles(department_id, title, salary)
VALUES  (1, "Sales Lead", 100000),
        (2, "Salesperson", 80000),
        (3, "Lead Engineer", 150000),
        (4, "Software Engineer",20000),
        (5, "Account Manager", 160000),
        (6, "Accountant", 125000),
        (7, "Legal Team Lead", 250000),
        (8, "Lawyer", 190000);
        

INSERT INTO employees(role_id, first_name, last_name, manager_id)
VALUES  (1, "John", "Doe"),
        (2, "Mike", "Chan"),
        (3, "Ashely", "Rodriguez"),
        (4, "Kevin", "Tupik"),
        (5, "Kunal", "Singh"),
        (6, "Malina", "Brown"),
        (7, "Sarah", "Lourd"),
        (8, "Tom", "Allen");
