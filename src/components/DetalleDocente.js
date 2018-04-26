import React from 'react';
import {Panel,Image, Col, Grid, Row,Button} from 'react-bootstrap';
import foto from '../resources/images/1.PNG';
import fotoAnonima from '../resources/images/anonimo.png';
import {Link} from 'react-router-dom';

class DetalleDocente extends React.Component {

  constructor(props){
    super(props);
    //console.log(this.props.location.search);

    this.state = {
      codigo: props.codigo,
      tipo: props.tipo,
      nombre: props.nombre + ' ' + props.apellidoP + ' ' + props.apellidoM,
      telefono: props.telefono,
      correo: props.correo,
      seccion: props.seccion,
      url: props.url,
      departamento:props.departamento,
    };

  }


  render() {

    return(
      <Grid>
        <Row className="show-grid">
          <Col md={1}/>
          <Col md={2}>
            <Link to={`/profesores/${this.state.codigo}/cursos`} >Cursos</Link>
          </Col>
          <Col md={2}>
            <Button bsStyle="primary">Horas Descarga</Button>
          </Col>
          <Col md={2}>
            <Button bsStyle="primary">Encuestas</Button>
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
                    <h4>Codigo: {this.state.codigo}</h4>
                    <h4>Tipo: {this.state.tipo}</h4>
                    <h4>Docente: {this.state.nombre}</h4>
                    <h4>Telefono: {this.state.telefono}</h4>
                    <h4>Correo: {this.state.correo}</h4>
                    <h4>Seccion: {this.state.seccion}</h4>
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
    );

  }
}

export default DetalleDocente;