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
            <iframe width="560" height="315" src="https://www.youtube.com/embed/TbIaWvR37q0" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>

            <h3>About DotPodcast</h3>
            <p>DotPodcast is a podcast protocol for the decentralized web, featuring</p>
            <ul>
              <li>a blockchain-based directory with no gatekeepers</li>
              <li>open search</li>
              <li>a decentralized player app ("dApp") with privacy and ability to pay podcasters</li>
              <li>a JSON schema to replace RSS</li>
              <li><a href="/hosting">one-click self hosting</a></li>
            </ul>

            <h3>A blockchain-based directory with no gatekeepers</h3>
            <p>
              DotPodcast uses the Blockstack DNS (domain name system) to provide a
              decentralized directory of podcasts, that is free from censorship.
              Podcasters register a name on the .podcast namespace (which works
              like buying a domain name using Bitcoin) and connect it up with their
              hosting provider via a zone file.
            </p>
            <p>
              The <a href="https://github.com/DotPodcast/dotpodcast-crawler" target="_blank">
              >DotPodcast Crawler</a> crawls the .podcast namespace for new registrations,
              and automatically adds them to our search index.
            </p>

            <h3>Open search</h3>
            <p>
              Using Elasticsearch, and our reference implemtnation provided by the
              DotPodcast Crawler project, we maintain a searchable list of every
              podcast (and every episode within each podcast), registered in the
              .podcast namespace.
            </p>
            <p>
              Developers are encouraged to build their own search systems and
              directory apps, using the reference implementation. That way, player
              apps can maintain their own directories with little overhead, and no
              need for podcasters to submit their shows to multiple directories.
            </p>

            <h3>The player dApp</h3>
            <p>
              This is the DotPodcast Player, one of many potential decentralized
              podcast players that can run on a local machine or on the web, with
              no server-side components. The player connects up the various parts
              of the DotPodcast ecosystem and gives listeners a single, simple
              place to subscribe and hear shows using the DotPodcast protocol.
            </p>
            <p>
              <a className="btn btn-primary" href="https://github.com/DotPodcast/dotpodcast-player" target="_blank">
                Fork the DotPodcast Player project on GitHub
              </a>
            </p>

            <h3>The JSON schema</h3>
            <p>
              A new decentralized approach to podcasting gives us the opportunity
              to rethink the approach and unmake some of the assumptions around
              the medium. The JSON schema and subscription protocol are open and
              flexible, and allow podcast apps to provide more detailed,
              anonymized analytics to podcasters, without compromising user
              privacy.
            </p>
            <p>
              <a href="http://dotpodcast-docs.s3-website-us-west-2.amazonaws.com/" target="_blank">
                Read the JSON schema documentation
              </a>
            </p>

            <h3>Get in Touch</h3>
            <p>
              Have feedback or questions? Please
              <a href="mailto:info@dotpodcast.co">send us a message.</a>
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
