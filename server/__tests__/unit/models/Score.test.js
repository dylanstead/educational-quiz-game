const Score = require("../../../models/Score");

describe("Score model", () => {
  describe("sendScore", () => {
    it("should return the saved score", async () => {
      const mockScoreData = {score: 100};
      const mockResponse = {id: 1, ...mockScoreData};

      const mockDatabaseFunction = jest.fn().mockResolvedValue(mockResponse);
      Score.sendScore = mockDatabaseFunction;

      const result = await Score.sendScore(mockScoreData);

      expect(result).toEqual(mockResponse);
      expect(mockDatabaseFunction).toHaveBeenCalledWith(mockScoreData);
    });
  });
});
