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
                userKeuanganId,
                is_reset: false
            }
        });
        let total = 0;
        for (let i = 0; i < records.length; i++) {
            total += records[i].jumlah;
        }
        total = total.toLocaleString('id-ID', {
            style: 'currency',
            currency: 'IDR',
        })

        return {
            error: null, data: {
                records,
                total
            }
        };
    } catch (error) {
        console.error(error);
        return { error: error, data: null };
    }
}


//reset one week ago
const reset = async (userKeuanganId) => {
    try {
        const startDate = new Date();
        startDate.setDate(startDate.getDate() - 7);
        const result = await sequelize.transaction(async (t) => {
            const uang = await uangPengeluaran.update({
                is_reset: true
            }, {
                where: {
                    createdAt: {
                        [Op.gte]: startDate,
                        [Op.lte]: new Date()
                    },
                    userKeuanganId,
                }
            }, { transaction: t })
            return uang
        })
        return { error: null, data: result };
    } catch (error) {
        console.error(error);
        return { error: error, data: null };
    }
}


//find by one month
const findOneMonthAgo = async () => {
    try {
        const startDate = new Date();
        startDate.setDate(startDate.getDate() - 30);

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



module.exports = {
    create,
    findOneWeekAgo,
    findOneMonthAgo,
    reset
}
