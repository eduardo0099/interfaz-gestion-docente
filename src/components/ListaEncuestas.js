import React from 'react';
import axios from 'axios';

class ListaEncuestas extends React.Component{
    constructor(){
        super();

        this.state={
            encuestas : []
        }
    }


    render(){
        return (
            <div>
                <h1>Encuestas</h1>
                <h2>Nombre</h2>

                <hr />
                Ciclo:
                <select id="slct1" name="slct1">
                    <option value = "Todos">Todos</option>
                    <option value = "2017-2">2017-2</option>
                    <option value = "2017-1">2017-1</option>
                    <option value = "2016-2">2016-2</option>
                </select>
                
                <h4>Resultado de encuestas</h4>
                <table striped bordered condensed hover class="table">
                    <thead>
                    <tr>
                        <th scope="col">Ciclo</th>
                        <th scope="col">Curso</th>
                        <th scope="col">Horario</th>
                        <th scope="col">Porcentaje de participacion</th>
                        <th scope="col">Puntaje</th>
                        <th scope="col">Porcentaje</th>
                    </tr>
                    </thead>
                    <tbody>

                    </tbody>
                </table>
            </div>
        );

    }
}

export default ListaEncuestas;