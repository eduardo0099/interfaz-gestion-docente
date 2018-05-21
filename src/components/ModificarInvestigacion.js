import React, {Component} from 'react';
import {Row, Grid, Table, Button, PageHeader, Modal, Popover, Tooltip, OverlayTrigger, Col} from 'react-bootstrap';
import Papa from 'papaparse';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import SimpleReactValidator from "simple-react-validator";
import moment from "moment";
import BootstrapTable from 'react-bootstrap-table-next';
import BaseContainer from "./BaseContainer";

class ModificarInvestigacion extends Component {


    constructor(props) {
        super(props);
        this.validator = new SimpleReactValidator();
        this.state = {
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
        this.handleTitulo = this.handleTitulo.bind(this);
        this.handleAutor = this.handleAutor.bind(this);
        this.handleResumen = this.handleResumen.bind(this);
        this.handleFIni = this.handleFIni.bind(this);
        this.handleFFin = this.handleFFin.bind(this);

        this.handleShowAgregar = this.handleShowAgregar.bind(this);
        this.handleCloseAgregar = this.handleCloseAgregar.bind(this);
        this.guardarAgregados = this.guardarAgregados.bind(this);

        this.handleShowQuitar = this.handleShowQuitar.bind(this);
        this.handleCloseQuitar = this.handleCloseQuitar.bind(this);
        this.guardarQuitados = this.guardarQuitados.bind(this);

    }

    componentDidMount() {
        axios.get('http://localhost:8080/docente/docente/investigacion', {
            params: {
                id: this.props.match.params.idInvestigacion,
            }
        })
            .then(response => {
                console.log(response);
                this.setState({
                    titulo: response.data.investigacion.titulo,
                    autor: response.data.autores,
                    resumen: response.data.investigacion.resumen,
                    fecha_inicio: moment(response.data.investigacion.fecha_inicio),
                    fecha_fin: moment(response.data.investigacion.fecha_fin)
                });
            })
            .catch(error => {
                console.log("Error obteniendo la investigacion", error);
            });
    }

    handleTitulo(event) {
        this.setState({titulo: event.target.value});
    }

    handleAutor(event) {
        this.setState({autor: event.target.value});
    }

    handleResumen(event) {
        this.setState({resumen: event.target.value});
    }

    handleFIni(date) {
        this.setState({fecha_inicio: date});
    }

    handleFFin(date) {
        console.log(date);
        this.setState({fecha_fin: date});
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

    validDates(fFin, fIni) {
        var isafter = moment(fFin._d).isAfter(fIni._d);
        console.log('fechas validas?:', isafter)
        return isafter;
    }

    performPostRequest = () => {
        if (this.validator.allValid() && this.validDates(this.state.fecha_fin, this.state.fecha_inicio)) {
            axios.put('http://200.16.7.151:8080/docente/investigacion/actualizar', {
                id: this.props.match.params.idInvestigacion,
                titulo: this.state.titulo,
                autor: [this.props.match.params.codigo],
                resumen: this.state.resumen,
                fecha_inicio: this.armarFecha(this.state.fecha_inicio._d),
                fecha_fin: this.armarFecha(this.state.fecha_fin._d),
                archivo: null
            })
                .then(response => {
                    alert("Modificación registrada");
                    this.props.history.goBack();
                })
                .catch(error => {
                    alert("Error: No se pudo registrar la modificación");
                })
        } else {
            if (this.state.fecha_fin !== null && this.state.fecha_fin !== null) {
                if (!this.validDates(this.state.fecha_fin, this.state.fecha_inicio)) {
                    alert("La fecha de fin es menor a la fecha de inicio!");
                }
            }
            this.validator.showMessages();
            // rerender to show messages for the first time
            this.forceUpdate();
        }
    }

    //modal agregar:
    handleCloseAgregar() {
        this.setState({showAgregar: false});
    }

    guardarAgregados() {
        axios.delete('http://localhost:8080/docente/investigacion/actualizar/agregarAutores', {data:{
            id: this.props.match.params.idInvestigacion,
            autor: this.state.selectedAgregar
        }})
            .then(response => {
                alert("Profesores agregados");
            })
            .catch(error => {
                alert("Error: No se pudieron agregar los profesores");
            })
        this.setState({
            showAgregar: false,
            autor: this.state.autor.concat(this.state.selectedAgregar),
            selectedAgregar: []
        });
    }

    handleShowAgregar() {
        this.setState({showAgregar: true});
        let listaFiltrada = []

        axios.get('http://200.16.7.151:8080/general/listaDocente')
            .then(response => {
                listaFiltrada = response.data.docentes;
                this.state.autor.forEach(function (entry) {
                    listaFiltrada = listaFiltrada.filter(x => x.codigo !== entry)
                });
                this.setState(
                    {profesores: listaFiltrada}
                );
                console.log('prosores:', listaFiltrada)
            })
            .catch(error => {
                console.log(error);
            });
    }

    handleOnSelectAgregar = (row, isSelect) => {
        console.log('profesores:', this.state.profesores);
        if (isSelect) {
            this.setState(() => ({
                selectedAgregar: [...this.state.selectedAgregar, row.codigo]
            }));
        } else {
            this.setState(() => ({
                selectedAgregar: this.state.selectedAgregar.filter(x => x !== row.codigo)
            }));
        }
    }

    handleOnSelectAllAgregar = (isSelect, rows) => {
        const codigos = rows.map(r => r.codigo);
        if (isSelect) {
            this.setState(() => ({
                selectedAgregar: codigos
            }));
        } else {
            this.setState(() => ({
                selectedAgregar: []
            }));
        }
    }
    //fin modal agregar

    //modal quitar:
    handleCloseQuitar() {
        this.setState({showQuitar: false});
    }

    guardarQuitados() { //arreglar y ya esta
        console.log("quitados:", this.state.selectedQuitar);
        axios.put('http://localhost:8080/docente/investigacion/eliminar/eliminarAutores', {
            id: this.props.match.params.idInvestigacion,
            autor: this.state.selectedQuitar
        })
            .then(response => {
                alert("Profesores quitados");
            })
            .catch(error => {
                alert("Error: No se pudieron quitar los profesores");
            })
        let quitados = this.state.selectedQuitar;
        this.setState({
            showQuitar: false,
            autor: this.state.autor.filter(function (el) {
                return quitados.indexOf(el) < 0;
            }),
            selectedQuitar: []
        });
    }

    handleShowQuitar() {
        this.setState({showQuitar: true});
        let listaFiltrada = new Array();
        let respuesta = []
        let autores = this.state.autor
        axios.get('http://200.16.7.151:8080/general/listaDocente')
            .then(response => {
                //console.log('response:',response.data.docentes);
                //console.log('autores a filtrar:',this.state.autor);
                respuesta = response.data.docentes;
                autores.forEach(function (entryAut) {
                    respuesta.forEach(function (entryResp) {
                        //console.log('============');
                        //console.log('entryAut:',entryAut);
                        //console.log('entryResp.codigo:',entryResp.codigo);
                        if (entryAut == entryResp.codigo) {
                            //console.log('entro:',entryResp.codigo);
                            listaFiltrada = [...listaFiltrada, entryResp]
                        }
                    });
                });
                //console.log('quitar filtrados:',listaFiltrada);
                this.setState(
                    {autoresModal: listaFiltrada}
                );
                //console.log('prosores:',listaFiltrada)
            })
            .catch(error => {
                console.log(error);
            });
    }

    handleOnSelectQuitar = (row, isSelect) => {
        if (isSelect) {
            this.setState(() => ({
                selectedQuitar: [...this.state.selectedQuitar, row.codigo]
            }));
        } else {
            this.setState(() => ({
                selectedQuitar: this.state.selectedQuitar.filter(x => x !== row.codigo)
            }));
        }
    }

    handleOnSelectAllQuitar = (isSelect, rows) => {
        const codigos = rows.map(r => r.codigo);
        if (isSelect) {
            this.setState(() => ({
                selectedQuitar: codigos
            }));
        } else {
            this.setState(() => ({
                selectedQuitar: []
            }));
        }
    }

    //fin modal quitar


    render() {
        console.log('autores:', this.state.autor)

        const columns = [{
            dataField: 'codigo',
            text: 'Codigo'
        }, {
            dataField: 'nombre',
            text: 'Nombre'
        }];

        const selectRowAgregar = {
            mode: 'checkbox',
            clickToSelect: true,
            selected: this.state.selectedAgregar,
            onSelect: this.handleOnSelectAgregar,
            onSelectAll: this.handleOnSelectAllAgregar
        };

        const selectRowQuitar = {
            mode: 'checkbox',
            clickToSelect: true,
            selected: this.state.selectedQuitar,
            onSelect: this.handleOnSelectQuitar,
            onSelectAll: this.handleOnSelectAllQuitar,
            nonSelectable: [this.props.match.params.codigo]
        };


        //console.log(this.props.match.params.idInvestigacion);
        //console.log(moment(this.state.fecha_inicio));
        return (
            <BaseContainer>
                <div className="panel col-lg-offset-2 col-lg-8 col-md-12 col-sm-12">
                    <div className="panel-heading">
                        <header className="page-header m-t-sm">
                            <a className="btn btn-default pull-right" onClick={this.props.history.goBack}> Volver </a>
                            <p className="h2 m-b-sm"> Editar Investigación </p>
                        </header>
                    </div>
                    <div className="panel-body">
                        <div className="form-group">
                            <label> Título </label>
                            <input type="text" className="form-control" value={this.state.titulo} onChange={this.handleTitulo}></input>
                            {this.validator.message('titulo', this.state.titulo, 'required|max:100', false, {required: 'Este campo es obligatorio', max: 'El número máximo de caracteres es 20'})}
                        </div>
                        <div className="form-group row">
                            <div className="col-md-8 col-sm-12">
                                <label> Autores </label>
                                <input type="text" disabled={true} className="form-control" value={this.state.autor} onChange={this.handleAutor}></input>
                                {this.validator.message('titulo', this.state.titulo, 'required|max:100', false, {required: 'Este campo es obligatorio', max: 'El número máximo de caracteres es 20'})}
                            </div>
                            <div className="col-sm-12 col-md-2 text-center">
                                <button className="btn btn-primary m-t-md col-md-12" onClick={this.handleShowAgregar}> Añadir</button>
                            </div>
                            <div className="col-sm-12 col-md-2 text-center">
                                <button className="btn btn-primary m-t-md col-md-12" onClick={this.handleShowQuitar}> Quitar</button>
                            </div>
                        </div>
                        <div className="form-group">
                            <label> Resumen </label>
                            <textarea className="form-control" value={this.state.resumen} onChange={this.handleResumen}></textarea>
                            {this.validator.message('resumen', this.state.resumen, 'required', false, {required: 'Este campo es obligatorio'})}
                        </div>
                        <div className="form-group">
                            <label> Fecha Inicio </label>
                            <DatePicker
                                className="form-control"
                                dateFormat="DD/MM/YYYY"
                                selected={this.state.fecha_inicio}
                                onChange={this.handleFIni}
                            />
                            {this.validator.message('fechaIni', this.state.fecha_inicio, 'required', false, {required: 'Este campo es obligatorio'})}
                        </div>
                        <div className="form-group">
                            <label> Fecha Fin </label>
                            <DatePicker
                                className="form-control"
                                dateFormat="DD/MM/YYYY"
                                selected={this.state.fecha_fin}
                                onChange={this.handleFFin}
                            />
                            {this.validator.message('fecha_fin', this.state.fecha_fin, 'required', false, {required: 'Este campo es obligatorio'})}
                        </div>
                    </div>
                    <div className="panel-footer text-right">
                        <button className="btn btn-primary"> Actualizar Investigación</button>
                    </div>

                    <Modal show={this.state.showAgregar} onHide={this.handleCloseAgregar}>
                        <Modal.Header closeButton>
                            <Modal.Title>Editar Autores</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <div className="form-group">
                                <BootstrapTable keyField='codigo' data={this.state.profesores} columns={columns}
                                                selectRow={selectRowAgregar}/>
                            </div>
                        </Modal.Body>
                        <Modal.Footer>
                            <button className="btn btn-primary" onClick={this.guardarAgregados}>Guardar</button>
                        </Modal.Footer>
                    </Modal>

                    <Modal show={this.state.showQuitar} onHide={this.handleCloseQuitar}>
                        <Modal.Header closeButton>
                            <Modal.Title>Quitar Autores</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <BootstrapTable keyField='codigo' data={this.state.autoresModal} columns={columns}
                                            selectRow={selectRowQuitar}/>
                        </Modal.Body>
                        <Modal.Footer>
                            <button className="btn btn-primary" onClick={this.guardarQuitados}>Guardar</button>
                        </Modal.Footer>
                    </Modal>
                </div>
            </BaseContainer>
        );
    }
}

export default ModificarInvestigacion;