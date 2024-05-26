const database = require('../config/database.js');

const tableName = "Submits";

const getAll = async (req, res) => {
    try {
        const result = await database.query(`SELECT * FROM "${tableName}"`);
        res.json(result.rows);
    } catch (error) {
        console.error('Error getting all submits:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const getById = async (req, res) => {
    const { employerId, jobId } = req.params;
    try {
        const result = await database.query(`SELECT * FROM "${tableName}" WHERE "employerId" = $1 AND "jobId" = $2`, [employerId, jobId]);
        res.json(result.rows[0] || null);
    } catch (error) {
        console.error('Error getting submit by IDs:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const getByUserId = async (req, res) => {
    const { employerId } = req.params;
    try {
        const result = await database.query(`SELECT * FROM "${tableName}" WHERE "employerId" = $1`, [employerId]);
        res.status(200).json(result.rows || null);
    } catch (error) {
        console.error('Error getting application by IDs:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const create = async (req, res) => {
    const { employerId, jobId } = req.body;
    try {
        const result = await database.query(`INSERT INTO "${tableName}" ("employerId", "jobId") VALUES ($1, $2) RETURNING *`, [employerId, jobId]);
        res.json(result.rows[0]);
    } catch (error) {
        console.error('Error creating submit:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const updateById = async (req, res) => {
    // This method might not be applicable if there are no attributes to update.
    res.status(405).send({ error: 'Method not allowed' });  // Assuming no updates allowed for submits
};

const deleteById = async (req, res) => {
    const { employerId, jobId } = req.params;
    try {
        await database.query(`DELETE FROM "${tableName}" WHERE "employerId" = $1 AND "jobId" = $2`, [employerId, jobId]);
        res.status(204).send();
    } catch (error) {
        console.error('Error deleting submit by IDs:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const getEmployerEmailByJobId = async (res, req) => {
  const { id } = req.params;
  console.log("Controller");
  console.log(id);

  try {
    const result = await database.query(
      `SELECT e."email" 
        FROM "EMPLOYER" e
        JOIN "${tableName}" s ON s."employerId"=e."id"
        WHERE s."jobId" = ${parseInt(id)}`
     
    );
    console.log("Controller2");
    console.log(result);
    res.status(200).json(result.rows);
  } catch (error) {
    console.error("Error retrieving employer email by job ID:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
module.exports = {
  getAll,
  getById,
  getByUserId,
  create,
  updateById,
  deleteById,
  getEmployerEmailByJobId,
};
