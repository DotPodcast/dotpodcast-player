import { call, put } from 'redux-saga/effects';
import { actions } from '../reducers/user';
import {
  handlePendingSignIn,
  loadUserData
} from 'blockstack';

export function* handleLoginCallback() {
  try {
    const userData = yield call(handlePendingSignIn);
    yield put(actions.loadUserDetails(userData));
  } catch (e) {
    yield put(actions.failedUserDetails(e));
  }
};

export function* getUserData() {
  try {
    const userData = yield call(loadUserData);
    yield put(actions.loadUserDetails(userData));
  } catch (e) {
    yield put(actions.failedUserDetails(e));
  }
}
