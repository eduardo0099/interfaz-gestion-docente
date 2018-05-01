import React, { Component } from 'react';
import {Row,Grid,Table,Button,PageHeader} from 'react-bootstrap';
import Papa from 'papaparse';
import axios from 'axios';

class RegistroInvestigación extends Component{


    constructor(props){
        super(props);
    }

    performPostRequest = ()=> {

        console.log(document.getElementsByName("titulo")[0].value)

        var titulo=document.getElementsByName("titulo")[0].value;
        var autor=document.getElementsByName("autor")[0].value;
        var resumen=document.getElementsByName("resumen")[0].value;
        var fechaIni=document.getElementsByName("fechaIni")[0].value;
        var fechaFin=document.getElementsByName("fechaFin")[0].value;

        axios.post('http://localhost:8080/docente/investigacion/registrar', {
            titulo: titulo,
            autor: [autor],
            resumen: resumen,
            fecha_inicio: fechaIni,
            fecha_fin: fechaFin,
            archivo:null
        })
            .then(function (response) {
                alert("Investigación registrada");
            })
            .catch(function (error) {
                alert("Error: No se pudo registrar la investigación");
            })
    }

    render() {
        return (
            <div className="container">


                <PageHeader>
                    Registro de Informe
                </PageHeader>
                <Table responsive >
                        <label>
                            Título:
                            <input type="text" name="titulo" />
                        </label>
                        <p> </p>
                        <label>
                            Autor:
                            <input type="text" name="autor" />
                        </label>
                        <p> </p>
                        <label>
                            Resumen:
                            <input type="text" name="resumen" />
                        </label>
                        <p> </p>
                        <label>
                            Fecha Inicio:
                            <input type="text" name="fechaIni" />
                        </label>
                        <p> </p>
                        <label>
                            Fecha Fin:
                            <input type="text" name="fechaFin" />
                        </label>
                        <p> </p>
                        <input type="submit" value="Registrar" onClick={this.performPostRequest}/>
                        <input type="submit" value="Cancelar" />
                </Table>
            </div>


        );
    }
}




export default RegistroInvestigación;