import { StyleSheet } from 'react-native'

export default StyleSheet.create({
  container: {
    width: 130,
    paddingHorizontal: 10,
    paddingVertical: 7,
    borderRadius: 5,
    backgroundColor: '#6EBBFF',
    elevation: 3,
    marginVertical: 5,
    marginHorizontal: 3,
    flexDirection: 'row'
  },
  text: {
    fontWeight: 'bold',
    fontSize: 14,
    color: '#FFF'
  },
  icon: {
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'center'
  }
})
