const {sql} = require("../config/database")

const getAllJobDetails = async () => {
    try {
        const result = await sql.query`select * from CHITIET_CV`;
        return result.recordset;
    } catch (err) {
        console.error('Error getting job detail:', err);
        return [];
    }
}

const insertJobDetail = async (jobDetail) => {
    try {
        const {maCV, userId, pdf, khuVucUT} = jobDetail;
        const stringQuery = `insert into CHITIET_CV(maCV, userId, thoiGianNop, pdf, khuVucUT) values(${maCV}, ${userId}, CONVERT(date, getdate()), N'${pdf}', ${khuVucUT})`;
        await sql.query(stringQuery);
        console.log("----------apply cv success~!");
    } catch (err) {
        console.error('Error insertJobDetail:', err);
    }
}



module.exports = {
    getAllJobDetails,
    insertJobDetail
};