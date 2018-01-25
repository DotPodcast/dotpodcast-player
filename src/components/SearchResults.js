import React, { Component } from 'react';
import { Grid, Col, Row } from 'react-bootstrap';
import './search-styles.css';

class Search extends Component {
  render() {
    const results = this.props.results
    return (
      <div>
        <div>{results.total} results for: {this.props.searchText}</div>

        <Grid fluid>
          {results.hits.map((result, idx) => {
            return (
              <Row key={idx} className="search-result-row">
                <div className="image-container">
                  <img src={result._source.podcast.artwork['@1x']} width='100px' height='100px'/>
                  <div className="image-overlay">
                    <div className="play-circle" onClick={() => this.props.onPlay(result._source.content_audio.url)}>▶</div>
                  </div>
                </div>
                <div className="result-row-text">
                  <div className="title">
                    {result._source.title}
                  </div>
                  <div className="details">
                  </div>
                </div>
              </Row>
            )
          })}
        </Grid>
      </div>
    );
  }
}

export default Search;
