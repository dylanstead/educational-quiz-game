const { describe, expect, beforeEach, jest } = require('@jest/globals');
const fetchMock = require('jest-fetch-mock');

fetchMock.enableMocks();

// Assuming the module exports are as described previously
const flaggame = require('../flaggame');

beforeEach(() => {
    jest.resetAllMocks(); // Resets both the state and the implementation of all mocks
    fetch.resetMocks();   // Clear any previously set mock responses

    // Mock implementation for global methods if needed
    document.getElementById = jest.fn().mockImplementation((id) => {
        return { textContent: '' };
    });
    document.querySelector = jest.fn().mockImplementation((selector) => {
        if (selector === ".card-img-top") {
            return { src: '', alt: '' };
        }
        return { textContent: '', onclick: jest.fn(), classList: { add: jest.fn(), remove: jest.fn() } };
    });
    document.querySelectorAll = jest.fn().mockImplementation((selector) => {
        return [{
            textContent: '',
            onclick: jest.fn(),
            classList: { add: jest.fn(), remove: jest.fn() }
        }];
    });
    window.location.href = ''; // Mock location object if used
});

describe('fetchCountries', () => {
    it('fetches countries successfully and calls startGame', async () => {
        const mockCountries = [{ name: { common: 'CountryName' }, flags: { svg: 'flag.svg' } }];
        fetch.mockResponseOnce(JSON.stringify(mockCountries));

        await flaggame.fetchCountries();

        expect(fetch).toHaveBeenCalledWith("https://restcountries.com/v3.1/all");
        expect(flaggame.countries).toEqual(mockCountries);
        expect(flaggame.startGame).toHaveBeenCalled();
    });

    it('handles fetch failure gracefully', async () => {
        fetch.mockReject(new Error('API failure'));

        await flaggame.fetchCountries();

        expect(flaggame.startGame).not.toHaveBeenCalled();
    });
});

describe('game mechanics', () => {
    beforeEach(() => {
        // Reset game state for each test
        flaggame.score = 0;
        flaggame.round = 0;
        flaggame.firstAttempt = true;
        flaggame.countries = [{ name: { common: 'CountryName' }, flags: { svg: 'flag.svg' } }];
    });

    it('starts the game and processes rounds', () => {
        flaggame.startGame();
        expect(flaggame.nextRound).toHaveBeenCalled();
    });

    it('handles next round correctly', () => {
        flaggame.nextRound();
        expect(document.getElementById).toHaveBeenCalledWith("round-count");
        expect(flaggame.displayFlagAndAnswers).toHaveBeenCalled();
    });

    it('completes the game after last round', () => {
        flaggame.round = flaggame.totalRounds; // Set to last round
        flaggame.nextRound();
        expect(flaggame.displayScore).toHaveBeenCalled();
    });
});

describe('interaction with UI', () => {
    it('checks and updates answers correctly', () => {
        const button = {
            textContent: 'CorrectAnswer',
            classList: { add: jest.fn(), remove: jest.fn() }
        };
        flaggame.currentCountry = { name: { common: 'CorrectAnswer' } };

        flaggame.checkAnswer(button);

        expect(button.classList.add).toHaveBeenCalledWith('correct');
        expect(flaggame.score).toBe(1); // Score should increase on first correct attempt
    });
});

describe('Flaggame Functionality', () => {
    it('should handle an empty country list', async () => {
      fetch.mockResponseOnce(JSON.stringify([]), { status: 200 });
      await flaggame.fetchCountries();
      expect(flaggame.startGame).not.toHaveBeenCalled(); // Assuming startGame should not be called if no countries
    });
  
    it('should handle fetch errors gracefully', async () => {
      fetch.mockReject(new Error('Network error'));
      await flaggame.fetchCountries();
      expect(console.error).toHaveBeenCalledWith(expect.stringContaining('Network error'));
    });
  
    it('should process final round correctly', () => {
      flaggame.round = flaggame.totalRounds - 1; // Set to last round
      flaggame.nextRound();
      expect(flaggame.displayScore).toHaveBeenCalled(); // Assuming this is the function to show scores
    });
  });

  // Assuming an asynchronous function fetchCountries that might fail
