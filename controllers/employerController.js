const database = require('../config/database.js');

const tableName = "EMPLOYER";

const getAll = async (req, res) => {
    try {
        const result = await database.query(`SELECT * FROM "${tableName}"`);
        res.status(200).json(result.rows);
    } catch (error) {
        console.error("Error in getAll method:", error);
        res.status(500).send("Failed to get all employers");
    }

};

const getById = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await database.query(`SELECT * FROM "${tableName}" WHERE id = ${parseInt(id)}`);
        res.status(200).json(result.rows[0]);
    } catch (error) {
        console.error("Error in getById method:", error);
        res.status(500).send(`Failed to get employer by id ${id}`);
    }
};

const create = async (req, res) => {
    const {
        firstName, lastName, region, address, phone1, phone2,
        email, password, companyName, companyDesc, profilePicturePath
    } = req.body;
    try {
        const result = await database.query(
            `INSERT INTO "${tableName}" ("firstName", "lastName", "region", "address", "phone1", "phone2", "email", "password", "companyName", "companyDesc", "profilePicturePath") VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING *`,
            [firstName, lastName, region, address, phone1, phone2, email, password, companyName, companyDesc, profilePicturePath]
        );
        res.status(200).json(result.rows[0]);
    } catch (error) {
        console.error("Error in create method:", error);
        res.status(500).send("Failed to create employer");
    }
};

const updateById = async (req, res) => {
    const { id } = req.params;
    const {
        firstName, lastName, region, address, phone1, phone2,
        email, companyDesc
    } = req.body;

    // Create an array to hold the updates and another for the values
    let updates = [];
    let values = [];
    let paramCounter = 1;

    // Helper function to add a field to the update query if it exists
    const addUpdate = (field, value) => {
        if (value !== undefined && value !== null && value !== '') {
            updates.push(`"${field}" = $${paramCounter}`);
            values.push(value);
            paramCounter++;
        }
    };

    // Add the updates for each field
    addUpdate('firstName', firstName);
    addUpdate('lastName', lastName);
    addUpdate('region', region);
    addUpdate('address', address);
    addUpdate('phone1', phone1);
    addUpdate('phone2', phone2);
    addUpdate('email', email);
    addUpdate('companyDesc', companyDesc);

    // if (updates.length === 0) {
    //     return res.status(400).send('No fields to update');
    // }

    values.push(id); // Add id as the last parameter for the WHERE clause

    const updateQuery = `
        UPDATE "EMPLOYER"
        SET ${updates.join(', ')}
        WHERE "id" = $${paramCounter}
        RETURNING *`;

    try {
        const result = await database.query(updateQuery, values);
        if (result.rows.length === 0) {
            return res.status(404).send(`Employer with id ${id} not found`);
        }
        res.status(200).json(result.rows[0]);
    } catch (error) {
        console.error("Error in updateById method:");
        res.status(500).send(`Failed to update employer with id ${id}`);
    }
};



const deleteById = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await database.query(`DELETE FROM "${tableName}" WHERE id = ${id}`);
        res.status(204).send(`Succesfully deleted employer with id ${id}`);
    } catch (error) {
        console.error("Error in deleteById method:", error);
        res.status(500).send(`Failed to delete employer with id ${id}`);
    }
};

module.exports = {
    getAll,
    getById,
    create,
    updateById,
    deleteById,
};