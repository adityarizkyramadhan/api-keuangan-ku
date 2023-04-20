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

const UangSimpanan = sequelize.define('uang_simpanan', {
    id: {
        type: DataTypes.UUID,
        defaultValue: UUIDV4,
        primaryKey: true
    },
    jumlah: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    tanggal: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    bulan: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    tahun: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    timestamps: true,
    paranoid: true
});

User.hasMany(UangSimpanan);
UangSimpanan.belongsTo(User);

module.exports = {
    userKeuangan,
    UangSimpanan
}
