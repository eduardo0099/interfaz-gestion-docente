import React, {Component} from 'react';
import {Route} from 'react-router-dom';
import BaseContainer from "./BaseContainer";
import axios from "axios/index";
import {Button} from 'react-bootstrap';
import "../styles/BotonStyle.css";

class PreferenciaCursos extends Component {

  constructor(props) {
    super(props);

    this.state = {
      loading: 'true',
      error: '',
      cursosObl: [],
      cursosElec: [],
      cursosPref: [],
      codigoProfe: 0
    };
    this.handleProfCode = this.handleProfCode.bind(this);
  }

  handleProfCode(event) {
    this.setState({codigoProfe: event.target.value});
  }


  handleChange(curso, e){
      var nuevo = {
        "codigoCurso": curso.codigo,
        "ciclo": e.target.value
      };
      let nuevoArreglo = this.state.cursosPref;
      nuevoArreglo.push(nuevo);
      this.setState({cursosPref: nuevoArreglo});
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

  performPostRequest(){
    console.log(JSON.stringify(this.state.cursosPref, null, 2));
      axios.post('http://200.16.7.151:8080/asignacionHorarios/enviarPreferenciaProfesor', {
        codigoProf: this.state.codigoProfe,
        cursos: this.state.cursosPref
      })
        .then(function (response) {
          alert("Preferencia de dictado registrada");
        })
        .catch(function (error) {
          alert("Error: No se pudo registrar la preferencia");
        });
  }

  unselect(){
    document.querySelectorAll('[type=radio]').forEach((x) => x.checked=false);
    //this.setState({cursosPref: []});
  }

  render() {
      console.log(this.state);
    return (
      <BaseContainer>
        <Route exact path={`${this.props.match.path}`} render={() =>
          <div>
            <div className="panel-title">
              <h2> Preferencias de cursos </h2>
            </div>
            <br></br>
            <div class="row">
              <div class="col-md-1">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Código:</div>
              <div class="col-md-2">
                <input type="text" name="codigoProfe" onChange={this.handleProfCode}></input>
              </div>
              <div class="col-md-2">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Apellidos y nombres:</div>
              <div class="col-md-6">
                <input type="text" size="80" name="CodigoProfe"></input>
              </div>
            </div>
            <div className="panel-heading">
              <h2> Cursos obligatorios </h2>
            </div>
            <div class="row">
              <div class="col-md-6"></div>
              <div class="col-md-1">2018-1</div>
              <div class="col-md-1">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;2018-2</div>
            </div>
            <div className="panel-body">
              <table className="table table-striped">
                <tbody>
                {this.state.cursosObl.map(curso => {
                  return (
                    <tr>
                      <td className="col-md-4">
                        <span className="block text-primary"> {curso.codigo} </span>
                        <small className="block text-muted"> {curso.nombre} </small>
                      </td>
                      <td className="col-md-4">
                        <td className="col-md-1">
                          <input type="radio" name={curso.codigo} onChange={this.handleChange.bind(this, curso)} value="2018-1"></input>
                        </td>
                        <td className="col-md-1">
                          <input type="radio" name={curso.codigo} onChange={this.handleChange.bind(this, curso)} value="2018-2"></input>
                        </td>
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
            <div class="row">
              <div class="col-md-6"></div>
              <div class="col-md-1">2018-1</div>
              <div class="col-md-1">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;2018-2</div>
            </div>
            <div className="panel-body">
              <table className="table table-striped">
                <tbody>
                {this.state.cursosElec.map(curso => {
                  return (
                    <tr>
                      <td className="col-md-4">
                        <span className="block text-primary"> {curso.codigo} </span>
                        <small className="block text-muted"> {curso.nombre} </small>
                      </td>
                      <td className="col-md-4">
                        <td className="col-md-1">
                          <input type="radio" name={curso.codigo} onChange={this.handleChange.bind(this, curso)} value="2018-1"></input>
                        </td>
                        <td className="col-md-1">
                          <input type="radio" name={curso.codigo} onChange={this.handleChange.bind(this, curso)} value="2018-2"></input>
                        </td>
                      </td>
                    </tr>
                  );
                })}
                </tbody>
              </table>
            </div>
            <div class="row">
              <div class="col-md-2"></div>
              <div class="col-md-4">
                <Button class="btn btn-primary btn-cons" onClick={this.unselect}>Limpiar</Button>
              </div>
              <div class="col-md-4">
                <Button class="btn btn-primary btn-cons" onClick={this.performPostRequest.bind(this)}>Enviar preferencias</Button>
              </div>
            </div>
          </div>
        }/>
      </BaseContainer>
    );
  }
}

export default PreferenciaCursos;