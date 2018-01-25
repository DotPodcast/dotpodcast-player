import React, { Component } from 'react';
import { Grid, Col, Row } from 'react-bootstrap';
import './search-styles.css';

class Search extends Component {
  render() {
    const results = this.props.results
    return (
      <div>
        <div>{results.total} results for: {this.props.searchText}</div>

        <ul>
          {results.hits.map((result, idx) => {
            return (
              <li key={idx}>{result._source.title}</li>
            )
          })}
        </ul>
      </div>
    );
  }
}

export default Search;
