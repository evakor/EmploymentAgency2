# Employement Agency &copy;

## Overview

This application is a web-based job application platform. It allows users to create profiles as either employees or employers, post and apply for jobs, and manage their job-related information. The application is built using the Express framework and utilizes a variety of libraries such as Axios for HTTP requests, bcryptjs for hashing passwords, multer for file uploads, and nodemailer for sending emails.

## Features

- User authentication and session management.
- Profile management for employees and employers.
- Job posting and application submission.
- Email notifications for job applications.
- Upload and manage profile pictures and resumes.
- Filtering job listings by various criteria.

## Installation

1. **Clone the repository:**
   ```
   git clone https://github.com/evakor/EmploymentAgency2
   cd EmploymentAgency2
   ```

2. **Install dependencies:**
   ```
   npm install
   ```

3. **Environment Variables:**
   Create a ```.env``` file as follows:
   ```
   DB_USER=...
   DB_HOST=...
   DB_NAME=...
   DB_PASSWORD=...
   DB_PORT=...
   MAIL_USER=...
   MAIL_PASSWORD=...
   ```

4. **Start the application:**
   ```
   npm start
   ```
   The server will start running on http://localhost:3000 by default.

## Usage

- **Starting the Server:**
  Run `node app.js` to start the server. Access the web interface by navigating to `http://localhost:3000` in your web browser.

- **Navigating the Application:**
  - **Home Page:** Displays the latest jobs available.
  - **Login/Signup:** Authentication for users. Different forms for employee and employer signup.
  - **Employee/Employer Profiles:** Users can view and edit their profiles, upload pictures, and CVs.
  - **Job Listings:** Users can view all jobs or filter by category, region, etc.
  - **Apply for Jobs:** Employees can apply for jobs, and employers receive an email notification upon each application.
- **State Diagram**

  [EIKONA]

## API Endpoints

This application provides API endpoints to communicate with the database:

### Submissions
- **POST** `/v1/submition`: Create a new submission.
- **GET** `/v1/submition/:id`: Get a submission by ID.
- **GET** `/v1/submitions/byUserId/:id`: Get all submissions by user ID.
- **GET** `/v1/submitions`: Get all submissions.
- **PUT** `/v1/submition/:id`: Update a submission by ID.
- **DELETE** `/v1/submition/:id`: Delete a submission by ID.
- **GET** `/v1/submition/getEmployerEmail/:id`: Get employer email by job ID.

### Jobs
- **POST** `/v1/job`: Create a new job.
- **GET** `/v1/jobs`: Get all jobs.
- **GET** `/v1/jobs/latest`: Get the latest jobs.
- **GET** `/v1/jobs/getbyfilters`: Get jobs by filters.
- **GET** `/v1/job/:id`: Get a job by ID.
- **GET** `/v1/job/byEmployee/:id`: Get jobs by employee ID.
- **GET** `/v1/job/byEmployer/:id`: Get jobs by employer ID.
- **PUT** `/v1/job/:id`: Update a job by ID.
- **DELETE** `/v1/job/:id`: Delete a job by ID.

### Employers
- **POST** `/v1/employer`: Create a new employer.
- **GET** `/v1/employer/:id`: Get an employer by ID.
- **GET** `/v1/employers`: Get all employers.
- **PUT** `/v1/employer/:id`: Update an employer by ID.
- **DELETE** `/v1/employer/:id`: Delete an employer by ID.

### Employees
- **POST** `/v1/employee`: Create a new employee.
- **GET** `/v1/employee/:id`: Get an employee by ID.
- **GET** `/v1/employees`: Get all employees.
- **PUT** `/v1/employee/:id`: Update an employee by ID.
- **DELETE** `/v1/employee/:id`: Delete an employee by ID.

### Authentication
- **GET** `/v1/getUserByEmailAndPassword`: Authenticate user by email and password.
- **GET** `/v1/getUserByEmail`: Get user details by email.

### Applications
- **POST** `/v1/application`: Create a new application.
- **GET** `/v1/application/:id`: Get an application by ID.
- **GET** `/v1/application/byJobId/:id`: Get applicants by job ID.
- **GET** `/v1/application/byUserId/:id`: Get applications by user ID.
- **GET** `/v1/applications`: Get all applications.
- **PUT** `/v1/application/:id`: Update an application by ID.
- **DELETE** `/v1/application/:id`: Delete an application by ID.
- **GET** `/v1/application/count/byJobId/:id`: Count applications by job ID.

## Configuration

The app uses several libraries and middleware for various functionalities:
- **Express.js:** Core framework.
- **Axios:** For making HTTP requests.
- **Express-session:** For handling user sessions.
- **Multer:** For handling file uploads.
- **bcryptjs:** For hashing and checking passwords.
- **nodemailer:** For sending out email notifications.
- **express-handlebars:** Template engine for rendering views.

## Directory Structure
```
EmploymentAgency2
    ├── assets
    ├── config
    ├── models
    ├── controllers
    ├── views
    ├── routes
    ├── public
    ├── docker-compose.yml
    ├── dummyData.sql
    ├── node_modules
    ├── package-lock.json
    ├── package.json
    ├── server.js
    └── README.md
```

## License

This project is licensed under the MIT License. You are free to use, share, and modify this software, provided that you include proper attribution to the original authors in any publicized versions of the software or in any software derived from this project.


## Authors

**John Doe**
- **Email:** up1083829@upnet.gr
- **GitHub:** [evakor](https://github.com/evakor)

**Jane Smith**
- **Email:** up1083812@upnet.gr
- **GitHub:** [ChristosK17](https://github.com/ChristosK17)

