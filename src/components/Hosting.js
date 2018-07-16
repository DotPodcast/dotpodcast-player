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
            <h2>One-click self hosting</h2>
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

            <p>
              DPX can be deployed on any VPS (virtual private server) that supports
              Docker, modern infrastructures like Convox, and cloud hosting providers
              like Heroku.
            </p>

            <h3>How everything connects at a glance</h3>
            <p>
              <a href={dotpodcastDiagram}>
                <img className={css(styles.diagram)} src={dotpodcastDiagram} alt="Diagram showing how all the pieces of the DotPodcast protocol connect together" />
              </a>
            </p>

            <p>
              If you’d like to take advantage of the DotPodcast protocol but would
              prefer someone else look after the technical side,
              <a href="https://twitter.com/dotpodcast/" target="_blank">contact us on Twitter</a>.
            </p>
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
