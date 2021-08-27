let timerId

export function debounce (callback, ms) {
  clearTimeout(timerId)
  timerId = setTimeout(callback, ms)
}

export function formatDate (dateString) {
  const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ]
  const date = new Date(dateString)
  return `${date.getDate()} ${
    monthNames[date.getMonth()]
  } ${date.getFullYear()} ${date.getHours()}:${
    date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()
  }`
}
