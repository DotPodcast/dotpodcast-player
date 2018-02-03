import React from 'react';
import { StyleSheet, css } from 'aphrodite';
import { Glyphicon } from 'react-bootstrap';

const GlyphButton = (props) => {
  return (
    <div className={css(styles.container)} onClick={props.onClick}>
      <Glyphicon className={css(styles.icon)} glyph={props.icon}/>
    </div>
  )
};

const styles = StyleSheet.create({
  container: {
    display: 'inline-block',
    margin: '0 15px',
    padding: 5,
    ':hover': {
      borderColor: 'white',
      color: 'white',
    },
    ':active': {
      borderColor: '#888',
      color: '#888',
    }
  },
  icon: {

  },
});

export default GlyphButton;
