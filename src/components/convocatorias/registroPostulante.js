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

class registroPostulante extends Component {


    constructor(props) {
        super(props);
        this.validator1 = new SimpleReactValidator();
        this.validator2 = new SimpleReactValidator();
        this.state = {
            btnAnterior:false,
            btnFinalizar:false,
            paso:1,
            fechaNac:'',
            gradosAcademicos: [],
            nombres:'',
            aPaterno:'',
            aMaterno:'',
            sexo:'',
            checkM:false,
            checkF:false,
            nacionalidad:'',
            departamento:'',
            provincia:'',
            distrito:'',
            email:'',
            tipoDoc:'',
            numDoc:''
        };

        this.handleNombres = this.handleNombres.bind(this);
        this.handleAPaterno = this.handleAPaterno.bind(this);
        this.handleAMaterno = this.handleAMaterno.bind(this);
        this.handleFNac = this.handleFNac.bind(this);
        this.handleCheckM = this.handleCheckM.bind(this);
        this.handleCheckF = this.handleCheckF.bind(this);
    }


    offlineData() {
        this.set({gradosAcademicos: [{id: 1, nombre: 'Pregrado'}, {id: 2, nombre: 'Maestría'}, {id: 3, nombre: 'Doctorado'}]})
    }

    handleNombres(event) {
        this.setState({nombres: event.target.value});
    }

    handleAPaterno(event) {
        this.setState({aPaterno: event.target.value});
    }

    handleAMaterno(event) {
        this.setState({aMaterno: event.target.value});
    }

    handleFNac(date) {
        this.setState({fechaNac: date});
    }

    handleNacionalidad(event) {
        this.setState({nacionalidad: event});
    }

    handleDepartamento(event) {
        this.setState({departamento: event});
    }

    handleProvincia(event) {
        this.setState({provincia: event});
    }

    handleDistrito(event) {
        this.setState({distrito: event});
    }

    handleEmail(event) {
        this.setState({email: event});
    }

    handleTipoDoc(event) {
        this.setState({tipoDoc: event});
    }

    handleNumDoc(event) {
        this.setState({numDoc: event});
    }

    handleCheckM(event) {
        this.setState({
            sexo: 'M',
            checkF:false,
            checkM:true
        });
        console.log('sexo:',this.state.sexo,',F:',this.state.checkF,',M:',this.state.checkM)
    }

    handleCheckF(event) {
        this.setState({
            sexo: 'F',
            checkM:false,
            checkF:true
        });
        console.log('sexo:',this.state.sexo,',F:',this.state.checkF,',M:',this.state.checkM)
    }

    performNext = ()=> {
        if(this.state.paso==1) {
            if (this.validator1.allValid()) {
                this.setState({
                    paso: 2,
                    btnAnterior:true
                });
            } else {
                this.validator1.showMessages();
                // rerender to show messages for the first time
                this.forceUpdate();
            }

        }else if(this.state.paso==2){
            if (this.validator2.allValid()) {
                this.setState({
                    paso: 3
                });
            } else {
                this.validator2.showMessages();
                // rerender to show messages for the first time
                this.forceUpdate();
            }
        }
    }

    performBack = ()=> {
        if(this.state.paso==2) {
            this.setState({
                paso: 1,
                btnAnterior:false
            });
        }
    }

