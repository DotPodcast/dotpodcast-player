import React, { Component } from 'react';
import { StyleSheet, css } from 'aphrodite';
import Dropdown from './Dropdown';
import QRCode from 'qrcode.react';
import { Modal } from 'react-bootstrap';

const paymentMethods = {
  bitcoin: {
    key: 'bitcoin',
    humanReadable: 'Bitcoin',
    currency: 'BTC',
    // icon: bitcoinIcon,
    uriGenerator: (address, amount) => {
      return `bitcoin:${address}?amount=${amount}`
    },
  },
  bitcoinCash: {
    key: 'bitcoinCash',
    humanReadable: 'Bitcoin Cash',
    currency: 'BCC',
    // icon: bitcoinIcon,
    uriGenerator: (address, amount) => {
      return `bitcoincash:${address}?amount=${amount}`
    },
  },
};

class PaymentSelection extends Component {
  constructor() {
    super();
    this.state = {
      selectedMethod: '',
      amount: '',
    };
  }

  getPaymentOptions(props) {
    const acceptedMethods = [];
    if('bitcoin' in props) {
      acceptedMethods.push({ ...paymentMethods.bitcoin, address: props.bitcoin });
    }
    if('bitcoinCash' in props) {
      acceptedMethods.push({ ...paymentMethods.bitcoinCash, address: props.bitcoinCash });
    }

    return acceptedMethods;
  }

  renderAmountPrompt() {
    return (
      <div>
        How much would you like to pay? <input onChange={(e) => this.setState({amount: e.target.value})} /> {paymentMethods[this.state.selectedMethod].currency}
      </div>
    );
  }

  renderPayment() {
    if(this.state.selectedMethod === 'bitcoin') {
      return this.renderBitcoinPayment()
    } else if(this.state.selectedMethod === 'bitcoin') {
      return this.renderBitcoinCashPayment()
    }
  }
  renderBitcoinPayment() {
    const uri = paymentMethods.bitcoin.uriGenerator(this.props.bitcoin, this.state.amount);
    return (
      <div className={css(styles.paymentContainer)}>
        <div className={css(styles.qrContainer)}>
          <QRCode value={uri} />
        </div>
        <a href={uri}>Or click here to use your native wallet app</a>
      </div>
    )
  }

  renderBitcoinCashPayment() {
    return (
      <a href={paymentMethods.bitcoin.uriGenerator(this.props.bitcoin, this.state.amount)}>Click here to use your native wallet app</a>
    )
  }

  render() {
    const paymentOptions = this.getPaymentOptions(this.props);
    return (
      <Modal show={this.props.show}>
        <Modal.Body>
          <div className={css(styles.container)}>
            <p>
              This podcast accepts payments in the form of {paymentOptions.map(o => o.humanReadable).join(', ')}.
            </p>
            <div>
              How would you like to pay?
              <Dropdown
                options={paymentOptions.map(o => ({value: o.key, text: o.humanReadable}))}
                value={this.state.selectedMethod}
                onChange={val => this.setState({selectedMethod: val})}
              />
            </div>
            {this.state.selectedMethod && this.renderAmountPrompt()}
            {this.state.selectedMethod && this.state.amount && this.renderPayment()}
          </div>
        </Modal.Body>
      </Modal>
    );
  }

};

const styles = StyleSheet.create({
  container: {
    color: '#333',
  },
  paymentContainer: {
    marginTop: 20,
    textAlign: 'center',
  },
  qrContainer: {
    marginBottom: 20,
  },
});

export default PaymentSelection;
