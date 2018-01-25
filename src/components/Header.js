import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Navbar, Nav, NavItem, FormGroup, FormControl } from 'react-bootstrap';
import logo from './web-logo-dark.png';
import './header-styles.css'
import { actions } from '../reducers/search';

class Header extends Component {
  render() {
    return (
      <Navbar className="main-header" fluid inverse fixedTop>
        <Navbar.Header>
          <Navbar.Brand className="icon-brand">
            <a href="#">
              <img src={logo}/>
            </a>
          </Navbar.Brand>
        </Navbar.Header>
        <Nav pullRight>
          <Navbar.Form>
            <FormGroup>
              <FormControl
                className="search-input"
                type="text"
                placeholder="Search"
                value={this.props.searchText}
                onInput={(evt) => this.props.updateSearch(evt.target.value)}
                / >
            </FormGroup>
          </Navbar.Form>
        </Nav>
      </Navbar>
    )
  }
}

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

