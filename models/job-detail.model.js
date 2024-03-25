const {sql} = require("../config/connect");

const getAllJobDetails = async () => {
    try {
        const result = await sql.query`select * from CHITIET_CV`;
        return result.recordset;
    } catch (err) {
        console.error('Error getting job detail:', err);
        return [];
    }
}



module.exports = {
    getAllJobDetails,
};