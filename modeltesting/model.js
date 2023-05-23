const { DataTypes } = require("sequelize")

const itemname = sequelize.define("iitemname", {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
        notEmpty: true
    }
})


return itemname;


