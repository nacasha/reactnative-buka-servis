import { Toast } from 'native-base'

export default (type, text, duration = 2500) => {
  Toast.show({
    text,
    type,
    duration,
    buttonText: 'Close',
  })
}
