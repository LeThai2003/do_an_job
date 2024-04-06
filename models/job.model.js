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
        return result.recordset[0];
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

const updateJobDateApply = async (maCV, value) => {
    try {
        await sql.query`update CONGVIEC set hetHan = ${value} where maCV = ${maCV}`;
    } catch (err) {
        console.log('Update job: date for apply err:', err);
    }
}



module.exports = {
    getAllJobs,
    getJobsByForm,
    getJobBySlug,
    getJobOfCompany,
    updateJobDateApply
};