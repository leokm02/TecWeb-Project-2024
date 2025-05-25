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
      correctAnswerOpen: {
        type: DataTypes.STRING,
      },
      answer1: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      answer2: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      answer3: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      answer4: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      correctAnswerMultiple: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          min: 1,
          max: 4,
        },
      },
    },
    {}
  );
}
