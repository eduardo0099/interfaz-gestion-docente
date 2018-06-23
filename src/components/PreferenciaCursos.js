import React, {Component} from 'react';
import {Route} from 'react-router-dom';
import BaseContainer from "./BaseContainer";
import axios from "axios/index";
import {Button} from 'react-bootstrap';
import API from '../api'

class PreferenciaCursos extends Component {

	constructor(props) {
		super(props);

		this.state = {
			loading: 'true',
			error: '',
			cursosObl: [],
			cursosElec: [],
			cursosPref: [],
			codigoProfe: 0,
			nombreProfe: "",
			existe: 'false'
		};
		this.handleProfCode = this.handleProfCode.bind(this);
	}

	handleProfCode(event) {
		if(event.target.value.length == 8){
			this.setState({codigoProfe: event.target.value});
			//Servicio que recoge el nombre del profesor
			let urlN = "/asignacionHorarios/verificaCodigoDocente?codigo=" + event.target.value.toString() + "";
			//console.log(urlN.toString());
			API.get(urlN)
			.then(response => {
					//console.log('e',response.data);
					this.setState({nombreProfe: response.data.nombre, existe: response.data.exists});
					let selector = document.querySelectorAll('[type=checkbox]');
					for(let i=0; i<selector.length; i++){
						selector[i].disabled = false;
					}
				})
				.catch(error => {
					alert("Error: el código proporcionado no corresponde a ningún profesor de la sección.");
					this.setState({nombreProfe: "", existe: false});
				})
		}
		else{
			this.setState({nombreProfe: "", existe: false});
			document.querySelectorAll('[type=checkbox]').forEach((x) => x.checked=false);
			let selector = document.querySelectorAll('[type=checkbox]');
			for(let i=0; i<selector.length; i++){
				selector[i].disabled = true;
			}
		}
	}


	buscarCursoCiclo(elemento, conjunto){
		for(let i=0;i<conjunto.length;i++){
			if(elemento.codigoCurso==conjunto[i].codigoCurso){
				return i;
			}
		}
		return -1;
	}

	numberOnly(evt) {
	  var theEvent = evt || window.event;
	  var key = theEvent.keyCode || theEvent.which;
	  key = String.fromCharCode( key );
	  var regex = /[0-9]|\./;
	  if( !regex.test(key) ) {
	    theEvent.returnValue = false;
	    if(theEvent.preventDefault) theEvent.preventDefault();
	  }
	}

	handleChange(curso, e){
		var nuevo = {
			"codigoCurso": curso.codigo,
			"ciclo": e.target.value
		};
		let nuevoArreglo = this.state.cursosPref;
		if(e.target.checked === true){
			nuevoArreglo.push(nuevo);
			this.setState({cursosPref: nuevoArreglo});
		}else{
			let index = this.buscarCursoCiclo(nuevo,nuevoArreglo);
			if(index > -1){
				nuevoArreglo.splice(index, 1);
			}
		}
	}

