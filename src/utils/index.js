export const sleep = ms => {
  return new Promise(resolve => setTimeout(resolve, ms))
}

export const generateUniqueInt = () => {
  return Math.floor(Date.now() * Math.random())
}
