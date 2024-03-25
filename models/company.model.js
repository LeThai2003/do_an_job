const {sql} = require("../config/connect");

const getAllCompanies = async () => {
    try {
        const result = await sql.query`select * from CONGTY`;
        return result.recordset;
    } catch (err) {
        console.error('Error getting students:', err);
        return [];
    }
}



module.exports = {
    getAllCompanies,
};