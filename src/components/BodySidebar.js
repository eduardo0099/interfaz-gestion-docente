import React from 'react';
import {NavLink} from 'react-router-dom';
import './../styles/BodySidebar.css';

const BodySidebar = (props) => {
  const divider = <div className="divider"/>;

  return (
    <div className="bodySidebar">
      <NavLink exact to="/" className="link-body-sidebar">Inicio</NavLink>
      <NavLink to="/profesores" className="link-body-sidebar">Profesores</NavLink>
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