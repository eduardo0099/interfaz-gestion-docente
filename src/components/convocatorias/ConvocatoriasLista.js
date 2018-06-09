import React, {Component} from 'react';
import {Route, Link,Redirect} from 'react-router-dom';
import BaseContainer from "../BaseContainer";
import ConvocatoriaNuevo from "./ConvocatoriasNuevo";
import ConvocatoriasListaPostulantes from "./ConvocatoriasListaPostulantes";
import API from '../../api.js';
import ConfirmationModal from "../ConfirmationModal";

class ConvocatoriasLista extends Component {

    constructor(props) {
        super(props);
        this.state = {
            convocatorias: [],
            auth: false,
            verAuth:false
        }
    }
    componentWillMount() {
        if (localStorage.getItem('jwt') == null) {
            window.location.href = "/";
        } else {
            API.get('/auth/verificaPermiso', {
                /*
                headers:{
                  'x-access-token' : localStorage.getItem('jwt'),
                },
                */
                params: {
                    ruta: "/home"
                }
            }).then(resp => {
                console.log("resp", resp.data);
                this.setState({ auth: resp.data.permiso,verAuth:true });
            }).catch(err => {
                console.log("err", err);
            })
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



    render() {
        if(!this.state.auth && this.state.verAuth){
            return(<Redirect to="/home"/>);
        }else if (!this.state.verAuth){
            return(<div/>);
        }
        return (
            <div>
                <Route exact path={`${this.props.match.path}`} render={() =>
                    <BaseContainer>
                        <div className="panel wrapper-md col-lg-offset-1 col-lg-10 col-md-12 col-sm-12">
                            <div className="panel-heading">
                                <Link className="btn btn-sm btn-primary pull-right m-t-md"
                                      to={"/convocatorias/nuevo"}> Nueva Convocatoria</Link>
                                <h2> Convocatorias </h2>
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
                                            <tr key={item.id}>
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
                                                    <Link to={"/convocatorias/" + item.id}>

                                                            <span className="badge"> {item.cantidadPostulantes} </span>
                                                            <span
                                                                className="block small text-muted m-t-xs"> postulantes </span>
                                                    </Link>
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

                <Route path="/convocatorias/nuevo" component={ConvocatoriaNuevo}/>
                <Route path="/convocatorias/:id_convocatoria" component={ConvocatoriasListaPostulantes}/>

            </div>
        );
    }
}

export default ConvocatoriasLista;