const {addNew} = require("../../../controllers/scores");
const Score = require("../../../models/Score");

jest.mock("../../../models/Score");

describe("addNew controller", () => {
  it("should save the score and return the result with a 201 status code", async () => {
    const req = {body: {score: 100}};
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    };

    const mockResponse = {id: 1, score: 100};
    Score.sendScore.mockResolvedValue(mockResponse);

    await addNew(req, res);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.send).toHaveBeenCalledWith(mockResponse);
  });

  it("should return a 400 status code if there is an error", async () => {
    const req = {body: {score: 100}};
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    const mockError = new Error("Invalid score");
    Score.sendScore.mockRejectedValue(mockError);

    await addNew(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({error: mockError.message});
  });
});
