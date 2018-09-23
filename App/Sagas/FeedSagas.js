import { put, call, all, select, takeLatest } from 'redux-saga/effects'
import FeedActions, { FeedTypes } from '../Redux/FeedRedux'
import StoreActions, { StoreSelectors } from '../Redux/StoreRedux'
import FirestoreFlat from '../Transforms/FirestoreFlat';
import { rsf, firestore } from '../Services/ReduxSagaFirebase'

export function* getUserInfo(userID) {
  const user = yield call(
    rsf.firestore.getCollection,
    firestore.collection('users').doc(userID)
  )

  return { ...user.data(), uid: user.id }
}

export function* getFeedRating(serviceId) {
  const ratings = yield call(
    rsf.firestore.getCollection,
    firestore.collection('services').doc(serviceId).collection('ratings')
  )

  const ratingData = FirestoreFlat(ratings)
  const ratingCount = ratingData.length
  let rating = 0
  ratingData.map(r => rating += r.rating)
  rating /= ratingCount

  return { rating, ratingCount }
}

export function* feedsRequest(action) {
  try {
    const feedsDocument = yield call(
      rsf.firestore.getCollection,
      firestore.collection('services').orderBy('createdAt', 'desc').limit(10),
    )

    const feeds = yield all(feedsDocument.docs.map(function* (item) {
      // fetch store data from firebase
      const userId = item.data().user
      const storeInfo = yield select(StoreSelectors.getStore)

      if (storeInfo[userId] === undefined) {
        const info = yield call(getUserInfo, userId)
        yield put(StoreActions.storeSuccess({ info }, userId))
      }

      // fetch rating data from firebase
      const key = item.id
      const rating = yield call(getFeedRating, key)

      return { ...item.data(), ...rating, key }
    }))

    yield put(FeedActions.feedSuccess(feeds))
  }
  catch (error) {
    yield put(FeedActions.feedFailure(error))
  }
}
