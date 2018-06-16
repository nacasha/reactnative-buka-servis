export default (data, storeInfo, userInfo) => {
  return data.docs.map(item => {
    const messageInfo = item.data()
    const filteredUserInfo = {
      _id: userInfo.uid,
      name: userInfo.name,
    }
    const filteredStoreInfo = {
      _id: storeInfo.uid,
      name: storeInfo.name,
    }

    const _id = item.id
    const user = storeInfo.uid == messageInfo.user._id
      ? filteredStoreInfo
      : filteredUserInfo

    return { _id, ...messageInfo, user}
  })
}
