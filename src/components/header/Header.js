import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Navbar, Nav, NavItem, FormGroup, FormControl } from 'react-bootstrap';
import logo from './web-logo-dark.png';
import './header-styles.css'

class Header extends Component {
  render() {
    return (
      <Navbar fluid inverse fixedTop>
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
              <FormControl className="search-input" type="text" placeholder="Search" />
            </FormGroup>
          </Navbar.Form>
        </Nav>
      </Navbar>
    )
  }
}

export default connect()(Header);

