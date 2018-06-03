import React, {Component} from 'react';
import {Route} from 'react-router-dom';
import BaseContainer from "../BaseContainer";
import ConvocatoriaNuevo from "./ConvocatoriasNuevo";
import ConvocatoriasListaPostulantes from "./ConvocatoriasListaPostulantes";
import API from '../../api.js';
import ConfirmationModal from "../ConfirmationModal";

class ConvocatoriasLista extends Component {

    constructor(props) {
        super(props);
        this.confirmation = React.createRef();
        this.state = {
            convocatorias: [],
        }
    }

    componentWillMount() {
        this.search();
    }

    search() {
        API.get('convocatoria/convocatoria/lista')
            .then(response => {
                this.setState({convocatorias: response.data.convocatorias})
            })
    }

    labelEstado(estado) {
        switch (estado) {
            case 'Creada':
                return <span className="label label-default"> Creado </span>;
            case 'Abierta':
                return <span className="label label-success"> Abierta </span>;
            case 'Cerrada':
                return <span className="label label-danger"> Cerrado </span>;
            case 'Cancelada':
                return <span className="label label-danger"> Cancelado </span>;
            case 'Finalizada':
                return <span className="label label-success"> Finalizado </span>;
            default:
                return <span></span>;
        }
    }

    uploadFile(e) {
        let file = e.target.files[0];
        let formData = new FormData();
        formData.append('file', file);
        API.post('tests/upload',
            formData,
            {
                headers: {'Content-Type': 'multipart/form-data'}
            }
        ).then(function () {
            console.log('Archivo subido');
        }).catch(function () {
            console.log('Error al subir el archivo');
        });
    }

    func = () => {
        this.confirmation.current.open()
    }
    render() {
        return (
            <div>
                <Route exact path={`${this.props.match.path}`} render={() =>
                    <BaseContainer>
                        <ConfirmationModal ref={ this.confirmation }/>
                        <div className="panel wrapper-md col-lg-offset-1 col-lg-10 col-md-12 col-sm-12">
                            <div className="panel-heading">
                                <a className="btn btn-sm btn-primary pull-right m-t-md"
                                   href={`${this.props.match.url}/nuevo`}> Nueva Convocatoria</a>
                                <h2> Convocatorias </h2>
                            </div>
                            <div className="panel-body">
                                <button onClick={ this.func }>asd</button>
                            </div>
                            <div className="panel-body">
                                <label>Files
                                    <input type="file" id="files" ref="files" onChange={this.uploadFile}/>
                                </label>
                            </div>
                            <div className="panel-body">
                                <table className="table table-striped">
                                    <thead>
                                    <tr>
                                        <th className="v-middle col-md-1 text-center">Código</th>
                                        <th className="v-middle col-md-4">Nombre</th>
                                        <th className="v-middle col-md-3">Curso</th>
                                        <th className="v-middle col-md-3"></th>
                                        <th className="v-middle col-md-1 text-center">Estado</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {this.state.convocatorias.map(item => {
                                        return (
                                            <tr key = {item.id}>
                                                <td className="v-middle text-center">
                                                    <span className="block text-primary"> {item.codigo} </span>
                                                    <small className="block text-muted"> {item.fechaRegistro} </small>
                                                </td>
                                                <td className="v-middle">
                                                    <span> {item.nombre} </span>
                                                </td>
                                                <td className="v-middle">
                                                    <span className="block text-primary"> {item.curso.nombre} </span>
                                                    <small className="block text-muted"> {item.curso.codigo} </small>
                                                </td>
                                                <td className="v-middle text-center">
                                                    <a className="badge"
                                                       href={`${this.props.match.url}/id/${item.id}`}> {item.cantidadPostulantes} </a>
                                                    <span className="block small text-muted m-t-xs"> postulantes </span>
                                                </td>
                                                <td className="v-middle text-center">
                                                    {this.labelEstado(item.estado)}
                                                </td>
                                            </tr>
                                        );
                                    })}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </BaseContainer>
                }/>

                <Route path={`${this.props.match.path}/nuevo`} component={ConvocatoriaNuevo}/>
                    <Route path={`${this.props.match.path}/id/:codigoConv`} component={ConvocatoriasListaPostulantes}/>

            </div>
        );
    }
}

export default ConvocatoriasLista;