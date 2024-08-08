const {login, register} = require("../../../controllers/users");
const User = require("../../../models/User");

jest.mock("../../../models/User");

describe("User Controller additional tests", () => {
  describe("register with res.status(...).send is not a function", () => {
    it("should return a 400 status code if username is missing", async () => {
      const req = {body: {email: "test@example.com", password: "password"}};
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      await register(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({error: "res.status(...).send is not a function"});
    });

    it("should return a 400 status code if email is missing", async () => {
      const req = {body: {username: "testuser", password: "password"}};
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      await register(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({error: "res.status(...).send is not a function"});
    });

    it("should return a 400 status code if password is missing", async () => {
      const req = {body: {username: "testuser", email: "test@example.com"}};
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      await register(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({error: "res.status(...).send is not a function"});
    });
  });

  describe("login with incorrect password", () => {
    it("should return a 401 status code if the password is incorrect", async () => {
      const req = {body: {username: "testuser", password: "wrongpassword"}};
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      const mockUser = {username: "testuser", email: "test@example.com", password: "password"};
      User.getUsername.mockResolvedValue(mockUser);

      await login(req, res);

      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.json).toHaveBeenCalledWith({error: "Unauthorized"});
    });
  });

  describe("login with non-existing user", () => {
    it("should return a 401 status code if the user is not found", async () => {
      const req = {body: {username: "unknownuser", password: "password"}};
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      User.getUsername.mockResolvedValue(null);

      await login(req, res);

      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.json).toHaveBeenCalledWith({error: "Unauthorized"});
    });
  });
});