it('should handle failure in fetchCountries gracefully', async () => {
    fetch.mockReject(new Error('Network error'));  // Simulate a network failure
    await flaggame.fetchCountries();
    expect(console.error).toHaveBeenCalledWith('Network error');  // Check if the error is logged correctly
  });
  
  // Testing conditional logic inside a function
  it('should correctly handle empty country list', async () => {
    fetch.mockResponseOnce(JSON.stringify([]));  // Simulate an empty array response
    await flaggame.fetchCountries();
    expect(flaggame.countries).toEqual([]);  // Ensure countries is set to an empty array
    expect(flaggame.startGame).not.toHaveBeenCalled();  // startGame should not be called
  });

  describe('Flaggame.js Full Coverage Tests', () => {
    beforeEach(() => {
        jest.resetAllMocks(); // Resets mocks before each test
        fetch.resetMocks();
        flaggame.score = 0;
        flaggame.round = 0;
        flaggame.firstAttempt = true;
        flaggame.countries = [];
    });

    it('fetches countries and initializes game with valid data', async () => {
        const countriesData = [{ name: { common: 'France' }, flags: { svg: 'fr.svg' } }];
        fetch.mockResponseOnce(JSON.stringify(countriesData));
        await flaggame.fetchCountries();
        expect(fetch).toHaveBeenCalledTimes(1);
        expect(flaggame.countries).toHaveLength(1);
        expect(flaggame.startGame).toHaveBeenCalledTimes(1);
    });

    it('handles case when zero countries are returned', async () => {
        fetch.mockResponseOnce(JSON.stringify([]));
        await flaggame.fetchCountries();
        expect(flaggame.countries).toHaveLength(0);
        expect(flaggame.startGame).not.toHaveBeenCalled();
    });

    it('handles fetch failure due to network issues', async () => {
        fetch.mockReject(new Error('Network Error'));
        await flaggame.fetchCountries();
        expect(flaggame.startGame).not.toHaveBeenCalled();
    });

    it('processes rounds and handles game over correctly', () => {
        // Simulate playing through all rounds
        flaggame.countries = [{ name: { common: 'Germany' }, flags: { svg: 'de.svg' } }, { name: { common: 'Italy' }, flags: { svg: 'it.svg' } }];
        for (let i = 0; i < flaggame.totalRounds; i++) {
            flaggame.nextRound();
        }
        expect(flaggame.round).toBe(flaggame.totalRounds);
        expect(flaggame.displayScore).toHaveBeenCalled();
    });

    it('updates UI correctly in each round', () => {
        flaggame.countries = [{ name: { common: 'Spain' }, flags: { svg: 'es.svg' } }];
        flaggame.nextRound();
        expect(document.getElementById).toHaveBeenCalledWith('round-count');
        expect(document.querySelector).toHaveBeenCalled(); // Ensure DOM methods are called
    });

    it('validates correct answers and updates score', () => {
        flaggame.countries = [{ name: { common: 'Japan' }, flags: { svg: 'jp.svg' } }];
        flaggame.currentCountry = flaggame.countries[0];
        const fakeButton = { textContent: 'Japan', classList: { add: jest.fn(), remove: jest.fn() } };
        flaggame.checkAnswer(fakeButton);
        expect(fakeButton.classList.add).toHaveBeenCalledWith('correct');
        expect(flaggame.score).toBe(1);
    });

    it('validates incorrect answers without updating score', () => {
        flaggame.countries = [{ name: { common: 'Japan' }, flags: { svg: 'jp.svg' } }, { name: { common: 'China' }, flags: { svg: 'cn.svg' } }];
        flaggame.currentCountry = flaggame.countries[0];
        const fakeButton = { textContent: 'China', classList: { add: jest.fn(), remove: jest.fn() } };
        flaggame.checkAnswer(fakeButton);
        expect(fakeButton.classList.add).toHaveBeenCalledWith('incorrect');
        expect(flaggame.score).toBe(0); // Score should not increase
    });
});
describe('Flaggame Functionality Coverage Tests', () => {
    beforeEach(() => {
        jest.resetAllMocks(); // Resets mocks before each test
        fetch.resetMocks();
        document.body.innerHTML = ''; // Reset the DOM
        window.location.href = ''; // Reset the location href
        flaggame.score = 0;
        flaggame.round = 0;
        flaggame.firstAttempt = true;
        flaggame.countries = [];
    });

    // Assuming line 9 is part of DOMContentLoaded setup
    it('initializes correctly on DOMContentLoaded', () => {
        document.dispatchEvent(new Event('DOMContentLoaded'));
        expect(flaggame.countries.length).toBe(0); // Initial countries should be empty before fetching
    });

    // Lines 49-65 might be part of fetchCountries function handling
    it('fetches countries and initializes game with valid data', async () => {
        const countriesData = [{ name: { common: 'France' }, flags: { svg: 'fr.svg' } }];
        fetch.mockResponseOnce(JSON.stringify(countriesData));
        await flaggame.fetchCountries();
        expect(fetch).toHaveBeenCalledTimes(1);
        expect(flaggame.countries).toHaveLength(1);
        expect(flaggame.startGame).toHaveBeenCalledTimes(1);
    });

    // Lines 73-91 could involve branching logic in startGame or nextRound
    it('processes rounds and handles game over correctly', () => {
        // Simulate playing through all rounds
        flaggame.countries = [{ name: { common: 'Germany' }, flags: { svg: 'de.svg' } }, { name: { common: 'Italy' }, flags: { svg: 'it.svg' } }];
        while (flaggame.round < flaggame.totalRounds) {
            flaggame.nextRound();
        }
        expect(flaggame.round).toBe(flaggame.totalRounds);
        expect(flaggame.displayScore).toHaveBeenCalled();
    });

    // Testing displayScore function specifically for lines 112-113
    it('displays final score and handles data submission', async () => {
        flaggame.score = 3;
        flaggame.totalRounds = 5;
        localStorage.setItem('userId', '123');
        fetch.mockResponseOnce(JSON.stringify({ success: true }), { status: 200 });
        await flaggame.displayScore();
        expect(window.location.href).toBe('resultspage.html');
        expect(fetch).toHaveBeenCalledWith(expect.any(String), expect.any(Object));
    });

    // Error handling tests for fetchCountries
    it('should handle fetch errors gracefully', async () => {
        fetch.mockReject(new Error('Network error'));
        await flaggame.fetchCountries();
        expect(console.error).toHaveBeenCalledWith(expect.stringContaining('Network error'));
        expect(flaggame.startGame).not.toHaveBeenCalled();
    });
});

  