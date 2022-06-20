export const spaceNumber = (num) =>
  String(num).replace(/(\d)(?=(\d{3})+$)/g, '$1 ')
