import { takeLatest } from 'redux-saga/effects';
import { types as searchTypes } from '../reducers/search';
import { getEpisodes, getPodcasts } from './search';

console.log('root')
export default function* root() {
  yield [
    takeLatest(searchTypes.SEARCH_REQUESTED, getEpisodes),
    takeLatest(searchTypes.SEARCH_REQUESTED, getPodcasts),
  ];
};
