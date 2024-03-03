import { app } from "./index";
import supertest from "supertest";

const request = supertest(app);

describe("Test endpoints", () => {
  let token: string;
  let planId: number;

  // TODO: This is a workaround for the tests to pass. It's not ideal.
  beforeAll(async () => {
    // wait 2 seconds for seed to run
    await new Promise((resolve) => setTimeout(resolve, 2000));
  });

  it("Logs in as a user", async () => {
    const response = await request.post("/login").send({
      email: "john.smith@example.com",
      password: "password123",
    });

    expect(response.status).toBe(200);
    expect(response.body.token).toBeDefined();

    token = response.body.token;
  });

  it("Gets plans", async () => {
    const response = await request.get("/plans").set("authorization", token);

    expect(response.status).toBe(200);
    expect(response.body.length).toBe(3);

    planId = response.body[0].id;
  });

  it("Purchases a plan", async () => {
    const response = await request
      .post("/purchases")
      .send({ planId })
      .set("authorization", token);

    expect(response.status).toBe(200);
    expect(response.body.id).toBeDefined();
  });
});
