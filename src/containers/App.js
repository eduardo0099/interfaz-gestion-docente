import React, { Component } from 'react';
import Sidebar from 'react-sidebar';
import Header from './../components/Header';
import SidebarContent from './../components/SidebarContent';
import '../styles/Sidebar.css';
import '../styles/App.css';
import Home from "../components/Home";
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import ListaProfesores from "../components/ListaProfesores";
import CargaDatos from '../components/CargaDatos';

import PreferenciaCursos from '../components/PreferenciaCursos';

import AsignarCursos from "../components/AsignarCursos";
import ConvocatoriasLista from "../components/convocatorias/ConvocatoriasLista";
import 'react-select/dist/react-select.css';
import AyudaEconomica from "../components/AyudaEconomica/AyudaEconomica";
import AyudaEconomicaDetalle from "../components/AyudaEconomica/AyudaEconomicaDetalle";
import SignUp from "../components/SignUp";
import SignIn from "../components/SignIn";
import Dashboard from "../components/dashboard/Dashboard";

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {

      open: false,
      auth: false

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

  handleLogIn =() =>{
    this.setState({auth:true});
  }

  componentWillMount(){
    /*
    localStorage.removeItem('jwt');
    localStorage.removeItem('user');
    */
  }

  render() {
    let sidebarContent = <SidebarContent handleMenu={this.onSetOpen}/>;

    const sidebarProps = {
      sidebar: sidebarContent,
      open: this.state.open,
      onSetOpen: this.onSetOpen,
      sidebarClassName: "sidebar",
    };
    /*
    var usuario = JSON.parse(localStorage.getItem('user'));
    var tipoUser = usuario.tipo_usuario;
    */
    return (
      <BrowserRouter>
        <Sidebar {...sidebarProps}>
          <Header handleMenu={this.menuButtonClick}/>
          <div className="content">
                <Switch>
                <Route exact path="/" render={()=> <SignIn auth={this.state.auth} handleLogIn={this.handleLogIn}/>}/>
                <Route path="/registrar" component={SignUp}/>
                <Route path="/preferenciaCursos" component={PreferenciaCursos}/> 
                <Route path="/home" render={ () => <Home/>} />
                <Route path="/convocatorias" component={ConvocatoriasLista}/>
                <Route path="/profesores" component={ListaProfesores}/>
                <Route path="/dashboard" component={Dashboard}/>
                <Route path="/carga" render={ () => <CargaDatos /> }/>
                <Route path="/asignacionCursos" component={AsignarCursos}/>
                <Route path="/ayudaeconomica" component={AyudaEconomica}/>
                <Route render={()=><div>La pagina que busca no existe</div>} />
                </Switch>
          </div>
        </Sidebar>
      </BrowserRouter>
    );
  }
}

export default App;