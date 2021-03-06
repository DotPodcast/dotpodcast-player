import React, { Component } from 'react';
import { StyleSheet, css } from 'aphrodite';
import QRCode from 'qrcode.react';
import { Modal } from 'react-bootstrap';
import RadioGroup from './RadioGroup';
import exchangeRatesService from '../services/exchange-rate';
import noPayment from '../images/no-payment.jpg';

const paymentMethods = {
  btc: {
    key: 'bitcoin',
    humanReadable: 'Bitcoin',
    currency: 'BTC',
    // icon: bitcoinIcon,
    uriGenerator: (address, amount) => {
      return `bitcoin:${address}?amount=${amount}`
    },
  },
  zec: {
    key: 'zcash',
    humanReadable: 'ZCash',
    currency: 'ZEC',
    // icon: bitcoinIcon,
    uriGenerator: (address) => {
      return `${address}`
    },
  },
  eth: {
    key: 'ethereum',
    humanReadable: 'Ethereum',
    currency: 'ETH',
    // icon: bitcoinIcon,
    uriGenerator: (address, amount) => {
      return `ethereum:${address}?value=${amount}`
    },
  },
  bch: {
    key: 'bitcoinCash',
    humanReadable: 'Bitcoin Cash',
    currency: 'BCH',
    // icon: bitcoinIcon,
    uriGenerator: (address, amount) => {
      return `bitcoincash:${address}?amount=${amount}`
    },
  },
};

const niceList = (list) => {
  return list.concat(list.splice(-2, 2).join(' and ')).join(', ');
}

class PaymentSelection extends Component {
  constructor(props) {
    super(props);

    const availableMethods = this.getPaymentOptions(props);

    this.state = {
      availableMethods,
      selectedMethod: availableMethods.length > 1 ? '' : availableMethods[0].currency,
      selectedAmount: 0,
      rates: {},
    };
  }

  componentDidMount() {
    exchangeRatesService.getRates(this.state.availableMethods.map((method) => method.currency)).then((rates) => {
      this.setState({rates});
    });
  }

  getPaymentOptions(props) {
    let acceptedMethods = [];

    if(props.addresses) {
      Object.keys(paymentMethods).forEach((method) => {
        if(method in props.addresses) {
          acceptedMethods.push({ ...paymentMethods[method], address: props.addresses[method]});
        }
      });
    }

    if(acceptedMethods.length === 0 && props.placeholder === true) {
      acceptedMethods = Object.keys(paymentMethods).map((key) => ({ ...paymentMethods[key] }));
    }

    return acceptedMethods;
  }

  renderAmountPrompt() {
    return (
      <div>
        <RadioGroup
          size={60}
          options={[{ value: 2, label: '$2' }, { value: 5, label: '$5' }, { value: 8, label: '$8' }]}
          onChange={(value) => this.setState({selectedAmount: value})}/>
      </div>
    );
  }

  renderPayment() {
    let amount;

    let content;

    if(this.props.placeholder) {
      return this.renderPaymentPlaceholder(this.state.selectedAmount);
    }

    if(this.state.rates[this.state.selectedMethod]) {
      amount = this.state.selectedAmount * this.state.rates[this.state.selectedMethod];
    }
    if(this.state.selectedMethod === 'BTC') {
      content = this.renderBitcoinPayment(amount);
    } else if(this.state.selectedMethod === 'BCH') {
      content = this.renderBitcoinCashPayment(amount);
    } else if(this.state.selectedMethod === 'ETH') {
      content = this.renderEthereumPayment(amount);
    } else if(this.state.selectedMethod === 'ZEC') {
      content = this.renderZcashPayment(amount);
    }
    return (
      <div>
        {content}
        <div className={css(styles.getWallet)}>
          New to Crypto? Don't have a wallet? Don't worry! <a href="https://www.coinbase.com/signup" target="_blank" rel="noopener noreferrer">Get one at Coinbase</a>
        </div>
        <div className={css(styles.disclaimer)}>
          Conversion rates are approximate and provided by <a href="https://www.cryptocompare.com/" rel="noopener noreferrer" target="_blank">CryptoCompare</a>
        </div>
      </div>
    );
  }
  renderBitcoinPayment(amount) {
    const uri = paymentMethods.btc.uriGenerator(this.props.addresses.btc, amount);
    return (
      <div className={css(styles.paymentContainer)}>
        <div className={css(styles.qrContainer)}>
          <QRCode value={uri} size={256} level='M'/>
        </div>
        <a href={uri}>Or click here to use your native wallet app</a>
      </div>
    )
  }

