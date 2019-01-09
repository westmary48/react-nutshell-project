import React from 'react';
import PropTypes from 'prop-types';
import { NavLink as RRNavLink } from 'react-router-dom';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
} from 'reactstrap';
import './MyNavbar.scss';

class MyNavbar extends React.Component {
  static propTypes = {
    isAuthed: PropTypes.bool,
    logoutClickEvent: PropTypes.func,
  }

  state = {
    isOpen: false,
  };

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  }

  render() {
    const { isAuthed, logoutClickEvent } = this.props;
    const buildNavbar = () => {
      if (isAuthed) {
        return (
          <Nav className='ml-auto' navbar>
            <NavItem>
              <NavLink tag={RRNavLink} to='/friends'><i class="fas fa-user-friends fa-2x"></i></NavLink>
            </NavItem>
            <NavItem>
              <NavLink tag={RRNavLink} to='/messages'><i class="fas fa-comments fa-2x"></i></NavLink>
            </NavItem>
            <NavItem>
              <NavLink tag={RRNavLink} to='/weather'><i class="fas fa-bolt fa-2x"></i></NavLink>
            </NavItem>
            <NavItem>
              <NavLink tag={RRNavLink} to='/events'><i class="fas fa-calendar-week fa-2x"></i></NavLink>
            </NavItem>
            <NavItem>
              <NavLink tag={RRNavLink} to='/articles'><i class="fas fa-newspaper fa-2x"></i></NavLink>
            </NavItem>
            <NavItem>
              <NavLink onClick={logoutClickEvent}>Logout</NavLink>
            </NavItem>
          </Nav>
        );
      }
      return <Nav className='ml-auto' navbar />;
    };

    return (
      <div className="my-navbar">
        <Navbar color="dark" dark expand="md">
          <NavbarBrand href="/">React Nutshell</NavbarBrand>
          <NavbarToggler onClick={e => this.toggle(e)} />
          <Collapse isOpen={this.state.isOpen} navbar>
            {buildNavbar()}
          </Collapse>
        </Navbar>
      </div>
    );
  }
}

export default MyNavbar;
