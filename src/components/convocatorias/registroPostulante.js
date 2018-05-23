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
        this.invValidator = new SimpleReactValidator();
        this.tituloValidator = new SimpleReactValidator();
        this.maestriaValidator = new SimpleReactValidator();
        this.doctoradoValidator = new SimpleReactValidator();
        this.validator3 = new SimpleReactValidator();
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
            numDoc:'',

            expProfesional:'',

            investigaciones:[],
            numInvestigaciones:0,
            tituloInv:'',
            resumenInv:'',
            fechaInv:'',

            titulo:{
                nombreProg:'',
                pais:'',
                institucion:'',
                nombreTitulo:'',
                fechaTitulo:'',
                tituloTesis:'',
                urlTesis:'',
                archivo:null
            },
            maestria:{
                nombreProg:'',
                pais:'',
                institucion:'',
                nombreTitulo:'',
                fechaTitulo:'',
                archivo:null
            },
            doctorado:{
                nombreProg:'',
                pais:'',
                institucion:'',
                nombreTitulo:'',
                fechaTitulo:'',
                archivo:null
            },

            tituloProf:false,
            maestria:false,
            doctorado:false,
            cargos:false,
            asesoria:false,
            premios:false,
            expProf:false,
            investigacion:false
        };

        this.handleNombres = this.handleNombres.bind(this);
        this.handleAPaterno = this.handleAPaterno.bind(this);
        this.handleAMaterno = this.handleAMaterno.bind(this);
        this.handleFNac = this.handleFNac.bind(this);
        this.handleCheckM = this.handleCheckM.bind(this);
        this.handleCheckF = this.handleCheckF.bind(this);

        this.handleNacionalidad = this.handleNacionalidad.bind(this);
        this.handleDepartamento = this.handleDepartamento.bind(this);
        this.handleProvincia = this.handleProvincia.bind(this);
        this.handleDistrito = this.handleDistrito.bind(this);
        this.handleEmail = this.handleEmail.bind(this);
        this.handleTipoDoc = this.handleTipoDoc.bind(this);
        this.handleNumDoc = this.handleNumDoc.bind(this);

        this.handleFInv = this.handleFInv.bind(this);
        this.handleTituloInv = this.handleTituloInv.bind(this);
        this.handleResumenInv = this.handleResumenInv.bind(this);


        this.handleTituloNombreProg = this.handleTituloNombreProg.bind(this);
        this.handleTituloPais = this.handleTituloPais.bind(this);
        this.handleTituloInstitucion = this.handleTituloInstitucion.bind(this);
        this.handleTituloNombreTitulo = this.handleTituloNombreTitulo.bind(this);
        this.handleTituloFecha = this.handleTituloFecha.bind(this);
        this.handleTituloNombreTesis = this.handleTituloNombreTesis.bind(this);
        this.handleTituloUrlTesis = this.handleTituloUrlTesis.bind(this);

        this.handleExpProfesional = this.handleExpProfesional.bind(this);

        this.handleMaestriaNombreProg = this.handleMaestriaNombreProg.bind(this);
        this.handleMaestriaPais = this.handleMaestriaPais.bind(this);
        this.handleMaestriaInstitucion = this.handleMaestriaInstitucion.bind(this);
        this.handleMaestriaNombreTitulo = this.handleMaestriaNombreTitulo.bind(this);
        this.handleMaestriaFecha = this.handleMaestriaFecha.bind(this);

        this.handleDoctoradoNombreProg = this.handleDoctoradoNombreProg.bind(this);
        this.handleDoctoradoPais = this.handleDoctoradoPais.bind(this);
        this.handleDoctoradoInstitucion = this.handleDoctoradoInstitucion.bind(this);
        this.handleDoctoradoNombreTitulo = this.handleDoctoradoNombreTitulo.bind(this);
        this.handleDoctoradoFecha = this.handleDoctoradoFecha.bind(this);


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
        this.setState({nacionalidad: event.target.value});
    }

    handleDepartamento(event) {
        this.setState({departamento: event.target.value});
    }

    handleProvincia(event) {
        this.setState({provincia: event.target.value});
    }

    handleDistrito(event) {
        this.setState({distrito: event.target.value});
    }

    handleEmail(event) {
        this.setState({email: event.target.value});
    }

    handleTipoDoc(event) {
        this.setState({tipoDoc: event.target.value});
    }

    handleNumDoc(event) {
        this.setState({numDoc: event.target.value});
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

    handleFInv(date){
        this.setState({fechaInv: date});
    }

    handleTituloInv(event) {
        this.setState({tituloInv: event.target.value});
    }

    handleResumenInv(event) {
        this.setState({resumenInv: event.target.value});
        console.log(this.state.titulo)
    }


    handleExpProfesional(event) {
        this.setState({expProfesional: event.target.value});
    }

    ///////////

    handleTituloNombreProg(event) {
        let tempTitulo = {...this.state.titulo};
        tempTitulo.nombreProg = event.target.value
        this.setState({
            titulo:tempTitulo
        });
    }

    handleTituloPais(event) {
        let tempTitulo = {...this.state.titulo};
        tempTitulo.pais = event.target.value
        this.setState({
            titulo: tempTitulo
        });
    }

    handleTituloInstitucion(event) {
        let tempTitulo = {...this.state.titulo};
        tempTitulo.institucion = event.target.value
        this.setState({
            titulo:tempTitulo
        });
    }

    handleTituloNombreTitulo(event) {
        let tempTitulo = {...this.state.titulo};
        tempTitulo.nombreTitulo = event.target.value
        this.setState({
            titulo:tempTitulo
        });
    }

    handleTituloFecha(date) {
        let tempTitulo = {...this.state.titulo};
        tempTitulo.fechaTitulo = date
        this.setState({
            titulo: tempTitulo
        });
    }

    handleTituloNombreTesis(event) {
        let tempTitulo = {...this.state.titulo};
        tempTitulo.tituloTesis = event.target.value
        this.setState({
            titulo:tempTitulo
        });
    }

    handleTituloUrlTesis(event) {
        let tempTitulo = {...this.state.titulo};
        tempTitulo.urlTesis = event.target.value
        this.setState({
            titulo:tempTitulo
        });
    }
    ///////////

    handleMaestriaNombreProg(event) {
        let tempMaestria = {...this.state.maestria};
        tempMaestria.nombreProg = event.target.value
        this.setState({
            maestria:tempMaestria
        });
    }

    handleMaestriaPais(event) {
        let tempMaestria = {...this.state.maestria};
        tempMaestria.pais = event.target.value
        this.setState({
            maestria: tempMaestria
        });
    }

    handleMaestriaInstitucion(event) {
        let tempMaestria = {...this.state.maestria};
        tempMaestria.institucion = event.target.value
        this.setState({
            maestria:tempMaestria
        });
    }

    handleMaestriaNombreTitulo(event) {
        let tempMaestria = {...this.state.maestria};
        tempMaestria.nombreTitulo = event.target.value
        this.setState({
            maestria:tempMaestria
        });
    }

    handleMaestriaFecha(date) {
        let tempMaestria = {...this.state.maestria};
        tempMaestria.fechaTitulo = date
        this.setState({
            maestria: tempMaestria
        });
    }

    ///////////

    handleDoctoradoNombreProg(event) {
        let tempDoctorado = {...this.state.doctorado};
        tempDoctorado.nombreProg = event.target.value
        this.setState({
            doctorado:tempDoctorado
        });
    }

    handleDoctoradoPais(event) {
        let tempDoctorado = {...this.state.doctorado};
        tempDoctorado.pais = event.target.value
        this.setState({
            doctorado: tempDoctorado
        });
    }

    handleDoctoradoInstitucion(event) {
        let tempTitulo = {...this.state.doctorado};
        tempTitulo.institucion = event.target.value
        this.setState({
            doctorado:tempTitulo
        });
    }

    handleDoctoradoNombreTitulo(event) {
        let tempDoctorado = {...this.state.doctorado};
        tempDoctorado.nombreTitulo = event.target.value
        this.setState({
            doctorado:tempDoctorado
        });
    }

    handleDoctoradoFecha(date) {
        let tempDoctorado = {...this.state.doctorado};
        tempDoctorado.fechaTitulo = date
        this.setState({
            doctorado: tempDoctorado
        });
    }

    performNext = ()=> {
        if(this.state.paso==1) {
            if (this.validator1.allValid()) {
            //if (1) {
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
            //if (1) {
                this.setState({
                    paso: 3,
                    btnFinalizar:true
                });
            } else {
                this.validator2.showMessages();
                // rerender to show messages for the first time
                this.forceUpdate();
            }
        }else if(this.state.paso==3){
            if (this.tituloValidator.allValid() && this.validator3.allValid() && this.maestriaValidator.allValid() && this.doctoradoValidator.allValid() && this.state.investigaciones.length>0) {
                console.log('titulo:', this.state.titulo);
                console.log('maestria:', this.state.maestria);
                console.log('doctorado:', this.state.doctorado);
            }else {
                this.tituloValidator.showMessages();
                this.maestriaValidator.showMessages();
                this.doctoradoValidator.showMessages();
                this.validator3.showMessages();
                // rerender to show messages for the first time
                this.forceUpdate();
                if(this.state.investigaciones.length==0){
                    alert("registrar investigaciones!");
                }
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
        else if(this.state.paso==3) {
            this.setState({
                paso: 2,
                btnFinalizar:false
            });
        }
    }

    agregarInvestigacion = ()=> {
        if (this.invValidator.allValid()) {
            var investigacion  = {id: this.state.numInvestigaciones+1, titulo: this.state.tituloInv, resumen: this.state.resumenInv,fecha:this.state.fechaInv,archivo:null};
            this.setState({
                investigaciones: [...this.state.investigaciones, investigacion],
                numInvestigaciones:this.state.numInvestigaciones+1
            });
        }else {
            this.invValidator.showMessages();
            // rerender to show messages for the first time
            this.forceUpdate();
        }
        console.log('investigaciones: ',this.state.investigaciones);
    }

    render() {
        const columns = [{
            dataField: 'id',
            text: 'ID',
            hidden: true
        }, {
            dataField: 'titulo',
            text: 'Nombre'
        }, {
            dataField: 'resumen',
            text: 'Descripcion'
        }];

        const selectRow = {
            mode: 'radio',
            clickToSelect: true,
            hideSelectColumn: true,
            bgColor: '#93a3b5'
        };

        const rowEvents = {
        };

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
                        {this.validator2.message('email', this.state.email, 'required|email', false, {required: 'Este campo es obligatorio'})}
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
            //Parte 3:
        }else if(this.state.paso == 3){
            cuerpo=
                <div>
                    <ul className="nav nav-tabs">
                        <li className="active"><a href="#1" data-toggle="tab">Grados Academicos</a></li>
                        <li><a href="#2" data-toggle="tab">Docencia</a></li>
                        <li><a href="#3" data-toggle="tab">Experiencia Profesional</a></li>
                        <li><a href="#4" data-toggle="tab">Investigaciones</a></li>
                    </ul>
                    <div className="tab-content clearfix m-t-md">
                        <div className="tab-pane active row" id="1">
                            <div className="form-group col-md-2 m-r-n">
                                <ul className="nav nav-pills nav-stacked">
                                    <li className="active"><a href="#1a" data-toggle="tab">Titulo Profesional </a></li>
                                    <li><a href="#1b" data-toggle="tab"> Maestria </a></li>
                                    <li><a href="#1c" data-toggle="tab"> Doctorado </a></li>
                                    <li><a href="#1d" data-toggle="tab"> Diplomatura </a></li>
                                </ul>
                            </div>
                            <div className="form-group col-md-10 m-l-n">
                                <div className="tab-content clearfix">
                                    <div className="tab-pane active row" id="1a">
                                        <div className="form-group">
                                            <div className="col-md-offset-1 col-md-7">
                                                <label> Nombre del programa o especialidad: </label>
                                                <input type="text" className="form-control" value={this.state.titulo.nombreProg}
                                                       onChange={this.handleTituloNombreProg}/>
                                                {this.tituloValidator.message('titulo.nombreProg', this.state.titulo.nombreProg, 'required', false, {required: 'Este campo es obligatorio'})}

                                                <label> Pais: </label>
                                                <input type="text" className="form-control" value={this.state.titulo.pais}
                                                          onChange={this.handleTituloPais}/>
                                                {this.tituloValidator.message('titulo.pais', this.state.titulo.pais, 'required', false, {required: 'Este campo es obligatorio'})}

                                                <label> Institución educativa: </label>
                                                <input type="text" className="form-control" value={this.state.titulo.institucion}
                                                          onChange={this.handleTituloInstitucion}/>
                                                {this.tituloValidator.message('titulo.institucion', this.state.titulo.institucion, 'required', false, {required: 'Este campo es obligatorio'})}

                                                <label> Nombre del título: </label>
                                                <input type="text" className="form-control" value={this.state.titulo.nombreTitulo}
                                                          onChange={this.handleTituloNombreTitulo}/>
                                                {this.tituloValidator.message('titulo.nombreTitulo', this.state.titulo.nombreTitulo, 'required', false, {required: 'Este campo es obligatorio'})}

                                                <label> Fecha de obtención del título: </label>
                                                <DatePicker
                                                    className="form-control"
                                                    dateFormat="DD/MM/YYYY"
                                                    selected={this.state.titulo.fechaTitulo}
                                                    onChange={this.handleTituloFecha}
                                                />
                                                {this.tituloValidator.message('titulo.fechaTitulo', this.state.titulo.fechaTitulo, 'required', false, {required: 'Este campo es obligatorio'})}

                                                <label> Título de la tesis: </label>
                                                <input type="text" className="form-control" value={this.state.titulo.tituloTesis}
                                                          onChange={this.handleTituloNombreTesis}/>
                                                {this.tituloValidator.message('titulo.tituloTesis', this.state.titulo.tituloTesis, 'required', false, {required: 'Este campo es obligatorio'})}

                                                <label> URL de la tesis: </label>
                                                <input type="text" className="form-control" value={this.state.titulo.urlTesis}
                                                          onChange={this.handleTituloUrlTesis}/>
                                                {this.tituloValidator.message('titulo.urlTesis', this.state.titulo.urlTesis, 'required', false, {required: 'Este campo es obligatorio'})}

                                                <label> Archivo adjunto: </label>
                                                <input type="file" name="datafile"/>
                                                <br></br>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="tab-pane row" id="1b">
                                        <div className="form-group">
                                            <div className="col-md-offset-1 col-md-7">
                                                <label> Nombre del programa o especialidad: </label>
                                                <input type="text" className="form-control" value={this.state.maestria.nombreProg}
                                                       onChange={this.handleMaestriaNombreProg}/>
                                                {this.maestriaValidator.message('maestria.nombreProg', this.state.maestria.nombreProg, 'required', false, {required: 'Este campo es obligatorio'})}

                                                <label> Pais: </label>
                                                <input type="text" className="form-control" value={this.state.maestria.pais}
                                                       onChange={this.handleMaestriaPais}/>
                                                {this.maestriaValidator.message('maestria.pais', this.state.maestria.pais, 'required', false, {required: 'Este campo es obligatorio'})}

                                                <label> Institución educativa: </label>
                                                <input type="text" className="form-control" value={this.state.maestria.institucion}
                                                       onChange={this.handleMaestriaInstitucion}/>
                                                {this.maestriaValidator.message('maestria.institucion', this.state.maestria.institucion, 'required', false, {required: 'Este campo es obligatorio'})}

                                                <label> Nombre del título: </label>
                                                <input type="text" className="form-control" value={this.state.maestria.nombreTitulo}
                                                       onChange={this.handleMaestriaNombreTitulo}/>
                                                {this.maestriaValidator.message('maestria.nombreTitulo', this.state.maestria.nombreTitulo, 'required', false, {required: 'Este campo es obligatorio'})}

                                                <label> Fecha de obtención del título: </label>
                                                <DatePicker
                                                    className="form-control"
                                                    dateFormat="DD/MM/YYYY"
                                                    selected={this.state.maestria.fechaTitulo}
                                                    onChange={this.handleMaestriaFecha}
                                                />
                                                {this.maestriaValidator.message('maestria.fechaTitulo', this.state.maestria.fechaTitulo, 'required', false, {required: 'Este campo es obligatorio'})}

                                                <label> Archivo adjunto: </label>
                                                <input type="file" name="datafile"/>
                                                <br></br>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="tab-pane row" id="1c">
                                        <div className="form-group">
                                            <div className="col-md-offset-1 col-md-7">
                                                <label> Nombre del programa o especialidad: </label>
                                                <input type="text" className="form-control" value={this.state.doctorado.nombreProg}
                                                       onChange={this.handleDoctoradoNombreProg}/>
                                                {this.doctoradoValidator.message('doctorado.nombreProg', this.state.doctorado.nombreProg, 'required', false, {required: 'Este campo es obligatorio'})}

                                                <label> Pais: </label>
                                                <input type="text" className="form-control" value={this.state.doctorado.pais}
                                                       onChange={this.handleDoctoradoPais}/>
                                                {this.doctoradoValidator.message('doctorado.pais', this.state.doctorado.pais, 'required', false, {required: 'Este campo es obligatorio'})}

                                                <label> Institución educativa: </label>
                                                <input type="text" className="form-control" value={this.state.doctorado.institucion}
                                                       onChange={this.handleDoctoradoInstitucion}/>
                                                {this.doctoradoValidator.message('doctorado.institucion', this.state.doctorado.institucion, 'required', false, {required: 'Este campo es obligatorio'})}

                                                <label> Nombre del título: </label>
                                                <input type="text" className="form-control" value={this.state.doctorado.nombreTitulo}
                                                       onChange={this.handleDoctoradoNombreTitulo}/>
                                                {this.doctoradoValidator.message('doctorado.nombreTitulo', this.state.doctorado.nombreTitulo, 'required', false, {required: 'Este campo es obligatorio'})}

                                                <label> Fecha de obtención del título: </label>
                                                <DatePicker
                                                    className="form-control"
                                                    dateFormat="DD/MM/YYYY"
                                                    selected={this.state.doctorado.fechaTitulo}
                                                    onChange={this.handleDoctoradoFecha}
                                                />
                                                {this.doctoradoValidator.message('doctorado.fechaTitulo', this.state.doctorado.fechaTitulo, 'required', false, {required: 'Este campo es obligatorio'})}

                                                <label> Archivo adjunto: </label>
                                                <input type="file" name="datafile"/>
                                                <br></br>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="tab-pane row" id="1d">
                                        <div className="form-group">
                                            <div className="col-md-offset-1 col-md-7">
                                                <label> Archivo adjunto: </label>
                                                <input type="file" name="datafile"/>
                                                <br></br>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="tab-pane" id="2">
                            <div className="form-group col-md-2 m-r-n">
                                <ul className="nav nav-pills nav-stacked">
                                    <li className="active"><a href="#2a" data-toggle="tab">Cursos a su Cargo </a></li>
                                    <li><a href="#2b" data-toggle="tab"> Asesoria de Tesis </a></li>
                                    <li><a href="#2c" data-toggle="tab"> Premios a la Docencia </a></li>
                                </ul>
                            </div>
                            <div className="form-group col-md-10 m-l-n">
                                <div className="tab-content clearfix">
                                    <div className="tab-pane active row" id="2a">
                                        <div className="form-group">
                                            <div className="col-md-offset-1 col-md-7">
                                                <label> Archivo adjunto: </label>
                                                <input type="file" name="datafile"/>
                                                <br></br>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="tab-pane row" id="2b">
                                        <div className="form-group">
                                            <div className="col-md-offset-1 col-md-7">
                                                <label> Archivo adjunto: </label>
                                                <input type="file" name="datafile"/>
                                                <br></br>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="tab-pane row" id="2c">
                                        <div className="form-group">
                                            <div className="col-md-offset-1 col-md-7">
                                                <label> Archivo adjunto: </label>
                                                <input type="file" name="datafile"/>
                                                <br></br>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="tab-pane" id="3">
                            <div className="form-group">
                                <div className="col-md-offset-1 col-md-7">
                                    <textarea className="form-control"value={this.state.expProfesional}
                                              onChange={this.handleExpProfesional}></textarea>
                                    {this.validator3.message('expProfesional', this.state.expProfesional, 'required', false, {required: 'Este campo es obligatorio'})}

                                    <br></br>
                                    <br></br>
                                </div>
                            </div>
                        </div>
                        <div className="tab-pane" id="4">
                            <div className="form-group">
                                <div className="col-md-offset-1 col-md-7">
                                    <label> Titulo: </label>
                                    <input type="text" className="form-control" value={this.state.tituloInv}
                                           onChange={this.handleTituloInv}/>
                                    {this.invValidator.message('tituloInv', this.state.tituloInv, 'required', false, {required: 'Este campo es obligatorio'})}

                                    <label> Resumen: </label>
                                    <textarea type="text" className="form-control" value={this.state.resumenInv}
                                              onChange={this.handleResumenInv}/>
                                    {this.invValidator.message('resumenInv', this.state.resumenInv, 'required', false, {required: 'Este campo es obligatorio'})}

                                    <label> Fecha: </label>
                                    <DatePicker
                                        className="form-control"
                                        dateFormat="DD/MM/YYYY"
                                        selected={this.state.fechaInv}
                                        onChange={this.handleFInv}
                                    />
                                    {this.invValidator.message('fechaInv', this.state.fechaInv, 'required', false, {required: 'Este campo es obligatorio'})}

                                    <label> Archivo: </label>
                                    <input type="file" name="datafile"/>
                                    <br></br>
                                    <div className="m-t-md">
                                        <BootstrapTable keyField='id' data={this.state.investigaciones} columns={columns}  rowEvents={rowEvents} selectRow={selectRow}/>
                                    </div>
                                    <br></br>
                                    <div className="panel-footer text-right">
                                        <button className="btn btn-primary" onClick={this.agregarInvestigacion}> Agregar Investigación</button>
                                    </div>
                                    <br></br>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
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