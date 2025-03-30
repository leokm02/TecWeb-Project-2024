import { DataTypes } from "sequelize";

export function createModel(database) {
  database.define(
    "MultipleAnswers",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
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
      correctAnswer: {
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
