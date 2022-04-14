/**
 * Function that plays a sound depending on the block we're adding, removing, opening, or closing
 */

const playSound = (id: string) => {
  // Get the audio element
  let audio = document.getElementById(id) as HTMLAudioElement;

  // Reset the timing
  audio.currentTime = 0;
  // Play
  audio.play();
};

export default playSound;