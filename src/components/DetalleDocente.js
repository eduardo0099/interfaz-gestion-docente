import React, { Component } from 'react';
import {Panel,Image, Col, Grid, Row,Button} from 'react-bootstrap';
import foto from '../resources/images/1.PNG';
import fotoAnonima from '../resources/images/anonimo.png';
import {Route,Link} from 'react-router-dom';
import axios from "axios/index";
import Cursos from "./Cursos";
import ListasEncuestas from "./ListaEncuestas";

class DetalleDocente extends Component {

  constructor(props){
    super(props);

    this.state = {
      info: []
    }

  }


  componentDidMount(){
    axios.get('http://200.16.7.151:8080/docente/docente', {
      params: {
        codigo: this.props.match.params.codigo,
        ciclo: "2018-1",
      }
    })
      .then(response => {
        this.setState({
          info: response.data
        });
      })
      .catch(error => {
        console.log(`Error al obtener datos del profesor ${this.props.match.params.codigo}`,error);
      });
  }

  render() {
    console.log("path",this.state.info.cursos);
    return(
      <div>
        <Route exact path={`${this.props.match.path}`} render={() =>
          <Grid>
            <Row className="show-grid">
              <Col md={1}/>
              <Col md={2}>
                <Link to={`${this.props.match.url}/cursos`} >Cursos</Link>
              </Col>
              <Col md={2}>
                <Button bsStyle="primary">Horas Descarga</Button>
              </Col>
              <Col md={2}>
                  <Link to={`${this.props.match.url}/encuestas`} >Encuestas</Link>
              </Col>
              <Col md={2}>
                <Button bsStyle="primary">Actividades</Button>
              </Col>
              <Col md={2}>
                <Button bsStyle="primary">Investigaciones</Button>
              </Col>
              <Col md={1}/>
            </Row>
            <Row className="show-grid" >
              <Col md={12}>{"  "}</Col>
            </Row>
            <Row className="show-grid">
              <Col md={1}/>
              <Col md={10}>
                <Panel bsStyle="primary">
                  <Panel.Heading>
                    <Panel.Title componentClass="h3">Detalle Docente</Panel.Title>
                  </Panel.Heading>
                  <Panel.Body>
                    <Row className="show-grid">
                      <Col md={8}>
                        <h4>Codigo: {this.state.info.codigo}</h4>
                        <h4>Docente: {`${this.state.info.nombres} ${this.state.info.apellidoP} ${this.state.info.apellidoM}`}</h4>
                        <h4>Telefono: {this.state.info.telefono}</h4>
                        <h4>Correo: {this.state.info.correo}</h4>
                        <h4>Departamento: {this.state.info.departamento}</h4>
                        <h4>Seccion: {this.state.info.seccion}</h4>
                      </Col>
                      <Col md={4}>
                        <Image
                          className='avatar'
                          src={this.state.codigo === 1? foto : fotoAnonima }
                          alt={'Avatar for ' + this.state.codigo}
                          responsive
                          rounded
                        />
                      </Col>
                    </Row>
                  </Panel.Body>
                </Panel>
              </Col>
              <Col md={1}/>
            </Row>
          </Grid>
        } />
        <Route path={`${this.props.match.path}/cursos`} render={()=>
          <Cursos cursos={this.state.info.cursos}
                  ciclos={[{descripcion:"2018-1"}]}
          />
        }/>
          <Route path={`${this.props.match.path}/encuestas`} render={()=>
              <ListasEncuestas encuestas={this.state.info.encuestas}
                                listaCiclos={[{"id":"1","descripcion":"Todos"},{"id":"1","descripcion":"2017-2"},
                                    {"id":"2","descripcion":"2017-1"}]}
                               cicloActual={this.state.info.ciclo}
                               nombreDocente={this.state.info.nombres + " " + this.state.info.apellidoP }
              />
          }/>
      </div>
    );

  }
}

export default DetalleDocente;