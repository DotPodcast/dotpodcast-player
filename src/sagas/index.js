import { takeLatest } from 'redux-saga/effects';

import { types as searchTypes } from '../reducers/search';
import { getEpisodes, getPodcasts } from './search';

import { types as userTypes } from '../reducers/user';
import { getUserData } from './login';

console.log('root')
export default function* root() {
  yield [
    takeLatest(searchTypes.SEARCH_REQUESTED, getEpisodes),
    takeLatest(searchTypes.SEARCH_REQUESTED, getPodcasts),
    takeLatest(userTypes.USER_LOGIN_CALLBACK, getUserData),
  ];
};
