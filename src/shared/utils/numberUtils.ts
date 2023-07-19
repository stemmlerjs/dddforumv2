
export function generateRandomInteger(min: number, max: number) {
  return Math.floor(min + Math.random() * (max - min + 1));
}