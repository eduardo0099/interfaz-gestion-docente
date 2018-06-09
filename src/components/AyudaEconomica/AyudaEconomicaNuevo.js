import React, {Component} from 'react';
import {Route} from 'react-router-dom';
import axios from "axios/index";
import BaseContainer from "../BaseContainer";
import {Col, FormControl,Panel,Modal} from 'react-bootstrap';
import Select from 'react-select';
import BootstrapTable from 'react-bootstrap-table-next';
import API from "../../api";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import {Checkbox, CheckboxGroup} from 'react-checkbox-group';
import SimpleReactValidator from "simple-react-validator";
import moment from "moment/moment";

const motivos=[{motivo:"Exposición de paper"},{motivo:"Viajes Académicos"}]

class AyudaEconomicaNuevo extends Component {

    constructor(props) {
        super(props);
        this.validator = new SimpleReactValidator();

        this.state = {
            motivo:'',
            codigoProf:'',
            nombreProf:'',
            showSeleccionarProfe:false,
            profesores:[],
            profesoresAux:[],
            selectedIdProf:'',
            profeText:'',

            showSeleccionarInvestigacion:false,
            selectedId:'',
            ciclos: [],
            cicloSeleccionado: "",
            investigaciones:[],
            investigacionSel:'',

            monto:'',
            fecha_inicio:null,
            fecha_fin:null,
            pais:'',
            comentario:'',
            servicios:[],
            insUniv:'',

            paises:[],
            motivos:[]
        }
        this.handleMotivo=this.handleMotivo.bind(this);
        this.handleShowAgregarProfe = this.handleShowAgregarProfe.bind(this);
        this.handleCloseAgregarProfe = this.handleCloseAgregarProfe.bind(this);
        this.handleShowSeleccionarInvestigacion = this.handleShowSeleccionarInvestigacion.bind(this);
        this.handleCloseSeleccionarInvestigacion = this.handleCloseSeleccionarInvestigacion.bind(this);
        this.handleMonto = this.handleMonto.bind(this);
        this.handleFIni = this.handleFIni.bind(this);
        this.handleFFin = this.handleFFin.bind(this);
        this.handlePais = this.handlePais.bind(this);
        this.handleComentario = this.handleComentario.bind(this);
        this.handleInsUniv = this.handleInsUniv.bind(this);

    }

    componentDidMount() {
        this.allPaises();
        this.allMotivos();
    }

    allPaises() {
        API.get('general/listaPais')
            .then(response => {
                this.setState({ paises: response.data.pais })
            })
    }

    allMotivos() {
        API.get('ayudasEconomicas/ayudasEconomicas/motivos')
            .then(response => {
                this.setState({ motivos: response.data.motivos })
            })
    }

    handleMotivo(obj) {
        this.setState({ motivo: obj.descripcion })
    }

    handleShowAgregarProfe() {
        this.setState({showSeleccionarProfe: true});

        API.get('general/listaDocente')
            .then(response => {
                this.setState({ profesores: response.data.docentes, profesoresAux: response.data.docentes});
            })
            .catch(error => {
                this.setState({
                    error: `${error}`
                });
            });
    }

    getActualDate(){
        let today = new Date();
        let dd = today.getDate();
        let mm = today.getMonth()+1; //January is 0!
        let yyyy = today.getFullYear();

        if(dd<10) {
            dd = '0'+dd
        }

        if(mm<10) {
            mm = '0'+mm
        }
        return yyyy+mm+dd;
    }

    handleCloseAgregarProfe() {
        this.setState({
            showSeleccionarProfe: false,
            profeText:'',
            investigacionSel:''});
    }

    busquedaNombreProfesor = e => {
        this.setState({
            profeText: e.target.value,
        })

        if (this.state.profeText == '') {//la lista no esta filtrada
            var aux = this.state.profesores.filter((d) => {
                return d.nombre.toUpperCase().indexOf(e.target.value.toUpperCase()) !== -1
            });
        }
        else {//el filtro tiene algo
            var aux = this.state.profesoresAux.filter((d) => {
                return d.nombre.toUpperCase().indexOf(e.target.value.toUpperCase()) !== -1
            });
        }
        this.setState({
            profesores: aux
        })
    }

