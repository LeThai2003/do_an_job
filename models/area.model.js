const {sql} = require("../config/database")

const getAllAreas = async () => {
    try {
        const result = await sql.query`select * from KHUVUC`;
        return result.recordset;
    } catch (err) {
        console.error('Error getting students:', err);
        return [];
    }
}

const getAllAreasWithMaTen = async () => {
    try {
        const result = await sql.query`select maKV, tenKV from KHUVUC`;
        return result.recordset;
    } catch (err) {
        console.error('Error getting students:', err);
        return [];
    }
}



module.exports = {
    getAllAreas,
    getAllAreasWithMaTen
};