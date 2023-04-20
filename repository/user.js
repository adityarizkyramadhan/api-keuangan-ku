const { userKeuangan } = require('../model/entity.model')

var objReturn = {
    error: null,
    data: null
}

const create = async ({ username, password, name }) => {
    try {
        const user = await userKeuangan.create({ username, password, name })
        return { error: null, data: user };
    } catch (error) {
        console.error(error);
        return { error: error, data: null };
    }
}

const findByUsername = async (username) => {
    try {
        const user = await userKeuangan.findOne({
            where : {
                username
            }
        })
        return { error: null, data: user };
    } catch (error) {
        console.error(error);
        return { error: error, data: null };
    }
}

module.exports = {
    create,
    findByUsername
}

