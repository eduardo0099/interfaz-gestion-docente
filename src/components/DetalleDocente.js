import React, { Component } from 'react';
import {Panel,Image, Col, Grid, Row,Button} from 'react-bootstrap';
import foto from '../resources/images/1.PNG';
import fotoAnonima from '../resources/images/anonimo.png';
import {Route,Link} from 'react-router-dom';
import axios from "axios/index";
import Cursos from "./Cursos";
import ListasEncuestas from "./ListaEncuestas";
import ListaInvestigaciones from "./ListaInvestigaciones"
import SolicitudesEconomicas from "./SolicitudesEconomicas"
import DescargaHoras from "./DescargaHoras"
import Actividades from "./Actividades"
import "../styles/BotonStyle.css";
import "../styles/HeaderPanel.css";

class DetalleDocente extends Component {

  constructor(props) {
      super(props);

      this.state = {
          info: {
              "codigo": "",
              "nombres": "",
              "apellidoP": "",
              "apellidoM": "",
              "telefono": "",
              "seccion": "",
              "departamento": "",
              "correo": ""
          }
      }
  }


  componentDidMount(){
    axios.get('http://200.16.7.151:8080/docente/docente/general', {
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

  obtenerTipo() {
    let id = `${this.state.info.descripcion}`;
    if(id == "TPA"){
      return "Tiempo Parcial por Asignaturas (TPA)";
    }
    else{
      return "Tiempo Completo (TC)";
    }
  }

  obtenerMailTo() {
    let correo = this.state.info.correo_pucp;
    return("mailto:"+correo);
  }

  render() {
      console.log(this.props);
    return(
      <div>
        <Route exact path={`${this.props.match.path}`} render={() =>
          <Grid>
            <Row className="show-grid">
              <Col md={2}>
                <Button type="button" class="btn btn-primary btn-cons" href={`${this.props.match.url}/cursos`} >Cursos</Button>
              </Col>
              <Col md={2}>
                <Button href={`${this.props.match.url}/descargaHoras`} >Descarga de Horas</Button>
              </Col>
              <Col md={2}>
                <Button href={`${this.props.match.url}/encuestas`} >Encuestas</Button>
              </Col>
              <Col md={2}>
                <Button href={`${this.props.match.url}/investigaciones`}>Investigaciones</Button>
              </Col>
              <Col md={2}>
                <Button href={`${this.props.match.url}/solicitudesEconomicas`} >Solicitudes</Button>
              </Col>
              <Col md={2}>
                <Button href={`${this.props.match.url}/Actividades`} >Plan de Proyecto</Button>
              </Col>
            </Row>
            <Row className="show-grid" >
              <Col md={12}><br></br></Col>
            </Row>
            <Row className="show-grid">
              <Col md={12}>
                <Panel bsStyle="primary">
                  <Panel.Heading>
                    <Panel.Title componentClass="h3">{`${this.state.info.apellido_paterno} ${this.state.info.apellido_materno}, ${this.state.info.nombres}`}</Panel.Title>
                  </Panel.Heading>
                  <Panel.Body>
                    <Row className="show-grid">
                      <Col md={4}>
                        <h4><br></br></h4>
                        <h4>Código</h4>
                        <h4-subtitle>{this.state.info.codigo}</h4-subtitle>
                        <h4>Contacto</h4>
                        <h4-subtitle> Télefono: {this.state.info.telefono}<br></br></h4-subtitle>
                        <h4-subtitle> Dirección Electrónica: {this.state.info.correo_pucp}</h4-subtitle>
                        <Button href={this.obtenerMailTo()} >Enviar mensaje</Button>
                      </Col>
                      <Col md={4}>
                        <h4><br></br></h4>
                        <h4>Tipo</h4>
                        <h4-subtitle>{this.obtenerTipo()}</h4-subtitle>
                        <h4>Departamento/Sección</h4>
                        <h4-subtitle>Departamento de {this.state.info.departamento}<br></br></h4-subtitle>
                        <h4-subtitle>Sección de {this.state.info.seccion}</h4-subtitle>
                      </Col>
                      <Col md={1}></Col>
                      <Col md={3}>
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
            </Row>
          </Grid>
        } />

        <Route path={`${this.props.match.path}/cursos`} component={Cursos}/>
        <Route path={`${this.props.match.path}/investigaciones`} component={ListaInvestigaciones}/>
        <Route path={`${this.props.match.path}/encuestas`} component={ListasEncuestas}/>
        <Route path={`${this.props.match.path}/solicitudesEconomicas`} component={SolicitudesEconomicas}/>
        <Route path={`${this.props.match.path}/descargaHoras`} component={DescargaHoras}/>
        <Route path={`${this.props.match.path}/actividades`} component={Actividades}/>
      </div>

    );

  }
}

export default DetalleDocente;