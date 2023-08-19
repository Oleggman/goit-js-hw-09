import Notiflix from "notiflix";

const refs = {
  form: document.querySelector('.form'),
}

refs.form.addEventListener('submit', onSubmit);

function onSubmit(evt) {
  evt.preventDefault();
  
  let delay = Number(refs.form.elements.delay.value);
  const step = Number(refs.form.elements.step.value);
  const amount = Number(refs.form.elements.amount.value);
  let counter = 1;
  
  for (let i = 0; i < amount; i++) {
    createPromise(counter, delay).then(onResolve).catch(onReject);
    counter += 1;
    delay += step;
  }
}

function onResolve({ position, delay }) {
  Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
}

function onReject({ position, delay }) {
  Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
}
  
function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve({position, delay});
      } else {
        reject({ position, delay });
      } 
    }, delay);
  });
}
