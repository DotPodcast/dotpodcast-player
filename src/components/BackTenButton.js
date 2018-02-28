import React from 'react';
import { StyleSheet, css } from 'aphrodite';

const FwdTenButton = (props) => {
  return (
    <div className={css(styles.container)} style={props.style} onClick={props.onClick}>
      <svg version="1.1" className={css(styles.icon)} xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
        viewBox="0 0 248.7 248.8" xmlSpace="preserve">
        <path d="M220.3,52l-2.1,2.1C233.1,74,242,98.6,242,125.3c0,65.3-53.2,118.5-118.5,118.5C58.2,243.8,5,190.7,5,125.3
          c0-26.9,9-51.8,24.2-71.7l-2.1-2.1C11.4,71.9,2,97.6,2,125.3c0,67,54.5,121.5,121.5,121.5S245,192.3,245,125.3
          C245,97.8,235.8,72.4,220.3,52z"/>
        <polygon  points="190.9,23 202.5,66.6 234.5,34.7 "/>
        <g>
          <path d="M82,104.3h-0.3L67,112.2l-2.2-8.7l18.5-9.9H93v84.5H82V104.3z"/>
          <path d="M180,135c0,28.7-10.7,44.6-29.4,44.6c-16.5,0-27.7-15.5-28-43.4c0-28.3,12.2-43.9,29.4-43.9C169.9,92.2,180,108,180,135z
            M134.1,136.3c0,22,6.8,34.5,17.2,34.5c11.7,0,17.3-13.7,17.3-35.2c0-20.8-5.3-34.5-17.2-34.5C141.4,101,134.1,113.2,134.1,136.3z"
          />
        </g>
      </svg>
    </div>
  )
};

const styles = StyleSheet.create({
  container: {
    display: 'inline-block',
    position: 'relative',
    cursor: 'pointer',
    width: 25,
    height: 25,
  },
  icon: {
    stroke: '#ddd',
    fill: '#ddd',
    strokeWidth: 5,
    strokeMiterLimit: 10,
    ':hover': {
      fill: 'white',
      stroke: 'white',
    },
    ':active': {
      stroke: '#888',
      fill: '#888',
    },
  }
});


export default FwdTenButton;
