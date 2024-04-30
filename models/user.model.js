const {sql} = require("../config/database")

const insertUser = async (body) => {
    try {
        const {ho, ten, sdt, gioiTinh, ngaySinh, email, matKhau, token} = body;
        await sql.query`insert into NGUOIDUNG(ho, ten, sdt, gioiTinh, ngaySinh, email, matKhau, token) values(${ho}, ${ten}, ${sdt}, ${gioiTinh}, ${ngaySinh}, ${email}, ${matKhau}, ${token})`;
    } catch (err) {
        console.error('Error getting users:', err);
    }
}

const updateUser = async (queryString) => {
    try {
        await sql.query(queryString);
        console.log("-----------------ok-----------------")
    } catch (err) {
        console.error('Error getting users:', err);
    }
}

const getUserByToken = async (token) => {
    try {
        const result = await sql.query`select userId, ho, ten, sdt, gioiTinh, ngaySinh, email from NGUOIDUNG where token = ${token}`;
        return result.recordset[0];
    } catch (err) {
        console.log('Error getting user by token:', err);
        return [];
    }
}

const getUserByEmail = async (email) => {
    try {
        const result = await sql.query`select * from NGUOIDUNG where email = ${email}`;
        return result.recordset[0];
    } catch (err) {
        console.log('Error getting user by email:', err);
        return [];
    }
}


module.exports = {
    insertUser,
    getUserByToken,
    getUserByEmail,
    updateUser
};