import Polyline from '@mapbox/polyline';
import { all, put, select, takeLatest } from 'redux-saga/effects';
import DirectionActions, { DirectionTypes } from '../Redux/DirectionRedux';
import { GeoLocationSelectors } from '../Redux/GeoLocationRedux';

export function* fetchDirection({ storeLocation, storeId }) {
  const GOOGLE_MAPS_APIKEY = 'AIzaSyB87wxGyZZtnFPqkUFSUrXtByjx3BgZgB8'
  const userCoords = yield select(GeoLocationSelectors.getCoords)

  const origin = userCoords.latitude + ',' + userCoords.longitude
  const destination = storeLocation.latitude + ',' + storeLocation.longitude

  try {
    let resp = yield fetch(`https://maps.googleapis.com/maps/api/directions/json?origin=${origin}&destination=${destination}&key=${GOOGLE_MAPS_APIKEY}`)
    let respJson = yield resp.json();
    let points = Polyline.decode(respJson.routes[0].overview_polyline.points);
    let coords = points.map((point) => {
      return {
        latitude: point[0],
        longitude: point[1]
      }
    })

    yield put(DirectionActions.fetchSuccess(coords, storeId))
  } catch (error) {
    return error
  }
}
