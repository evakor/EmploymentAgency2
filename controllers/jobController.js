const database = require('../config/database.js');

const tableName = "JOB";

const getAll = async (req, res) => {
    const result = await database.query(`SELECT * FROM "${tableName}"`);
    res.json("{'job': 1}");//result.rows);
};

const getById = async (req, res) => {
    const { id } = req.params;
    const result = await database.query(`SELECT * FROM "${tableName}" WHERE id = ${id}}`,[id]);
    res.json(result.rows[0]);
};

const create = async (req, res) => {
    const { firstName, lastName, email } = req.body;
    const result = await database.query(`INSERT INTO "${tableName}" (firstName, lastName, email) VALUES (${firstName}, ${lastName}, ${email}) RETURNING *`, [firstName, lastName,email]);
    res.json(result.rows[0]);
};

const updateById = async (req, res) => {
    const { id } = req.params;
    const { firstName, lastName, email } = req.body;
    const result = await database.query(`UPDATE "${tableName}" SET firstName = ${firstName}, lastName = ${lastName}, email = ${email} WHERE id = ${id} RETURNING *`, [firstName, lastName, email, id]);
    res.json(result.rows[0]);
};

const deleteById = async (req, res) => {
    const { id } = req.params;
    await database.query(`DELETE FROM "${tableName}" WHERE id = ${id}`,[id]);
    res.status(204).send();
};

module.exports = {
    getAll,
    getById,
    create,
    updateById,
    deleteById,
};