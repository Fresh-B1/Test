const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Client extends Model {
    static associate({ User }) {
      this.belongsTo(User, { foreignKey: 'userId'});
    }
  }
  Client.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.BIGINT,
      },
      userId: {
        allowNull: false,
        type: DataTypes.BIGINT,
        references: {
          model: 'Users',
          key: 'id',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      },
      accountNumber: {
        unique: true,
        allowNull: false,
        type: DataTypes.BIGINT,
      },
      surname: {
        allowNull: false,
        type: DataTypes.TEXT,
      },
      name: {
        allowNull: false,
        type: DataTypes.TEXT,
      },
      patronymic: {
        allowNull: false,
        type: DataTypes.TEXT,
      },
      birthday: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      INN: {
        unique: true,
        allowNull: false,
        type: DataTypes.BIGINT,
      },
      responsibleUser: {
        allowNull: false,
        type: DataTypes.TEXT,
      },
      status: {
        allowNull: false,
        defaultValue: 'Не в работе',
        type: DataTypes.TEXT,
      },
    },
    {
      sequelize,
      modelName: 'Client',
    }
  );
  return Client;
};
