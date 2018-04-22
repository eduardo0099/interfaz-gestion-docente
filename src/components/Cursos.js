import React from 'react';
import axios from "axios/index";

export class Cursos extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            datos: []
        }
    }

    componentDidMount(){
        axios.get('http://localhost:8080/tests')
            .then(response =>{
                this.setState({
                    datos: response.data
                });
            })
            .catch(error =>{
                console.log("Error obteniendo los datos de los Cursos");
            });
    }

    renderTable = () => {
        return this.state.datos.map(value => {
            return (
                <table>
                    <tr>
                        <td>Nombre</td>
                        <td>{value.nombre}</td>
                    </tr>
                    <tr>
                        <td>Creditos</td>
                        <td>{value.numCreditos}</td>
                    </tr>
                    <tr>
                        <td>Horario</td>
                        <td>{value.horario}</td>
                    </tr>
                    <tr>
                        <td>Horas semanales</td>
                        <td>{value.hSemanales}</td>
                    </tr>
                </table>
            )
        })
    }

    render () {
        return <div>{this.renderTable()}</div>;
    }
}

export default Cursos;