-- seed data for department
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
 VALUES ('Jane', 'Smith', 5, NULL), 
        ('James', 'Sullivan', 6, NULL),
        ('Linda', 'Jones', 1, 2),
        ('Bob', 'Kramer', 2, 9),
        ('David', 'Garcia', 4, NULL),
        ('Sarah', 'Brown', 1, 2),
        ('James', 'Anderson', 3, NULL),
        ('Ethan', 'Lee', 7, 1),
        ('Sophia', 'Thomas', 8, NULL)
   

       
