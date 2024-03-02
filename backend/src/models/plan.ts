import { DataTypes } from "sequelize";
import { sequelize } from "../config/database";

export const Plan = sequelize.define(
  "Plan",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    steps: {
      type: DataTypes.JSON,
      allowNull: false,
    },
  },
  {
    timestamps: true,
  }
);
