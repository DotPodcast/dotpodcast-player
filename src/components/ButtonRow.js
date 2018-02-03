import React from 'react';
import { StyleSheet, css } from 'aphrodite';

const ButtonRow = (props) => {
  return (
    <div className={css(styles.container)} {...props}>
      {props.children}
    </div>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirecation: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ButtonRow;
