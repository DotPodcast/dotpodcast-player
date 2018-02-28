import React, { Component } from 'react';
import { StyleSheet, css } from 'aphrodite';

class ContactUs extends Component {
  render() {
    return (
      <div className={css(styles.content)}>
        <h2>Get In Touch</h2>
        <div>
          Have feedback or questions? Please <a href="mailto:info@dotpodcast.co">send us a message!</a>
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

export default ContactUs;
