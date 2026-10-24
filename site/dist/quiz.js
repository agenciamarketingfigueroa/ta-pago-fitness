const steps = [...document.querySelectorAll('.quiz-step')];
const result = document.getElementById('quiz-result');
const back = document.getElementById('quiz-back');
const progressLabel = document.getElementById('quiz-progress-label');
const progressFill = document.getElementById('quiz-progress-fill');
let current = 0;
let started = false;
let completed = false;

function track(event, kind = 'trackCustom') {
  if (typeof window.fbq === 'function') window.fbq(kind, event);
}

function show(index) {
  current = index;
  steps.forEach((step, stepIndex) => { step.hidden = stepIndex !== index; });
  result.hidden = index !== steps.length;
  document.querySelector('.quiz-main').classList.toggle('is-result', index === steps.length);
  back.hidden = index === 0;
  progressLabel.textContent = index === steps.length ? 'QUIZ CONCLUÍDO' : `PERGUNTA ${String(index + 1).padStart(2, '0')} / ${steps.length}`;
  progressFill.style.width = `${Math.min(index + 1, steps.length) / steps.length * 100}%`;
  const title = index === steps.length ? document.getElementById('result-title') : steps[index].querySelector('h1, h2');
  title.setAttribute('tabindex', '-1');
  title.focus({ preventScroll: true });
  window.scrollTo({ top: 0, behavior: 'instant' });
}

steps.forEach((step, index) => {
  step.querySelectorAll('.quiz-answer').forEach(button => {
    button.addEventListener('click', () => {
      if (!started) { track('QuizStarted'); started = true; }
      if (index === steps.length - 1 && !completed) { track('QuizCompleted'); completed = true; }
      show(index + 1);
    });
  });
});

back.addEventListener('click', () => show(current - 1));
document.querySelector('.quiz-checkout').addEventListener('click', () => track('InitiateCheckout', 'track'));
