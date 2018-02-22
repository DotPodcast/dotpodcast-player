import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Alert, Button } from 'react-bootstrap';
import { StyleSheet, css } from 'aphrodite';
import { registerSupported, protocolRegistered, registrationIgnored, ignore, register } from '../utils/podto';

class ProtocolPrompt extends Component {
  state = {
    registered: protocolRegistered(),
    ignored: registrationIgnored()
  }

  registerHandler = () => {
    register()
    this.setState(
      {
        registered: true
      }
    )
  }

  ignore = () => {
    ignore()
    this.setState(
      {
        ignored: true
      }
    )
  }

  render() {
    if(!registerSupported()) {
      return null
    }

    if(this.state.registered || this.state.ignored) {
      return null
    }

    return (
      <Alert bsStyle='info' className={css(styles.alert)}>
        <p>
          Using this player, you can subscribe to podcasts you find on the web.
          Would you like to enable this feature?

          <Button bsStyle='primary' onClick={this.registerHandler}>Yes</Button>
          &nbsp;
          <Button bsStyle='primary' onClick={this.ignore}>No</Button>
        </p>
      </Alert>
    );
  }
};

const styles = StyleSheet.create({
  alert: {
    marginTop: -30
  }
});

export default ProtocolPrompt;
