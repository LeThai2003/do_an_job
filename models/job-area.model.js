const {sql} = require("../config/database")

const getAllJobArea = async () => {
    try {
        const result = await sql.query`select * from CONGVIEC_KHUVUC`;
        return result.recordset;
    } catch (err) {
        console.error('Error getting job - area:', err);
        return [];
    }
}



module.exports = {
    getAllJobArea,
};