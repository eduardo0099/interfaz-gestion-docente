import React from 'react';
import axios from 'axios';
import {Route} from 'react-router-dom';
import Select from 'react-select';
import {Panel,Modal,FormGroup,FormControl} from 'react-bootstrap';
import BaseContainer from "../BaseContainer";
import ConvocatoriaNuevo from "../convocatorias/ConvocatoriasNuevo";
import AyudaEconomicaNuevo from "./AyudaEconomicaNuevo";
import API from "../../api";

class AyudaEconomicaDetalle extends React.Component {

    constructor(props) {
        super(props);
        this.handleOpen = this.handleOpen.bind(this);
        this.handleClose = this.handleClose.bind(this);

        this.state = {
            solicitudEconomica: {
                id: 2,
                codigo: 'AYU001',
                investigacion: 'Investigando React',
                docenteSolicitante: 'Ruben Jordan',
                motivo: 'Motivo 1',
                monto: 350000,
                gastos: [
                    {
                        id: 1,
                        numero: '001-23020',
                        tipo: 'Boleta',
                        detalle: 'Impresiones y copias',
                        monto: 35.00,
                        observaciones: 'algo'
                    },
                    {
                        id: 2,
                        numero: '001-23022',
                        tipo: 'Boleta',
                        detalle: 'Impresiones y copiasA',
                        monto: 350.00,
                        observaciones: 'algo2'
                    },
                    {
                        id: 3,
                        numero: '001-23023',
                        tipo: 'Boleta',
                        detalle: 'Impresiones y copiasB',
                        monto: 3500.00,
                        observaciones: 'algo3'
                    }
                ]
            },
            isOpen: false,
            tipoDocumento: [{id: 1, descripcion: "Boleta"}, {id: 2, descripcion: "Factura"}],
            numDoc:"",
            tipoDocSeleccionado: "---",
            detalleDoc:"",
            montoDoc:-1,
            obsDoc:"",
            modificarOpen:false,

        }
    }

    findSolicitud(){
        // aun no hay back
    }

    modificarGasto(gasto, e){
        console.log(JSON.stringify(gasto, null, 2));
        //Johana en este metodo deberias abrir el modal en bsse al objeto gasto que te estoy mandando
        //este metodo se llama cada vez que se hace click en una fila de la tabla
    }


    agregarGasto=()=> {
        //Johana en este metodo deberias abrir el modal vacio para registrar
        if(this.state.tipoDocSeleccionado!="---" &&  this.state.numDoc!="" && this.state.detalleDoc!="" && this.state.montoDoc!=-1 && this.state.obsDoc!=""){
            API.post("/ayudasEconomicas/ayudasEconomicas/DocumentoGasto/registrar",{
                id_ayuda_economica:this.state.solicitudEconomica.id,
                numero_documento:this.state.numDoc,
                detalle:this.state.detalleDoc,
                monto_justificacion:this.state.montoDoc,
                observaciones:this.state.obsDoc,
                tipo_documento:this.state.tipoDocSeleccionado,
            }).then(res => {
                alert("Se ha registrado correctamente");
            }).catch(error => {
                alert("Ha ocurrido un error, intentelo luego");
                console.log(error);
            });
        }
        else{
            //Mostrar campos errados
            alert("Falta agregar datos")
        }

    }

    handleOpen(){
        this.setState({
            isOpen: true
        });
    }
    handleClose(){
        this.setState({
            isOpen: false
        });
    }

    handleDocSeleccionado= e =>{
        if(e.target.value == "---") {
            this.setState({
                tipoDocSeleccionado: e.target.value
            })
        }
        else{
            this.setState({
                tipoDocSeleccionado:e.target.value
            })
        }
    }

