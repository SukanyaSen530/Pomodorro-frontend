export const getTimeRemaining = (secs) => {
  const minutes = Math.floor(secs / 60);
  const seconds = secs % 60;
  return `${minutes}m : ${seconds}s`;
};
