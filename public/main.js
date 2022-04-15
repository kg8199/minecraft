let musicOn = false; // If we play music or sound
let audio = new Audio("../assets/sounds/button.wav"); // Click sound

let musicButton = document.getElementById("music-button");

musicButton.innerHTML = `<div class="button">Music: ${musicOn ? "On" : "Off"}</div>`;

musicButton.onclick = () => {
  audio.currentTime = 0;
  audio.play();
  musicOn = !musicOn;
  musicButton.innerHTML = `<div class="button">Music: ${musicOn ? "On" : "Off"}</div>`;
};