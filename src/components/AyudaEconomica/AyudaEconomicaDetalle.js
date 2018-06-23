import React from 'react';
import axios from 'axios';
import {Route} from 'react-router-dom';
import Select from 'react-select';
import {Panel,Modal,FormGroup,FormControl} from 'react-bootstrap';
import BaseContainer from "../BaseContainer";
import ConvocatoriaNuevo from "../convocatorias/ConvocatoriasNuevo";
import AyudaEconomicaNuevo from "./AyudaEconomicaNuevo";
import API from "../../api";
import {Role, currentRole} from "../../auth";
import SimpleReactValidator from "simple-react-validator";

class AyudaEconomicaDetalle extends React.Component {

    constructor(props) {
        super(props);
        this.validator = new SimpleReactValidator();
        this.handleOpen = this.handleOpen.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleOpenMod=this.handleOpenMod.bind(this);
        this.handleCloseMod=this.handleCloseMod.bind(this);

        this.state = {
            estado_test:'',
            solicitudEconomica: {
                id: 2,
                codigo: 'AYU001',
                investigacion: 'Investigando React',
                docenteSolicitante: 'Ruben Jordan',
                motivo: 'Motivo 1',
                monto_otorgado: 350000,
                gastos: [
                    {
                        id: 1,
                        numero_documento: '001-23020',
                        tipo_documento: 'Boleta',
                        detalle: 'Impresiones y copias',
                        monto_justificacion: 35.00,
                        observaciones: 'algo'
                    }]
            },
            isOpen: false,
            tipoDocumento: [{id: 1, descripcion: "Boleta"}, {id: 2, descripcion: "Factura"}],
            numDoc:"",
            tipoDocSeleccionado: "",
            detalleDoc:"",
            montoDoc:'',
            obsDoc:"",
            modificarOpen:false,
            idNew: 1,
            gastoSelecc:[],
            idArchivo:''
        }
    }

    componentWillMount() {
        this.findSolicitud();
        this.findEstado();
        this.findTipoDoc();
    }

    findEstado(){
        API.get('ayudasEconomicas/ayudasEconomicas/estado', {
            params: {
                id:  this.props.match.params.idAyudaEconomica
            }
        }).then(response => {
            console.log("response:",response);
            this.setState({
                estado_test:response.data.descripcion
            });
        }).catch(error => {
            alert("Error obteniendo estado de ayuda");
        })
    }

    findTipoDoc(){
        API.get('general/listaDocumentoPagoTipo')
            .then(response => {
                console.log("response:",response);
                this.setState({
                    tipoDocumento:response.data.profesor
                });
            }).catch(error => {
            alert("Error obteniendo lista de tipos de documento de pago");
        })
    }

    findSolicitud(){
       API.get('ayudasEconomicas/ayudasEconomicas/devuelveJustificacion', {
           params: {
               id:  this.props.match.params.idAyudaEconomica
           }
       }).then(response => {
           const ae = response.data.ayudaEconomica;
           console.log("response.data.ayudaEconomica",response.data.ayudaEconomica);
           this.setState({
               solicitudEconomica: {
                   id: ae.id,
                   gastos: ae.justificacion,
                   motivo: ae.motivo,
                   monto_otorgado: ae.monto_otorgado,
                   docenteSolicitante: ae.docenteSolicitante.nombres,
                   codigo: ae.codigo,
                   investigacion: ae.investigacion.titulo,
               }
           });
       }).catch(error => {
           alert("Error encontrando datos de solicitud");
       })
    }

    modificarGasto(gasto, e){
        //console.log(JSON.stringify(gasto, null, 2));
        this.setState({
            montoDoc:gasto.monto_justificacion

        },()=>{
            this.handleOpenMod;
        })
    }

    handleOpenMod(){
        this.setState({
            modificarOpen:true
        })
    }

    handleCloseMod(){
        this.setState({
            modificarOpen:false
        })
    }

