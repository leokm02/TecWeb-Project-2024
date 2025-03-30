import { DataTypes } from "sequelize";

export function createModel(database) {
  database.define(
    "Quiz",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      user: {
        type: DataTypes.STRING,
        allowNull: false,
        references: { model: "User", key: "userName" },
        onDelete: "CASCADE",
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
      },
      maxErrors: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          min: 1, // Minimo 1 errore
          isInt: true, // Deve essere un numero intero
        },
      },
    },
    {}
  );
}
