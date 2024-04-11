const {sql} = require("../config/database")

const getAreaOfJob = async (slugCV) => {
    try {
        const sqlQuery = `select maKV, tenKV from KHUVUC where KHUVUC.maKV in (select maKV from CONGVIEC join CONGVIEC_KHUVUC on CONGVIEC.maCV = CONGVIEC_KHUVUC.maCV and CONGVIEC.slug = '${slugCV}')`;
        const result = await sql.query(sqlQuery);
        return result.recordset;
    } catch (err) {
        console.error('Error getting job - area:', err);
        return [];
    }
}



module.exports = {
    getAreaOfJob,
};