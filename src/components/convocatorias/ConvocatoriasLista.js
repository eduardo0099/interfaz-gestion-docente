import React, {Component} from 'react';
import {Route, Link,Redirect} from 'react-router-dom';
import BaseContainer from "../BaseContainer";
import ConvocatoriaNuevo from "./ConvocatoriasNuevo";
import ConvocatoriasListaPostulantes from "./ConvocatoriasListaPostulantes";
import ConvocatoriaDetalle from "./ConvocatoriaDetalle"
import API from '../../api.js';
import ConfirmationModal from "../ConfirmationModal";
import {Role,currentRole} from '../../auth.js'
import axios from 'axios';

class ConvocatoriasLista extends Component {

    constructor(props) {
        super(props);
        this.state = {
            convocatorias: [],
            auth: false,
            verAuth:false,
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
                    ruta: "/convocatorias"
                }
            }).then(resp => {
                console.log("resp convocatoria",typeof resp.data.permiso,resp.data.permiso);
                this.setState({ auth: resp.data.permiso, verAuth:true });
            }).catch(err => {
                console.log("err", err);
            })
        }
    }
    
    componentDidMount() {
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
            case 'Aprobada':
                return <span className="label label-default"> Aprobada </span>;
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
        /*if(!this.state.auth && this.state.verAuth){
            return(<Redirect to="/home"/>);
        }else if (!this.state.verAuth){
            return(<div/>);
        }*/
        return (
            <div>
                <Route exact path={`${this.props.match.path}`} render={() =>
                    <BaseContainer>
                        <div className="panel wrapper-md col-lg-offset-1 col-lg-10 col-md-12 col-sm-12">
                            <div className="panel-heading">
                                {currentRole()=== Role.JEFE_DEPARTAMENTO ?<span></span>
                                    :<Link className="btn btn-sm btn-primary pull-right m-t-md"
                                           to={"/convocatorias/registro/nuevo"}> Nueva Convocatoria</Link>
                                    }
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
                                                    <Link to={"/convocatorias/" + item.id +"/detalle" }>
                                                        <span> {item.nombre} </span>
                                                    </Link>
                                                </td>
                                                <td className="v-middle">
                                                    <span className="block text-primary"> {item.curso.nombre} </span>
                                                    <small className="block text-muted"> {item.curso.codigo} </small>
                                                </td>
                                                <td className="v-middle text-center">
                                                    {(item.estado === 'Creada' || item.estado === 'Aprobado')?
                                                        <span></span>
                                                        :
                                                        <Link to={"/convocatorias/" + item.id}>
                                                            <span className="badge"> {item.cantidadPostulantes} </span>
                                                            <span className="block small text-muted m-t-xs"> postulantes </span>
                                                        </Link>
                                                    }
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

                <Route path="/convocatorias/registro/nuevo" component={ConvocatoriaNuevo}/>
                <Route path="/convocatorias/:id_convocatoria/detalle" component={ConvocatoriaDetalle}/>
                <Route path="/convocatorias/:id_convocatoria" component={ConvocatoriasListaPostulantes}/>

            </div>
        );
    }
}

export default ConvocatoriasLista;