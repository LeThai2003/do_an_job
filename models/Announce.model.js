const {sql} = require("../config/database")


// const getJobBySlug = async (slug) => {
//     try {
//         const result = await sql.query`select * from CONGVIEC where slug = ${slug} and deleted=0`;
//         return result.recordset[0];
//     } catch (err) {
//         console.log('Error getting jobs:', err);
//         return [];
//     }
// }


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
};