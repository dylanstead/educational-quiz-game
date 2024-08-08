const request = require("supertest");
const express = require("express");
const scoreRouter = require("../../routers/scores");
const Score = require("../../models/Score");
const {resetTestDB} = require("./config");

jest.mock("../../models/Score");

const app = express();
app.use(express.json());
app.use("/scores", scoreRouter);

beforeEach(async () => {
  await resetTestDB();
});

describe("Score Endpoints", () => {
  describe("POST /scores/send", () => {
    it("should return a 201 status code and the result when score is sent successfully", async () => {
      const mockScoreData = {userId: 1, score: 100};
      const mockResponse = {success: true, id: 1};
      Score.sendScore.mockResolvedValue(mockResponse);

      const response = await request(app).post("/scores/send").send(mockScoreData);

      expect(response.status).toBe(201);
      expect(response.body).toEqual(mockResponse);
    });

    it("should return a 400 status code if sending score fails due to validation error", async () => {
      const mockScoreData = {userId: 1, score: null}; // Invalid score data
      const mockError = new Error("Validation error");
      Score.sendScore.mockRejectedValue(mockError);

      const response = await request(app).post("/scores/send").send(mockScoreData);

      expect(response.status).toBe(400);
      expect(response.body).toEqual({error: "Validation error"});
    });

    it("should return a 500 status code if there is a server error", async () => {
      const mockScoreData = {userId: 1, score: 100};
      const mockError = new Error("Internal server error");
      Score.sendScore.mockRejectedValue(mockError);

      const response = await request(app).post("/scores/send").send(mockScoreData);

      expect(response.status).toBe(500);
      expect(response.body).toEqual({error: "Internal server error"});
    });
  });
});
