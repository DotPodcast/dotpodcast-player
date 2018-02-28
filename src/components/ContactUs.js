import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Grid, Row, Col } from 'react-bootstrap';
import { StyleSheet, css } from 'aphrodite';

class ContactUs extends Component {
  render() {
    return (
      <Grid fluid>
        <Row>
          <Col xs={12}>
            <h3>About DotPodcast</h3>
            Search, subscribe, and pay podcasters without being tracked or censored.
         </Col>
        </Row>

        <Row>
          <Col xs={12}>
            <h3>Podcast Hosting</h3>
            DPX is our open source self-hosted platform, allowing you to quickly upload new episodes, or migrate an existing podcast while supporting all the new features of the DotPodcast protocol. DPX provides a legacy RSS feed, so you can still serve traditional podcast clients and directories. If you’re familiar with Docker and have previously hosted your own websites, you can deploy your own DPX site by following the instructions on GitHub.

            If you’d like to take advantage of the DotPodcast protocol but would prefer someone else look after the technical side, <Link to="/contact">email us.</Link>       
          </Col>
        </Row>

        <Row>
          <Col xs={12}>
            <h3>Get In Touch</h3>
            Have feedback or questions? Please <a href="mailto:info@dotpodcast.co">send us a message.</a>
          </Col>
        </Row>
      </Grid>
    )
  }
}

const styles = StyleSheet.create({
});

export default ContactUs;
