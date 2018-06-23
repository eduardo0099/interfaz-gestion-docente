import React, {Component} from 'react';
import {Row, Grid, Table, Button, PageHeader, Modal, Popover, Tooltip, OverlayTrigger, Col} from 'react-bootstrap';
import Papa from 'papaparse';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import moment from "moment";
import BootstrapTable from 'react-bootstrap-table-next';
import BaseContainer from "../BaseContainer";
import {Checkbox, CheckboxGroup} from 'react-checkbox-group';
import API from "../../api";
import Select from 'react-select';

const gradosAcademicos = [
    'Título Profesional',
    'Maestría',
    'Doctorado',
    'Diplomatura'
]

class ConvocatoriaCampos extends Component {

    constructor(props) {
        super(props);
        this.state = {
            gradosAcademicos: ["Titulo Profesional"],
            docencia: [],
            experienciaProfesional: [],
            investigacion: [],

            titulo:true,
            tituloVal:'',
            maestria:false,
            maestriaVal:'',
            doctorado:false,
            doctoradoVal:'',
            diplomado:false,
            diplomadoVal:'',

            cargo:false,
            cargoVal:'',
            asesoria:false,
            asesoriaVal:'',
            premio:false,
            premioVal:'',

            experiencia:false,
            experienciaVal:'',

            invInput:false,
            investigacionVal:'',

        };

    }


    gradosAcademicosChanged = (newGradoAcademico) => {
        let aux=this;
        this.setState({
            gradosAcademicos: newGradoAcademico,
            maestria:false,
            doctorado:false,
            diplomado:false
        });

        newGradoAcademico.forEach(function(entry) {
            if(entry==="Maestria"){
                aux.setState({
                    maestria: true
                });
            }
            if(entry==="Doctorado"){
                aux.setState({
                    doctorado: true
                });
            }
            if(entry==="Diplomatura"){
                aux.setState({
                    diplomado: true
                });
            }
        });

        if(!this.state.maestria){
            this.setState({
                maestriaVal: ''
            });
        }

        if(!this.state.doctorado){
            this.setState({
                doctoradoVal: ''
            });
        }

        if(!this.state.diplomado){
            this.setState({
                diplomadoVal: ''
            });
        }
    };

    docenciaChanged = (newDocencia) => {
        let aux=this;
        this.setState({
            docencia: newDocencia,
            cargo:false,
            asesoria:false,
            premio:false
        });

        newDocencia.forEach(function(entry) {
            if(entry==="Cargos a su curso"){
                aux.setState({
                    cargo: true
                });
            }
            if(entry==="Asesoria de Tesis"){
                aux.setState({
                    asesoria: true
                });
            }
            if(entry==="Premios a la Docencia"){
                aux.setState({
                    premio: true
                });
            }
        });
        if(!this.state.cargo){
            this.setState({
                cargoVal: ''
            });
        }

        if(!this.state.asesoria){
            this.setState({
                asesoriaVal: ''
            });
        }

        if(!this.state.premio){
            this.setState({
                premioVal: ''
            });
        }
    };

    experienciaProfesionalChanged = (newexperProfe) => {
        let aux=this;
        this.setState({
            experienciaProfesional: newexperProfe,
            experiencia:false
        });
        newexperProfe.forEach(function(entry) {
            if(entry==="Solicitar Experiencia Profesional"){
                aux.setState({
                    experiencia: true
                });
            }
        });
        if(!this.state.experiencia){
            this.setState({
                experienciaVal: ''
            });
        }
    };

    investigacionProfesionalChanged = (newinvestigacion) => {
        let aux=this;
        this.setState({
            investigacion: newinvestigacion,
            invInput:false
        });
        newinvestigacion.forEach(function(entry) {
            if(entry==="Solicitar Investigacion"){
                aux.setState({
                    invInput: true
                });
            }
        });
        if(!this.state.invInput){
            this.setState({
                investigacionVal: ''
            });
        }
    };


    handleMaestria=(event)=> {
        this.setState({
            maestriaVal: event.target.value
        });
    };

    handleTitulo=(event)=> {
        this.setState({
            tituloVal: event.target.value
        });
    };

    handleDoctorado=(event)=> {
        this.setState({
            doctoradoVal: event.target.value
        });
    };

