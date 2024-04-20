const database = require('../config/database.js');

const tableName = "JOB";

const getAll = async (req, res) => {
    try {
        const result = await database.query(`SELECT * FROM "${tableName}"`);
        res.status(200).json(result.rows);
    } catch (error) {
        console.error('Error getting all jobs:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const getById = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await database.query(`SELECT * FROM "${tableName}" WHERE id = $1`, [id]);
        res.status(200).json(result.rows[0]);
    } catch (error) {
        console.error('Error getting job by ID:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const create = async (req, res) => {
    const { imagePath, description, title, extendedDescr, companyName, duration, occupation, specialty } = req.body;
    try {
        const result = await database.query(`INSERT INTO "${tableName}" ("imagePath", "description", "title", "extendedDescr", "companyName", "duration", "occupation", "specialty") VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`, [imagePath, description, title, extendedDescr, companyName, duration, occupation, specialty]);
        res.status(200).json(result.rows[0]);
    } catch (error) {
        console.error('Error creating job:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const updateById = async (req, res) => {
    const { id } = req.params;
    const { imagePath, description, title, extendedDescr, companyName, duration, occupation, specialty } = req.body;
    try {
        const result = await database.query(`UPDATE "${tableName}" SET "imagePath" = $1, "description" = $2, "title" = $3, "extendedDescr" = $4, "companyName" = $5, "duration" = $6, "occupation" = $7, "specialty" = $8 WHERE "id" = $9 RETURNING *`, [imagePath, description, title, extendedDescr, companyName, duration, occupation, specialty, id]);
        res.status(200).json(result.rows[0]);
    } catch (error) {
        console.error('Error updating job by ID:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const deleteById = async (req, res) => {
    const { id } = req.params;
    try {
        await database.query(`DELETE FROM "${tableName}" WHERE id = $1`, [id]);
        res.status(204).send();
    } catch (error) {
        console.error('Error deleting job by ID:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = {
    getAll,
    getById,
    create,
    updateById,
    deleteById,
};
