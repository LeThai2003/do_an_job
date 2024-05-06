const {sql} = require("../config/database")

const getAllJobs = async () => {
    try {
        const result = await sql.query`select * from CONGVIEC`;
        return result.recordset;
    } catch (err) {
        console.log('Error getting jobs:', err);
        return [];
    }
}

const getAllJobsPagi = async (limitPerPage, skip) => {
    try {
        const stringQuery = `SELECT * 
        FROM CONGVIEC 
        ORDER BY ngayTao DESC
        OFFSET ${skip} ROWS 
        FETCH NEXT ${limitPerPage} ROWS ONLY`
        const result = await sql.query(stringQuery);
        return result.recordset;
    } catch (err) {
        console.log('Error getting jobs:', err);
        return [];
    }
}

const getJobsByForm = async (query) => {
    try {
        const queryString = query.toString();
        const result = await sql.query(queryString);
        return result.recordset;
    } catch (error) {
        console.log("Error getting jobs by form search", error);
        return [];
    }
}

const getJobBySlug = async (slug) => {
    try {
        const result = await sql.query`select * from CONGVIEC where slug = ${slug}`;
        return result.recordset[0];
    } catch (err) {
        console.log('Error getting jobs:', err);
        return [];
    }
}

const getJobNameByMaCV = async (maCV) => {
    try {
        const result = await sql.query`select maCV, tenCV, chiTietCV from CONGVIEC where maCV = ${maCV}`;
        return result.recordset[0];
    } catch (err) {
        console.log('Error getting getJobNameByMaCV:', err);
        return [];
    }
}



const getJobOfCompany = async (id) => {
    try {
        const result = await sql.query`select * from CONGVIEC where CONGVIEC.congTyId = ${id}`;
        return result.recordset;
    } catch (err) {
        console.log('Error getting jobs:', err);
        return [];
    }
}

const updateJobDateApply = async (maCV, value) => {
    try {
        await sql.query`update CONGVIEC set hetHan = ${value} where maCV = ${maCV}`;
    } catch (err) {
        console.log('Update job: date for apply err:', err);
    }
}

const countJobDangTuyen = async (congTyId) => {
    try {
        const stringQuery = `select count(*) soluong from CONGVIEC where (congTyId = ${congTyId}) and (trangThai = 1) and (deleted = 0)`
        const result = await sql.query(stringQuery);
        return result.recordset[0];
    } catch (err) {
        console.log('err countJobDangTuyen:', err);
    }
}

const countJobDungTuyen = async (congTyId) => {
    try {
        const stringQuery = `select count(*) soluong from CONGVIEC where (congTyId = ${congTyId}) and (trangThai = 0) and (deleted = 0)`
        const result = await sql.query(stringQuery);
        return result.recordset[0];
    } catch (err) {
        console.log('err countJobDungTuyen:', err);
    }
}

const countJob = async (congTyId) => {
    try {
        const stringQuery = `select count(*) soluong from CONGVIEC where (congTyId = ${congTyId}) and (deleted = 0)`
        const result = await sql.query(stringQuery);
        return result.recordset[0];
    } catch (err) {
        console.log('err countJob:', err);
    }
}

const countAllJob = async (congTyId) => {
    try {
        const stringQuery = `select count(*) soluong from CONGVIEC where (deleted = 0)`
        const result = await sql.query(stringQuery);
        return result.recordset[0];
    } catch (err) {
        console.log('err countJob:', err);
    }
}





const insertJob = async (congTyId, body) => {
    try {
        let {tenCV, moTa, luong, chiTietCV, kinhNghiem, hanChot, slug} = body;
        
        luong = parseInt(luong);

        stringQuery = `insert into CONGVIEC(congTyId, tenCV, moTa, chiTietCV, luong, kinhNghiem, ngayTao, hanChot, slug) values(${congTyId}, N'${tenCV}', N'${moTa}', N'${chiTietCV}', ${luong}, '${kinhNghiem}', CONVERT(date, getdate()), '${hanChot}', '${slug}')`;

        console.log(stringQuery);

        await sql.query(stringQuery);
        console.log("----- insert job success!---")
    } catch (err) {
        console.log('insertJob err:', err);
    }
}





module.exports = {
    getAllJobs,
    getJobsByForm,
    getJobBySlug,
    getJobOfCompany,
    updateJobDateApply,
    insertJob,
    getJobNameByMaCV,
    countJobDangTuyen,
    countJobDungTuyen,
    countJob,
    getAllJobsPagi,
    countAllJob
};