    handleDiplomado=(event)=> {
        this.setState({
            diplomadoVal: event.target.value
        });
    };

    handleCargo=(event)=> {
        this.setState({
            cargoVal: event.target.value
        });
    };

    handleAsesoria=(event)=> {
        this.setState({
            asesoriaVal: event.target.value
        });
    };

    handlePremio=(event)=> {
        this.setState({
            premioVal: event.target.value
        });
    };

    handleInvestigacion=(event)=> {
        this.setState({
            investigacionVal: event.target.value
        });
    };

    handleExperiencia=(event)=> {
        this.setState({
            experienciaVal: event.target.value
        });
    };


    pesosLlenos(){
        if(this.state.tituloVal===''){
            return false
        }
        if(this.state.maestria && this.state.maestriaVal===''){
            return false
        }
        if(this.state.doctorado && this.state.doctoradoVal===''){
            return false
        }
        if(this.state.diplomado && this.state.diplomadoVal===''){
            return false
        }


        if(this.state.cargo && this.state.cargoVal===''){
            return false
        }
        if(this.state.asesoria && this.state.asesoriaVal===''){
            return false
        }
        if(this.state.premio && this.state.premioVal===''){
            return false
        }


        if(this.state.experiencia && this.state.experienciaVal===''){
            return false
        }


        if(this.state.invInput && this.state.investigacionVal===''){
            return false
        }

        return true
    }



    performPostRequest = ()=> {
        console.log('postrequest:')
        let gradAcadRegistrar=[];
        let docenciaRegistrar=[];
        let expProfRegistrar=[];
        let investigacionRegistrar=[];
        let aux=this;

        this.state.gradosAcademicos.forEach(function(entry) {
            let elemento ;
            if(entry==="Titulo Profesional"){
                elemento  = {descripcion: entry, peso:parseInt(aux.state.tituloVal)};
                gradAcadRegistrar= [...gradAcadRegistrar, elemento];
            }
            if(entry==="Maestria"){
                elemento  = {descripcion: entry, peso:parseInt(aux.state.maestriaVal)};
                gradAcadRegistrar= [...gradAcadRegistrar, elemento];
            }
            if(entry==="Doctorado"){
                elemento  = {descripcion: entry, peso:parseInt(aux.state.doctoradoVal)};
                gradAcadRegistrar= [...gradAcadRegistrar, elemento];
            }
            if(entry==="Diplomatura"){
                elemento  = {descripcion: entry, peso:parseInt(aux.state.diplomadoVal)};
                gradAcadRegistrar= [...gradAcadRegistrar, elemento];
            }
        });

        this.state.docencia.forEach(function(entry) {
            let elemento;
            if(entry==="Cargos a su curso"){
                elemento  = {descripcion: entry, peso:parseInt(aux.state.cargoVal)};
                docenciaRegistrar= [...docenciaRegistrar, elemento];
            }
            if(entry==="Asesoria de Tesis"){
                elemento  = {descripcion: entry, peso:parseInt(aux.state.asesoriaVal)};
                docenciaRegistrar= [...docenciaRegistrar, elemento];
            }
            if(entry==="Premios a la Docencia"){
                elemento  = {descripcion: entry, peso:parseInt(aux.state.premioVal)};
                docenciaRegistrar= [...docenciaRegistrar, elemento];
            }
        });

        this.state.experienciaProfesional.forEach(function(entry) {
            let elemento;
            if(entry==="Solicitar Experiencia Profesional"){
                elemento  = {descripcion: entry, peso:parseInt(aux.state.experienciaVal)};
                expProfRegistrar= [...expProfRegistrar, elemento];
            }
        });

        this.state.investigacion.forEach(function(entry) {
            let elemento;
            if(entry==="Solicitar Investigacion"){
                elemento  = {descripcion: entry, peso:parseInt(aux.state.investigacionVal)};
                investigacionRegistrar= [...investigacionRegistrar, elemento];
            }
        });
        console.log('gradAcadRegistrar:',gradAcadRegistrar);
        console.log('docenciaRegistrar:',docenciaRegistrar);
        console.log('expProfRegistrar:',expProfRegistrar);
        console.log('investigacionRegistrar:',investigacionRegistrar);
        // poner el put
        if( this.pesosLlenos()){
            API.put('convocatoria/convocatoria/modificar', {
                id : this.props.match.params.id_convocatoria,
                estado_convocatoria : "Abierta"
            })
                .then(response => {
                    API.put('convocatoria/convocatoria/modificar', {
                        id:this.props.match.params.id_convocatoria,
                        grados_academicos:gradAcadRegistrar,
                        docencia:docenciaRegistrar,
                        experiencia_profesional:expProfRegistrar,
                        investigacion:investigacionRegistrar,
                    })
                        .then(response => {
                        })
                        .catch(error => {
                            alert("Error: No se pudieron agregar los campos");
                        })
                    alert("Campos agregados");
                    this.props.history.goBack();
                })
                .catch(error => {
                    alert("Error: No se pudo modificar el estado");
                })
        }else {
            alert("Llenar los pesos de los requisitos seleccionados");
        }
    }

