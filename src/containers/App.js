import React, { Component } from 'react';
import Sidebar from 'react-sidebar';
import Header from './../components/Header';
import SidebarContent from './../components/SidebarContent';
import '../styles/Sidebar.css';
import '../styles/App.css';
import Home from "../components/Home";
import {BrowserRouter, Route} from 'react-router-dom';
import ListaProfesores from "../components/ListaProfesores";

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      open: false,
    };

    this.onSetOpen = this.onSetOpen.bind(this);
  }

  onSetOpen(open) {
    this.setState({open: open});
  }

  menuButtonClick = e => {
    e.preventDefault();
    this.onSetOpen(!this.state.open);
  };

  render() {
    let sidebarContent = <SidebarContent />;

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
            <Route exact path="/" component={Home} />
            <Route exact path="/Profesores" render={ () => <ListaProfesores/> }/>
          </div>
        </Sidebar>
      </BrowserRouter>
    );
  }
}

export default App;