import React, {Component} from 'react';
import {Route} from 'react-router-dom';
import DetalleDocente from "./DetalleDocente";
import BaseContainer from "./BaseContainer";
import axios from "axios/index";
import {Glyphicon, Dropdown, MenuItem} from 'react-bootstrap';

class ListaProfesores extends Component {

    constructor(props) {
        super(props);

        this.state = {
            loading: 'true',
            error: '',
            profesores: []
        }
    }

    componentDidMount() {
        axios.get('http://200.16.7.151:8080/general/listaDocente')
            .then(response => {
                this.setState({loading: false, profesores: response.data.docentes});
            })
            .catch(error => {
                this.setState({
                    error: `${error}`,
                    loading: false
                });
            });
    }

    render() {
        return (
            <div>
                <Route exact path={`${this.props.match.path}`} render={() =>
                    <BaseContainer>
                        <div className="panel wrapper-md col-lg-offset-1 col-lg-10 col-md-12 col-sm-12">
                            <div className="panel-heading">
                                <h2> Profesores </h2>
                            </div>
                            <div className="panel-body">
                                <table className="table table-striped table-hover">
                                    <tbody>
                                    {this.state.profesores.map(profesor => {
                                        return (
                                            <tr className="pointer">
                                                <td className="col-md-12">
                                                    <span className="block text-primary"> {profesor.nombre} </span>
                                                    <small className="block text-muted"> {profesor.codigo} </small>
                                                </td>
                                                <td className="v-middle">
                                                    <Dropdown className="dropdown-options" pullRight>
                                                        <Dropdown.Toggle className="dropdown-options" noCaret="true">
                                                            <Glyphicon glyph="option-vertical"/>
                                                        </Dropdown.Toggle>
                                                        <Dropdown.Menu>
                                                            <MenuItem href={'/profesores/' + profesor.codigo}>Ver
                                                                Perfil</MenuItem>
                                                        </Dropdown.Menu>
                                                    </Dropdown>
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
                <Route path={`${this.props.match.path}/:codigo`} component={DetalleDocente}/>
            </div>
        );
    }
}

export default ListaProfesores;