import React from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';

export class Cursos extends React.Component {
    constructor(props){
        super(props);
    }

    render () {
        const columnas = [
            {
                Header: 'Nombre',
                accessor: 'nombre'
            }, {
                Header: 'Creditos',
                accessor: 'creditos'
            }, {
                Header: 'Horario',
                accessor: 'horario'
            }, {
                Header: 'Horas Semanales',
                accessor: 'horas'
            }
        ];

        let myComponent;
        if(this.props.cursos !== undefined) {
            var cursos=this.props.cursos[0].listaCursos.concat(this.props.cursos[1].listaCursos);
            cursos=cursos.concat(this.props.cursos[2].listaCursos);

            myComponent = <ReactTable data={cursos} columns={columnas}/>

        } else {
            myComponent = null
        }

        return(
            <div>
                <select ref="selectorCiclos">
                    {this.props.ciclos.map((item,i)=>{
                        return <option key={i}>{item.descripcion}</option>
                    })}
                </select>
                {myComponent}

            </div>
        )
    }
}

export default Cursos;