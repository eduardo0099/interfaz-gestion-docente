import React from 'react';
import axios from 'axios';
import {Table, Grid, Row, Col, Button, Glyphicon, Image, ListGroup, ListGroupItem, Panel} from 'react-bootstrap';
import './../styles/ProfesorPerfilEncuesta.css';

class ProfesorPerfilEncuesta extends React.Component {

  constructor(props){
    super(props);
  }

  render() {
    return (
      <div>
          <Grid>
             <Row className="back-bar">
                 <Col md={12}>
                     <Button><Glyphicon glyph="arrow-left"></Glyphicon></Button> <span className="professor-name"> { this.state.horarioProfesor.profesor } </span>
                 </Col>
             </Row>
             <Row>
                <Col md={6}>
                    <Panel>
                        <Panel.Heading>
                            <Panel.Title componentClass="h3"> Encuesta </Panel.Title>
                        </Panel.Heading>
                            <ListGroup>
                                <ListGroupItem> <Grid> <Row> <Col md={2}> Ciclo: </Col> <Col md={4}> { this.props.ciclo } </Col> </Row> </Grid> </ListGroupItem>
                                <ListGroupItem> <Grid> <Row> <Col md={2}> Curso: </Col> <Col md={4}> { this.props.curso } </Col> </Row> </Grid> </ListGroupItem>
                                <ListGroupItem> <Grid> <Row> <Col md={2}> Horario: </Col> <Col md={4}>  { this.props.codigo } </Col> </Row> </Grid> </ListGroupItem>
                                <ListGroupItem> <Grid> <Row> <Col md={2}> Participación:  </Col> <Col md={4}> { this.props.participacion }%  </Col> </Row> </Grid> </ListGroupItem>
                                <ListGroupItem> <Grid> <Row> <Col md={2}> Puntaje </Col> <Col md={4}> { this.props.puntaje }/100 </Col> </Row> </Grid> </ListGroupItem>
                            </ListGroup>
                    </Panel>
                </Col>
                <Col md={6}>
                    <Panel>
                        <Panel.Body>
                            <img src="./../resources/piechart.png"/>
                        </Panel.Body>
                    </Panel>
                </Col>
             </Row>
             <Row>
                 <Col md={12}>
                     <Panel>
                         <Panel.Heading>
                             <Panel.Title componentClass="h3"> Comentarios </Panel.Title>
                         </Panel.Heading>
                         <ListGroup>
                             { this.props.encuestas.map( encuesta => {
                                 return ( <ListGroupItem> { encuesta } </ListGroupItem> ) 
                             })}
                         </ListGroup>
                     </Panel>
                 </Col>
             </Row>
          </Grid>
      </div>
    );
  }
}

export default ProfesorPerfilEncuesta;
