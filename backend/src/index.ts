import express from "express";
import cors from "cors";
import { sequelize } from "./config/database";
import { IPlan, Plan } from "./models/plan";
import { User, type IUser } from "./models/user";
import { Purchase } from "./models/purchase";
import { seed } from "./seed";
import { generateToken } from "./libs/jwt";
import { authenticate } from "./middlewares/auth";

const app = express();
app.use(express.json());

// enable CORS
app.use(cors());
const PORT = process.env.PORT || 3000;

async function assertDatabaseConnectionOk() {
  console.log(`Checking database connection...`);
  try {
    await sequelize.authenticate();
    await sequelize.sync({ force: true });
    await seed();
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

app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = (await User.findOne({
    where: { email, password },
  })) as IUser | null;

  if (user) {
    const token = generateToken(user);
    res.json({ token });
  } else {
    res.status(401).json({ message: "Invalid email or password" });
  }
});

app.get("/plans", authenticate, async (req, res) => {
  const plans = await Plan.findAll();
  res.json(plans);
});

app.post("/purchases", authenticate, async (req, res) => {
  const { planId } = req.body;

  const plan = (await Plan.findByPk(planId)) as IPlan | null;
  if (!plan) {
    return res.status(404).json({ message: "Plan not found" });
  }

  const user = (await User.findByPk(req.userId)) as IUser | null;
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  const purchase = await Purchase.create({
    userId: req.userId,
    name: plan.name,
    steps: plan.steps,
  });

  return res.json(purchase);
});

app.get("/purchases", authenticate, async (req, res) => {
  const purchases = await Purchase.findAll({ where: { userId: req.userId } });
  res.json(purchases);
});
