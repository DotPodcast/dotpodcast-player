import React from 'react';
import { StyleSheet, css } from 'aphrodite';

const TileList = (props) => {
  return (
    <div className={css(styles.container)}>
      {props.children}
    </div>
  )
};

const styles = StyleSheet.create({
  container: {
    whiteSpace: 'nowrap',
    width: '100%',
    overflow: 'auto',
    paddingBottom: 10
  }
})

export default TileList;
