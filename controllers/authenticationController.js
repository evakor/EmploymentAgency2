const database = require('../config/database.js');

const getUserByEmailAndPassword = async (req, res) => {
    const { email, password } = req.query;
    
    try {
        const employeeResult = await database.query(`SELECT * FROM "EMPLOYEE" WHERE "email" = $1 AND "password" = $2`, [email, password]);
        const employerResult = await database.query(`SELECT * FROM "EMPLOYER" WHERE "email" = $1 AND "password" = $2`, [email, password]);
        if (employeeResult.rowCount > 0) {
            res.status(200).json({
                user: employeeResult.rows[0],
                userType: "employee"
            });
        } else if (employerResult.rowCount > 0) {
            res.status(200).json({
                user: employerResult.rows[0],
                userType: "employer"
            });
        } else {
            res.status(404).send("User with these credentials does not exist");
        }
    } catch (error) {
        console.error("Error in getUserByEmailAndPassword method:", error);
        res.status(500).send("Failed to get user by email and password");
    }

};

const getUserByEmail = async (req, res) => {
    const { email } = req.query;
    
    try {
        const employeeResult = await database.query(`SELECT * FROM "EMPLOYEE" WHERE "email" = $1`, [email]);
        const employerResult = await database.query(`SELECT * FROM "EMPLOYER" WHERE "email" = $1`, [email]);
        if (employeeResult.rowCount > 0) {
            res.status(200).json({
                user: employeeResult.rows[0],
                userType: "employee"
            });
        } else if (employerResult.rowCount > 0) {
            res.status(200).json({
                user: employerResult.rows[0],
                userType: "employer"
            });
        } else {
            res.status(205).send("User with these credentials does not exist");
        }
    } catch (error) {
        console.error("Error in getUserByEmail method:", error);
        res.status(500).send("Failed to get user by email");
    }

};


module.exports = {
    getUserByEmailAndPassword,
    getUserByEmail
};