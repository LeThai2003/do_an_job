const {sql} = require("../config/database")


const getAnnounceOfUser = async (userId) => {
    try {
        const result = await sql.query`select * from THONGBAO where userId = ${userId}`;
        return result.recordset;
    } catch (err) {
        console.log('Error getting jobs:', err);
        return [];
    }
}


const insertAnnounce = async (maCV, userId, thongBao) => {
    try {
        
        stringQuery = `insert into THONGBAO(maCV, userId, thongBao, thoiGianGui)
        values(${maCV}, ${userId}, N'${thongBao}', CONVERT(datetime, getdate())) 
        `;

        await sql.query(stringQuery);
        console.log("----- insert thông báo success!---")
    } catch (err) {
        console.log('insertAnnounce err:', err);
    }
}


module.exports = {
    insertAnnounce,
    getAnnounceOfUser
};