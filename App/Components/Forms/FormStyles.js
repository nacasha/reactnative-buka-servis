import { Metrics, Colors, Fonts, ApplicationStyles } from '../../Themes'
import { StyleSheet } from 'react-native'

export default StyleSheet.create({
  input: {
    height: 75,
  },
  error: {
    height: 20,
    fontSize: Fonts.size.medium,
    color: Colors.error,
    textAlign: 'right'
  },
  mapContainer: {
    height: 100,
    marginVertical: Metrics.smallMargin,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  mapContainerFull: {
    height: '85%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  mapMarker: {
    position: 'absolute',
    bottom: '50%',
    width: 42,
    height: 42
  },
  modalFooter: {
    flex: 1,
    flexDirection: 'row',
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center'
  },
  label: {
    marginLeft: 1,
    fontSize: 15
  },
  textArea: {
    borderBottomWidth: 2,
    borderBottomColor: '#DDD'
  },
  categoryPicker: {
    marginVertical: Metrics.smallMargin,
    flexDirection: 'row',
    padding: Metrics.baseMargin,
    alignItems: 'center',
  },
  categoryText: {
    marginLeft: Metrics.smallMargin,
    color: '#777'
  }
})
