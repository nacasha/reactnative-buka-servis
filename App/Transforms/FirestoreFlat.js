export default (data) => {
  return data.docs.map(item => {
    const key = item.id

    return { key, ...item.data()}
  })
}
