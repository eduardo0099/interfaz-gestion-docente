import React, {Component} from 'react';
import {Route} from 'react-router-dom';
import DetalleDocente from "./DetalleDocente";
import BaseContainer from "./BaseContainer";
import axios from "axios/index";
import {DropdownButton, Glyphicon, Dropdown, MenuItem, Col, Grid, Row, Button} from 'react-bootstrap';

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
    console.log(this.props.match.path);
    return (
      <BaseContainer>
        <Route exact path={`${this.props.match.path}`} render={() =>
          <div>
            <div className="panel-heading">
              <h2> Profesores </h2>
            </div>
            <div className="panel-body">
              <table className="table table-striped">
                <tbody>
                {this.state.profesores.map(profesor => {
                  return (
                    <tr>
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
                            <MenuItem href={'/profesores/' + profesor.codigo}>Ver Perfil</MenuItem>
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
        }/>
        <Route path={`${this.props.match.path}/:codigo`} component={DetalleDocente} />
      </BaseContainer>
    );
  }
}

export default ListaProfesores;