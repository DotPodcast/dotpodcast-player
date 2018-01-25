import React, { Component } from 'react';
import './progress.css';

const ProgressSeeker = (props) => {
  return (
    <div className="progress-area">
      <div className="progress-wrapper">
        <div className="progress-loaded" />
        <div className="progress-played" style={{width: `${props.value * 100}%`}}/>
        <div className="progress-current" />
      </div>
    </div>
  );
}

export default ProgressSeeker;
