import React from 'react';
import axios from 'axios';
import {Route} from 'react-router-dom';
import Select from 'react-select';
import {Panel} from 'react-bootstrap';
import BaseContainer from "../BaseContainer";
import API from "../../api";

class AyudaEconomicaJD extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            ayudaEconomica: {
                id: this.props.match.params.idAyudaEconomica,
                titulo: "",
                motivo: "",
                monto_otorgado: "",
                fecha_solicitud: "",
                fecha_inicio: "",
                fecha_fin: "",
                comentarios_adicionales: "",
                servicio_boletos: "",
                servicio_costo_maestria: "",
                servicio_inscripcion: "",
                servicio_viaticos: "",
                profesor: {
                    codigo_profesor: "",
                    nombres: "",
                    apellido_paterno: "",
                    apellido_materno: "",
                    correo_pucp: "",
                    seccion: ""
                }
            }
        }
    }

    componentDidMount() {
        this.findSolicitud();
    }

    findSolicitud(){
        API.get('ayudasEconomicas/ayudasEconomicas/detallar', {
            params: {
                id: this.state.ayudaEconomica.id,
            }
        }).then(response => {
            this.setState({ ayudaEconomica: response.data.ayudaEconomica });
        }).catch(error => {
            console.log(`Error al obtener datos del profesor ${this.props.match.params.idAyudaEconomica}`, error);
        });
    }

    render() {
        return (
            <div>
                <Route exact path={`${this.props.match.path}`} render={() =>
                    <BaseContainer>
                        <div className="panel col-lg-offset-2 col-lg-8 col-md-12 col-sm-12">
                            <div className="panel-heading">
                                <header className="page-header">
                                    <a className="btn btn-default pull-right"
                                       onClick={this.props.history.goBack}> Volver </a>
                                    <p className="h2 m-b-sm"> Solicitud Economica </p>
                                </header>
                            </div>
                            <div className="panel-body">
                                <h5> Informacion del Docente </h5>
                                <hr/>
                            </div>
                        </div>
                    </BaseContainer>
                }/>
            </div>
        );
    }

}
export default AyudaEconomicaJD;