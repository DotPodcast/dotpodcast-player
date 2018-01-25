import { takeLatest } from 'redux-saga/effects';
import { types as searchTypes } from '../reducers/search';
import { getEpisodes } from './search-saga';

console.log('root')
export default function* root() {
  yield [
    takeLatest(searchTypes.SEARCH_REQUESTED, getEpisodes),
  ];
};
