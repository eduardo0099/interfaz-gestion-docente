import React from 'react';
import {Link} from 'react-router-dom';
import './../styles/BodySidebar.css';

const BodySidebar = (props) => {
  const divider = <div className="divider"/>;

  return (
    <div className="bodySidebar">
      <Link to="/" onClick={() => props.handleMenu(false)} className="link-body-sidebar">Inicio</Link>
      {divider}
      <Link to="/profesores" onClick={() => props.handleMenu(false)}  className="link-body-sidebar">Profesores</Link>
      {divider}
      <Link to="/convocatorias" onClick={() => props.handleMenu(false)} className="link-body-sidebar">Convocatorias</Link>
       {divider}
      <Link to="/carga" onClick={() => props.handleMenu(false)}  className="link-body-sidebar">Carga de datos</Link>
      {divider}
      <Link to="/asignacionCursos" onClick={() => props.handleMenu(false)}  className="link-body-sidebar">Asignar Cursos</Link>
    </div>
  );
};

export default BodySidebar;