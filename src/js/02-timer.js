import flatpickr from "flatpickr";
import Notiflix from "notiflix";
import "flatpickr/dist/flatpickr.min.css";

const refs = {
  startBtn: document.querySelector("button[data-start]"),
  seconds: document.querySelector('[data-seconds]'),
  minutes: document.querySelector('[data-minutes]'),
  hours: document.querySelector('[data-hours]'),
  days: document.querySelector('[data-days]'),
}

let timer = null;
let selectedDates = null;
refs.startBtn.setAttribute('disabled', 'true');
refs.startBtn.addEventListener('click', (evt) => {
  onTimerUpdate(selectedDates)
  evt.currentTarget.setAttribute('disabled', 'true');
  timer = setInterval(() => onTimerUpdate(selectedDates), 1000)
});

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose,
};

flatpickr("#datetime-picker", options);

function onClose(dates) {
  if (dates[0] - Date.now() < 0) {
    Notiflix.Notify.failure("Please choose a date in the future");
    refs.startBtn.setAttribute('disabled', 'true');
    return;
  }
  
  selectedDates = dates;
  refs.startBtn.removeAttribute('disabled');
}

function onTimerUpdate(selectedDates) {
  const time = selectedDates[0] - Date.now();
  console.log(time)
  if (time / 1000 < 0) {
    clearInterval(timer);
    return;
  }
      
  const { days, hours, minutes, seconds } = convertMs(time);
  refs.seconds.textContent = seconds;
  refs.minutes.textContent = minutes;
  refs.hours.textContent = hours;
  refs.days.textContent = days;
}

function addLeadingZero(value) {
  return String(value).padStart(2, "0");
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = addLeadingZero(Math.floor(ms / day));
  // Remaining hours
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));

  return { days, hours, minutes, seconds };
}
