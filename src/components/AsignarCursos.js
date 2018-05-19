import React, { Component } from 'react';
import {Tabs,Tab} from 'react-bootstrap';

class AsignarCursos extends Component {
  constructor(props){
    super(props);

    this.state = {
      key: 1
    };
  }

  handleSelect = key => {
    this.setState({ key });
  };

  render(){
    return (
      <Tabs
        activeKey={this.state.key}
        onSelect={this.handleSelect}
        id="controlled-tab-example"
      >
        <Tab eventKey={1} title="Consulta de Preferencias">
          Aqui solo se listan las preferencias
        </Tab>
        <Tab eventKey={2} title="Asignacion de cursos">
          Asigna
        </Tab>
        <Tab eventKey={3} title="Revision de carga">
          Resumen
        </Tab>
      </Tabs>
    );
  }
}

export default AsignarCursos;