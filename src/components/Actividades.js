import React from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import axios from "axios/index";

export class Actividades extends React.Component {

    componentDidMount(){

        axios.get('http://200.16.7.151:8080/docente/docente/actDocente?codigo='+this.props.match.params.codigo+'&ciclo=2018-1', {
            params: {
                codigo: this.props.match.params.codigo,
                ciclo: "2018-1",
            }
        })
            .then(response => {
                this.setState({
                    info: response.data
                });
            })
            .catch(error => {
                console.log(`Error al obtener datos del profesor ${this.props.match.params.codigo}`,error);
            });
    }

    render () {
        const columnas = [
            {
                Header: 'Nombre de la Actividad',
                accessor: 'titulo'
            }, {
                Header: 'Tipo',
                accessor: 'tipo'
            }, {
                Header: 'Fecha Inicio',
                accessor: 'fecha_inicio'
            }, {
                Header: 'Fecha Fin',
                accesor: 'fecha_fin',
            }, {
                Header: 'Estado',
                accedor: 'estado',
            }
        ];

        return(
            <div>
                <select ref="selectorTipo">
                    {this.props.tipo.map((item,i)=>{
                        return <option key={i}>{item.descripcion}</option>
                    })}
                </select>
                <ReactTable data={this.props.actividades} columns={columnas}/>
            </div>
        )
    }
}

export default Actividades;
