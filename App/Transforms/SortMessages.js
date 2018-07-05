import R from 'ramda'

export default (messages = []) => {
  const sortByTime = R.sortWith([
    R.descend(R.prop('lastTimestamp'))
  ])

  return sortByTime(messages)
}
