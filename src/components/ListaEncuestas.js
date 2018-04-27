import React from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';

class ListaEncuestas extends React.Component{

    constructor(props){
        super(props);

        this.state={
            Datos:[{'ciclo':"2017-2",
                    "nombreCurso":"Fundamentos Programacion",
                    "horario":"761",
                    "participacion":"10",
                    "puntaje":"24.6",
                    "porcentaje":"23%"
                    }],
            NombreDocente:"Alenjandro Bello",
            Ciclos:[{"id":"1","descripcion":"Todos"},{"id":"1","descripcion":"2017-2"},
                    {"id":"2","descripcion":"2017-1"}]
        }
        /*this.state={

            Datos: props.datos,
            NombreDocente:props.nombreDocente,
            Ciclos:props.ciclo}*/
    }


    updateTable(){
        let cicloNuevo=this.refs.selectorCiclos.value;
        /*for(let i=0;i<this.state.Datos.length;i++){
            if(cicloNuevo === this.state.Datos[0].ciclo){
                <td></td>
            }
        }*/
    }

    render(){
        const columnas = [
            {
                Header: 'Ciclo',
                accessor: 'ciclo'
            }, {
                Header: 'Curso',
                accessor: 'nombreCurso'
            }, {
                Header: 'Horario',
                accessor: 'horario'
            }, {
                Header: 'Porcentaje de participacion',
                accessor: 'participacion'
            },{
                Header: 'Puntaje',
                accessor:'puntaje'
            },{
                Header: 'Porcentaje',
                accessor: 'porcentaje'
            }
        ]

        let nombre = this.state.NombreDocente;

        let MakeItem = function(X) {/*Genera el combobox*/
            return <option>{X.descripcion}</option>;
        };

        return (
            <div>
                <h1>Encuestas</h1>
                <h2>{nombre}</h2>
                <h3>Ciclo:
                    <select ref="selectorCiclos" onChange = {(e)=>{this.updateTable();}} >
                        {this.state.Ciclos.map(MakeItem)}
                    </select>
                </h3>
                <h4>Resultado de encuestas</h4>
                <ReactTable data={this.state.Datos} columns={columnas}/>
            </div>
        );

    }
}

export default ListaEncuestas;