import React, { Component } from 'react';
import { Alert } from 'react-bootstrap';
import { isMobile } from 'react-device-detect';

class MobileWarning extends Component {
  render() {
    if (isMobile)
      return(
        <Alert bsStyle='info' style={{margin:"5px"}}>
          <span class='glyphicon glyphicon-alert'></span> For most functionality, we require the <a href='https://blockstack.org/'>BlockStack</a> browser to securely store your user data from prying eyes in the cloud, which is not available on mobile yet.
        </Alert>
      );
    else
      return null;
  }
}

export default MobileWarning;
