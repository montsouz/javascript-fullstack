import express from "express";
import { sequelize } from "./config/database";
import { User } from "./models/user";

const app = express();
app.use(express.json());
const PORT = process.env.PORT || 3000;

async function assertDatabaseConnectionOk() {
  console.log(`Checking database connection...`);
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    console.log("Database connection OK!");
  } catch (error) {
    console.log("Unable to connect to the database:");
    console.log((error as Error).message);
    process.exit(1);
  }
}

async function init() {
  await assertDatabaseConnectionOk();
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
  });
}

init();

app.post("/users", async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.json(user);
  } catch (error) {
    res.status(400).send((error as Error).message);
  }
});
