import React, { Component } from 'react';
import { Alert } from 'react-bootstrap';
import { isMobile } from 'react-device-detect';

class MobileWarning extends Component {
  render() {
    if (isMobile)
      return(
        <Alert bsStyle='warning' style={{margin:"5px"}}>
          DotPodcast requires the BlockStack browser to securely store your user data from prying eyes in the cloud, which is not available on mobile browsers just yet. <a href="http://docs.dotpodcast.co">Read More</a>
        </Alert>
      );
    else
      return null;
  }
}

export default MobileWarning;
