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

const insertJobSpeciality = async (maCV, maLV) => {
    try {
        const stringQuery = `insert into CONGVIEC_LINHVUC(maLV, maCV) values (${maLV}, ${maCV})`;
        console.log(stringQuery);
        await sql.query(stringQuery);
        console.log("add tag success!")
    } catch (err) {
        console.error('Error getting insertJobSpeciality:', err);
    }
}

module.exports = {
    getAllJobSpeciality,
    insertJobSpeciality
};