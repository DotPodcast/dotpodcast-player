import React, { Component } from 'react';
import { StyleSheet, css } from 'aphrodite';

class Hosting extends Component {
  render() {
    return (
      <div className={css(styles.content)}>
        <h2>Host Your Podcasts</h2>
        <div>
          You know who likes coffee? PODCASTERS.
        </div>
      </div>
    )
  }
}

const styles = StyleSheet.create({
  content: {
    margin: 10
  }
});

export default Hosting;
