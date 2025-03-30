import { DataTypes } from "sequelize";

export function createModel(database) {
  database.define(
    "Results",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      userName: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "Anonymous",
      },
      score: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      passed: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
    },
    {}
  );
}
