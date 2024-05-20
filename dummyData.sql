-- Insert data into the EMPLOYEE table
INSERT INTO "EMPLOYEE" ("id", "firstName", "lastName", "region", "address", "phone1", "phone2", "email", "password", "occupation", "specialty", "profilePicturePath", "cvPath")
VALUES 
(100, 'DUMMY John', 'Doe', 'North', '1234 North St', 1234567890, 9876543210, 'john.doe@example.com', '$2a$10$qtUFFgiJ0XqE2Ml.gq8dCumyNhVtZH9oaEPTgOjAffkvL9I4lgonO', 'Engineer', 'Software', '/images/john.jpg', '/docs/john_cv.pdf');

INSERT INTO "EMPLOYEE" ("id", "firstName", "lastName", "region", "address", "phone1", "phone2", "email", "password", "occupation", "specialty", "profilePicturePath", "cvPath")
VALUES 
(101, 'DUMMY Jane', 'Smith', 'East', '5678 East Ave', 2345678901, 8765432190, 'jane.smith@example.com', '$2a$10$qtUFFgiJ0XqE2Ml.gq8dCumyNhVtZH9oaEPTgOjAffkvL9I4lgonO', 'Designer', 'Graphic', '/images/jane.jpg', '/docs/jane_cv.pdf');

INSERT INTO "EMPLOYEE" ("id", "firstName", "lastName", "region", "address", "phone1", "phone2", "email", "password", "occupation", "specialty", "profilePicturePath", "cvPath")
VALUES 
(102, 'DUMMY Alice', 'Johnson', 'South', '9101 South Dr', 3456789012, 7654321980, 'alice.johnson@example.com', '$2a$10$qtUFFgiJ0XqE2Ml.gq8dCumyNhVtZH9oaEPTgOjAffkvL9I4lgonO', 'Analyst', 'Data', '/images/alice.jpg', '/docs/alice_cv.pdf');

-- Insert data into the EMPLOYER table
INSERT INTO "EMPLOYER" ("id", "firstName", "lastName", "region", "address", "phone1", "phone2", "email", "password", "companyName", "companyDesc", "profilePicturePath")
VALUES 
(103, 'DUMMY Bob', 'Brown', 'West', '2345 West Blvd', 4567890123, 6543219870, 'bob.brown@example.com', '$2a$10$qtUFFgiJ0XqE2Ml.gq8dCumyNhVtZH9oaEPTgOjAffkvL9I4lgonO', 'BobTech', 'Technology solutions provider.', '/images/bob.jpg');

INSERT INTO "EMPLOYER" ("id", "firstName", "lastName", "region", "address", "phone1", "phone2", "email", "password", "companyName", "companyDesc", "profilePicturePath")
VALUES 
(104, 'DUMMY Lisa', 'White', 'Central', '6789 Center Cir', 5678901234, 5432198760, 'lisa.white@example.com', '$2a$10$qtUFFgiJ0XqE2Ml.gq8dCumyNhVtZH9oaEPTgOjAffkvL9I4lgonO', 'White Designs', 'Interior and graphic design services.', '/images/lisa.jpg');

INSERT INTO "EMPLOYER" ("id", "firstName", "lastName", "region", "address", "phone1", "phone2", "email", "password", "companyName", "companyDesc", "profilePicturePath")
VALUES 
(105, 'DUMMY Gary', 'Green', 'North-East', '0123 Northeast Path', 6789012345, 4321987650, 'gary.green@example.com', '$2a$10$qtUFFgiJ0XqE2Ml.gq8dCumyNhVtZH9oaEPTgOjAffkvL9I4lgonO', 'Green Gardens', 'Landscape and garden design.', '/images/gary.jpg');

-- Insert data into the JOB table
INSERT INTO "JOB" ("id", "imagePath", "description", "title", "extendedDescr", "duration", "companyName", "occupation", "specialty","region")
VALUES 
(106, 'static/job_profile.jpg', 'Developer needed for a full-stack position.', 'DUMMY Full Stack Developer', 'Responsible for developing both client and server software.', 10, 'Tech Innovations', 'Software Development', 'Backend Development','Aetolia-Acarnania');

INSERT INTO "JOB" ("id", "imagePath", "description", "title", "extendedDescr", "duration", "companyName", "occupation", "specialty","region")
VALUES 
(107, 'static/job_profile.jpg', 'Seeking a seasoned Data Scientist.', 'DUMMY Data Scientist', 'Work on complex datasets to bring insights.', 10, 'Data Wizards', 'Nursing', 'Pediatric Nursing','Chania');

INSERT INTO "JOB" ("id", "imagePath", "description", "title", "extendedDescr", "duration", "companyName", "occupation", "specialty","region")
VALUES 
(108, 'static/job_profile.jpg', 'Marketing professional needed to lead our campaigns.', 'DUMMY Marketing Director', 'Lead and enhance marketing strategies for our company.', 10, 'Creative Solutions', 'Civil Engineering', 'Transportation Engine','Kavala');

INSERT INTO "JOB" ("id", "imagePath", "description", "title", "extendedDescr", "duration", "companyName", "occupation", "specialty","region")
VALUES 
(109, 'static/job_profile.jpg', 'Product Manager to oversee product lifecycles.', 'DUMMY Product Manager', 'Manage the development and strategy for our products.', 10, 'Product Pros', 'Accounting', 'Management Accounting','Thessaloniki');

INSERT INTO "JOB" ("id", "imagePath", "description", "title", "extendedDescr", "duration", "companyName", "occupation", "specialty","region")
VALUES 
(110, 'static/job_profile.jpg', 'HR Consultant for workplace development.', 'DUMMY HR Consultant', 'Improve HR practices and employee relations.', 10, 'HR Core', 'Administration', 'School Administration','Xanthi');

INSERT INTO "JOB" ("id", "imagePath", "description", "title", "extendedDescr", "duration", "companyName", "occupation", "specialty","region")
VALUES 
(111, 'static/job_profile.jpg', 'HR Consultant for workplace development.', 'DUMMY HR Consultant', 'Improve HR practices and employee relations.', 10, 'HR Core', 'Administration', 'School Administration','Thessaloniki');

-- Insert data into the Submits table
INSERT INTO "Submits" ("employerId", "jobId", "creationDate")
VALUES 
(103, 106, '2023-10-01'),
(104, 107, '2023-10-02'),
(103, 108, '2023-10-03'),
(105, 109, '2023-10-04'),
(105, 110, '2023-10-05');

-- Insert data into the Applies table
INSERT INTO "Applies" ("employeeId", "jobId", "applicationDate")
VALUES 
(100, 106, '2023-10-06'),
(100, 107, '2023-10-07'),
(101, 108, '2023-10-08'),
(102, 109, '2023-10-09'),
(101, 110, '2023-10-10');
