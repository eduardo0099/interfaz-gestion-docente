import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import './../styles/BodySidebar.css';

class BodySidebar extends Component {
  constructor(props) {
    super(props);

  }


  render() {
    var tipoUser = 0;
    if (localStorage.getItem('u') != null) {
      var usuario = JSON.parse(atob(localStorage.getItem('u')));
      tipoUser = usuario.tipo_usuario;
    }

    if (tipoUser == 3) {
      //Jefe departamento
      return (
          <div className="bodySidebar">
            <Link to="/home" onClick={() => this.props.handleMenu(false)} className="link-body-sidebar">Inicio</Link>
            <div className="divider"/>
            <Link to="/dashboard" onClick={() => this.props.handleMenu(false)} className="link-body-sidebar">Dashboard</Link>
            <div className="divider"/>
            <Link to="/profesores" onClick={() => this.props.handleMenu(false)} className="link-body-sidebar">Profesores</Link>
            <div className="divider"/>
            <Link to="/convocatorias" onClick={() => this.props.handleMenu(false)} className="link-body-sidebar">Convocatorias</Link>
            <div className="divider"/>
            <Link to="/carga" onClick={() => this.props.handleMenu(false)} className="link-body-sidebar">Carga de datos</Link>
            <div className="divider"/>
            <Link to="/asignacionCursos" onClick={() => this.props.handleMenu(false)} className="link-body-sidebar">Asignar Cursos</Link>
            <div className="divider"/>
            <Link to="/ayudaeconomica" onClick={() => this.props.handleMenu(false)} className="link-body-sidebar">Ayudas Económicas</Link>
            <div className="divider"/>
            <Link to="/preferenciaCursos" onClick={() => this.props.handleMenu(false)} className="link-body-sidebar">Prefencia de Dictado</Link>
          </div>
      );
    } else if (tipoUser == 2) {
      //Coordinador de seccion
      return (
          <div className="bodySidebar">
            <Link to="/home" onClick={() => this.props.handleMenu(false)} className="link-body-sidebar">Inicio</Link>
            <div className="divider"/>
            <Link to="/dashboard" onClick={() => this.props.handleMenu(false)} className="link-body-sidebar">Dashboard</Link>
            <div className="divider"/>
            <Link to="/profesores" onClick={() => this.props.handleMenu(false)} className="link-body-sidebar">Profesores</Link>
            <div className="divider"/>
            <Link to="/convocatorias" onClick={() => this.props.handleMenu(false)} className="link-body-sidebar">Convocatorias</Link>
            <div className="divider"/>
            <Link to="/ayudaeconomica" onClick={() => this.props.handleMenu(false)} className="link-body-sidebar">Ayudas Económicas</Link>
            <div className="divider"/>
            <Link to="/preferenciaCursos" onClick={() => this.props.handleMenu(false)} className="link-body-sidebar">Prefencia de Dictado</Link>
          </div>
      );
    } else if (tipoUser == 3) {
      //Asistente de seccion
      return (
          <div className="bodySidebar">
            <Link to="/home" onClick={() => this.props.handleMenu(false)} className="link-body-sidebar">Inicio</Link>
            <div className="divider"/>
            <Link to="/profesores" onClick={() => this.props.handleMenu(false)} className="link-body-sidebar">Profesores</Link>
            <div className="divider"/>
            <Link to="/convocatorias" onClick={() => this.props.handleMenu(false)} className="link-body-sidebar">Convocatorias</Link>
            <div className="divider"/>
            <Link to="/ayudaeconomica" onClick={() => this.props.handleMenu(false)} className="link-body-sidebar">Ayudas Económicas</Link>
            <div className="divider"/>
            <Link to="/preferenciaCursos" onClick={() => this.props.handleMenu(false)} className="link-body-sidebar">Prefencia de Dictado</Link>
          </div>
      );
    } else if (tipoUser == 4) {
      //Asistente de departamento
      return (
          <div className="bodySidebar">
            <Link to="/home" onClick={() => this.props.handleMenu(false)} className="link-body-sidebar">Inicio</Link>
            <div className="divider"/>
            <Link to="/dashboard" onClick={() => this.props.handleMenu(false)} className="link-body-sidebar">Dashboard</Link>
            <div className="divider"/>
            <Link to="/profesores" onClick={() => this.props.handleMenu(false)} className="link-body-sidebar">Profesores</Link>
            <div className="divider"/>
            <Link to="/convocatorias" onClick={() => this.props.handleMenu(false)} className="link-body-sidebar">Convocatorias</Link>
            <div className="divider"/>
            <Link to="/ayudaeconomica" onClick={() => this.props.handleMenu(false)} className="link-body-sidebar">Ayudas Económicas</Link>
            <div className="divider"/>
            <Link to="/preferenciaCursos" onClick={() => this.props.handleMenu(false)} className="link-body-sidebar">Prefencia de Dictado</Link>
          </div>
      );
    } else {
      return (
          <div className="bodySidebar">
            <Link to="/" onClick={() => this.props.handleMenu(false)} className="link-body-sidebar">Iniciar sesión</Link>
          </div>
      );
    }
  }
}

export default BodySidebar;