import React from 'react';
import axios from "axios/index";
import ReactTable from 'react-table';
import 'react-table/react-table.css';

export class Cursos extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            datos: props.cursos,
            ciclos:props.ciclos,
            codigoDocente:props.codigo
        }
    }


    updateTable(){
    }


    render () {
        const columnas = [
            {
                Header: 'Nombre',
                accessor: 'cursos.nombre'
            }, {
                Header: 'Creditos',
                accessor: 'cursos.creditos'
            }, {
                Header: 'Horario',
                accessor: 'cursos.horario'
            }, {
                Header: 'Horas Semanales',
                accessor: 'cursos.horas'
            }
        ]

        var MakeItem = function(X) {
            return <option>{X.descripcion}</option>;
        };

        return(
            <div>
                <p></p>
                <select ref="selectorCiclos" onChange={ (e) => { this.updateTable(); }}>{this.state.ciclos.map(MakeItem)}</select>
                <p></p>
                <ReactTable data={this.state.datos} columns={columnas}/>
            </div>
        )
    }
}

export default Cursos;