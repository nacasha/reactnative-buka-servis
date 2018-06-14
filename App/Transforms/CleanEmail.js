import R from 'ramda'

export default (email) => {
  return R.replace(/\./g, '_', email)
}
