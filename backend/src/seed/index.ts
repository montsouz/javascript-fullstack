import { Plan } from "../models/plan";
import { User } from "../models/user";

const PLANS = [
  {
    name: "Basic Plan",
    steps: [
      {
        name: "Consultation",
        order: 1,
      },
      {
        name: "Session 1",
        order: 2,
      },
    ],
  },
  {
    name: "Standard Plan",
    steps: [
      {
        name: "Consultation",
        order: 1,
      },
      {
        name: "Session 1",
        order: 2,
      },
      {
        name: "Session 2",
        order: 3,
      },
      {
        name: "Session 3",
        order: 4,
      },
    ],
  },
  {
    name: "Premium Plan",
    steps: [
      {
        name: "Consultation",
        order: 1,
      },
      {
        name: "Session 1",
        order: 2,
      },
      {
        name: "Session 2",
        order: 3,
      },
      {
        name: "Session 3",
        order: 4,
      },
      {
        name: "Session 4",
        order: 5,
      },
      {
        name: "Session 5",
        order: 6,
      },
    ],
  },
];

const USERS = [
  {
    email: "john.smith@example.com",
    password: "password123",
  },
];

export async function seed() {
  for (const plans of PLANS) {
    // Plans must not be created if they already exist
    const plan = await Plan.findOne({ where: { name: plans.name } });
    if (!plan) {
      await Plan.create(plans);
    }
  }

  for (const user of USERS) {
    // Users must not be created if they already exist
    const existingUser = await User.findOne({ where: { email: user.email } });
    if (!existingUser) {
      await User.create(user);
    }
  }
}
