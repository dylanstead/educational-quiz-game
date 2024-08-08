import fetchMock from 'jest-fetch-mock';

fetchMock.enableMocks();

const BASE_URL = "https://educational-quiz-game-backend.onrender.com"; // Mock BASE_URL used in script.js
const { handleSubmit } = require('../script'); // Importing from your actual script

beforeEach(() => {
  fetch.resetMocks();
  document.body.innerHTML = `
    <div id="register-modal">
      <form>
        <input name="username" value="testuser"/>
        <input name="password" value="password"/>
        <button type="submit">Register</button>
      </form>
    </div>
    <div id="login-modal">
      <form>
        <input name="username" value="testuser"/>
        <input name="password" value="password"/>
        <button type="submit">Login</button>
      </form>
    </div>
  `;

  global.alert = jest.fn();
  global.console.error = jest.fn(); // Mock console.error to track error logs
  global.window = Object.create(window);
  Object.defineProperty(window, 'location', {
    value: {
      href: ''
    },
    writable: true
  });
});

describe('Registration Form', () => {
  test('handles registration successfully', async () => {
    fetch.mockResponseOnce(JSON.stringify({ success: true }), { status: 200 });

    const form = document.querySelector('#register-modal form');
    await handleSubmit({ preventDefault: () => {}, target: form });

    expect(fetch).toHaveBeenCalledWith(`${BASE_URL}/users/register`, expect.objectContaining({
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: 'testuser',
        password: 'password'
      })
    }));
    expect(alert).toHaveBeenCalledWith('Registration Successful!');
  });

  test('handles registration failure', async () => {
    fetch.mockResponseOnce(JSON.stringify({ error: 'Failed' }), { status: 400 });

    const form = document.querySelector('#register-modal form');
    await handleSubmit({ preventDefault: () => {}, target: form });

    expect(fetch).toHaveBeenCalled();
    expect(alert).toHaveBeenCalledWith(expect.stringContaining('Registration failed: Failed'));
  });
});

describe('Login Form', () => {
  test('handles login successfully', async () => {
    fetch.mockResponseOnce(JSON.stringify({ success: true }), { status: 200 });

    const form = document.querySelector('#login-modal form');
    await handleSubmit({ preventDefault: () => {}, target: form });

    expect(window.location.href).toBe('gamepage.html');
  });

  test('handles login failure', async () => {
    fetch.mockResponseOnce(JSON.stringify({ error: 'Login failed' }), { status: 400 });

    const form = document.querySelector('#login-modal form');
    await handleSubmit({ preventDefault: () => {}, target: form });

    expect(alert).toHaveBeenCalledWith(expect.stringContaining('Login failed: Login failed'));
  });
});

describe('Application Startup', () => {
  it('should initialize application correctly', () => {
    document.dispatchEvent(new Event('DOMContentLoaded'));
    expect(document.querySelector).toHaveBeenCalledWith("#register-modal form");
    // Verify other initial setups like attaching event listeners
  });

  it('should log errors if configuration is missing', () => {
    // Simulate a missing configuration
    delete global.config; // Assuming config is globally accessible
    document.dispatchEvent(new Event('DOMContentLoaded'));
    expect(console.error).toHaveBeenCalledWith(expect.stringContaining("config not found"));
  });
});


// Testing event handlers and initial setups
it('should attach event handlers correctly', () => {
  document.dispatchEvent(new Event('DOMContentLoaded'));
  expect(document.querySelector('#register-modal form').addEventListener).toHaveBeenCalledWith('submit', expect.any(Function));
});

// Testing dynamic DOM interaction
it('should update DOM elements correctly when an event occurs', () => {
  const form = document.querySelector('#register-modal form');
  const submitEvent = new Event('submit');
  jest.spyOn(form, 'addEventListener').mockImplementation((event, handler) => handler(submitEvent));
  document.dispatchEvent(new Event('DOMContentLoaded'));  // Trigger the DOMContentLoaded to set up the event listeners
  expect(global.alert).toHaveBeenCalledWith('Registration Successful!');  // Assuming an alert happens on successful registration
});