    //Investigacion

    handleShowSeleccionarInvestigacion() {
        this.setState({showSeleccionarInvestigacion: true});
        this.findCicloActual();
        this.allCiclos();
    }

    handleCloseSeleccionarInvestigacion() {
        this.setState({
            showSeleccionarInvestigacion: false,
            selectedId:''
            });
    }

    findCicloActual() {
        API.get('general/cicloActual')
            .then(response => {
                console.log('response findCicloActual:',response);
                this.setState({ cicloSeleccionado: response.data.cicloActual })
                this.findInvestigaciones(response.data.cicloActual);
            })
    }

    allCiclos() {
        API.get('general/listaCiclos')
            .then(response => {
                console.log('response allCiclos:',response);
                this.setState({ ciclos: response.data.ciclos })
            })
    }

    cambioCiclo = (obj) => {
        let ciclo = obj.descripcion;
        this.setState({ cicloSeleccionado: ciclo })
        this.findInvestigaciones(ciclo);
    };

    findInvestigaciones(ciclo) {
        console.log(' findInvestigaciones ciclo:',ciclo);
        API.get('/docente/docente/invDocente', {
            params: {
                codigo: this.state.codigoProf,
                ciclo: ciclo,
            }
        }).then(response => {
            console.log('response findInvestigaciones:',response);
            this.setState({
                investigaciones: response.data.investigaciones
            })
        }).catch(error => {
            console.log("Error obteniendo la lista de las investigaciones", error);
        });
    }

    handleMonto(event) {
        this.setState({monto: event.target.value});
    }

    handleFIni(date) {
        this.setState({fecha_inicio: date});
    }

    handleFFin(date) {
        console.log(date);
        this.setState({fecha_fin: date});
    }

    handlePais(obj) {
        console.log(obj);
        this.setState({pais: obj.pais});
    }

    handleComentario(event) {
        this.setState({comentario: event.target.value});
    }

    handleInsUniv(event) {
        this.setState({insUniv: event.target.value});
    }

    serviciosChanged = (newServicios) => {
        this.setState({
            servicios: newServicios
        });
    }

    armarFecha(date) {
        var cadena = "";
        cadena = cadena + date.getFullYear();

        if (date.getMonth() < 9) {
            cadena = cadena + 0 + (date.getMonth() + 1);
        } else {
            cadena = cadena + (date.getMonth() + 1);
        }

        if (date.getDate() < 10) {
            cadena = cadena + 0 + date.getDate();
        } else {
            cadena = cadena + date.getDate();
        }
        console.log(cadena);
        return cadena;
    }

    validDates(fFin,fIni){
        var isafter = moment(fFin._d).isAfter(fIni._d);
        console.log('fechas validas?:',isafter)
        return isafter;
    }

