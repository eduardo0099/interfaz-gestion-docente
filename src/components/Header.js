import React from 'react';
import '../styles/Header.css';
import {Navbar,Nav,NavItem} from 'react-bootstrap';


class Header extends React.Component {

  //<a href="#" onClick={this.props.handleMenu}>React-Bootstrap</a>
  //<a href="#" className="fas fa-bars"></a>
  constructor(props){
    super(props);
    this.state={
      logueado: false
    }
  }
  
  componentWillMount(){
    
    if(localStorage.getItem('jwt')!= null){
      this.setState({logueado: true})
    }
  }
  
  handleCerrarSesion = () =>{
    localStorage.removeItem('jwt');
    localStorage.removeItem('u');
    window.location.href = "/";
  }

  handleIniciarSesion = () =>{
    localStorage.removeItem('jwt');
    localStorage.removeItem('u');
    window.location.href = "/";
  }
  render() {
    var nombreUser = "";
    if(localStorage.getItem('u')!=null){
      try{
        var user= JSON.parse(atob(localStorage.getItem('u')));
        nombreUser = user.nombre;
      }catch(err){
        window.location.href = "/";
      }
    }
    return (
      <Navbar className="header" inverse collapseOnSelect fixedTop>
        <Navbar.Header>
          <Nav>
            <NavItem eventKey={1} onClick={this.props.handleMenu}>
              <i className="fas fa-bars"/>
            </NavItem>
            <Navbar.Brand>
              <a href="/">Elpis</a>
            </Navbar.Brand>
          </Nav>
        </Navbar.Header>
        <Navbar.Collapse>
            {this.state.logueado?
              <Nav pullRight >
                <NavItem eventKey={3} >
                  <span style={{"color":"white"}}>Bienvenido {nombreUser}</span> 
                </NavItem>
                <NavItem eventKey={2} onClick={this.handleCerrarSesion} >
                  <span style={{"color":"white"}}> Cerrar Sesión</span>
                </NavItem>
              </Nav>
              :
              <Nav pullRight >
                <NavItem eventKey={4} onClick={this.handleIniciarSesion} >
                  <span style={{"color":"white"}}>Iniciar Sesión</span>
                </NavItem>
              </Nav>
            }
        </Navbar.Collapse>
      </Navbar>
    );
  }
}


export default Header;