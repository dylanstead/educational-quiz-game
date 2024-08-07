const request = require("supertest");
const app = require("../../app");
const {resetTestDB} = require("./config");

describe("Score API Endpoints", () => {
  let api;

  beforeEach(async () => {
    await resetTestDB();
  });

  beforeAll(() => {
    api = app.listen(4000, () => {
      console.log("Test server running on port 4000");
    });
  });

  afterAll((done) => {
    console.log("Gracefully closing server");
    api.close(done);
  });
});
