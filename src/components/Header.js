import React from 'react';
import '../styles/Header.css';
import {Navbar,Nav,NavItem} from 'react-bootstrap';


class Header extends React.Component {

  //<a href="#" onClick={this.props.handleMenu}>React-Bootstrap</a>
  //<a href="#" className="fas fa-bars"></a>

  render() {
    return (
      <Navbar className="header" inverse collapseOnSelect fixedTop>
        <Navbar.Header>
          <Nav>
            <NavItem eventKey={1} onClick={this.props.handleMenu}>
              <i className="fas fa-bars"/>
            </NavItem>
            <Navbar.Brand>
              <a href="#">Elpis</a>
            </Navbar.Brand>
          </Nav>
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav pullRight >
            <NavItem eventKey={2} href="#">
              Iniciar Sesión
            </NavItem>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}


export default Header;