	componentDidMount() {
		API.get('asignacionHorarios/listaCursosPreferencia')
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

	devolverNombreCurso(curso){
		let cursosObl = this.state.cursosObl;
		let cursosElec = this.state.cursosElec;
		/* Primero se busca en los obligatorios */
		for(let i=0; i<cursosObl.length; i++){
			if(curso.codigoCurso == cursosObl[i].codigo){
				return cursosObl[i].nombre;
			}
		}
		/* Ahora se busca en los electivos */
		for(let i=0; i<cursosElec.length; i++){
			if(curso.codigoCurso == cursosElec[i].codigo){
				return cursosElec[i].nombre;
			}
		}
	}

	performPostRequest(){
		//console.log(JSON.stringify(this.state.cursosPref, null, 2));
		if(this.state.cursosPref.length > 0){
			if(this.state.codigoProfe > 0){
				let str = "Con este formulario, está confirmando su inscripción al dictado de los " +
					"siguientes cursos\n";
				let cursos=this.state.cursosPref
				for(let i=0; i<cursos.length; i++){
					str = str + "(" + (i+1).toString() + ") " + this.devolverNombreCurso(cursos[i]) + " ("
					str = str + cursos[i].codigoCurso.toString() + "): ciclo " + cursos[i].ciclo.toString() + "\n";
				}
				str = str + "¿Está seguro de enviar su preferencia?"
				let r = window.confirm(str);
				if(r == true){
					API.post('asignacionHorarios/enviarPreferenciaProfesor', {
						codigoProf: this.state.codigoProfe,
						cursos: this.state.cursosPref,
					})
						.then(response => {
							alert("Preferencia de dictado registrada.");
							this.props.history.goBack();
						})
						.catch(error => {
							alert("Error: No se pudo registrar la preferencia de dictado.");
						})
					alert("Preferencia almacenada");
				}
			}else{
				alert("Error: no ha colocado su código");
			}
		}else{
			alert("Error: no ha seleccionado ningún curso.");
		}
	}

	unselect(selection){
		document.querySelectorAll('[type=checkbox]').forEach((x) => x.checked=false);
		let voider = [];
		this.setState({cursosPref: voider});
	}

	render() {
			//console.log(this.state);
		return (
			<BaseContainer>
                    <div className="panel col-lg-offset-1 col-lg-10 col-md-12 col-sm-12">

				<Route exact path={`${this.props.match.path}`} render={() =>
					<div>
						<div className="panel-heading">
							<header className="page-header m-b-md text-center">
                                    <p className="h2 m-b-lg"> PREFERENCIA DE DICTADO </p>
                            </header>
						</div>
						<div className="panel-body">
							¡Bienvenido al Formulario de Preferencia de Dictado!<br></br><br></br>
							Aquí podrá seleccionar los cursos que desea dictar en los próximos dos semestres académicos.
							Para empezar, digite su código PUCP en el recuadro de abajo. Su nombre aparecerá automáticamente
							a la derecha, si el código fue escrito correctamente.
						</div>
						<div className="panel-body">
							<div className="row form-group">
								<div class="col-md-1">Código:</div>
								<div class="col-md-2">
									<input type="text" class="form-control" name="codigoProfe" maxlength="8" onKeyPress={this.numberOnly.bind(this)} onChange={this.handleProfCode}></input>
								</div>
								<div class="col-md-2">Apellidos y nombres:</div>
								<div class="col-md-6">
									<label type="text" class="form-control" size="80" name="nombreCompProfe" disabled>{this.state.nombreProfe.toUpperCase()} </label>
								</div>
							</div>
						</div>
						<hr/>
						<div className="panel-body">
							<div>
							Ahora seleccione las casillas correspondientes a los cursos y a los ciclos que desea dictar.<br></br>
							Recuerde que puede seleccionar uno o ambos ciclos.
							<h4> Cursos obligatorios </h4>
							<table className="table table-striped m-t-md">
								<thead>
									<tr>
										<th className="col-md-4"></th>
										<th className="col-md-4 text-center">2018-1	</th>
										<th className="col-md-4 text-center"> 2018-2 </th>
									</tr>
								</thead>
								<tbody>
								{this.state.cursosObl.map(curso => {
									return (
										<tr>
											<td className="v-middle">
												<span className="block text-primary"> {curso.nombre} </span>
												<small className="block text-muted"> {curso.codigo} </small>
											</td>
											<td className="v-middle text-center">
												<input type="checkbox" name={curso.codigo} onChange={this.handleChange.bind(this, curso)} value="2018-1" disabled></input>
											</td>
											<td className="v-middle text-center">
												<input type="checkbox" name={curso.codigo} onChange={this.handleChange.bind(this, curso)} value="2018-2" disabled></input>
											</td>
										</tr>
									);
								})}
								</tbody>
							</table>
							</div>
							<div>
								<hr/>
								<h4> Cursos electivos </h4>
								<table className="table table-striped m-t-md">
								<thead>
									<tr>
										<th className="col-md-4"></th>
										<th className="col-md-4 text-center"> 2018-1 </th>
										<th className="col-md-4 text-center"> 2018-2 </th>
									</tr>
								</thead>
								<tbody>
								{this.state.cursosElec.map(curso => {
									return (
										<tr>
											<td className="v-middle">
												<span className="block text-primary"> {curso.nombre} </span>
												<small className="block text-muted"> {curso.codigo} </small>
											</td>
											<td className="v-middle text-center">
												<input type="checkbox" name={curso.codigo} onChange={this.handleChange.bind(this, curso)} value="2018-1" disabled></input>
											</td>
											<td className="v-middle text-center">
												<input type="checkbox" name={curso.codigo} onChange={this.handleChange.bind(this, curso)} value="2018-2" disabled></input>
											</td>
										</tr>
									);
								})}
								</tbody>
							</table>
							</div>
						</div>
						<div className="panel-footer text-right">
							<button class="btn btn-default" onClick={this.unselect.bind(this)}>Limpiar</button>
							<button class="btn btn-primary m-l-md" onClick={this.performPostRequest.bind(this)}> Enviar preferencias </button>
						</div>
					</div>
				}/>
				</div>
			</BaseContainer>
		);
	}
}

export default PreferenciaCursos;