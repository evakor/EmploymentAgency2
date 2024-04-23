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
        email, password, companyName, companyDesc, profilePicturePath
    } = req.body;
    try {
        const result = await database.query(
            `UPDATE "${tableName}" SET "firstName" = $1, "lastName" = $2, "region" = $3, "address" = $4, "phone1" = $5, "phone2" = $6, "email" = $7, "password" = $8, "companyName" = $9, "companyDesc" = $10, "profilePicturePath" = $11 WHERE "id" = $13 RETURNING *`,
            [firstName, lastName, region, address, phone1, phone2, email, password, companyName, companyDesc, profilePicturePath, id]
        );
        res.status(200).json(result.rows[0]);
    } catch (error) {
        console.error("Error in updateById method:", error);
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