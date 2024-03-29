const {sql} = require("../config/database")

const getAllUsers = async () => {
    try {
        const result = await sql.query`select * from NGUOIDUNG`;
        return result.recordset;
    } catch (err) {
        console.error('Error getting users:', err);
        return [];
    }
}



module.exports = {
    getAllUsers,
};