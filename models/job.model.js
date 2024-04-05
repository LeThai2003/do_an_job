const {sql} = require("../config/database")

const getAllJobs = async () => {
    try {
        const result = await sql.query`select * from CONGVIEC`;
        return result.recordset;
    } catch (err) {
        console.log('Error getting jobs:', err);
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

const getJobBySlug = async (slug) => {
    try {
        const result = await sql.query`select * from CONGVIEC where slug = ${slug}`;
        return result.recordset;
    } catch (err) {
        console.log('Error getting jobs:', err);
        return [];
    }
}

const getJobOfCompany = async (id) => {
    try {
        const result = await sql.query`select * from CONGVIEC where CONGVIEC.congTyId = ${id}`;
        return result.recordset;
    } catch (err) {
        console.log('Error getting jobs:', err);
        return [];
    }
}

module.exports = {
    getAllJobs,
    getJobsByForm,
    getJobBySlug,
    getJobOfCompany
};