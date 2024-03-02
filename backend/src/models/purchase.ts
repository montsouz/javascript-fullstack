import { DataTypes } from "sequelize";
import { sequelize } from "../config/database";
import { User } from "./user";

export const Purchase = sequelize.define(
  "Purchase",
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
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: User,
        key: "id",
      },
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

export interface IPurchase {
  id: number;
  name: string;
  userId: number;
  steps: { name: string; order: number }[];
}