    render() {
        let btnAnterior;
        if (this.state.btnAnterior) {
            btnAnterior = <Button className="btn btn-primary" onClick={this.performBack}>Anterior</Button>
        } else {
            btnAnterior = <label></label>
        }

        let btnSiguiente;
        if (this.state.btnFinalizar) {
            btnSiguiente = <button className="btn btn-primary" onClick={this.performNext}> Finalizar </button>
        } else {
            btnSiguiente = <button className="btn btn-primary" onClick={this.performNext}> Siguiente </button>
        }

        let cuerpo;
        if (this.state.paso == 1) {
            cuerpo = <div className="panel-body">
                <h4> Información General </h4>
                <div className="form-group">
                    <div className="col-md-offset-0 col-md-6">
                        <label> Nombres: </label>
                        <input type="text" className="form-control" value={this.state.nombres}
                               onChange={this.handleNombres}/>
                        {this.validator1.message('nombres', this.state.nombres, 'required', false, {required: 'Este campo es obligatorio'})}
                        <br></br>
                        <label> Primer apellido: </label>
                        <input type="text" className="form-control" value={this.state.aPaterno}
                               onChange={this.handleAPaterno}/>
                        {this.validator1.message('aPaterno', this.state.aPaterno, 'required', false, {required: 'Este campo es obligatorio'})}
                        <br></br>
                        <label> Segundo apellido: </label>
                        <input type="text" className="form-control" value={this.state.aMaterno}
                               onChange={this.handleAMaterno}/>
                        {this.validator1.message('aMaterno', this.state.aMaterno, 'required', false, {required: 'Este campo es obligatorio'})}
                        <br></br>
                        <label> Sexo: </label>
                        <br></br>
                        <label>
                            <input
                                name="Masculino"
                                type="checkbox"
                                checked={this.state.checkM}
                                onChange={this.handleCheckM}/>
                            &nbsp;Masculino
                        </label>
                        <label> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </label>
                        <label>
                            <input
                                name="Femenino"
                                type="checkbox"
                                checked={this.state.checkF}
                                onChange={this.handleCheckF}/>
                            &nbsp;Femenino
                        </label>
                        {this.validator1.message('sexo', this.state.sexo, 'required', false, {required: 'Este campo es obligatorio'})}
                        <br></br>
                        <br></br>
                        <label> Fecha de nacimiento: </label>
                        <DatePicker
                            dateFormat="DD/MM/YYYY"
                            selected={this.state.fechaNac}
                            onChange={this.handleFNac}
                        />
                        {this.validator1.message('fechaNac', this.state.fechaNac, 'required', false, {required: 'Este campo es obligatorio'})}
                        <br></br>
                    </div>
                </div>
            </div>

            //********parte 2:
        }else if(this.state.paso == 2){
            cuerpo = <div className="panel-body">
                <h4> Información de contacto </h4>
                <div className="form-group">
                    <div className="col-md-offset-0 col-md-7">
                        <label> Nacionalidad: </label>
                        <input type="text" className="form-control" value={this.state.nacionalidad}
                               onChange={this.handleNacionalidad}/>
                        {this.validator2.message('nacionalidad', this.state.nacionalidad, 'required', false, {required: 'Este campo es obligatorio'})}
                        <br></br>
                        <label> Departamento: </label>
                        <input type="text" className="form-control" value={this.state.departamento}
                               onChange={this.handleDepartamento}/>
                        {this.validator2.message('departamento', this.state.departamento, 'required', false, {required: 'Este campo es obligatorio'})}
                        <br></br>
                        <label> Provincia: </label>
                        <input type="text" className="form-control" value={this.state.provincia}
                               onChange={this.handleProvincia}/>
                        {this.validator2.message('provincia', this.state.provincia, 'required', false, {required: 'Este campo es obligatorio'})}
                        <br></br>
                        <label> Distrito: </label>
                        <input type="text" className="form-control" value={this.state.distrito}
                               onChange={this.handleDistrito}/>
                        {this.validator2.message('distrito', this.state.distrito, 'required', false, {required: 'Este campo es obligatorio'})}
                        <br></br>
                        <label> Correo electrónico: </label>
                        <input type="text" className="form-control" value={this.state.email}
                               onChange={this.handleEmail}/>
                        {this.validator2.message('email', this.state.email, 'required', false, {required: 'Este campo es obligatorio'})}
                        <br></br>
                    </div>
                    <div>
                        <div className="col-md-offset-0 col-md-4">
                            <label> Tipo documento: </label>
                            <input type="text" className="form-control" value={this.state.tipoDoc}
                                   onChange={this.handleTipoDoc}/>
                            {this.validator2.message('tipoDoc', this.state.tipoDoc, 'required', false, {required: 'Este campo es obligatorio'})}
                            <br></br>
                        </div>
                        <div className="col-md-3">
                            <label> Número documento: </label>
                            <input type="text" className="form-control" value={this.state.numDoc}
                                   onChange={this.handleNumDoc}/>
                            {this.validator2.message('numDoc', this.state.numDoc, 'required', false, {required: 'Este campo es obligatorio'})}
                        </div>
                    </div>
                    <br></br>
                </div>
            </div>
        }else if(this.state.paso == 3){

        }

        return (
            <BaseContainer>
                <div className="panel col-lg-offset-2 col-lg-8 col-md-12 col-sm-12">
                    <div className="panel-heading">
                        <header className="page-header m-t-sm">
                            <a className="btn btn-default pull-right" onClick={this.props.history.goBack}> Volver </a>
                            <p className="h2 m-b-sm"> Registro de Postulante </p>
                        </header>
                    </div>
                    {cuerpo}
                    <div className="panel-footer text-right">
                        {btnAnterior}
                        <label> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </label>
                        {btnSiguiente}
                    </div>
                </div>
            </BaseContainer>
        );
    }
}

export default registroPostulante;