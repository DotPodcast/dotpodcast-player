import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from '../components/Header';
import FooterPlayer from '../containers/Player';

class Layout extends Component {
  render() {
    return (
      <div>
        <Header />

        {this.props.children}

        <FooterPlayer active={this.props.itemToPlay}/>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    itemToPlay: state.player.url
  }
}

export default connect(mapStateToProps)(Layout);
