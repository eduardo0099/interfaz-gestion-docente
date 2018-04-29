import React from 'react';
import {NavLink,Link} from 'react-router-dom';
import './../styles/BodySidebar.css';

const BodySidebar = (props) => {
  const divider = <div className="divider"/>;

  return (
    <div className="bodySidebar">
      <Link to="/" onClick={() => props.handleMenu(false)} className="link-body-sidebar">Inicio</Link>
      {divider}
      <Link to="/profesores" onClick={() => props.handleMenu(false)}  className="link-body-sidebar">Profesores</Link>
      {divider}
      <Link to="/carga" onClick={() => props.handleMenu(false)}  className="link-body-sidebar">Carga Datos</Link>
    </div>
  );
};

export default BodySidebar;