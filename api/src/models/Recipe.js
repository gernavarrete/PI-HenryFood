const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('recipe', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        is: /\D/ig,
      }
    },
    image: {
      type: DataTypes.TEXT,
      validate: {
        isUrl: true,
      }
    },
    summary: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    healthScore: {
      type: DataTypes.FLOAT,
      validate: {
      isNumeric: true,
      min: 0,
      max: 100
      }
    },
    stepByStep : {
      type: DataTypes.ARRAY(DataTypes.JSON)
    }
  }, {
    timestamps: false
  });
};
