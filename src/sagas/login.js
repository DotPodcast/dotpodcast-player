import { call, put } from 'redux-saga/effects';
import { actions } from '../reducers/user';
import {
  handlePendingSignIn,
} from 'blockstack';

export function* getUserData() {
  try {
    const userData = yield call(handlePendingSignIn);
    yield put(actions.loadUserDetails(userData));
  } catch (e) {
    yield put(actions.failedUserDetails(e));
  }
};