    render() {
        //console.log(this.props.match.params.id_convocatoria)
        let maestriaInput;
        let doctoradoInput;
        let diplomadoInput;
        let cargoInput;
        let asesoriaInput;
        let premioInput;
        let experienciaInput;
        let investigacionInput;
        if(this.state.maestria){
            maestriaInput=<input type="number"
                                 className="form-control input-sm" value={ this.state.maestriaVal } onChange ={this.handleMaestria}></input>
        }else{
            maestriaInput=<input type="number" disabled={true}
                                 className="form-control input-sm" value={ this.state.maestriaVal } onChange ={this.handleMaestria}></input>
        }


        if(this.state.doctorado){
            doctoradoInput=<input type="number"
                                  className="form-control input-sm" value={ this.state.doctoradoVal } onChange ={this.handleDoctorado}></input>
        }else{
            doctoradoInput=<input type="number" disabled={true}
                                  className="form-control input-sm" value={ this.state.doctoradoVal } onChange ={this.handleDoctorado}></input>
        }

        if(this.state.diplomado){
            diplomadoInput=<input type="number"
                                  className="form-control input-sm" value={ this.state.diplomadoVal } onChange ={this.handleDiplomado}></input>
        }else{
            diplomadoInput=<input type="number" disabled={true}
                                  className="form-control input-sm" value={ this.state.diplomadoVal } onChange ={this.handleDiplomado}></input>
        }

        if(this.state.cargo){
            cargoInput=<input type="number"
                              className="form-control input-sm" value={ this.state.cargoVal } onChange ={this.handleCargo}></input>
        }else{
            cargoInput=<input type="number" disabled={true}
                              className="form-control input-sm" value={ this.state.cargoVal } onChange ={this.handleCargo}></input>
        }

        if(this.state.asesoria){
            asesoriaInput=<input type="number"
                                 className="form-control input-sm" value={ this.state.asesoriaVal } onChange ={this.handleAsesoria}></input>
        }else{
            asesoriaInput=<input type="number" disabled={true}
                                 className="form-control input-sm" value={ this.state.asesoriaVal } onChange ={this.handleAsesoria}></input>
        }

        if(this.state.premio){
            premioInput=<input type="number"
                               className="form-control input-sm" value={ this.state.premioVal } onChange ={this.handlePremio}></input>
        }else{
            premioInput=<input type="number" disabled={true}
                               className="form-control input-sm" value={ this.state.premioVal } onChange ={this.handlePremio}></input>
        }

        if(this.state.experiencia){
            experienciaInput=<input type="number"
                                    className="form-control input-sm" value={ this.state.experienciaVal } onChange ={this.handleExperiencia}></input>
        }else{
            experienciaInput=<input type="number" disabled={true}
                                    className="form-control input-sm" value={ this.state.experienciaVal } onChange ={this.handleExperiencia}></input>
        }

        if(this.state.invInput){
            investigacionInput=<input type="number"
                                    className="form-control input-sm" value={ this.state.investigacionVal } onChange ={this.handleInvestigacion}></input>
        }else{
            investigacionInput=<input type="number" disabled={true}
                                    className="form-control input-sm" value={ this.state.investigacionVal } onChange ={this.handleInvestigacion}></input>
        }


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
                            <div className="col-md-offset-1">
                                <h4> Requisitos</h4>
                                <hr/>
                                <div className="form-group">
                                    <h5> Grados Academicos </h5>
                                    <div className="col-md-offset-0 col-md-4">
                                        <CheckboxGroup
                                            checkboxDepth={2} // This is needed to optimize the checkbox group
                                            name="gradosAcademicos"
                                            value={this.state.gradosAcademicos}
                                            onChange={this.gradosAcademicosChanged}>
                                            <label><Checkbox value="Titulo Profesional" disabled={true}/> Título Profesional</label>
                                            <br/>
                                            <br/>
                                            <label><Checkbox value="Maestria"/> Maestría</label>
                                            <br/>
                                            <br/>
                                            <label><Checkbox value="Doctorado"/> Doctorado</label>
                                            <br/>
                                            <br/>
                                            <label><Checkbox value="Diplomatura"/> Diplomado</label>
                                            <br/>
                                            <br/>
                                        </CheckboxGroup>
                                    </div>

                                    <div className="col-md-2">
                                        <input type="number"
                                               className="form-control input-sm" value={ this.state.tituloVal } onChange ={this.handleTitulo}></input>
                                        <br/>
                                        {maestriaInput}
                                        <br/>
                                        {doctoradoInput}
                                        <br/>
                                        {diplomadoInput}
                                        <br/>
                                    </div>
                                    <div className="col-md-6">
                                        <br/>
                                        <br/>
                                        <br/>
                                        <br/>
                                        <br/>
                                        <br/>
                                        <br/>
                                        <br/>
                                        <br/>
                                        <br/>
                                        <br/>
                                        <br/>
                                    </div>

                                </div>
                                <div className="form-group">
                                    <h5> Docencia </h5>
                                    <div className="col-md-offset-0 col-md-4">
                                        <CheckboxGroup
                                            checkboxDepth={2} // This is needed to optimize the checkbox group
                                            name="docencia"
                                            value={this.state.docencia}
                                            onChange={this.docenciaChanged}>
                                            <label><Checkbox value="Cargos a su curso"/> Cargos a su curso</label>
                                            <br/>
                                            <br/>
                                            <label><Checkbox value="Asesoria de Tesis"/> Asesoria de Tesis</label>
                                            <br/>
                                            <br/>
                                            <label><Checkbox value="Premios a la Docencia"/> Premios a la Docencia</label>
                                            <br/>
                                            <br/>
                                        </CheckboxGroup>
                                    </div>

                                    <div className="col-md-2">
                                        {cargoInput}
                                        <br/>
                                        {asesoriaInput}
                                        <br/>
                                        {premioInput}
                                        <br/>
                                    </div>
                                    <div className="col-md-6">
                                        <br/>
                                        <br/>
                                        <br/>
                                        <br/>
                                        <br/>
                                        <br/>
                                        <br/>
                                        <br/>
                                        <br/>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <h5> Experiencia Profesional </h5>
                                    <div className="col-md-offset-0 col-md-4">
                                        <CheckboxGroup
                                            checkboxDepth={2} // This is needed to optimize the checkbox group
                                            name="Solicitar Experiencia Profesional"
                                            value={this.state.experienciaProfesional}
                                            onChange={this.experienciaProfesionalChanged}>
                                            <label><Checkbox value="Solicitar Experiencia Profesional"/> Solicitar Experiencia Profesional</label>
                                            <br/>
                                            <br/>
                                        </CheckboxGroup>
                                    </div>

                                    <div className="col-md-2">
                                        {experienciaInput}
                                        <br/>
                                    </div>
                                    <div className="col-md-6">
                                        <br/>
                                        <br/>
                                        <br/>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <h5> Investigacion </h5>
                                    <div className="col-md-offset-0 col-md-4">
                                        <CheckboxGroup
                                            checkboxDepth={2} // This is needed to optimize the checkbox group
                                            name="Solicitar Investigacion"
                                            value={this.state.investigacion}
                                            onChange={this.investigacionProfesionalChanged}>
                                            <label><Checkbox value="Solicitar Investigacion"/> Solicitar Investigacion</label>
                                            <br/>
                                            <br/>
                                        </CheckboxGroup>
                                    </div>

                                    <div className="col-md-2">
                                        {investigacionInput}
                                        <br/>
                                    </div>
                                </div>
                            </div>
                    </div>
                    <div className="panel-footer text-right">
                        <button className="btn btn-primary" onClick={this.performPostRequest}> Guardar </button>
                    </div>
                </div>
            </BaseContainer>
        );
    }
}

export default ConvocatoriaCampos;