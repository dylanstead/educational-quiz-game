const {login, register} = require("../../../controllers/users");
const User = require("../../../models/User");

jest.mock("../../../models/User");

describe("User Controller", () => {
  describe("register", () => {
    it("should create a new user and return the result with a 201 status code", async () => {
      const req = {body: {username: "testuser", email: "test@example.com", password: "password"}};
      const res = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn(),
      };

      const mockResponse = {username: "testuser", email: "test@example.com", password: "password"};
      User.create.mockResolvedValue(mockResponse);

      await register(req, res);

      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.send).toHaveBeenCalledWith(mockResponse);
    });

    it("should return a 400 status code if there is an error", async () => {
      const req = {body: {username: "testuser", email: "test@example.com", password: "password"}};
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      const mockError = new Error("Invalid data");
      User.create.mockRejectedValue(mockError);

      await register(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({error: mockError.message});
    });
  });

  describe("login", () => {
    it("should login the user and return the user data with a 200 status code", async () => {
      const req = {body: {username: "testuser", password: "password"}};
      const res = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn(),
      };

      const mockUser = {username: "testuser", email: "test@example.com", password: "password"};
      User.getUsername.mockResolvedValue(mockUser);

      await login(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.send).toHaveBeenCalledWith(mockUser);
    });

    it("should return a 400 status code if the user is not found", async () => {
      const req = {body: {username: "unknown", password: "password"}};
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      User.getUsername.mockResolvedValue(null);

      await login(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({error: "User not found"});
    });
  });
});
   