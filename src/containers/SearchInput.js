import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { FormGroup, FormControl } from 'react-bootstrap';
import { actions } from '../reducers/search';
import StandardButton from '../components/StandardButton';
import { css, StyleSheet } from 'aphrodite';

class SearchInput extends Component {
  render() {
    return (
      <form className={css(styles.container)}>
        <FormGroup>
          <FormControl
            className={css(styles.searchInput)}
            type="text"
            placeholder="Search"
            value={this.props.searchText}
            onInput={(evt) => {
              this.props.updateSearch(evt.target.value);
              if(this.props.location.pathname === '/search') {
                this.props.history.replace(`/search?q=${evt.target.value}`)
              }
            }}
            onKeyUp={(evt) => {
              if (evt.key === 'Enter') {
                this.props.history.push(`/search?q=${this.props.searchText}`)
              }
            }}
          />
          <StandardButton onClick={() => this.props.history.push(`/search?q=${this.props.searchText}`)}>Search</StandardButton>
        </FormGroup>
      </form>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
  },
  searchInput: {
    border: '1px solid #111',
    backgroundColor: '#ddd',
    borderRadius: 17,
    width: 300,
    marginLeft: 5,
    marginRight: 20,
    display: 'inline-block',
    transition: '.2s',
    ':focus': {
      border: 0,
      backgroundColor: '#EEE',
      color: '#111',
    },
    '::placeholder': {
      color: '#ababab'
    }
  },
});

const mapStateToProps = state => {
  return {
    searchText: state.search.text,
  }
}
const mapDispatchToProps = dispatch => {
  return {
    updateSearch: (text) => dispatch(actions.updateQuery(text))
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SearchInput));
