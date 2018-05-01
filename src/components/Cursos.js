import React from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import axios from "axios/index";

export class Cursos extends React.Component {
        this.state = {
            cursos: [{
                "nombre": "Chistemas Operativos",
                "creditos": 6,
                "horario": "0666",
                "horas": 5
            },
                {
                    "nombre": "funda",
                    "creditos": 32,
                    "horario": "0069",
                    "horas": 56
                }
            ],
            ciclos:[{
                "id":"1",
                "descripcion":"2018-1"},
                {"id":"2",
                    "descripcion":"2017-2"}
            ],
            codigoDocente:18846666
        }
    }

    componentDidMount(){
        axios.get('http://localhost:8080/docente/listaCiclos')
            .then(response =>{
                this.setState({
                    ciclos: response.data
                });
            })
            .catch(error =>{
                console.log("Error obteniendo los datos de los ciclos");
            });


        axios.get('http://localhost:8080/tests')
            .then(response =>{
                this.setState({
                    cursos: response.data.cursos
                });
            })
            .catch(error =>{
                console.log("Error obteniendo los datos de los Cursos");
            });
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

        return(
            <div>
                <select ref="selectorCiclos">
                    {this.state.ciclos.map((item,i)=>{
                        return <option key={i}>{item.descripcion}</option>
                    })}
                </select>
                <ReactTable data={this.state.cursos} columns={columnas}/>

            </div>
        )
    }
}

export default Cursos;
