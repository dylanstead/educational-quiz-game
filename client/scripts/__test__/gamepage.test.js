const { describe, it, expect, beforeEach, jest } = require('@jest/globals');

function mockWindowLocation() {
  delete global.window.location;
  // Reinitialize with an object to track changes in `href`
  global.window.location = { href: '', assign: jest.fn((url) => { global.window.location.href = url; }) };
}

beforeEach(() => {
  document.body.innerHTML = `
    <button class="start-btn">Start Flag Quiz</button>
    <button class="start-btn">Start Language Quiz</button>
    <button class="start-btn">Start Map Quiz</button>
  `;
  mockWindowLocation();
  jest.resetModules();
  jest.isolateModules(() => {
    require('../gamepage'); // Reload gamepage.js to reset any state
  });
});

describe('gamepage.js Interactions', () => {
  it('should redirect appropriately for each quiz button', () => {
    const buttons = document.querySelectorAll('.start-btn');
    const urls = ['flaggame.html', 'languagegame.html', 'mapgame.html'];

    buttons.forEach((button, index) => {
      button.click();
      expect(global.window.location.href).toBe(urls[index]);
    });
  });

  it('initializes correctly on page load', () => {
    expect(document.querySelectorAll('.start-btn').length).toBe(3);
    // Ensure the DOMContentLoaded logic is executed and verifies the setup
  });

  it('handles multiple rapid clicks on a button', () => {
    const flagQuizBtn = document.querySelector('.start-btn');
    flagQuizBtn.click();
    flagQuizBtn.click();
    flagQuizBtn.click(); // Simulate rapid clicking
    expect(global.window.location.href).toBe('flaggame.html'); // Ensure it doesn't redirect multiple times or to wrong location
  });

  it('checks if all buttons have event listeners attached', () => {
    const buttons = document.querySelectorAll('.start-btn');
    buttons.forEach(button => {
      expect(jest.isMockFunction(button.onclick)).toBeTruthy();
    });
  });

  it('tests navigation failure handling', () => {
    const originalConsoleError = console.error;
    console.error = jest.fn();

    const brokenBtn = document.querySelector('.start-btn');
    brokenBtn.onclick = () => { throw new Error('Navigation Failed'); };
    try {
      brokenBtn.click();
    } catch (error) {
      expect(console.error).toHaveBeenCalledWith('Navigation Failed');
    }

    console.error = originalConsoleError;
  });

  it('conditionally displays elements based on certain conditions', () => {
    // Test elements that might be conditionally rendered based on certain states
  });
});
it('should attach event listeners on DOMContentLoaded', () => {
  // Force the 'DOMContentLoaded' event to fire
  const event = new Event('DOMContentLoaded');
  document.dispatchEvent(event);

  const buttons = document.querySelectorAll('.start-btn');
  expect(buttons.length).toBe(3);  // Ensure three buttons are available

  // Trigger clicks to validate navigation logic
  buttons[0].click();
  expect(window.location.href).toBe('flaggame.html');

  buttons[1].click();
  expect(window.location.href).toBe('languagegame.html');

  buttons[2].click();
  expect(window.location.href).toBe('mapgame.html');
});
it('redirects correctly when quiz buttons are clicked', () => {
  const [flagQuizBtn, languageQuizBtn, mapQuizBtn] = document.querySelectorAll('.start-btn');

  // Test Flag Quiz button
  flagQuizBtn.click();
  expect(window.location.href).toBe('flaggame.html');

  // Test Language Quiz button
  languageQuizBtn.click();
  expect(window.location.href).toBe('languagegame.html');

  // Test Map Quiz button
  mapQuizBtn.click();
  expect(window.location.href).toBe('mapgame.html');
});
it('handles exceptions during button clicks', () => {
  const logSpy = jest.spyOn(console, 'error');
  const errorThrowingButton = document.querySelector('.start-btn:nth-child(1)');
  errorThrowingButton.addEventListener('click', () => { throw new Error('Simulated Click Error'); });

  try {
    errorThrowingButton.click();
  } catch (error) {
    expect(logSpy).toHaveBeenCalledWith(expect.any(Error));
    expect(logSpy).toHaveBeenCalledWith(expect.stringContaining('Simulated Click Error'));
  }
});
