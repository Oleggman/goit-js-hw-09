import Notiflix from "notiflix";

const refs = {
  form: document.querySelector('.form'),
}

refs.form.addEventListener('submit', onSubmit);

function onSubmit(evt) {
  evt.preventDefault();
  let counter = 1;
  let delay = Number(refs.form.elements.delay.value);
  
  for (let i = 0; i < Number(refs.form.elements.amount.value); i++) {
    createPromise(counter, delay).then(onResolve).catch(onReject);
    counter += 1;
    delay += Number(refs.form.elements.step.value);
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
