import React from 'react';
import {NavLink,Link} from 'react-router-dom';
import './../styles/BodySidebar.css';

const BodySidebar = (props) => {
  const divider = <div className="divider"/>;

  return (
    <div className="bodySidebar">
      <Link to="/" className="link-body-sidebar">Inicio</Link>
      <Link to="/profesores" className="link-body-sidebar">Profesores</Link>
      {divider}
      <a href="#" className="link-body-sidebar">Modulo</a>
      <a href="#" className="link-body-sidebar">Modulo</a>
      <a href="#" className="link-body-sidebar">Modulo</a>
      {divider}
      <a href="#" className="link-body-sidebar">Modulo</a>
      <a href="#" className="link-body-sidebar">Modulo</a>
      <a href="#" className="link-body-sidebar">Modulo</a>
      {divider}
      <a href="#" className="link-body-sidebar">Modulo</a>
      <a href="#" className="link-body-sidebar">Modulo</a>
      <a href="#" className="link-body-sidebar">Modulo</a>
      {divider}
      <a href="#" className="link-body-sidebar">Modulo</a>
      <a href="#" className="link-body-sidebar">Modulo</a>
      <a href="#" className="link-body-sidebar">Modulo</a>
      {divider}
      <a href="#" className="link-body-sidebar">Modulo</a>
    </div>
  );
};

export default BodySidebar;