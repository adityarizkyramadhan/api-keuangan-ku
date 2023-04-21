const { Op } = require('sequelize')

const { uangPengeluaran } = require('../model/entity.model')
const { sequelize } = require('../utils/database')


//create
const create = async ({ jumlah, detail, userKeuanganId }) => {
    try {
        const result = await sequelize.transaction(async (t) => {
            const uang = await uangPengeluaran.create({ jumlah, detail, userKeuanganId }, { transaction: t })
            return uang
        })
        return { error: null, data: result };
    } catch (error) {
        console.error(error);
        return { error: error, data: null };
    }
}
//find by week
const findOneWeekAgo = async (userKeuanganId) => {
    try {
        const startDate = new Date();
        startDate.setDate(startDate.getDate() - 7);

        const records = await uangPengeluaran.findAll({
            where: {
                createdAt: {
                    [Op.gte]: startDate,
                    [Op.lte]: new Date()
                },
                userKeuanganId
            }
        });
        return { error: null, data: records };
    } catch (error) {
        console.error(error);
        return { error: error, data: null };
    }
}


//find by one month
const findOneMonthkAgo = async () => {
    try {
        const oneWeekAgo = new Date(new Date().getTime() - (30 * 24 * 60 * 60 * 1000));

        // Query the database using Sequelize
        const records = await sequelize.query(
            'SELECT * FROM uang_pengeluaran WHERE createdAt >= :startDate AND date <= :endDate',
            {
                replacements: {
                    startDate: oneWeekAgo,
                    endDate: new Date()
                },
            }
        );
        return { error: null, data: records };
    } catch (error) {
        console.error(error);
        return { error: error, data: null };
    }
}


//find by one years
const findOneYearkAgo = async () => {
    try {
        const oneWeekAgo = new Date(new Date().getTime() - (365 * 24 * 60 * 60 * 1000));

        // Query the database using Sequelize
        const records = await sequelize.query(
            'SELECT * FROM uang_pengeluaran WHERE createdAt >= :startDate AND date <= :endDate',
            {
                replacements: {
                    startDate: oneWeekAgo,
                    endDate: new Date()
                },
            }
        );
        return { error: null, data: records };
    } catch (error) {
        console.error(error);
        return { error: error, data: null };
    }
}



module.exports = {
    create,
    findOneWeekAgo,
    findOneMonthkAgo,
    findOneYearkAgo
}
