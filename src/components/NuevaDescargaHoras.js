import React, { Component } from 'react';
import BaseContainer from "./BaseContainer";
import { Button, Modal } from 'react-bootstrap';
import API from "../api";
import Select from 'react-select';

class NuevaDescargaHoras extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            nombre: "",
            codigo: "",
            hDescargaTotal: "",
            numSem:-1,
            motivo:"",
            obs:"",
            cicloActual:-1,
            codDocente:-1,
            listaCursos:[],
            horas:-1,
            listaTipos:[{id:1,descripcion:"pregrado"},{id:2,descripcion:"posgrado"},{id:3,descripcion:"otros"}],
            tipoSeleccionado:"",
            listaHorarios:[],
            horarioSeleccionado:"",
        }
        this.changeHoras=this.changeHoras.bind(this);
        this.changeSemana=this.changeSemana.bind(this);
        this.changeMotivo=this.changeMotivo.bind(this);

    }

    componentDidMount() {
        this.findCicloActual();
        this.findCursos();
    }

    findCicloActual() {
        API.get('general/cicloActual')
            .then(response => {
                this.setState({
                    cicloActual: response.data.cicloActual
                })
            })
    }

    findCursos(){
        API.get('/docente/docente/curDocente',{
            params:{
                codigo: this.props.match.params.codigo,
                ciclo:this.state.cicloActual
            }
        })
            .then(response=>{
                this.setState({
                    codDocente:this.props.match.params.codigo,
                })
            })
    }

    cambioTipo=(obj)=>{
        let tipo=obj.descripcion;
        this.setState({
            tipoSeleccionado:tipo,
        });
        this.findCursosTipo(this.state.cicloActual);
    }

    findCursosTipo(ciclo){
        API.get('docente/docente/curDocente', {
            params: {
                codigo: this.props.match.params.codigo,
                ciclo: ciclo,
            }
        }).then(response => {
            if(this.state.tipoSeleccionado === "pregrado")
                this.setState({ listaCursos: response.data.cursos[0].listaCursos})
            if(this.state.tipoSeleccionado === "posgrado")
                this.setState({ listaCursos: response.data.cursos[1].listaCursos})
            if(this.state.tipoSeleccionado === "otros")
                this.setState({ listaCursos: response.data.cursos[2].listaCursos})
        })
    }

    findHorarios(codigo){
        //let lista=[];
        //for(let i=0;i<this.state.listaCursos.length;i++){
        //    if(this.state.listaCursos[i].codigo === this.state.codigo){
        //        let obj={};
        //       obj.horario = this.state.listaCursos[i].horario;
        //        lista.push(obj);
        //    }
        //}
        //this.setState({
        //    listaHorarios:Array.from(new Set(lista)),
        //})

        let cursoFind=this.state.listaCursos.find(cur=>cur.codigo==codigo)
        console.log("Valor:",cursoFind,this.state.listaCursos,codigo);
        this.setState({
            horarioSeleccionado:cursoFind.horario,
        })

    }

    cambioCurso=(obj)=>{
        let cod=obj.codigo;
        this.setState({
            codigo:cod,
        })
        this.findHorarios(cod);
    }

    cambioHorario=(obj)=>{
        let aux=obj.horario;
        this.setState({
            horarioSeleccionado:aux,
        })
    }

    agregarDescarga=()=>{
        if(this.state.horas!==-1 & this.state.codDocente!==-1 & this.state.horarioSeleccionado!==""
            & this.state.cicloActual!==-1 & this.state.codigo!=="" & this.state.numSem!==-1 ){
            API.post('/docente/docente/horaDescDocente/registrar',{
                horas_reducidas : this.state.horas,
                codigo_profesor : this.state.codDocente,
                codigo_horario : this.state.horarioSeleccionado,
                ciclo : this.state.cicloActual,
                codigo_curso : this.state.codigo,
                numero_semana : this.state.numSem,
                motivo : this.state.motivo,
                observaciones : " "

            }).then(response => {
                alert("Descarga de horas registrada");
                this.props.history.goBack();
            })
                .catch(error => {
                    alert("Error: No se pudo registrar la descarga de horas");
                })
        }
        else{
            alert("Ingresar los campos nuevamente")
        }
    }

    changeSemana(event){
        this.setState({
            numSem:event.target.value
        })
    }
    changeMotivo(event){
        this.setState({
            motivo:event.target.value
        })
    }
    changeHoras(event){
        this.setState({
            horas:event.target.value,
        })
    }


    render() {
        console.log(this.props);
        return (
            <BaseContainer>
                <div className="panel col-lg-offset-2 col-lg-8 col-md-12 col-sm-12">
                    <div className="panel-heading">
                        <header className="page-header">
                            <a className="btn btn-default pull-right"
                               onClick={this.props.history.goBack}> Volver </a>
                            <p className="h2 m-b-sm"> Nueva Descarga de Horas</p>
                        </header>
                        <div className="panel-body">
                            <h5> Ingresar Pedido </h5>
                            <hr/>
                            <div className="row form-group">
                                <label >Tipo de curso:</label>
                                <Select
                                    value={this.state.tipoSeleccionado}
                                    onChange={this.cambioTipo}
                                    valueKey={"descripcion"}
                                    labelKey={"descripcion"}
                                    options={this.state.listaTipos}
                                    clearable={false}
                                />
                            </div>
                            <div className="row form-group">
                                <label >Curso:</label>
                                <Select
                                    value={this.state.codigo}
                                    onChange={this.cambioCurso}
                                    valueKey={"codigo"}
                                    labelKey={"codigo"}
                                    options={this.state.listaCursos}
                                    clearable={false}
                                />
                            </div>
                            <fieldset disabled>
                            <div className="row form-group">
                                <label htmlFor="disabledTextInput">Horario:</label>
                                <input type="text" id="disabledTextInput" className="form-control"
                                       placeholder={this.state.horarioSeleccionado}></input>
                            </div>
                            </fieldset>
                            <div className="row form-group">
                                <label>Semana:</label>
                                <input  className="form-control" type="number" pattern="[0-9]*" min={1} max={16} onChange={this.changeSemana}></input>
                            </div>
                            <div className="row form-group">
                                <label>Horas:</label>
                                <input  className="form-control" type="number" pattern="[0-9]*" min={1} max={4} onChange={this.changeHoras}></input>
                            </div>
                            <div className="row form-group">
                                <label>Motivo:</label>
                                <input className="form-control" onChange={this.changeMotivo}></input>
                            </div>
                        </div>
                        <hr/>
                        <a className="btn btn-default pull-right" onClick={this.agregarDescarga}>Aceptar</a>
                    </div>
                </div>
            </BaseContainer>
        );
    }
}


export default NuevaDescargaHoras;