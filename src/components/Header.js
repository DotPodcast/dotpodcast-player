import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import ProtocolPrompt from '../components/ProtocolPrompt';
import { Navbar, Nav, NavItem, FormGroup, FormControl } from 'react-bootstrap';
import logo from '../images/web-logo-dark-extended.png';
import { StyleSheet, css } from 'aphrodite';
import { actions } from '../reducers/search';
import {
  isUserSignedIn,
  signUserOut,
} from 'blockstack';

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = { expanded: false };
    this.toggleNavExpansion = this.toggleNavExpansion.bind(this);
  }

  handleLogout() {
    signUserOut(`${window.location.origin}/login`)
  }

  handleLogin() {
    window.location = '/login';
  }

  toggleNavExpansion(expanded) {
    this.setState({expanded: expanded});
  }

  render() {
    return (
      <div>
        <Navbar className={css(styles.header)} expanded={this.state.expanded} onToggle={this.toggleNavExpansion} fluid inverse fixedTop>
          <Navbar.Header>
            <Navbar.Brand className={css(styles.icon)}>
              <Link to="/">
                <img src={logo} alt="DotPodcast, built on Blockstack" />
              </Link>
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>

          <Navbar.Collapse>
            <Nav>
              <Navbar.Form >
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
                        this.toggleNavExpansion();
                      }
                    }}
                  />
                </FormGroup>
              </Navbar.Form>
            </Nav>
            {this.props.isAuthenticated && <Nav>
                <NavItem componentClass={Link} href="/" to="/">Home</NavItem>
                <NavItem onClick={this.handleLogout}>Log Out</NavItem>
            </Nav>}
            {!this.props.isAuthenticated && <Nav>
              <NavItem onClick={this.handleLogin}>Login</NavItem>
            </Nav>}
            <Nav>
              <NavItem componentClass={Link} href="/hosting" to="/hosting" onSelect={this.toggleNavExpansion}>Hosting</NavItem>
              <NavItem componentClass={Link} href="/contact" to="/contact" onSelect={this.toggleNavExpansion}>Contact</NavItem>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        <ProtocolPrompt />
      </div>
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
    backgroundColor: '#ddd',
    borderRadius: 17,
    width: 180,
    marginLeft: 5,
    transition: '.2s',
    ':focus': {
      border: 0,
      backgroundColor: '#EEE',
      color: '#111',
      width: 350,
    },
    '::placeholder': {
      color: '#ababab'
    }
  },
  link: {"color":"#9d9d9d"}
});

const mapStateToProps = state => {
  return {
    searchText: state.search.text,
    isAuthenticated: !!state.user.publicKey && isUserSignedIn(),
  }
}
const mapDispatchToProps = dispatch => {
  return {
    updateSearch: (text) => dispatch(actions.updateQuery(text))
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Header));
