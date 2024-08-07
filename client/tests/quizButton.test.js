/**
 * @jest-environment jsdom
 */

describe('Flag Quiz Button Handling', () => {
    beforeEach(() => {
      document.body.innerHTML = `
        <div>
          <button class="bi-flag-fill">Quiz</button>
        </div>
      `;
  
      // Your script logic for the quiz button
      const flagQuizButton = document.querySelector('.bi-flag-fill')?.parentNode;
      if (flagQuizButton) {
        flagQuizButton.addEventListener('click', () => {
          window.location.href = 'quizpage.html'; // Redirect to quiz page
        });
      } else {
        console.error('Flag Quiz Button Not Found');
      }
    });
  
    test('should redirect to quiz page on button click', () => {
      const flagQuizButton = document.querySelector('.bi-flag-fill');
  
      // Mock window location
      delete window.location;
      window.location = { href: '', assign: jest.fn() };
  
      // Simulate the click event
      flagQuizButton.click();
  
      // Assert the expected URL change
      expect(window.location.href).toBe('quizpage.html');
    });
  });
  
  

