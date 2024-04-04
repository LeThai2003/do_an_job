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

const getJobsByForm = async (query) => {
    try {
        const queryString = query.toString();
        const result = await sql.query(queryString);
        return result.recordset;
    } catch (error) {
        console.log("Error getting jobs by form search", error);
        return [];
    }
}

module.exports = {
    getAllJobs,
    getJobsByForm
};