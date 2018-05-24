import React, {Component} from 'react';
import {Route} from 'react-router-dom';
import BaseContainer from "./BaseContainer";
import axios from "axios/index";
import {Button} from 'react-bootstrap';

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


	buscarCursoCiclo(elemento, conjunto){
		for(let i=0;i<conjunto.length;i++){
			if(elemento.codigoCurso==conjunto[i].codigoCurso){
				return i;
			}
		}
		return -1;
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
		console.log(JSON.stringify(this.state.cursosPref, null, 2));
		if(this.state.cursosPref.length > 0){
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
				/*axios.post('http://200.16.7.151:8080/asignacionHorarios/enviarPreferenciaProfesor', {
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
					*/
				alert("Preferencia almacenada");
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
			console.log(this.state);
		return (
			<BaseContainer>
				<Route exact path={`${this.props.match.path}`} render={() =>
					<div>
						<div className="panel-title">
							<h2> Preferencias de cursos </h2>
						</div>
						<br></br>
						<div class="panel-heading">
							<div class="col-md-1">Código:</div>
							<div class="col-md-2">
								<input type="text" class="form-control" name="codigoProfe" onChange={this.handleProfCode}></input>
							</div>
							<div class="col-md-2">Apellidos y nombres:</div>
							<div class="col-md-6">
								<input type="text" class="form-control" size="80" name="CodigoProfe" disabled></input>
							</div>
						</div>
						<br></br>
						<div className="panel-heading">
							<h2> Cursos obligatorios </h2>
						</div>
						<div className="panel-body">
							<table className="table table-striped">
								<thead>
									<tr>
										<th className="col-md-6"></th>
										<th className="col-md-3 text-center">
											2018-1
										</th>
										<th className="col-md-3 text-center">
											2018-2
										</th>
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
												<input type="checkbox" name={curso.codigo} onChange={this.handleChange.bind(this, curso)} value="2018-1"></input>
											</td>
											<td className="v-middle text-center">
												<input type="checkbox" name={curso.codigo} onChange={this.handleChange.bind(this, curso)} value="2018-2"></input>
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
								<thead>
									<tr>
										<th className="col-md-6"></th>
										<th className="col-md-3 text-center">
											2018-1
										</th>
										<th className="col-md-3 text-center">
											2018-2
										</th>
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
												<input type="checkbox" name={curso.codigo} onChange={this.handleChange.bind(this, curso)} value="2018-1"></input>
											</td>
											<td className="v-middle text-center">
												<input type="checkbox" name={curso.codigo} onChange={this.handleChange.bind(this, curso)} value="2018-2"></input>
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
								<Button class="btn btn-primary btn-cons" onClick={this.unselect.bind(this)}>Limpiar</Button>
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