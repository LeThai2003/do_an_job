const {sql} = require("../config/database")

const getAllSpecialties = async () => {
    try {
        const result = await sql.query`select * from LINHVUC`;
        return result.recordset;
    } catch (err) {
        console.error('Error getting getAllSpecialties:', err);
        return [];
    }
}

const getAllSpecialtiesWithMaTen = async () => {
    try {
        const result = await sql.query`select maLV, tenLV from LINHVUC`;
        return result.recordset;
    } catch (err) {
        console.error('Error getting getAllSpecialtiesWithMaTen:', err);
        return [];
    }
}



module.exports = {
    getAllSpecialties,
    getAllSpecialtiesWithMaTen
};