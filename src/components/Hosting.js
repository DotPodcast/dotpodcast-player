import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { StyleSheet, css } from 'aphrodite';

class Hosting extends Component {
  render() {
    return (
      <div className={css(styles.content)}>
        <h2>Host Your Podcasts</h2>
        <div>
          <p>
          DPX is our open source self-hosted platform, allowing you to quickly upload new episodes, or migrate an existing podcast while supporting all the new features of the DotPodcast protocol. DPX provides a legacy RSS feed, so you can still serve traditional podcast clients and directories. If you’re familiar with Docker and have previously hosted your own websites, you can deploy your own DPX site by following the instructions on GitHub.
          </p>
          <p>
          If you’d like to take advantage of the DotPodcast protocol but would prefer someone else look after the technical side, <Link to="/contact">email us.</Link>
          </p>
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
