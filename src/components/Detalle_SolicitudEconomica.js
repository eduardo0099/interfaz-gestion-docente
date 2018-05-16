import React, {Component} from 'react';
import {Grid, Row, Button, Glyphicon, Col, SplitButton, MenuItem} from 'react-bootstrap';
import axios from "axios/index";
import {Route,Link} from 'react-router-dom';

class Detalle_SolicitudEconomica extends React.Component{
    constructor(props){
        super(props);
        this.state=[]
    }

    render(){

        return(
                <div>
                    <Col md={12}>
                        <Button onClick={this.props.history.goBack}><Glyphicon glyph="arrow-left"/></Button>
                        <span
                            className="professor-name"> Regresar a Solicitudes Economicas </span>
                    </Col>
                    <h1>Detalle de Solicitud Economica</h1>

                </div>
        );
    }
}

export default Detalle_SolicitudEconomica;