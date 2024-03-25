const {sql} = require("../config/database")

const getAllSpecialties = async () => {
    try {
        const result = await sql.query`select * from LINHVUC`;
        return result.recordset;
    } catch (err) {
        console.error('Error getting specialities:', err);
        return [];
    }
}



module.exports = {
    getAllSpecialties,
};