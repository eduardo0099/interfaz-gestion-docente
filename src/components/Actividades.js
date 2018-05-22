import React from 'react';
import 'react-table/react-table.css';
import axios from "axios/index";
import '../styles/Actividades.css';
<<<<<<< HEAD
import 'react-datepicker/dist/react-datepicker.css';
import { BootstrapTable, TableHeaderColumn, InsertButton } from 'react-bootstrap-table';
=======
import {Button, Col, Grid} from 'react-bootstrap';
import BootstrapTable from 'react-bootstrap-table-next';
import {Route} from 'react-router-dom';
import SkyLight from 'react-skylight';
import DatePicker from 'react-date-picker'
import BaseContainer from "./BaseContainer";
>>>>>>> develop

export class Actividades extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedId: -1,
            actividades: [
                {
                    id: "",
                    titulo: "",
                    tipo: "",
                    fecha_inicio: "",
                    fecha_fin: "",
                    estado: "",
                }
            ],
            ciclos: [],
            cicloSeleccionado: "",
        }

    }

    componentDidMount() {
        axios.get('http://200.16.7.151:8080/docente/docente/actDocente?codigo=' + this.props.match.params.codigo + '&ciclo=2018-1')
            .then(response => {
                this.setState({
                    actividades: response.data.actividades
                })
            })
            .catch(error => {
                console.log(`Error al obtener datos de la actividad ${this.props.match.params.codigo}`, error);
            })
    }

