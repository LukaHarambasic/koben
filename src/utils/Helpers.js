export function formatTime(initialMilliseconds) {
  const seconds = Math.floor(initialMilliseconds / 1000)
  const secondsPadding = seconds < 10 ? seconds.toString().padStart(1, '0') : seconds
  const milliseconds = Math.floor(initialMilliseconds % 100)
  const millisecondsPadding = milliseconds < 10 ? milliseconds.toString().padStart(1, '0') : milliseconds
  return `${secondsPadding}.${millisecondsPadding}`
}
