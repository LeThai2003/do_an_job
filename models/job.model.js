const {sql} = require("../config/database")

const getAllJobs = async () => {
    try {
        const result = await sql.query`select * from CONGVIEC`;
        return result.recordset;
    } catch (err) {
        console.error('Error getting jobs:', err);
        return [];
    }
}



module.exports = {
    getAllJobs,
};