    handleNumDoc = e =>{
        this.setState({
            numDoc: e.target.value
        })
    }
    handleMonto = e =>{
        this.setState({
            montoDoc:e.target.value
        })
    }
    handleDetalle = e =>{
        this.setState({
            detalleDoc:e.target.value
        })
    }
    handleObs = e =>{
        this.setState({
            obsDoc:e.target.value
        })
    }
    render() {
        return (
            <div>
                <Route exact path={`${this.props.match.path}`} render={() =>
                    <BaseContainer>
                        <div className="panel col-lg-offset-2 col-lg-8 col-md-12 col-sm-12">
                            <div className="panel-heading">
                                <header className="page-header">
                                    <a className="btn btn-default pull-right"
                                       onClick={this.props.history.goBack}> Volver </a>
                                    <p className="h2 m-b-sm"> Solicitud
                                        Economica {this.state.solicitudEconomica.codigo} </p>
                                </header>
                            </div>
                            <div className="panel-body">
                                <h5> Informacion General </h5>
                                <hr/>
                                <div className="row form-group">
                                    <div className="col-md-4">
                                        <label> Codigo </label>
                                        <span className="form-control"> {this.state.solicitudEconomica.codigo} </span>
                                    </div>
                                    <div className="col-md-4">
                                        <label> Profesor Solicitante </label>
                                        <span className="form-control"> {this.state.solicitudEconomica.docenteSolicitante} </span>
                                    </div>
                                </div>
                                <div className="row form-group">
                                    <div className="col-md-8">
                                        <label> Motivo </label>
                                        <span className="form-control"> {this.state.solicitudEconomica.motivo} </span>
                                    </div>
                                </div>
                                <div className="row form-group">
                                    <div className="col-md-4">
                                        <label> Monto Solicitado </label>
                                        <span className="form-control"> {this.state.solicitudEconomica.monto} </span>
                                    </div>
                                </div>
                                <h5> Gastos Financieros Declarados </h5>
                                <hr/>
                                <table className="table table-striped table-hover" >
                                    <thead>
                                    <tr>
                                        <th className="col-md-3">Documento</th>
                                        <th className="col-md-3">Detalle</th>
                                        <th className="col-md-3">Monto (S/)</th>
                                        <th className="col-md-3">Observaciones</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {this.state.solicitudEconomica.gastos.map(gasto => {
                                        return (
                                            <tr key={gasto.id} onClick={this.modificarGasto(this,gasto)}>
                                                <td className="v-middle">
                                                    <span className="block text-muted m-t-xs"> {gasto.tipo}</span>
                                                    <span className="block text-primary m-b-xs"> {gasto.numero}</span>
                                                </td>
                                                <td className="v-middle">
                                                    <span> {gasto.detalle}</span>
                                                </td>
                                                <td className="v-middle">
                                                    <span> {gasto.monto}</span>
                                                </td>
                                                <td className="v-middle">
                                                    <span> {gasto.observaciones}</span>
                                                </td>
                                            </tr>
                                        )})
                                    }
                                    </tbody>
                                </table>
                            </div>

                            <Modal show={this.state.modificarOpen}>

                            </Modal>

                            <div className="panel-footer text-right">
                                <button type="button" className="btn btn-primary" onClick={ this.handleOpen}>Agregar Gasto</button>
                                <Modal show={this.state.isOpen} onClose={this.handleClose}>
                                    <Modal.Header closeButton>
                                        <Modal.Title>Agregar nuevo gasto</Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body>
                                            <div className="row form-group">
                                                <label>N° Documento:</label>
                                                <input className="form-control" onChange={this.handleNumDoc}></input>
                                            </div>
                                            <div className="row form-group">
                                                <label>Tipo de documento:</label>
                                                <FormControl componentClass="select" placeholder="select"
                                                             onChange={ this.handleDocSeleccionado }
                                                             value={ this.state.tipoDocSeleccionado }>
                                                    <option value="---">---</option>
                                                    { this.state.tipoDocumento.map((item) => {
                                                        return <option key={ item.id } value={ item.descripcion }>{ item.descripcion }</option>
                                                    }) }
                                                </FormControl>
                                            </div>
                                            <div className="row form-group">
                                                <label>Detalle:</label>
                                                <input className="form-control" onChange={this.handleDetalle}></input>
                                            </div>
                                            <div className="row form-group">
                                                <label>Monto:</label>
                                                <input className="form-control" type="number" pattern="[0-9]*" onChange={this.handleMonto}></input>
                                            </div>
                                            <div className="row form-group">
                                                <label>Observaciones:</label>
                                                <FormGroup controlId="formControlsTextarea">
                                                    <input className="form-control" componentClass="textarea" onChange={this.handleObs}/>
                                                </FormGroup>
                                            </div>
                                            <div className="row form-group">
                                                <label>Fotografia del documento:</label>

                                            </div>
                                    </Modal.Body>
                                    <Modal.Footer>
                                        <button type="button" className="btn btn-primary" onClick={this.agregarGasto}>Aceptar</button>
                                        <button type="button" className="btn btn-primary" onClick={this.handleClose}>Cancelar</button>
                                    </Modal.Footer>
                                </Modal>
                            </div>
                        </div>
                    </BaseContainer>
                }/>
                <Route path={`${this.props.match.path}/nuevo`} component={AyudaEconomicaNuevo}/>
            </div>
        );
    }
}

export default AyudaEconomicaDetalle;
