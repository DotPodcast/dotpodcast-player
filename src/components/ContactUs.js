import React, { Component } from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import { StyleSheet, css } from 'aphrodite';
import dotpodcastDiagram from '../images/diagram.png';

class ContactUs extends Component {
  render() {
    return (
      <Grid fluid>
        <Row>
          <Col sm={8} md={6}>
            <h3>About DotPodcast</h3>
            <p>
              Search, subscribe, and pay podcasters without being tracked or censored.
            </p>
         </Col>
        </Row>

        <Row>
          <Col sm={8} md={6}>
            <h3>Podcast Hosting</h3>
            <p>
              DPX is our open source self-hosted platform, allowing you to quickly
              upload new episodes, or migrate an existing podcast while supporting
              all the new features of the DotPodcast protocol. DPX provides a
              legacy RSS feed, so you can still serve traditional podcast clients
              and directories. If you’re familiar with Docker and have previously
              hosted your own websites, you can deploy your own DPX site by
              following the instructions on GitHub.
            </p>

            <p>
              <a className="btn btn-primary" href="https://github.com/dotpodcast/dotpodcast-dpx/" target="_blank">View the project on GitHub</a>
            </p>

            <img className={css(styles.diagram)} src={dotpodcastDiagram} />

            <p>
              If you’d like to take advantage of the DotPodcast protocol but would
              prefer someone else look after the technical side, email us.
            </p>
          </Col>
        </Row>

        <Row>
          <Col sm={8} md={6}>
            <h3>Get in Touch</h3>
            Have feedback or questions? Please <a href="mailto:info@dotpodcast.co">send us a message.</a>
          </Col>
        </Row>
      </Grid>
    )
  }
}

const styles = StyleSheet.create(
  {
    diagram: {
      maxWidth: '100%'
    }
  }
);

export default ContactUs;
