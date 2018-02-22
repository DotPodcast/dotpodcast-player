import React, { Component } from 'react';
import { StyleSheet, css } from 'aphrodite';
import { Glyphicon } from 'react-bootstrap';
import PaymentSelection from './PaymentSelection';

class TipButton extends Component {
  constructor() {
    super()
    this.state = {
      showing: false,
    };
  }
  render() {
    return (
      <div>
        <button className={css(styles.button)} onClick={() => this.setState({showing: true})}>
          <Glyphicon glyph="share-alt"/>
          <Glyphicon glyph="usd"/>
        </button>
        <PaymentSelection
          onHide={() => this.setState({showing: false})}
          show={this.state.showing}
          {...this.props}
        />
      </div>
    );
  }
};

const styles = StyleSheet.create({
  button: {
    color: 'black',
    marginTop: 10,
    paddingRight: 10,
    borderRadius: 8,
    border: 'none',
    backgroundColor: '#cecece',
    transition: '.1s',
    boxShadow: '0 0 5px #666',
    ':hover': {
      backgroundColor: '#d4d4d4',
      boxShadow: '0 0 10px #666',
    },
    ':active': {
      outline: 'none',
      backgroundColor: '#aaa',
      boxShadow: '0 0 1px #666',
    },
    ':focus': {
      outline: 'none',
    }
  }
});

export default TipButton;
