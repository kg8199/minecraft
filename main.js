let musicOn = false; // If we play music or sound
let buttonClick = new Audio("./assets/sounds/button.wav"); // Click sound
let music = new Audio("./assets/sounds/minecraft.mp3"); // Game music
music.loop = true;

let musicButton = document.getElementById("music-button");

musicButton.innerHTML = `<div class="button">Music: ${musicOn ? "On" : "Off"}</div>`;

musicButton.onclick = () => {
  buttonClick.currentTime = 0;
  buttonClick.play();

  musicOn = !musicOn;

  if (musicOn) {
    music.play();
  } else {
    music.pause();
  }

  musicButton.innerHTML = `<div class="button">Music: ${musicOn ? "On" : "Off"}</div>`;
};