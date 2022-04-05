/**
 * Picks a random number in a certain range
 */

const randRange = (min: number, max: number) => {
  min = Math.ceil(min);
  max = Math.ceil(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export default randRange;