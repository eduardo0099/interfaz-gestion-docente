import React, {Component} from 'react';
import {Route} from 'react-router-dom';
import Cursos from "./Cursos";
import BaseContainer from "./BaseContainer";
import axios from "axios/index";
import { Glyphicon, Dropdown, MenuItem, Button} from 'react-bootstrap';
import "../styles/BotonStyle.css";

class PreferenciaCursos extends Component {

  constructor(props) {
    super(props);

    this.state = {
      loading: 'true',
      error: '',
      cursosObl: [],
      cursosElec: []
    }
  }

  componentDidMount() {
    axios.get('http://demo4106552.mockable.io/asignacionHorarios/listaCursosPreferencia')
      .then(response => {
        this.setState({loading: false, cursosObl: response.data.obligatorios, cursosElec: response.data.electivos});
      })
      .catch(error => {
        this.setState({
          error: `${error}`,
          loading: false
        });
      });
  }

  render() {
      console.log(this.state);
    return (
      <BaseContainer>
        <Route exact path={`${this.props.match.path}`} render={() =>
          <div>
            <div className="panel-heading">
              <h2> Cursos obligatorios </h2>
            </div>
            <div className="panel-body">
              <table className="table table-striped">
                <tbody>
                <tr>
                  <td className="col-md-2"></td>
                  <td className="col-md-10">
                    <Button type="button" class="btn btn-primary btn-cons">Hola Mundo!</Button>
                  </td>
                </tr>
                {this.state.cursosObl.map(curso => {
                  return (
                    <tr>
                      <td className="col-md-6">
                        <span className="block text-primary"> {curso.codigo} </span>
                        <small className="block text-muted"> {curso.nombre} </small>
                      </td>
                      <td className="col-md-6">
                        <input type="radio" name={curso.codigo}></input>
                        <input type="radio" name={curso.codigo}></input>
                        <input type="radio" name={curso.codigo}></input>
                      </td>
                    </tr>
                  );
                })}
                </tbody>
              </table>
            </div>
            <div className="panel-heading">
              <h2> Cursos electivos </h2>
            </div>
            <div className="panel-body">
              <table className="table table-striped">
                <tbody>
                {this.state.cursosElec.map(curso => {
                  return (
                    <tr>
                      <td className="col-md-12">
                        <span className="block text-primary"> {curso.codigo} </span>
                        <small className="block text-muted"> {curso.nombre} </small>
                      </td>
                      <td className="v-middle">
                        <Dropdown className="dropdown-options" pullRight>
                          <Dropdown.Toggle className="dropdown-options" noCaret="true">
                            <Glyphicon glyph="option-vertical"/>
                          </Dropdown.Toggle>
                          <Dropdown.Menu>
                            <MenuItem>Ver Curso</MenuItem>
                          </Dropdown.Menu>
                        </Dropdown>
                      </td>
                    </tr>
                  );
                })}
                </tbody>
              </table>
            </div>
            <Button type="button" class="btn btn-primary btn-cons">Enviar preferencias de dictado</Button>
          </div>
        }/>
      </BaseContainer>
    );
  }
}

export default PreferenciaCursos;