    handleGuardar = ()=> {
        //console.log(':',this.state.);
        if( this.validator.allValid() && this.validDates(this.state.fecha_fin,this.state.fecha_inicio)){
            let listaServicios=[];

            this.state.servicios.forEach(function(entry) {
                let elemento  = {descripcion: entry};
                listaServicios= [...listaServicios, elemento];
            });
            console.log('motivo:',this.state.motivo);
            console.log('codigoProf:',this.state.codigoProf);
            console.log('monto:',this.state.monto);
            console.log('fecha_inicio:',this.armarFecha(this.state.fecha_inicio._d));
            console.log('fecha_fin:',this.armarFecha(this.state.fecha_fin._d));
            console.log('investigacionSel:',this.state.investigacionSel);
            console.log('comentario:',this.state.comentario);
            console.log('pais:',this.state.pais);
            console.log('servicios:',listaServicios);
            console.log('fechaActual:',this.getActualDate());
            console.log('insUniv:',this.state.insUniv);


            API.post('ayudasEconomicas/ayudasEconomicas/registrar', {
                codigo_profesor: this.state.codigoProf,
                monto: this.state.monto,
                fecha_solicitud: this.getActualDate(),
                fecha_inicio: this.armarFecha(this.state.fecha_inicio._d),
                fecha_fin: this.armarFecha(this.state.fecha_fin._d),
                motivo:this.state.motivo,
                investigacion: this.state.investigacionSel,
                comentario: this.state.comentario,
                pais: this.state.pais,
                instituto_universidad:this.state.insUniv,
                servicios:listaServicios
            })
                .then(response => {
                    alert("Investigación registrada");
                    this.props.history.goBack();
                })
                .catch(error => {
                    alert("Error: No se pudo registrar la investigación");
                })

        }else {
            if ( this.state.fecha_fin !== null && this.state.fecha_inicio !== null ){
                if (!this.validDates(this.state.fecha_fin,this.state.fecha_inicio)){
                    alert("La fecha de fin es menor a la fecha de inicio!");
                }
            }
            this.validator.showMessages();
            // rerender to show messages for the first time
            this.forceUpdate();
        }
    }


