const request = require("supertest");
const express = require("express");
const userRouter = require("../../routers/users");
const User = require("../../models/User");
const {resetTestDB} = require("./config");

jest.mock("../../models/User");

const app = express();
app.use(express.json());
app.use("/users", userRouter);

beforeEach(async () => {
  await resetTestDB();
});

describe("User Endpoints", () => {
  describe("POST /users/register", () => {
    it("should return a 201 status code and the new user when registration is successful", async () => {
      const mockUserData = {username: "newuser", email: "newuser@example.com", password: "password"};
      const mockResponse = {username: "newuser", email: "newuser@example.com", password: "password"};
      User.create.mockResolvedValue(mockResponse);

      const response = await request(app).post("/users/register").send(mockUserData);

      expect(response.status).toBe(201);
      expect(response.body).toEqual(mockResponse);
    });

    it("should return a 400 status code if registration fails due to validation error", async () => {
      const mockUserData = {username: "", email: "invalidemail", password: "short"};
      const mockError = new Error("Validation error");
      User.create.mockRejectedValue(mockError);

      const response = await request(app).post("/users/register").send(mockUserData);

      expect(response.status).toBe(400);
      expect(response.body).toEqual({error: "Validation error"});
    });

    it("should return a 500 status code if there is a server error", async () => {
      const mockUserData = {username: "newuser", email: "newuser@example.com", password: "password"};
      const mockError = new Error("Internal server error");
      User.create.mockRejectedValue(mockError);

      const response = await request(app).post("/users/register").send(mockUserData);

      expect(response.status).toBe(500);
      expect(response.body).toEqual({error: "Internal server error"});
    });
  });

  describe("POST /users/login", () => {
    it("should return a 200 status code and user data if login is successful", async () => {
      const mockUser = {username: "existinguser", email: "existinguser@example.com", password: "password"};
      User.getUsername.mockResolvedValue(mockUser);

      const response = await request(app).post("/users/login").send({username: "existinguser", password: "password"});

      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockUser);
    });

    it("should return a 401 status code if the password is incorrect", async () => {
      const mockUser = {username: "existinguser", email: "existinguser@example.com", password: "password"};
      User.getUsername.mockResolvedValue(mockUser);

      const response = await request(app).post("/users/login").send({username: "existinguser", password: "wrongpassword"});

      expect(response.status).toBe(401);
      expect(response.body).toEqual({error: "Unauthorized"});
    });

    it("should return a 401 status code if the user does not exist", async () => {
      User.getUsername.mockResolvedValue(null);

      const response = await request(app).post("/users/login").send({username: "unknownuser", password: "password"});

      expect(response.status).toBe(401);
      expect(response.body).toEqual({error: "Unauthorized"});
    });
  });
});
