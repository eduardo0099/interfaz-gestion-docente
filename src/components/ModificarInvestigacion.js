import React, { Component } from 'react';
import {Row,Grid,Table,Button,PageHeader,Modal,Popover,Tooltip,OverlayTrigger,Col} from 'react-bootstrap';
import Papa from 'papaparse';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import SimpleReactValidator from "simple-react-validator";
import moment from "moment";
import BootstrapTable from 'react-bootstrap-table-next';

class ModificarInvestigacion extends Component{


    constructor(props){
        super(props);
        this.validator = new SimpleReactValidator();
        this.state={
            titulo: '',
            autor: [],
            resumen: '',
            fecha_inicio: '',
            fecha_fin: '',
            archivo:null,
            showAgregar: false,
            selectedAgregar:[],
            profesores:[],
            showQuitar: false,
            selectedQuitar:[],
            autoresModal:[]
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

    componentDidMount(){
        axios.get('http://localhost:8080/docente/docente/investigacion', {
            params: {
                id: this.props.match.params.idInvestigacion,
            }
        })
            .then(response =>{
                console.log(response);
                this.setState({
                    titulo: response.data.investigacion.titulo,
                    autor: response.data.autores,
                    resumen: response.data.investigacion.resumen,
                    fecha_inicio: moment(response.data.investigacion.fecha_inicio),
                    fecha_fin: moment(response.data.investigacion.fecha_fin)
                });
            })
            .catch(error =>{
                console.log("Error obteniendo la investigacion",error);
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

    armarFecha(date){
        var cadena="";
        cadena=cadena+date.getFullYear();

        if (date.getMonth()<9){
            cadena=cadena+0+(date.getMonth()+1);
        }else{
            cadena=cadena+(date.getMonth()+1);
        }

        if (date.getDate()<10){
            cadena=cadena+0+date.getDate();
        }else{
            cadena=cadena+date.getDate();
        }
        console.log(cadena);
        return cadena;
    }

    validDates(fFin,fIni){
        var isafter = moment(fFin._d).isAfter(fIni._d);
        console.log('fechas validas?:',isafter)
        return isafter;
    }

    performPostRequest = ()=> {
        if( this.validator.allValid() && this.validDates(this.state.fecha_fin,this.state.fecha_inicio) ){
            axios.put('http://200.16.7.151:8080/docente/investigacion/actualizar', {
                id: this.props.match.params.idInvestigacion,
                titulo: this.state.titulo,
                autor: this.state.autor,
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
        }else {
            if ( this.state.fecha_fin !== null && this.state.fecha_fin !== null ){
                if (!this.validDates(this.state.fecha_fin,this.state.fecha_inicio)){
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
        this.setState({ showAgregar: false });
    }

    guardarAgregados() {
        alert("Profesores agregados");
        this.setState({
            showAgregar: false,
            autor:this.state.autor.concat(this.state.selectedAgregar),
            selectedAgregar:[]
        });
    }

    handleShowAgregar() {
        this.setState({ showAgregar: true });
        let listaFiltrada=[]

        axios.get('http://200.16.7.151:8080/general/listaDocente')
            .then(response => {
                listaFiltrada=response.data.docentes;
                this.state.autor.forEach(function(entry) {
                    listaFiltrada=listaFiltrada.filter(x => x.codigo !== entry)
                });
                this.setState(
                    {profesores: listaFiltrada}
                    );
                console.log('prosores:',listaFiltrada)
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
        this.setState({ showQuitar: false });
    }

    guardarQuitados() { //arreglar y ya esta
        alert("Profesores quitados");
        console.log("quitados:",this.state.selectedQuitar);
        let quitados=this.state.selectedQuitar;
        this.setState({
            showQuitar: false,
            autor:this.state.autor.filter( function( el ) {
                    return quitados.indexOf( el ) < 0;
                }),
            selectedQuitar:[]
        });
    }

    handleShowQuitar() {
        this.setState({ showQuitar: true });
        let listaFiltrada=[]

        axios.get('http://200.16.7.151:8080/general/listaDocente')
            .then(response => {
                listaFiltrada=response.data.docentes;
                this.state.autor.forEach(function(entry) {
                    listaFiltrada=listaFiltrada.filter(x => x.codigo == entry)
                });
                this.setState(
                    {autoresModal: listaFiltrada}
                );
                console.log('prosores:',listaFiltrada)
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
        console.log('autores:',this.state.autor)

        const columns = [{
            dataField: 'codigo',
            text: 'Codigo'
        },{
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
            onSelectAll: this.handleOnSelectAllQuitar
        };


        //console.log(this.props.match.params.idInvestigacion);
        //console.log(moment(this.state.fecha_inicio));
        return (
            <div className="container">
                <PageHeader>
                    Editar Informe
                </PageHeader>
                <Grid>
                    <Row>
                        <Col md={12}>
                        Título:
                        <input type="text" className="form-control" value={this.state.titulo} onChange={this.handleTitulo}></input>
                        {this.validator.message('titulo', this.state.titulo, 'required|max:100', false, {required: 'Este campo es obligatorio',max:'El número máximo de caracteres es 20'})}
                        <br></br>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={8}>
                        Autores:
                        <input type="text" disabled={true} className="form-control" value={this.state.autor} onChange={this.handleAutor}></input>
                        {this.validator.message('autor', this.state.autor, 'required|integer', false, {required: 'Este campo es obligatorio'})}
                        <br></br>
                        </Col>
                        <Col md={2}>
                            <br></br>
                        <Button bsStyle="primary" bsSize="large" onClick={this.handleShowAgregar}>
                            Añadir
                        </Button>
                        </Col>
                        <Col md={2}>
                            <br></br>
                            <Button bsStyle="primary" bsSize="large" onClick={this.handleShowQuitar}>
                                Quitar
                            </Button>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={12}>
                        Resumen:
                        <input type="text" className="form-control" value={this.state.resumen} onChange={this.handleResumen}></input>
                        {this.validator.message('resumen', this.state.resumen, 'required', false, {required: 'Este campo es obligatorio'})}
                        <br></br>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={12}>
                        Fecha Inicio:
                        <DatePicker
                            dateFormat="DD/MM/YYYY"
                            selected={this.state.fecha_inicio}
                            onChange={this.handleFIni}
                        />
                        {this.validator.message('fechaIni', this.state.fecha_inicio, 'required', false, {required: 'Este campo es obligatorio'})}
                        <br></br>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={12}>
                        Fecha Fin:
                        <DatePicker
                            dateFormat="DD/MM/YYYY"
                            selected={this.state.fecha_fin}
                            onChange={this.handleFFin}
                        />
                        {this.validator.message('fecha_fin', this.state.fecha_fin, 'required', false, {required: 'Este campo es obligatorio'})}
                        <br></br>
                        </Col>
                    </Row>
                </Grid>
                <Modal show={this.state.showAgregar} onHide={this.handleCloseAgregar}>
                    <Modal.Header closeButton>
                        <Modal.Title>Editar autores</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Grid>
                            <Row>
                                <Col md={6}>
                                    <BootstrapTable keyField='codigo' data={ this.state.profesores } columns={ columns }
                                                    selectRow={ selectRowAgregar }/>

                                </Col>
                            </Row>
                        </Grid>

                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={this.guardarAgregados}>Guardar cambios</Button>
                    </Modal.Footer>
                </Modal>

                <Modal show={this.state.showQuitar} onHide={this.handleCloseQuitar}>
                    <Modal.Header closeButton>
                        <Modal.Title>Quitar autores</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Grid>
                            <Row>
                                <Col md={6}>
                                    <BootstrapTable keyField='codigo' data={ this.state.autoresModal } columns={ columns }
                                                    selectRow={ selectRowQuitar }/>

                                </Col>
                            </Row>
                        </Grid>

                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={this.guardarQuitados}>Guardar cambios</Button>
                    </Modal.Footer>
                </Modal>
                    <Button onClick={this.performPostRequest}>Modificar</Button>
                <label> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </label>
                <Button onClick={this.props.history.goBack}>Cancelar</Button>
            </div>
        );
    }
}




export default ModificarInvestigacion;