    render() {
        const columnsAgregarProf = [{
            dataField: 'codigo',
            text: 'Codigo'
        }, {
            dataField: 'nombre',
            text: 'Nombre'
        }];

        const selectRowAgregarProf = {
            mode: 'radio',
            clickToSelect: true,
            hideSelectColumn: true,
            bgColor: '#93a3b5',
            selected: [this.state.codigoProf]
        };

        const rowEventsAgregarProf = {
            onClick: (e, row, rowIndex) => {
                console.log(rowIndex)
                console.log(row)
                this.setState({
                    codigoProf: row.codigo,
                    nombreProf: row.nombre,
                })
            }
        };

        const columnsInv = [{
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

        const selectRowInv = {
            mode: 'radio',
            clickToSelect: true,
            hideSelectColumn: true,
            bgColor: '#93a3b5',
            selected: [this.state.selectedId]
        };


        const rowEventsInv = {
            onClick: (e, row, rowIndex) => {
                console.log(rowIndex)
                console.log(row)
                this.setState({
                    selectedId: row.id,
                    investigacionSel:row.titulo
                })
            }
        };

        let buttonRegInv;
        if (this.state.codigoProf !== '') {
            buttonRegInv = <button className="btn btn-primary m-l-sm" onClick={this.handleShowSeleccionarInvestigacion}> Buscar Investigación </button>
        } else {
            buttonRegInv = <button className="btn btn-primary m-l-sm" disabled={true} > Buscar Investigación </button>
        }

        return (
            <div>
                <Route exact path={`${this.props.match.path}`} render={() =>
                    <BaseContainer>
                        <div className="panel col-lg-offset-2 col-lg-8 col-md-offset-1 col-md-10 col-sm-12">
                            <div className="panel-heading">
                                <header className="page-header m-b-n">
                                    <a className="btn btn-default pull-right"
                                       onClick={this.props.history.goBack}> Volver </a>
                                    <p className="h2"> Nueva Solicitud Económica </p>
                                </header>
                            </div>
                            <div className="panel-body">
                                <div className="form-group">
                                    <Panel>
                                        <Panel.Heading> Motivo </Panel.Heading>
                                        <Panel.Body>
                                            <div className="form-horizontal">
                                                <div className="form-group">
                                                    <label className="control-label col-md-2"></label>
                                                    <div className="col-md-6">
                                                        <Select
                                                            value={ this.state.motivo }
                                                            onChange={ this.handleMotivo }
                                                            valueKey={ "descripcion" }
                                                            labelKey={ "descripcion" }
                                                            options={ this.state.motivos }
                                                            clearable={ false }
                                                        />
                                                        {this.validator.message('motivo', this.state.motivo, 'required', false, {required: 'Este campo es obligatorio'})}
                                                    </div>
                                                </div>
                                            </div>
                                        </Panel.Body>
                                    </Panel>
                                </div>
                                <div className="form-group">
                                    <Panel>
                                        <Panel.Heading> Profesor </Panel.Heading>
                                        <Panel.Body>
                                            <div className="form-horizontal">
                                                <div className="form-group">
                                                    <label
                                                        className="control-label col-md-2"> Código: </label>
                                                    <div className="col-md-6">
                                                        <input type="text" disabled={true} className="form-control" value={this.state.codigoProf}></input>
                                                        {this.validator.message('codigoProf', this.state.codigoProf, 'required', false, {required: 'Este campo es obligatorio'})}
                                                    </div>
                                                    <div className="col-md-3">
                                                        <button className="btn btn-primary m-l-sm" onClick={this.handleShowAgregarProfe}> Buscar profesor </button>
                                                    </div>
                                                </div>
                                                <div className="form-group">
                                                    <label
                                                        className="control-label col-md-2"> Nombre: </label>
                                                    <div className="col-md-6">
                                                        <input type="text" disabled={true} className="form-control" value={this.state.nombreProf}></input>
                                                        {this.validator.message('nombreProf', this.state.nombreProf, 'required', false, {required: 'Este campo es obligatorio'})}
                                                    </div>
                                                </div>
                                                <br></br>
                                                <div className="form-group">
                                                    <label
                                                        className="control-label col-md-2"> Investigación: </label>
                                                    <div className="col-md-6">
                                                        <input type="text" disabled={true} className="form-control" value={this.state.investigacionSel}></input>
                                                        {this.validator.message('investigacionSel', this.state.investigacionSel, 'required', false, {required: 'Este campo es obligatorio'})}
                                                    </div>
                                                    <div className="col-md-3">
                                                        {buttonRegInv}
                                                    </div>
                                                </div>
                                            </div>
                                        </Panel.Body>
                                    </Panel>
                                </div>

                                <div className="form-group">
                                    <Panel>
                                        <Panel.Heading> Detalle </Panel.Heading>
                                        <Panel.Body>
                                            <div className="row form-group">
                                                <label className="control-label col-md-1"></label>
                                                <div className="col-md-4">
                                                    <label>Fecha de Inicio </label>
                                                    <DatePicker
                                                        className="form-control"
                                                        dateFormat="DD/MM/YYYY"
                                                        selected={this.state.fecha_inicio}
                                                        onChange={this.handleFIni}
                                                    />
                                                    {this.validator.message('fecha_inicio', this.state.fecha_inicio, 'required', false, {required: 'Este campo es obligatorio'})}
                                                </div>
                                                <div className="col-md-1"></div>
                                                <div className="col-md-4">
                                                    <label> Fecha de Fin </label>
                                                    <DatePicker
                                                        className="form-control"
                                                        dateFormat="DD/MM/YYYY"
                                                        selected={this.state.fecha_fin}
                                                        onChange={this.handleFFin}
                                                    />
                                                    {this.validator.message('motivo', this.state.motivo, 'required', false, {required: 'Este campo es obligatorio'})}
                                                </div>
                                            </div>
                                            <div className="row form-group">
                                                <label className="control-label col-md-1"></label>
                                                <div className="col-md-4">
                                                    <label>Monto</label>
                                                    <input type="number" className="form-control" onChange ={this.handleMonto}></input>
                                                    {this.validator.message('monto', this.state.monto, 'required', false, {required: 'Este campo es obligatorio'})}
                                                </div>
                                                <div className="col-md-1"></div>
                                                <div className="col-md-4">
                                                    <label>Pais</label>
                                                    <Select
                                                        value={ this.state.pais }
                                                        onChange={ this.handlePais }
                                                        valueKey={ "pais" }
                                                        labelKey={ "pais" }
                                                        options={ this.state.paises }
                                                        clearable={ false }
                                                    />
                                                    {this.validator.message('pais', this.state.pais, 'required', false, {required: 'Este campo es obligatorio'})}
                                                </div>
                                            </div>

                                            <div className="row form-group">
                                                <label className="control-label col-md-1"></label>
                                                <div className="col-md-9">
                                                    <label>Servicios</label>
                                                    <CheckboxGroup
                                                        checkboxDepth={2} // This is needed to optimize the checkbox group
                                                        name="servicios"
                                                        value={this.state.servicios}
                                                        onChange={this.serviciosChanged}>
                                                        <label><Checkbox value="Boletos"/> Boletos</label>
                                                        <label> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </label>
                                                        <label><Checkbox value="Inscripcion del Paper"/> Inscripcion del Paper</label>
                                                        <label> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </label>
                                                        <label><Checkbox value="Viaticos"/> Viaticos</label>
                                                    </CheckboxGroup>
                                                    {this.validator.message('servicios', this.state.servicios, 'required', false, {required: 'Este campo es obligatorio'})}
                                                </div>
                                            </div>

                                            <div className="row form-group">
                                                <label className="control-label col-md-1"></label>
                                                <div className="col-md-9">
                                                    <label>Instituto/
                                                    Universidad</label>
                                                    <input className="form-control"  onChange={ this.handleInsUniv }></input>
                                                    {this.validator.message('insUniv', this.state.insUniv, 'required', false, {required: 'Este campo es obligatorio'})}
                                                </div>
                                            </div>

                                            <div className="row form-group">
                                                <label className="control-label col-md-1"></label>
                                                <div className="col-md-9">
                                                    <label>Comentarios</label>
                                                    <textarea className="form-control"  onChange={ this.handleComentario }></textarea>
                                                    {this.validator.message('comentario', this.state.comentario, 'required', false, {required: 'Este campo es obligatorio'})}
                                                </div>
                                            </div>
                                        </Panel.Body>
                                    </Panel>
                                </div>


                            </div>
                            <div className="panel-footer text-right">
                                <button className="btn btn-primary m-l-sm" onClick={this.handleGuardar}> Guardar Solicitud </button>
                            </div>
                        </div>

                        <Modal show={this.state.showSeleccionarProfe} onHide={this.handleCloseAgregarProfe}>
                            <Modal.Header closeButton>
                                <Modal.Title>Seleccionar Profesor</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <div className="form-group">
                                    <div className="col-md-6">
                                        <FormControl type="text" placeholder="Buscar Nombre Profesor"
                                                     value={ this.state.profeText}
                                                     onChange={ this.busquedaNombreProfesor.bind(this) }/>
                                        <br></br>
                                    </div>
                                    <BootstrapTable keyField='codigo' data={this.state.profesores} columns={columnsAgregarProf}
                                                    selectRow={selectRowAgregarProf} rowEvents={ rowEventsAgregarProf }/>
                                </div>
                            </Modal.Body>
                            <Modal.Footer>
                                <button className="btn btn-primary" onClick={this.handleCloseAgregarProfe}>Guardar</button>
                            </Modal.Footer>
                        </Modal>

                        <Modal show={this.state.showSeleccionarInvestigacion} onHide={this.handleCloseSeleccionarInvestigacion}>
                            <Modal.Header closeButton>
                                <Modal.Title>Seleccionar Investigacion</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <div className="form-group col-md-4 row ">
                                    <label> Ciclo </label>
                                    <Select
                                        value={ this.state.cicloSeleccionado }
                                        onChange={ this.cambioCiclo }
                                        valueKey={ "descripcion" }
                                        labelKey={ "descripcion" }
                                        options={ this.state.ciclos }
                                        clearable={ false }
                                    />
                                </div>
                                <div className="form-group">
                                    <BootstrapTable keyField='id' data={this.state.investigaciones} columns={columnsInv}
                                                    selectRow={selectRowInv} rowEvents={ rowEventsInv }/>
                                </div>
                            </Modal.Body>
                            <Modal.Footer>
                                <button className="btn btn-primary" onClick={this.handleCloseSeleccionarInvestigacion}>Guardar</button>
                            </Modal.Footer>
                        </Modal>

                    </BaseContainer>
                }/>
            </div>
        );
    }
}

export default AyudaEconomicaNuevo;