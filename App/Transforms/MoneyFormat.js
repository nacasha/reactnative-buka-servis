export default (price) => {
  return Number(price).toFixed().replace(/(\d)(?=(\d{3})+(,|$))/g, '$1.')
}
