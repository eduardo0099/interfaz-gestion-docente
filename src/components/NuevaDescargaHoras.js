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
        this.findHorarios();
    }

    findHorarios(){
        let lista=[];
        for(let i=0;i<this.state.listaCursos.length;i++){
            if(this.state.listaCursos[i].codigo === this.state.codigo){
                let obj={};
                obj.horario = this.state.listaCursos[i].horario;
                lista.push(obj);
            }
        }
        this.setState({
            listaHorarios:Array.from(new Set(lista)),
        })
    }

    cambioCurso=(obj)=>{
        let cod=obj.codigo;
        this.setState({
            codigo:cod,
        })
    }

    cambioHorario=(obj)=>{
        let aux=obj.horario;
        this.setState({
            horarioSeleccionado:aux,
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
                                    
                                    options={this.state.listaCursos}
                                    clearable={false}
                                />
                            </div>
                            <div className="row form-group">
                                <label>Horario:</label>
                                <Select
                                    value={this.state.horarioSeleccionado}
                                    onChange={this.cambioHorario}
                                    valueKey={"horario"}
                                    labelKey={"horario"}
                                    options={this.state.listaHorarios}
                                    clearable={false}
                                />
                            </div>
                            <div className="row form-group">
                                <label>Semana:</label>
                                <input className="form-control" type="number" pattern="[0-9]*"></input>
                            </div>
                            <div className="row form-group">
                                <label>Horas:</label>
                                <input className="form-control" type="number" pattern="[0-9]*"></input>
                            </div>
                            <div className="row form-group">
                                <label>Motivo:</label>
                                <input className="form-control"></input>
                            </div>
                        </div>
                        <hr/>
                        <a className="btn btn-default pull-right">Cancelar</a>
                        <a className="btn btn-default pull-right">Aceptar</a>
                    </div>
                </div>
            </BaseContainer>
        );
    }
}


export default NuevaDescargaHoras;