/*
 * Delays the processing of the given callback function until the user
 * has stopped calling said function for a predetermined amount of time.
 */
export default function debounce(callback, wait) {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = window.setTimeout(() => callback(...args), wait);
  };
}
