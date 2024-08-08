// results.test.js
const { describe, it, expect, beforeEach } = require('@jest/globals');

// Mock localStorage
const localStorageMock = (() => {
  let store = {};
  return {
    getItem(key) {
      return store[key] || null;
    },
    setItem(key, value) {
      store[key] = value.toString();
    },
    clear() {
      store = {};
    }
  };
})();

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
});

beforeEach(() => {
  // Clear localStorage before each test
  window.localStorage.clear();

  // Set up the DOM elements required for the tests
  document.body.innerHTML = `
    <div class="score-value"></div>
  `;

  // Requiring the module here to ensure the DOM is set up before it runs
  jest.isolateModules(() => {
    require('../results');
  });
});

describe('results.js', () => {
  it('should display the correct score from localStorage', () => {
    window.localStorage.setItem('quizScore', '3');
    window.localStorage.setItem('totalRounds', '5');

    // Re-trigger DOMContentLoaded event
    document.dispatchEvent(new Event('DOMContentLoaded'));

    const scoreValueElement = document.querySelector('.score-value');
    expect(scoreValueElement.textContent).toBe('3 out of 5');
  });

  it('should display "Score data not available." if localStorage is empty', () => {
    // Re-trigger DOMContentLoaded event
    document.dispatchEvent(new Event('DOMContentLoaded'));

    const scoreValueElement = document.querySelector('.score-value');
    expect(scoreValueElement.textContent).toBe('Score data not available.');
  });
});
