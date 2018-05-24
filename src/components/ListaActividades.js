import React, { Component } from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import { Label, DropdownButton, MenuItem, Form } from 'react-bootstrap'
import axios from "axios/index";
//import App from "../containers/App";



class ListaActividades extends React.Component{

    constructor(){
        super();

        this.state = {
            actividades: []
        }

        this.columns = [{
            dataField: 'titulo',
            text: 'Titulo'
        }, {
            dataField: 'tipo',
            text: 'Tipo'
        }, {
            dataField: 'fecha_inicio',
            text: 'Fecha Inicio'
        }, {
            dataField: 'fecha_fin',
            text: 'Fecha Fin'
        }, {
            dataField: 'estado',
            text: 'Estado'
        }];


        this.products = [{
            titulo: "Reunion congresal de amantes del Hearthstone",
            tipo: "Congreso" ,
            fecha_inicio: "2018-04-28",
            fecha_fin: "2018-04-28",
            estado: "Asistira"
        }, {
            titulo: "Reunion congresal de amantes del Crouche",
            tipo: "Congreso" ,
            fecha_inicio: "2018-04-23",
            fecha_fin: "2018-04-23",
            estado: "Cancelada"
        }];

    }

    componentDidMount(){
        axios.get('http://localhost:8080/docente/actDocente')
            .then(response =>{
                this.setState({
                    actividades: response.data
                });
            })
            .catch(error =>{
                console.log("Error obteniendo los datos de las actividades de los profesores");
            });
    }


    render(){
        return(
          <div>
              <h3> Actividades </h3>

              <DropdownButton title="Ciclo">
                  <MenuItem href="#books">2018-1</MenuItem>
                  <MenuItem href="#podcasts">2018-0</MenuItem>
                  <MenuItem href="#">2017-2</MenuItem>
                  <MenuItem href="#">2017-1</MenuItem>
              </DropdownButton>

              <p> </p>

              <DropdownButton title="Tipo">
                  <MenuItem href="#books">Congreso</MenuItem>
                  <MenuItem href="#podcasts">Ponencia</MenuItem>
              </DropdownButton>

              <p> </p>

              <BootstrapTable keyField='titulo' data={this.products } columns={ this.columns } />
          </div>
        );

    }

}

export default ListaActividades;