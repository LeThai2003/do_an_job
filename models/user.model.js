const {sql} = require("../config/database")

const insertUser = async (body) => {
    try {
        const {ho, ten, sdt, gioiTinh, ngaySinh, email, matKhau, token} = body;
        await sql.query`insert into NGUOIDUNG(ho, ten, sdt, gioiTinh, ngaySinh, email, matKhau, token) values(${ho}, ${ten}, ${sdt}, ${gioiTinh}, ${ngaySinh}, ${email}, ${matKhau}, ${token})`;
    } catch (err) {
        console.error('Error getting users:', err);
    }
}



module.exports = {
    insertUser,
};