  renderBitcoinCashPayment(amount) {
    const uri = paymentMethods.bch.uriGenerator(this.props.addresses.bch, amount);
    return (
      <div className={css(styles.paymentContainer)}>
        <div className={css(styles.qrContainer)}>
          <QRCode value={uri} size={256} level='M'/>
        </div>
        <a href={uri}>Click here to use your native wallet app</a>
      </div>
    )
  }

  renderEthereumPayment(amount) {
    const uri = paymentMethods.eth.uriGenerator(this.props.addresses.eth, amount);
    return (
      <div className={css(styles.paymentContainer)}>
        <div className={css(styles.qrContainer)}>
          <QRCode value={uri} size={256} level='M'/>
        </div>
        <a href={uri}>Click here to use your native wallet app</a>
      </div>
    )
  }

  renderZcashPayment(amount) {
    const uri = paymentMethods.zec.uriGenerator(this.props.addresses.zec);
    return (
      <div className={css(styles.paymentContainer)}>
        <div className={css(styles.qrContainer)}>
          <QRCode value={uri} size={256} level='M'/>
        </div>
        <span>Note: you will have to enter the amount manually in your wallet ({amount}).</span>
      </div>
    )
  }

  generateEmailLink() {
    let subject = `$${this.state.selectedAmount} donation for ${this.props.podcastName}`
    let toAddress = this.props.podcastEmail;
    let ccAddress = 'info@dotpodcast.co';
    let body = `Hey there! 
I love your podcast and I just tried to donate $${this.state.selectedAmount} to you through the DotPodcast App (http://player.dotpodcast.co/),
 but you don't have any payment methods set up yet. If you want to start accepting payments through the DotPodcast App, send an email to Bill
 and Jonathan at info@dotpodcast.co for help!`
    return `mailto:${toAddress}?subject=${subject}&cc=${ccAddress}&body=${body}`;
  }

  renderPaymentPlaceholder(amount) {
    return (
      <div className={css(styles.paymentContainer)}>
        <div className={css(styles.qrContainer)}>
          <img src={noPayment} />
        </div>
        <p> Whoops! Looks like this podcaster hasn't set up any payment methods yet.</p>
        {!!this.props.podcastEmail && <p> <a href={this.generateEmailLink()} target="_blank">Send them an email</a> letting them know you just tried to pay them ${amount}.</p>}
      </div>
    )
  }

  renderMethodPrompt() {
    return (
      <div>
        <RadioGroup
          size={45}
          options={this.state.availableMethods.map(o => ({value: o.currency, label: o.currency}))}
          onChange={(value) => this.setState({selectedMethod: value})}/>
      </div>
    );

  }


  render() {
    return (
      <Modal show={this.props.show} onHide={this.props.onHide}>
        <Modal.Body>
          <div className={css(styles.container)}>
            <p style={{textAlign: 'center'}}>
              Tip this podcaster with {niceList(this.state.availableMethods.map(o => o.humanReadable))}.
            </p>
            {this.renderAmountPrompt()}
            {!!this.state.selectedAmount && this.state.availableMethods.length > 1 && this.renderMethodPrompt()}
            {!!this.state.selectedAmount && this.state.selectedMethod && this.renderPayment()}
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
  getWallet: {
    textAlign: 'center',
    marginTop: 25,
    fontSize: '1.1em',
  },
  disclaimer: {
    marginTop: 25,
    textAlign: 'center',
    fontStyle: 'italic',
  }
});

export default PaymentSelection;
