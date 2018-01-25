import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Navbar, Nav, NavItem, FormGroup, FormControl } from 'react-bootstrap';
import logo from './web-logo-dark.png';
import { StyleSheet, css } from 'aphrodite';
import { actions } from '../reducers/search';

class Header extends Component {
  render() {
    return (
      <Navbar className={css(styles.header)} fluid inverse fixedTop>
        <Navbar.Header>
          <Navbar.Brand className={css(styles.icon)}>
            <a href="#">
              <img src={logo}/>
            </a>
          </Navbar.Brand>
        </Navbar.Header>
        <Nav pullRight>
          <Navbar.Form>
            <FormGroup>
              <FormControl
                className={css(styles.searchInput)}
                type="text"
                placeholder="Search"
                value={this.props.searchText}
                onInput={(evt) => this.props.updateSearch(evt.target.value)}
              />
            </FormGroup>
          </Navbar.Form>
        </Nav>
      </Navbar>
    );
  }
};

const styles = StyleSheet.create({
  icon: {
    padding: 10
  },
  header: {
    borderBottom: 0,
    boxShadow: '0 0 10px black'
  },
  searchInput: {
    border: '1px solid #111',
    backgroundColor: '#262D30',
    color: '#ddd',
    borderRadius: 17,
    width: 180,
    transition: '.2s',
    ':focus': {
      border: 0,
      backgroundColor: '#EEE',
      color: '#111',
      width: 300,
    }
  }
});

const mapStateToProps = state => {
  return {
    searchText: state.search.text
  }
}
const mapDispatchToProps = dispatch => {
  return {
    updateSearch: (text) => dispatch(actions.updateQuery(text))
  }
}



export default connect(mapStateToProps, mapDispatchToProps)(Header);

