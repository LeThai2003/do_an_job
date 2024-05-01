const {sql} = require("../config/database")

const getAllCompanies = async () => {
    try {
        const result = await sql.query`select * from CONGTY`;
        return result.recordset;
    } catch (err) {
        console.error('Error getting Companies:', err);
        return [];
    }
}

const getCompanyById = async (companyId) => {
    try {
        const result = await sql.query`select * from CONGTY where congTyId = ${companyId}`;
        return result.recordset[0];
    } catch (err) {
        console.error('Error getting detail Companies by id:', err);
        return [];
    }
}

const getCompanyBySlug = async (slugCom) => {
    try {
        const result = await sql.query`select * from CONGTY where slug = ${slugCom}`;
        return result.recordset[0];
    } catch (err) {
        console.error('Error getting detail Companies by slug:', err);
        return [];
    }
}

const getInfoUserOfCompany = async (congTyId) => {
    try {
        const sqlQuery = `select (ho + ' ' + ten) as hoTen, sdt, email from CONGTY join NGUOIDUNG on CONGTY.userId = NGUOIDUNG.userId and CONGTY.congTyId = ${congTyId}`;
        const result = await sql.query(sqlQuery);
        return result.recordset[0];
    } catch (err) {
        console.error('Error getting info company:', err);
        return [];
    }
}

const getInfoCompanyByIdUser = async (userId) => {
    try {
        const sqlQuery = `SELECT dbo.NGUOIDUNG.userId, dbo.NGUOIDUNG.sdt, dbo.NGUOIDUNG.email, dbo.CONGTY.congTyId, dbo.CONGTY.tenCT, dbo.CONGTY.diaDiem, dbo.CONGTY.quyMo, dbo.CONGTY.moTa, dbo.CONGTY.logo, dbo.CONGTY.slug, dbo.CONGTY.sdtCT, dbo.CONGTY.emailCT
        FROM dbo.CONGTY INNER JOIN dbo.NGUOIDUNG ON dbo.CONGTY.userId = dbo.NGUOIDUNG.userId and dbo.NGUOIDUNG.userId = ${userId}`;
        const result = await sql.query(sqlQuery);
        return result.recordset[0];
    } catch (err) {
        console.error('Error getting info company:', err);
        return [];
    }
}

const getAllCompaniesBySearch = async (stringQuery) => {
    try {
        const result = await sql.query(stringQuery);
        return result.recordset;
    } catch (err) {
        console.error('Error getting getAllCompaniesBySearch:', err);
        return [];
    }
}
const updateInfoCompany = async (stringQuery) => {
    try {
        await sql.query(stringQuery);
        console.log("----------update info company success!")
        return;
    } catch (err) {
        console.error('Error getting updateInfoCompany:', err);
    }
}

const insertCompany = async (userId, infoCompany) => {
    try {
        const {tenCT, quyMo, diaDiem, sdtCT, emailCT, moTa, logo} = infoCompany;
        const stringQuery = `
            insert into CONGTY(userId, tenCT, diaDiem, quyMo, moTa, logo, sdtCT, emailCT)
            values(${userId}, N'${tenCT}', N'${diaDiem}', ${quyMo}, N'${moTa}', N'${logo}', '${sdtCT}', '${emailCT}')
        `
        await sql.query(stringQuery);
        console.log("----------create info company success!")
        return;
    } catch (err) {
        console.error('Error getting insertCompany:', err);
    }
}



module.exports = {
    getAllCompanies,
    getCompanyById,
    getCompanyBySlug,
    getInfoUserOfCompany,
    getAllCompaniesBySearch,
    getInfoCompanyByIdUser,
    updateInfoCompany,
    insertCompany
};