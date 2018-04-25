import React from 'react';
import axios from "axios/index";
import ReactTable from 'react-table';
import 'react-table/react-table.css';

export class Cursos extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            datos: [{
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
                    datos: response.data.cursos
                });
            })
            .catch(error =>{
                console.log("Error obteniendo los datos de los Cursos");
            });
    }

    updateTable(){
        var cicloNuevo=this.refs.selectorCiclos.value;
        var nuevaDir="http://localhost:8080/tests";
        nuevaDir=nuevaDir.concat(cicloNuevo)
        axios.get(nuevaDir)
            .then(response =>{
                this.setState({
                    datos: response.data.cursos
                });
            })
            .catch(error =>{
                console.log("Error obteniendo los datos de los Cursos al cambiar valor de combobox");
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
        ]

        var MakeItem = function(X) {
                return <option>{X.descripcion}</option>;
            };

        return(
            <div>

                <script>
                    document.write(this.state.profesor);
                </script>
                <p></p>
                <select ref="selectorCiclos" onChange={ (e) => { this.updateTable(); }}>{this.state.ciclos.map(MakeItem)}</select>
                <p></p>
                <ReactTable data={this.state.datos} columns={columnas}/>
            </div>
        )
    }
}

export default Cursos;