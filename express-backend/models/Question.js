import { DataTypes } from "sequelize";

export function createModel(database) {
  database.define(
    "Question",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      question: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      type: {
        type: DataTypes.ENUM("multiple", "open"),
        allowNull: false,
      },
      correctAnswer: {
        type: DataTypes.STRING,
      },
    },
    {}
  );
}
