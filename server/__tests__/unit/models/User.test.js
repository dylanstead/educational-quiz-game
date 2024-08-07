const User = require("../../../models/User");
const db = require("../../../db/connect");

jest.mock("../../../db/connect");

describe("User model", () => {
  describe("getUsername", () => {
    it("should return the user if found", async () => {
      const mockResponse = {
        rows: [{username: "testuser", email: "test@example.com", password: "password"}],
      };
      db.query.mockResolvedValue(mockResponse);

      const result = await User.getUsername("testuser");

      expect(result).toEqual(new User(mockResponse.rows[0]));
      expect(db.query).toHaveBeenCalledWith("SELECT * FROM userDetail WHERE LOWER(username) = LOWER($1);", ["testuser"]);
    });

    it("should return null if no user is found", async () => {
      const mockResponse = {rows: []};
      db.query.mockResolvedValue(mockResponse);

      const result = await User.getUsername("unknownuser");

      expect(result).toBeNull();
    });
  });

  describe("create", () => {
    it("should create a new user and return the user instance", async () => {
      const mockData = {username: "testuser", email: "test@example.com", password: "password"};
      const mockDetailResponse = {rows: [{id: 1}]};
      const mockRegisterResponse = {rows: [{id: 1}]};

      db.query.mockResolvedValueOnce(mockDetailResponse).mockResolvedValueOnce(mockRegisterResponse);

      const result = await User.create(mockData);

      expect(result).toEqual(new User(mockData));
      expect(db.query).toHaveBeenCalledWith("INSERT INTO userdetail (username, password) VALUES ($1, $2) RETURNING id", ["testuser", "password"]);
      expect(db.query).toHaveBeenCalledWith("INSERT INTO userregistration (email, id) VALUES ($1, $2) RETURNING id;", ["test@example.com", 1]);
    });
  });
});
