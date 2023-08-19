const refs = {
  startBtn: document.querySelector("button[data-start]"),
  stopBtn: document.querySelector("button[data-stop]"),
}
let currentColor = null;

refs.startBtn.addEventListener('click', onStartClick);
refs.stopBtn.addEventListener('click', onStopClick);

function onStartClick(evt) {
  currentColor = setInterval(() => {
    document.body.style.backgroundColor = getRandomHexColor();
  }, 1000)

  evt.currentTarget.setAttribute("disabled", "true");
}

function onStopClick() {
  clearInterval(currentColor);
  refs.startBtn.removeAttribute("disabled");
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
}