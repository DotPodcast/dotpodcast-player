import React, { Component } from 'react';
import { Grid, Col, Row } from 'react-bootstrap';
import { StyleSheet, css } from 'aphrodite';

class Search extends Component {
  render() {
    const results = this.props.results
    return (
      <div>
        {this.props.searchText && <div>{results.total} episodes found.</div>}

        <Grid fluid>
          {results.hits.map((result, idx) => {
            return (
              <Row key={idx} className={css(styles.resultRow)}>
                <div className={css(styles.inline, styles.imageContainer)}>
                  <img src={result._source.podcast.artwork['@1x']} width='100px' height='100px'/>
                  <div className={css(styles.imageOverlay)}>
                    <div className={css(styles.playCircle)} onClick={() => this.props.onPlay(result._source.content_audio.url)}>▶</div>
                  </div>
                </div>
                <div className={css(styles.inline, styles.rowText)}>
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

const styles = StyleSheet.create({
  resultRow: {
    padding: 20
  },
  inline: {
    display: 'inline-block'
  },
  imageContainer: {
    position: 'relative'
  },
  rowText: {
    marginLeft: 20
  },
  imageOverlay: {
    position: 'absolute',
    backgroundColor: 'black',
    opacity: 0,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    transition: '.2s',
    ':hover': {
      opacity: .8
    }
  },
  playCircle: {
    textAlign: 'center',
    border: '1px solid white',
    borderRadius: 20,
    display: 'inline-block',
    width: 40,
    height: 40,
    lineHeight: 2,
    fontSize: 20,
    margin: 30,
    userSelect: 'none',
    transition: '.1s',
    ':hover': {
      width: 48,
      height: 48,
      fontSize: 24,
      margin: 26,
      borderRadius: 24,
    }
  }
});

export default Search;
