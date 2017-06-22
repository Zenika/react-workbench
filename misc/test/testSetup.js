// Make console.error a real failure
console.error = (message) => { // eslint-disable-line no-console
  throw new Error(message)
}
