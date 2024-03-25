const {sql} = require("../config/connect");

const getAllAreas = async () => {
    try {
        const result = await sql.query`select * from KHUVUC`;
        return result.recordset;
    } catch (err) {
        console.error('Error getting students:', err);
        return [];
    }
}



module.exports = {
    getAllAreas,
};