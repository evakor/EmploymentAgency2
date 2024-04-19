
# RESTful api guide in Javascript

This is a quick guide to build a RESTful api in Javascript with Postgres DB


## Database setup

Before implementing the rest api, we need to setup Postgres. This is the SQL code we need to run in order to setup our database schema:

```sql
CREATE TABLE IF NOT EXISTS "USER" (
	"id" integer,
	"firstName" string,
	"lastName" string,
	"email" string,
	PRIMARY KEY ("id")
);

CREATE TABLE IF NOT EXISTS "EMPLOYER" (
	"id" integer,
	"companyName" string,
	PRIMARY KEY ("id"),
	FOREIGN KEY ("id") REFERENCES "USER" ("id")
            ON UPDATE RESTRICT
            ON DELETE RESTRICT
);

CREATE TABLE IF NOT EXISTS "EMPLOYEE" (
	"id" integer,
	"cvPath" string,
	PRIMARY KEY ("id"),
	FOREIGN KEY ("id") REFERENCES "USER" ("id")
            ON UPDATE RESTRICT
            ON DELETE RESTRICT
);

CREATE TABLE IF NOT EXISTS "SUBMITS" (
	"employerId" integer,
	"jobId" integer,
	"creationDate" date,
	PRIMARY KEY ("employerId", "jobId"),
	FOREIGN KEY ("employerId") REFERENCES "EMPLOYER" ("id")
            ON UPDATE RESTRICT
            ON DELETE RESTRICT,
	FOREIGN KEY ("jobId") REFERENCES "JOB" ("id")
            ON UPDATE RESTRICT
            ON DELETE RESTRICT
);

CREATE TABLE IF NOT EXISTS "APPLIES" (
	"employeeId" integer,
	"jobId" integer,
	PRIMARY KEY ("employeeId", "jobId"),
	FOREIGN KEY ("employeeId") REFERENCES "EMPLOYEE" ("id")
            ON UPDATE RESTRICT
            ON DELETE RESTRICT,
	FOREIGN KEY ("jobId") REFERENCES "JOB" ("id")
            ON UPDATE RESTRICT
            ON DELETE RESTRICT
);

CREATE TABLE IF NOT EXISTS "JOB" (
	"id" integer,
	"title" string,
	"ddescription" text,
	PRIMARY KEY ("id")
);


```


## Database connection (Repository)

Create a file named ```db.js```

```javascript
const { Pool } = require('pg'); // Connect with postgres

const pool = new Pool({
    user: 'your_username',
    host: 'localhost',
    database: 'your_database_name',
    password: 'your_password',
    port: 5432,
});

module.exports = pool;

```


## Service

Create a file named ```controllers/userController.js```. Here we implement CRUD for User entity.

```javascript
const pool = require('../db'); // Connect with db

const getAllUsers = async (req, res) => {
    const result = await pool.query('SELECT * FROM "USER"');
    res.json(result.rows);
};

const getUserById = async (req, res) => {
    const { id } = req.params;
    const result = await pool.query('SELECT * FROM "USER" WHERE id = $1', [id]);
    res.json(result.rows[0]);
};

const createUser = async (req, res) => {
    const { firstName, lastName, email } = req.body;
    const result = await pool.query('INSERT INTO "USER" (firstName, lastName, email) VALUES ($1, $2, $3) RETURNING *', [firstName, lastName, email]);
    res.json(result.rows[0]);
};

const updateUser = async (req, res) => {
    const { id } = req.params;
    const { firstName, lastName, email } = req.body;
    const result = await pool.query('UPDATE "USER" SET firstName = $1, lastName = $2, email = $3 WHERE id = $4 RETURNING *', [firstName, lastName, email, id]);
    res.json(result.rows[0]);
};

const deleteUser = async (req, res) => {
    const { id } = req.params;
    await pool.query('DELETE FROM "USER" WHERE id = $1', [id]);
    res.status(204).send();
};

module.exports = {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
};

```

## Controller

Create a file named ```routes/userRoutes.js```. Here we import all the methods created in the service script and match them with their corresponding endpoints.

```javascript
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Get all users
router.get('/', userController.getAllUsers);

// Get a single user by ID
router.get('/:id', userController.getUserById);

// Create a new user
router.post('/', userController.createUser);

// Update a user
router.put('/:id', userController.updateUser);

// Delete a user
router.delete('/:id', userController.deleteUser);

module.exports = router;

```

## Server

Create a file named ```server.js```. This script initializes the server and exposes our endpoints.

```javascript
const express = require('express');
const app = express();
const userRoutes = require('./routes/userRoutes');
const employerRoutes = require('./routes/employerRoutes');
const employeeRoutes = require('./routes/employeeRoutes');
const jobRoutes = require('./routes/jobRoutes');
const bodyParser = require('body-parser');

app.use(bodyParser.json());

// Routes
app.use('/api/users', userRoutes);
app.use('/api/employers', employerRoutes);
app.use('/api/employees', employeeRoutes);
app.use('/api/jobs', jobRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

```