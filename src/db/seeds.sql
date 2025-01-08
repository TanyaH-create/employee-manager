8-- seed data for department
INSERT INTO department (name)  
VALUES ('Engineering'),
       ('Finance'),
       ('Human Resources'),
       ('Sales');
       
-- seed data for roles
INSERT INTO role (title, salary, department_id)
VALUES ('Software Engineer',68000, 1),
       ('HR Specialist', 60000, 3),
       ('Sales Associate', 50000, 4),
       ('Parts Specialist', 40000, 4),
       ('Finanace Director', 150000, 2),
       ('Senior Software Engineer', 95000, 1),
       ('Controller', 80000, 2),
       ('Benifits Manager', 60000, 3);

       -- seed data for employee
 INSERT INTO employee (first_name, last_name, role_id, manager_id)
 VALUES ('Jane', 'Smith', 1, 4), 
        ('Jame', 'Peach', 7, 3),
        ('Linda', 'Jones', 5, NULL),
        ('Bob', 'Builder', 6, NULL);

       
