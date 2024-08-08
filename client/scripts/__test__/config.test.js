const { describe, it, expect } = require('@jest/globals');
const config = require('../config'); // Ensure the correct import path

describe('config', () => {
  it('should be defined', () => {
    expect(config).toBeDefined();
  });

  it('should have an API_URL property', () => {
    expect(config.API_URL).toBeDefined();
    expect(typeof config.API_URL).toBe('string');
  });

  it('should have the correct API_URL', () => {
    expect(config.API_URL).toBe('https://educational-quiz-game-backend.onrender.com');
  });
});
