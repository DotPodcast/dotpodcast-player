import React, { Component } from 'react';
import { StyleSheet, css } from 'aphrodite';

class RadioGroup extends Component {
  constructor() {
    super();
    this.state = { value: '' }
  }

  handleChange(newValue) {
    this.setState({value: newValue})
    this.props.onChange(newValue);
  }
  render() {
    return (
      <div className={css(styles.container)}>
        {this.props.options.map((option, idx) => {
          return (
            <label
              key={idx}
              className={css(styles.button, this.state.value === option.value && styles.selected)}
              style={{width: this.props.size, height: this.props.size}} >
              <input
                className={css(styles.hidden)}
                type="radio"
                checked={this.state.value === option.value}
                onChange={() => this.handleChange(option.value)}
              />
              {option.label}
            </label>
          )
        })}
      </div>
    )
  }
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  hidden: {
    display: 'none',
  },
  button: {
    display: 'flex',
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center',
    cursor: 'pointer',
    borderRadius: '50%',
    borderColor: '#ddd',
    borderWidth: 1,
    borderStyle: 'solid',
    transform: 'scale(1)',
    ':hover': {
      backgroundColor: '#eee',
    },
    ':active': {
      backgroundColor: '#ddd',
      borderColor: '#ccc',
      outline: 'none',
    }
  },
  selected: {
    backgroundColor: '#b3eeac',
    borderColor: '#5fc054',
    ':hover': {
      backgroundColor: '#b3eeac',
    },
  },
  icon: {
    top: 0,
    left: 1,
  },
});

export default RadioGroup;
