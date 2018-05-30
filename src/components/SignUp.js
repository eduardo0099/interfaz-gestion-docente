
import React, { Component } from 'react';
import {Checkbox,Radio,FormGroup,FormControl,ControlLabel,Button} from 'react-bootstrap';
import BaseContainer from './BaseContainer';
import axios from 'axios';

class SignUp extends Component {
	constructor(props){
		super(props);
		this.state = {
			nombres: "",
			apellido_materno:"",
			apellido_paterno:"",
			dni:"",
			telefono:"",
			correo:"",
			codigo:"",
			password:"",
			id_tipo_usuario:0,
			id_departamento:0,
			id_seccion:0,

			verContraseña: false,
		}
	};

	registrarUsuario = (e) =>{
		if( this.state.nombres!="" &&
			this.state.apellido_paterno!="" &&
			this.state.apellido_materno!="" &&
			this.state.dni!="" &&
			this.state.telefono!="" &&
			this.state.correo!="" &&
			this.state.codigo!="" &&
			this.state.password!="" &&
			this.state.id_tipo_usuario!=0 &&
			this.state.id_departamento!=0){
			if(this.state.id_tipo_usuario==2 || this.state.id_tipo_usuario==4){
				if(this.state.id_seccion!=0){
					axios.post('http://localhost:8080/auth/register',{
						nombres: this.state.nombres,
						apellido_materno: this.state.apellido_materno,
						apellido_paterno: this.state.apellido_paterno,
						dni: parseInt(this.state.dni),
						telefono: parseInt(this.state.telefono),
						correo: this.state.correo,
						codigo: parseInt(this.state.codigo),
						password: this.state.password,
						id_tipo_usuario: parseInt(this.state.id_tipo_usuario),
						id_departamento: parseInt(this.state.id_departamento),
						id_seccion: parseInt(this.state.id_seccion)
					}).then(res => {
						alert("Se ha registrado correctamente");
					}).catch(err => {
						alert("Ha ocurrido un error");
					});
				}else{
					alert("Falta completar datos");
				}
			}else{
				axios.post('http://localhost:8080/auth/register',{
						nombres: this.state.nombres,
						apellido_materno: this.state.apellido_materno,
						apellido_paterno: this.state.apellido_paterno,
						dni: parseInt(this.state.dni),
						telefono: parseInt(this.state.telefono),
						correo: this.state.correo,
						codigo: parseInt(this.state.codigo),
						password: this.state.password,
						id_tipo_usuario: parseInt(this.state.id_tipo_usuario),
						id_departamento: parseInt(this.state.id_departamento),
					}).then(res => {
						alert("Se ha registrado correctamente");
					}).catch(err => {
						alert("Ha ocurrido un error");
					});
			}
				
		}else{
			alert("Falta completar datos");
		}
	}

