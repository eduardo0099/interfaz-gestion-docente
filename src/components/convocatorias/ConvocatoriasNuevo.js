import React, {Component} from 'react';
import {Row, Grid, Table, Button, PageHeader, Modal, Popover, Tooltip, OverlayTrigger, Col} from 'react-bootstrap';
import Papa from 'papaparse';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import SimpleReactValidator from "simple-react-validator";
import moment from "moment";
import BootstrapTable from 'react-bootstrap-table-next';
import BaseContainer from "../BaseContainer";

class ConvocatoriaNuevo extends Component {


    constructor(props) {
        super(props);
        this.validator = new SimpleReactValidator();
        this.state = {
            gradosAcademicos: [],
            titulo: '',
            autor: [],
            resumen: '',
            fecha_inicio: '',
            fecha_fin: '',
            archivo: null,
            showAgregar: false,
            selectedAgregar: [],
            profesores: [],
            showQuitar: false,
            selectedQuitar: [],
            autoresModal: []
        };
    }


    offlineData() {
        this.set({gradosAcademicos: [{id: 1, nombre: 'Pregrado'}, {id: 2, nombre: 'Maestría'}, {id: 3, nombre: 'Doctorado'}]})
    }

    render() {
        return (
            <BaseContainer>
                <div className="panel col-lg-offset-2 col-lg-8 col-md-12 col-sm-12">
                    <div className="panel-heading">
                        <header className="page-header m-t-sm">
                            <a className="btn btn-default pull-right" onClick={this.props.history.goBack}> Volver </a>
                            <p className="h2 m-b-sm"> Nueva Convocatoria </p>
                        </header>
                    </div>
                    <div className="panel-body">
                        <h4> Datos generales </h4>
                        <hr/>
                        <div className="form-group">
                            <label> Titulo </label>
                            <input className="form-control"/>
                        </div>
                        <div className="form-group">
                            <label> Curso </label>
                            <input className="form-control"/>
                        </div>
                    </div>
                    <div className="panel-footer text-right">
                        <button className="btn btn-primary"> Crear Convocatoria</button>
                    </div>
                </div>
            </BaseContainer>
        );
    }
}

export default ConvocatoriaNuevo;