<<<<<<< HEAD
    handleInsertButtonClick = (onClick) => {
        // Custom your onClick event here,
        // it's not necessary to implement this function if you have no any process before onClick
        console.log('This is my custom function for InserButton click event');
        onClick();
    }

    createCustomInsertButton = (openModal) => {
        return (
            <InsertButton
                btnText='Nueva Actvidad'
                btnContextual='btn-warning'
                className='my-custom-class'
                btnGlyphicon='glyphicon-edit'
                onClick={ openModal }/>
        );
    }

    render(){
        function onAfterInsertRow(row) {
            let newRowStr = '';
            for (const prop in row) {
                newRowStr += prop + ': ' + row[prop] + ' \n';
            }
            axios.post('http://200.16.7.151:8080/docente/actividad/registrar',{
                idProfesor: "20112728",
                ciclo: "2018-1",
                lugar: "PUCP"
            })
            alert('La nueva actividad es:\n ' + newRowStr);
        }

        function onAfterDeleteRow(rowKeys) {
            for (let i = 0; i < rowKeys.length; i++){
                axios.delete('http://200.16.7.151:8080/docente/actividad/eliminar', {
                    data:{
                        id: rowKeys[i].id
=======
    guardar = () => {
        var titulo = document.getElementsByName("titulo")[0].value;
        var fechaIni = document.getElementsByName("fechaIni")[0].value;
        var fechaFin = document.getElementsByName("fechaFin")[0].value;
    }

    eliminar = () => {
        if (this.state.selectedId != -1) {
            if (window.confirm('Seguro que deseas eliminar esta actividad?')) {
                // Save it!
                axios.delete('http://200.16.7.151:8080/docente/actividad/eliminar', {
                    data: {
                        id: this.state.selectedId
>>>>>>> develop
                    }
                })
            }
<<<<<<< HEAD
            alert('Se elimaron las siguientes actividades:' + rowKeys);
        }
=======
        } else {
            alert(`Seleccionar una actividad!`);
        }
    }
    onChange = date => this.setState({date})

    render() {
        console.log(this.state);
>>>>>>> develop

        function afterSearch(searchText, result) {
            console.log('La actividad buscada es: ' + searchText);
            console.log('Resultado:');
            for (let i = 0; i < result.length; i++) {
                console.log('Actividad: ' + result[i].id + ', ' + result[i].titulo + ', ' + result[i].tipo + ', ' + result[i].fecha_inicio + ',' + result[i].fecha_fin + ', ' + result[i].estado );
            }
<<<<<<< HEAD
        }

        const options = {
            insertBtn: this.createCustomInsertButton,
            afterInsertRow: onAfterInsertRow,
            afterDeleteRow: onAfterDeleteRow,
            afterSearch: afterSearch
        };

        const selectRowProp = {
            mode: 'checkbox',
            bgColor: 'pink'
        };

        return(
            <BootstrapTable data = {this.state.actividades} striped={true} hover={true} search={ true } insertRow deleteRow={ true } selectRow={ selectRowProp } options={options}>
                <TableHeaderColumn dataField='id' isKey  hidden hiddenOnInsert searchable={ false }>Id Actividad</TableHeaderColumn>
                <TableHeaderColumn dataField='titulo'>Nombre Actividad</TableHeaderColumn>
                <TableHeaderColumn dataField='tipo' searchable={ false }>Tipo</TableHeaderColumn>
                <TableHeaderColumn dataField='fecha_inicio' searchable={ false }>Fecha Inicio</TableHeaderColumn>
                <TableHeaderColumn dataField='fecha_fin' searchable={ false }>Fecha Fin</TableHeaderColumn>
                <TableHeaderColumn dataField='estado' searchable={ false }>Estado</TableHeaderColumn>
            </BootstrapTable>
=======
        ];
        const selectRow = {
            mode: 'radio',
            clickToSelect: true
        };

        const rowEvents = {
            onClick: (e, row) => {
                this.setState({
                    selectedId: row.id
                });
                //alert(`clicked on row with index: ${this.state.selectedId}`);
            }
        };

        console.log(this.props)

        function myFunction(x) {
            console.log("Row index is: " + x.rowIndex);
        }

        let myComponent;
        if (this.state.selectedId !== -1) {
            //myComponent = <Link to={`${this.props.match.url}/${this.state.selectedId}/ModificarActividad`}>Modificar</Link>
        } else {
            myComponent = <label onClick={this.modificar}>Modificar</label>
        }

        return (
            <div>
                <BaseContainer>
                    <div className="panel wrapper-md col-lg-offset-1 col-lg-10 col-md-12 col-sm-12">
                        <h2>Actividades</h2>
                        <Route exact path={`${this.props.match.path}`} render={() =>
                            <Grid>
                                <Col md={12}>
                                    <Col md={12}>
                                        <BootstrapTable keyField='id' data={this.state.actividades} columns={columns}
                                                        selectRow={selectRow} rowEvents={rowEvents}/>

                                    </Col>
                                    <Col md={2}>
                                        <div className="col-md-2">
                                            <button className="btn btn-primary"
                                                    onClick={() => this.refs.simpleDialog.show()}>Nueva Actividad
                                            </button>
                                        </div>
                                        <Button onClick={this.eliminar}>Eliminar</Button>
                                        {myComponent}
                                    </Col>
                                </Col>
                            </Grid>
                        }/>

                        <SkyLight hideOnOverlayClicked ref="simpleDialog">
                            <div className="panel panel-default">
                                <div className="panel-heading">Registrar Nueva Actividad</div>
                                <div className="panel-body">
                                    <label>
                                        Título:
                                        <input type="text" placeholder="Título" className="form-control"
                                               name="titulo" onChange={this.handleChange}/>
                                    </label>
                                    <p></p>
                                    <label>
                                        <select className="form-control">
                                            <option>Congreso</option>
                                            <option>Taller</option>
                                            <option>Visita</option>
                                            <option>Capacitacion</option>
                                        </select>
                                    </label>
                                    <p></p>
                                    <label>
                                        <DatePicker onChange={this.onChange} value={this.state.dateInit}/>
                                    </label>
                                    <p></p>
                                    <label>
                                        <DatePicker onChange={this.onChange} value={this.state.dateFin}/>
                                    </label>
                                    <button className="btn btn-primary" onClick={this.guardar}>Guardar</button>
                                </div>
                            </div>
                        </SkyLight>
                    </div>
                </BaseContainer>
            </div>
>>>>>>> develop
        );
    }
}

export default Actividades;