	handleChangeNombres = e => {
    	this.setState({ nombres: e.target.value });
  	}
  	handleChangeApePat= e => {
    	this.setState({ apellido_paterno: e.target.value });
  	}
  	handleChangeApeMat= e => {
    	this.setState({ apellido_materno: e.target.value });
  	}
  	handleChangeDNI= e => {
    	this.setState({ dni: e.target.value });
  	}
  	handleChangeTelf= e => {
    	this.setState({ telefono: e.target.value });
  	}
  	handleChangeCorreo= e => {
    	this.setState({ correo: e.target.value });
  	}
  	handleChangeCodigo= e => {
    	this.setState({ codigo: e.target.value });
  	}
  	handleChangeContra= e => {
    	this.setState({ password: e.target.value });
  	}
  	handleChangetipo= e => {
    	this.setState({ id_tipo_usuario: e.target.value });
  	}
  	handleChangeDep= e => {
    	this.setState({ id_departamento: e.target.value });
  	}
  	handleChangeSec= e => {
    	this.setState({ id_seccion: e.target.value });
  	}
  	handleChangeVerContra= e => {
    	this.setState({ verContraseña: e.target.checked  });
  	}
  	handleChangeVerTipo= e => {
    	this.setState({ id_tipo_usuario: e.target.value  });
  	}
  	handleChangeVerDep= e => {
    	this.setState({ id_departamento: e.target.value  });
  	}
  	handleChangeVerSec= e => {
    	this.setState({ id_seccion: e.target.value  });
  	}
	render(){
		return(
			<BaseContainer>
				<div className="panel wrapper-md col-lg-offset-1 col-lg-10 col-md-12 col-sm-12">
					<h2>FORMULARIO PARA REGISTRARSE</h2>
					<form>
						<FormGroup controlId="formControlNombre" >
          					<ControlLabel>Nombres</ControlLabel>
	          				<FormControl
	            				type="text"
	            				value={this.state.nombres}
	            				placeholder="Ingrese su nombre"
	            				onChange={this.handleChangeNombres}
	         				/>
        				</FormGroup>
        				<FormGroup controlId="formControlApePat" >
          					<ControlLabel>Apellido Paterno</ControlLabel>
	          				<FormControl
	            				type="text"
	            				value={this.state.apellido_paterno}
	            				placeholder="Ingrese su apellido paterno"
	            				onChange={this.handleChangeApePat}
	         				/>
        				</FormGroup>
        				<FormGroup controlId="formControlApeMat" >
          					<ControlLabel>Apellido Materno</ControlLabel>
	          				<FormControl
	            				type="text"
	            				value={this.state.apellido_materno}
	            				placeholder="Ingrese su apellido materno"
	            				onChange={this.handleChangeApeMat}
	         				/>
        				</FormGroup>
        				<FormGroup controlId="formControlDni" >
          					<ControlLabel>DNI</ControlLabel>
	          				<FormControl
	            				type="text"
	            				value={this.state.dni}
	            				placeholder="Ingrese su DNI"
	            				onChange={this.handleChangeDNI}
	         				/>
        				</FormGroup>
        				<FormGroup controlId="formControlTelf" >
          					<ControlLabel>Telefono</ControlLabel>
	          				<FormControl
	            				type="text"
	            				value={this.state.telefono}
	            				placeholder="Ingrese su telefono"
	            				onChange={this.handleChangeTelf}
	         				/>
        				</FormGroup>
        				<FormGroup controlId="formControlEmail" >
          					<ControlLabel>Email</ControlLabel>
	          				<FormControl
	            				type="text"
	            				value={this.state.correo}
	            				placeholder="Ingrese su email"
	            				onChange={this.handleChangeCorreo}
	         				/>
        				</FormGroup>
        				<FormGroup controlId="formControlCodPuc" >
          					<ControlLabel>Codigo PUCP</ControlLabel>
	          				<FormControl
	            				type="text"
	            				value={this.state.codigo}
	            				placeholder="Ingrese su codigo PUCP"
	            				onChange={this.handleChangeCodigo}
	         				/>
        				</FormGroup>
        				<FormGroup controlId="formControlPassword" >
          					<ControlLabel>Contraseña</ControlLabel>
	          				<FormControl
	            				type={this.state.verContraseña? "text":"password"}
	            				value={this.state.password}
	            				placeholder="Ingresar contraseña"
	            				onChange={this.handleChangeContra}
	         				/>
        				</FormGroup>
					    
					    <Checkbox checked={this.state.verContraseña} onChange={this.handleChangeVerContra}>
					      Ver contraseña
					    </Checkbox>

					    <FormGroup controlId="formControlTipoUsu">
					      <ControlLabel>Seleccione el tipo de usuario</ControlLabel>
					      <FormControl componentClass="select" onChange={this.handleChangeVerTipo} placeholder="Seleccione el tipo de usuario">
					        <option value="0">Seleccionar</option>
					        <option value="1">Jefe de departamento</option>
					        <option value="2">Coordinador de seccion</option>
					        <option value="3">Asistente de departamento</option>
					        <option value="4">Asistente de seccion</option>
					      </FormControl>
					    </FormGroup>

					    <FormGroup controlId="formControlTipoDep">
					      <ControlLabel>Seleccione el departamento asociado</ControlLabel>
					      <FormControl componentClass="select" onChange={this.handleChangeVerDep} placeholder="Seleccione el departamento asociado">
					        <option value="0">Seleccionar</option>
					        <option value="1">Ingeniería</option>
					        <option value="2">Economía</option>
					      </FormControl>
					    </FormGroup>

					    <FormGroup controlId="formControlTipoSec">
					      <ControlLabel>Seleccione la seccion asociada</ControlLabel>
					      <FormControl componentClass="select" onChange={this.handleChangeVerSec} placeholder="Seleccione la seccion asociada">
					        <option value="0">Seleccionar</option>
					        <option value="1">Informatica</option>
					        <option value="2">Industrial</option>
					        <option value="3">Civil</option>
					      </FormControl>
					    </FormGroup>


					    <Button onClick={this.registrarUsuario}>REGISTRARSE</Button>
					  </form>
					</div>
				</BaseContainer>
			);
	}
}

export default SignUp;