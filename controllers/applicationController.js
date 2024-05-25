const database = require('../config/database.js');

const tableName = "Applies";

const getAll = async (req, res) => {
    try {
        const result = await database.query(`SELECT * FROM "${tableName}"`);
        res.status(200).json(result.rows);
    } catch (error) {
        console.error('Error getting all applications:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const getById = async (req, res) => {
    const { employeeId, jobId } = req.body;
    try {
        const result = await database.query(`SELECT * FROM "${tableName}" WHERE "employeeId" = $1 AND "jobId" = $2`, [employeeId, jobId]);
        res.status(200).json(result.rows[0] || null);
    } catch (error) {
        console.error('Error getting application by IDs:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const getApplicantsByJobId = async (req, res) => {
  const {id } = req.params;
  try {
    const result = await database.query(
      `SELECT e."id", e."firstName", e."lastName",e."address", e."email", e."phone1", e."phone2", e."region", e."occupation", e."specialty", e."profilePicturePath" 
        FROM "${tableName}" a
        JOIN "EMPLOYEE" e ON a."employeeId"=e."id"
        WHERE a."jobId" = $1`,
      //   [parseInt(jobId)]
      [parseInt(id)]
    );
    res.status(200).json(result.rows);
  } catch (error) {
    console.error("Error getting applicants by IDs:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const getByUserId = async (req, res) => {
    const { employeeId } = req.params;
    try {
        const result = await database.query(`SELECT * FROM "${tableName}" WHERE "employeeId" = $1`, [employeeId]);
        res.status(200).json(result.rows || null);
    } catch (error) {
        console.error('Error getting application by IDs:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const create = async (req, res) => {
    const { employeeId, jobId, applicationDate } = req.body;
    const parsedJobId = parseInt(jobId.jobId, 10);
    try {
        const result = await database.query(
          `INSERT INTO "${tableName}" ("employeeId", "jobId", "applicationDate") VALUES ($1, $2, $3) RETURNING *`,
          [employeeId, parsedJobId, applicationDate]
        );
        res.status(200).json(result.rows[0]);
    } catch (error) {
        if (error.code === '23505') { // 23505 is the error code for unique violation in PostgreSQL
            res.status(409).json({ error: 'Application already exists for this job and employee.' });
        } else {
            res.status(500).json({ error: 'Internal server error' });
        }
    }
};

const updateById = async (req, res) => {
    const { employeeId, jobId } = req.params;
    const { applicationDate } = req.body;
    try {
        const result = await database.query(
            `UPDATE "${tableName}" SET "applicationDate" = $1 WHERE "employeeId" = $2 AND "jobId" = $3 RETURNING *`,
            [applicationDate, employeeId, jobId]
        );
        res.status(200).json(result.rows[0]);
    } catch (error) {
        console.error('Error updating application by IDs:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const deleteById = async (req, res) => {
    const { employeeId, jobId } = req.body;
    try {
        await database.query(`DELETE FROM "${tableName}" WHERE "employeeId" = $1 AND "jobId" = $2`, [employeeId, jobId]);
        res.status(204).send();
    } catch (error) {
        console.error('Error deleting application by IDs:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = {
  getAll,
  getById,
  getByUserId,
  create,
  updateById,
  deleteById,
  getApplicantsByJobId,
};
