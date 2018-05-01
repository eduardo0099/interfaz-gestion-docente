import React, { Component } from 'react';
import Sidebar from 'react-sidebar';
import Header from './../components/Header';
import SidebarContent from './../components/SidebarContent';
import Home from "../components/Home";
import {BrowserRouter, Route} from 'react-router-dom';
import ListaProfesores from "../components/ListaProfesores";
import CargaDatos from '../components/CargaDatos';
import PerfilDocente from "../components/PerfilDocente";
import RegistroDocente from "../components/RegistroDocente";
import ProfesorPerfilAyudaEconomica from "../components/ProfesorPerfilAyudaEconomica";
import 'react-select/dist/react-select.css';
import '../styles/Phobos.css';
import '../styles/Sidebar.css';
import '../styles/App.css';

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      open: false,
    };

    this.onSetOpen = this.onSetOpen.bind(this);
  }

  escFunction = event => {
    if (event.keyCode === 27) {
      this.setState({open: false});
    }
  };

  onSetOpen(open) {
    this.setState({open: open});
  }

  menuButtonClick = e => {
    e.preventDefault();
    console.log("se cambia el open");
    this.onSetOpen(!this.state.open);
  };

  componentDidMount(){
    document.addEventListener("keydown", this.escFunction, false);
  }

  render() {
    let sidebarContent = <SidebarContent handleMenu={this.onSetOpen}/>;

    const sidebarProps = {
      sidebar: sidebarContent,
      open: this.state.open,
      onSetOpen: this.onSetOpen,
      sidebarClassName: "sidebar",
    };

    return (
      <BrowserRouter>
        <Sidebar {...sidebarProps}>
          <Header handleMenu={this.menuButtonClick}/>
          <div className="content">
            <Route exact path="/" render={ () => <Home/>} />
            <Route exact path="/profesores" render={ () => <ListaProfesores/> }/>
            <Route exact path="/ayudaeconomica" render={ () => <ProfesorPerfilAyudaEconomica/> }/>
            <Route path="/profesores/:codigo" component={PerfilDocente} />
            <Route exact path="/carga" render={ () => <CargaDatos /> }/>
            <Route exact path="/docentes/registro" render={ () => <RegistroDocente /> }/>
          </div>
        </Sidebar>
      </BrowserRouter>
    );
  }
}

export default App;
