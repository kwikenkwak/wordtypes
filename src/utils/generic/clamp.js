export const clamp = (value, min, max) => {
  return value > max ? max : (value < min ? min : value)
}
