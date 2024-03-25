const {sql} = require("../config/database")

const getAllJobSpeciality = async () => {
    try {
        const result = await sql.query`select * from CONGVIEC_LINHVUC`;
        return result.recordset;
    } catch (err) {
        console.error('Error getting job - speciality:', err);
        return [];
    }
}



module.exports = {
    getAllJobSpeciality,
};