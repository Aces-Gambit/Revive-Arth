// // quiz.js
// document.addEventListener('DOMContentLoaded', () => {
//     let currentQuestion = 1;
//     const quizBodies = document.querySelectorAll('.quiz__body');
//     const totalQuestions = quizBodies.length;
  
//     document.body.addEventListener('click', (event) => {
//       const button = event.target.closest('button[data-quiz-action]');
//       if (!button) return;
  
//       const quizAction = button.getAttribute('data-quiz-action');
//       if (quizAction) {
//         handleQuizAction(button, quizAction);
//       }
//     });
  
//     function handleQuizAction(button, quizAction) {
//       switch (quizAction) {
//         case 'next-question':
//           navigateToQuestion(currentQuestion + 1);
//           break;
//         case 'prev-question':
//           navigateToQuestion(currentQuestion - 1);
//           break;
//         case 'finish-quiz':
//           // Implement quiz completion logic here
//           alert('Quiz completed!');
//           break;
//       }
//     }
  
//     function navigateToQuestion(newQuestion) {
//         console.log("currentQuestion: " + currentQuestion);
//         console.log("newQuestion: " + newQuestion);
//         console.log("totalQuestions: " + totalQuestions);
//       if (newQuestion < 1 || newQuestion > totalQuestions || newQuestion === currentQuestion){  
//         console.log("question is out of range"); 
//         return;
//       }
//       const currentQuestionEl = document.querySelector(`.quiz__body[data-question="${currentQuestion}"]`);
//       const newQuestionEl = document.querySelector(`.quiz__body[data-question="${newQuestion}"]`);
  
//       const isForward = newQuestion > currentQuestion;
//       const exitDirection = isForward ? 'left' : 'right';
//       const enterDirection = isForward ? 'right' : 'left';
  
//       animateQuizTransition(currentQuestionEl, newQuestionEl, exitDirection, enterDirection);
//       currentQuestion = newQuestion;
//     }
  
//     function animateQuizTransition(currentEl, newEl, exitDir, enterDir) {
//       currentEl.setAttribute('data-quiz-animation', `exit-${exitDir}`);
  
//       currentEl.addEventListener('animationend', function onExit() {
//         currentEl.removeEventListener('animationend', onExit);
//         currentEl.setAttribute('data-visible', 'hidden');
//         currentEl.removeAttribute('data-quiz-animation');
  
//         newEl.setAttribute('data-visible', `stage-${enterDir}`);
//         requestAnimationFrame(() => {
//           newEl.setAttribute('data-quiz-animation', `enter-${enterDir}`);
//         });
  
//         newEl.addEventListener('animationend', function onEnter() {
//           newEl.removeEventListener('animationend', onEnter);
//           newEl.setAttribute('data-visible', 'active');
//           newEl.removeAttribute('data-quiz-animation');
//         });
//       });
//     }
//   });

// quiz.js
document.addEventListener('DOMContentLoaded', () => {
  let currentQuestion = 1;
  const quizBodies = document.querySelectorAll('[data-question]');
  const totalQuestions = quizBodies.length;

  document.body.addEventListener('click', (event) => {
      console.log('Click event detected on:', event.target);

      // Ignore clicks on input elements to prevent duplicate handling
      if (event.target.matches('input')) {
          console.log('Click event on input element, ignoring to prevent duplicate handling.');
          return;
      }

      const targetElement = event.target.closest('button[data-quiz-action], [data-question] .quiz__options label');
      if (!targetElement) {
          console.log('No relevant target element found.');
          return;
      }

      console.log('Target element:', targetElement);

      if (targetElement.matches('button[data-quiz-action]')) {
          const quizAction = targetElement.getAttribute('data-quiz-action');
          console.log('Button clicked with quiz action:', quizAction);

          if (quizAction) {
              handleQuizAction(quizAction);
          }
      } else if (targetElement.matches('[data-question] .quiz__options label')) {
          console.log('Label clicked:', targetElement);

          const quizBody = targetElement.closest('[data-question]');
          if (quizBody) {
              const quizAction = quizBody.getAttribute('data-quiz-action');
              console.log('Quiz action from quiz body:', quizAction);

              if (quizAction) {
                  handleQuizAction(quizAction);
              }
          }
      }
  });

  function handleQuizAction(quizAction) {
      console.log('Handling quiz action:', quizAction);

      switch (quizAction) {
          case 'next-question':
              navigateToQuestion(currentQuestion + 1);
              break;
          case 'prev-question':
              navigateToQuestion(currentQuestion - 1);
              break;
          case 'finish-quiz':
              // Implement quiz completion logic here
              toggleSubmitButtonVisibility(true);
              break;
          default:
              console.log('Unknown quiz action:', quizAction);
      }
  }

  function navigateToQuestion(newQuestion) {
      console.log('Navigating from question', currentQuestion, 'to', newQuestion);

      if (newQuestion < 1 || newQuestion > totalQuestions || newQuestion === currentQuestion) {
          console.log('Invalid new question number:', newQuestion);
          return;
      }

      const currentQuestionEl = document.querySelector(`[data-question="${currentQuestion}"]`);
      const newQuestionEl = document.querySelector(`[data-question="${newQuestion}"]`);

      const isForward = newQuestion > currentQuestion;
      const exitDirection = isForward ? 'left' : 'right';
      const enterDirection = isForward ? 'right' : 'left';

      console.log('Animating transition:', {
          from: currentQuestionEl,
          to: newQuestionEl,
          exitDirection,
          enterDirection,
      });

      animateQuizTransition(currentQuestionEl, newQuestionEl, exitDirection, enterDirection);
      currentQuestion = newQuestion;
  }

  function animateQuizTransition(currentEl, newEl, exitDir, enterDir) {
      currentEl.setAttribute('data-quiz-animation', `exit-${exitDir}`);

      currentEl.addEventListener('animationend', function onExit() {
          console.log('Animation ended for exiting element:', currentEl);
          currentEl.removeEventListener('animationend', onExit);
          currentEl.setAttribute('data-visible', 'hidden');
          currentEl.removeAttribute('data-quiz-animation');

          newEl.setAttribute('data-visible', `stage-${enterDir}`);
          requestAnimationFrame(() => {
              newEl.setAttribute('data-quiz-animation', `enter-${enterDir}`);
          });

          newEl.addEventListener('animationend', function onEnter() {
              console.log('Animation ended for entering element:', newEl);
              newEl.removeEventListener('animationend', onEnter);
              newEl.setAttribute('data-visible', 'active');
              newEl.removeAttribute('data-quiz-animation');
          });
      });
  }
  function toggleSubmitButtonVisibility(show) {
    const submitButton = document.querySelector('.quiz__submit');
    console.log(submitButton);
    if (submitButton) {
        submitButton.setAttribute('data-visible', show ? 'active' : 'hidden');
    }
  }
});