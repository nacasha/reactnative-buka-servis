export default (data, withKey = true) => {
  return data.docs.map(item => {

    if (withKey) {
      const key = item.id

      return { key, ...item.data() }
    }

    return item.data()
  })
}