    agregarGasto=()=> {
        //Johana en este metodo deberias abrir el modal vacio para registrar
        if(this.validator.allValid()){
            API.post("/ayudasEconomicas/ayudasEconomicas/DocumentoGasto/registrar",{
                id_ayuda_economica:this.state.solicitudEconomica.id,
                numero_documento:this.state.numDoc,
                detalle:this.state.detalleDoc,
                monto_justificacion:this.state.montoDoc,
                observaciones:this.state.obsDoc,
                tipo_documento:this.state.tipoDocSeleccionado.id,
                archivo:this.state.idArchivo
            }).then(res => { 
                this.setState({idNew: res.data[0].nuevo_id});
                console.log(this.state.idNew.value);
                alert("Se ha registrado correctamente");
            }).catch(error => {
                alert("Ha ocurrido un error, intentelo luego");
                console.log(error);
            });
            this.setState({
                isOpen:false
            })
            let nuevo = {
                id: this.state.idNew,
                numero_documento: this.state.numDoc,
                tipo_documento:this.state.tipoDocSeleccionado,
                detalle:this.state.detalleDoc,
                monto_justificacion:this.state.montoDoc,
                observaciones:this.state.obsDoc,
            };
            let nuevoArreglo = this.state.solicitudEconomica;
            nuevoArreglo.gastos.push(nuevo);
            this.setState({solicitudEconomica: nuevoArreglo});
        }
        else{
            this.validator.showMessages();
            // rerender to show messages for the first time
            this.forceUpdate();
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

    handleDocSeleccionado=(obj) =>{
        console.log("tipodoc",obj);
        this.setState({ tipoDocSeleccionado: obj})
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


    uploadFile = (e) => {
        let file = e.target.files[0];
        let formData = new FormData();
        formData.append('file', file);
        API.post('ayudasEconomicas/ayudasEconomicasAsistente/registrarArchivo',
            formData,
            {
                headers: {'Content-Type': 'multipart/form-data'}
            }
        ).then(response =>{
            console.log(response);
            this.setState({idArchivo :response.data.id})
        }).catch(error =>  {
            alert("Ha ocurrido un error subiendo el archivo, intentelo luego",error);
            console.log(error);
        });
    }

    render() {
        if(currentRole() != Role.JEFE_DEPARTAMENTO){
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
                                            <label> Investigación </label>
                                            <span className="form-control"> {this.state.solicitudEconomica.investigacion} </span>
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
                                            <label> Monto Solicitado (S/)</label>
                                            <span className="form-control"> {this.state.solicitudEconomica.monto_otorgado} </span>
                                        </div>
                                    </div>
                                    {this.state.estado_test == "Aprobado" ?
                                        <div>
                                            <h5> Gastos Financieros Declarados </h5>
                                            <hr/>
                                            <table className="table table-striped table-hover">
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
                                                        <tr key={gasto.id}
                                                            onClick={this.modificarGasto.bind(this, gasto)}>
                                                            <td className="v-middle">
                                                                <span
                                                                    className="block text-muted m-t-xs"> Factura</span>
                                                                <span
                                                                    className="block text-primary m-b-xs"> {gasto.numero_documento}</span>
                                                            </td>
                                                            <td className="v-middle">
                                                                <span> {gasto.detalle}</span>
                                                            </td>
                                                            <td className="v-middle">
                                                                <span> {gasto.monto_justificacion}</span>
                                                            </td>
                                                            <td className="v-middle">
                                                                <span> {gasto.observaciones}</span>
                                                            </td>
                                                        </tr>
                                                    )
                                                })
                                                }
                                                </tbody>
                                            </table>
                                            <div className="panel-footer text-right">
                                                <button type="button" className="btn btn-primary" onClick={ this.handleOpen}>Agregar Gasto</button>
                                            </div>
                                        </div>
                                        :
                                        null
                                    }
                                </div>
                                <Modal show={this.state.modificarOpen} onClose={this.handleCloseMod}>
                                    <Modal.Header closeButton>
                                        <Modal.Title>Modificar gasto</Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body>
                                        <BaseContainer>
                                            <div className="row form-group">
                                                <label>Numero de documento:</label>
                                                <input>{this.state.numDoc}</input>
                                            </div>
                                            <div className="row form-group">
                                                <label>Monto:</label>
                                                <input>{this.state.montoDoc}</input>
                                            </div>
                                            <div className="row form-group">
                                                <label>Observaciones:</label>
                                                <input>{this.state.obsDoc}</input>
                                            </div>
                                        </BaseContainer>
                                    </Modal.Body>
                                </Modal>

                                    <Modal show={this.state.isOpen} onHide={this.handleClose}>
                                        <Modal.Header closeButton>
                                            <Modal.Title>Agregar nuevo gasto</Modal.Title>
                                        </Modal.Header>
                                        <Modal.Body>
                                            <BaseContainer>
                                                <div className="row form-group">
                                                    <label>N° Documento:</label>
                                                    <input className="form-control" onChange={this.handleNumDoc}></input>
                                                    {this.validator.message('numDoc', this.state.numDoc, 'required|integer', false, {required: 'Este campo es obligatorio'})}
                                                </div>
                                                <div className="row form-group">
                                                    <label>Tipo de documento:</label>
                                                    <Select
                                                        value={ this.state.tipoDocSeleccionado }
                                                        onChange={this.handleDocSeleccionado}
                                                        valueKey={ "descripcion" }
                                                        labelKey={ "descripcion" }
                                                        options={ this.state.tipoDocumento }
                                                        clearable={ false }
                                                        searchable={false}
                                                    />
                                                    {this.validator.message('tipoDocSeleccionado', this.state.tipoDocSeleccionado, 'required', false, {required: 'Este campo es obligatorio'})}
                                                </div>
                                                <div className="row form-group">
                                                    <label>Detalle:</label>
                                                    <input className="form-control" onChange={this.handleDetalle}></input>
                                                    {this.validator.message('detalleDoc', this.state.detalleDoc, 'required', false, {required: 'Este campo es obligatorio'})}
                                                </div>
                                                <div className="row form-group">
                                                    <label>Monto:</label>
                                                    <input className="form-control" type="number" pattern="[0-9]*" onChange={this.handleMonto}></input>
                                                    {this.validator.message('montoDoc', this.state.montoDoc, 'required', false, {required: 'Este campo es obligatorio'})}
                                                </div>
                                                <div className="row form-group">
                                                    <label>Observaciones:</label>
                                                    <FormGroup controlId="formControlsTextarea">
                                                        <input className="form-control" componentClass="textarea" onChange={this.handleObs}/>
                                                        {this.validator.message('obsDoc', this.state.obsDoc, 'required', false, {required: 'Este campo es obligatorio'})}
                                                    </FormGroup>
                                                </div>
                                                <div className="row form-group">
                                                  <div className="form-group">
                                                    <label> Adjuntar Archivo </label>
                                                    <td className="v-middle">
                                                      <input type="file" id="files" ref="files" onChange={this.uploadFile}/>
                                                    </td>
                                                  </div>
                                                </div>
                                            </BaseContainer>
                                        </Modal.Body>
                                        <Modal.Footer>
                                            <button type="button" className="btn btn-primary" onClick={this.agregarGasto}>Aceptar</button>
                                            <button type="button" className="btn btn-primary" onClick={this.handleClose}>Cancelar</button>
                                        </Modal.Footer>
                                    </Modal>
                                </div>
                        </BaseContainer>
                    }/>
                </div>
            );
        }else{
            return(
                <div>
                    <label>
                        Lo sentimos. Al parecer la dirección está mal escrita o no tiene permiso para entrar en esta página. Por favor, contacte con los administradores del sistema.
                    </label>
                    <br></br>   
                    <a className="btn btn-default pull-right"onClick={this.props.history.goBack}> Volver </a>
                </div>
            );
        }
    }
}

export default AyudaEconomicaDetalle;