const { DataTypes, UUIDV4 } = require("sequelize");
const { sequelize } = require("../utils/database");

const userKeuangan = sequelize.define('user_keuangan', {
    id: {
        type: DataTypes.UUID,
        defaultValue: UUIDV4,
        primaryKey: true,
        allowNull: false
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    timestamps: true,
    paranoid: true
})

const uangPengeluaran = sequelize.define('uang_pengeluaran', {
    id: {
        type: DataTypes.UUID,
        defaultValue: UUIDV4,
        primaryKey: true
    },
    jumlah: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    detail: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    timestamps: true,
    paranoid: true
});


userKeuangan.hasMany(uangPengeluaran);
uangPengeluaran.belongsTo(userKeuangan);

module.exports = {
    userKeuangan,
    uangPengeluaran
}
