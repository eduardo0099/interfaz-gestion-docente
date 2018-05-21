import React, { Component } from 'react';
import 'react-table/react-table.css';
import axios from "axios/index";
import '../styles/Actividades.css';
import 'react-datepicker/dist/react-datepicker.css';
import { BootstrapTable, TableHeaderColumn, InsertButton } from 'react-bootstrap-table';

export class Actividades extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedId:-1,
            actividades: [
                {
                    id:"",
                    titulo:"",
                    tipo:"",
                    fecha_inicio:"",
                    fecha_fin:"",
                    estado:"",
                }
            ],
            ciclos:[],
            cicloSeleccionado: "",
        }

    }

    componentDidMount(){
        axios.get('http://200.16.7.151:8080/docente/docente/actDocente?codigo='+this.props.match.params.codigo+'&ciclo=2018-1')
            .then(response => {
                this.setState({
                    actividades: response.data.actividades
                })
            })
            .catch(error => {
                console.log(`Error al obtener datos de la actividad ${this.props.match.params.codigo}`,error);
            })
    }

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
                    }
                })
            }
            alert('Se elimaron las siguientes actividades:' + rowKeys);
        }

        function afterSearch(searchText, result) {
            console.log('La actividad buscada es: ' + searchText);
            console.log('Resultado:');
            for (let i = 0; i < result.length; i++) {
                console.log('Actividad: ' + result[i].id + ', ' + result[i].titulo + ', ' + result[i].tipo + ', ' + result[i].fecha_inicio + ',' + result[i].fecha_fin + ', ' + result[i].estado );
            }
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
        );
    }
}

export default Actividades;
