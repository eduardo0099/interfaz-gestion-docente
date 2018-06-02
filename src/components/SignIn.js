import React, { Component } from 'react';
import {Button,Form,FormGroup,FormControl,Col,Checkbox,ControlLabel} from 'react-bootstrap';
import BaseContainer from './BaseContainer';
import axios from 'axios';
import {Redirect} from 'react-router-dom';
import API from '../api';

class SignIn extends Component {
	constructor(props){
		super(props);
		this.state={
			codUser: "",
			contrasena: "",
		}
	};
	handleChangeCodUser = e => {
    	this.setState({ codUser: e.target.value });
  	};
  	handleChangeContra= e => {
    	this.setState({ contrasena: e.target.value });
  	};
  	handleLogIn= e => {
  		e.preventDefault();
  		if(this.state.codUser!="" && this.state.contrasena!=""){
  			//login;
  			API.post('auth/login',{
  				codigo: parseInt(this.state.codUser),
  				password: this.state.contrasena
  			}).then(resp => {
  				if(resp.data.auth){
  					this.props.handleLogIn();
  					localStorage.setItem('jwt',resp.data.token);
  					localStorage.setItem('user',JSON.stringify(resp.data.user));
  				}else{
  					alert("Ingrese sus datos nuevamente");
  				}
  				
  			}).catch(err => {
  				console.log("error login",err);
  				alert("Ha ocurrido un error");
  			});
  		}else{
  			alert("Falta completar los datos");
  		}	
  	};
  	

	render(){
		if(this.props.auth){
			//ME DIRIJA A /HOME
			return(<Redirect to='/home'/>);
		}else{
			return (
				<div>
					<BaseContainer>
						<div className="panel wrapper-md col-lg-offset-1 col-lg-10 col-md-12 col-sm-12">
							<h2 style={{"text-align":"center"}}>INICIAR SESIÓN</h2>
							<Form horizontal>
							  <FormGroup controlId="formHorizontalEmail">
							    <Col componentClass={ControlLabel} sm={2}>
							      Código PUCP
							    </Col>
							    <Col sm={10}>
							      <FormControl type="text" placeholder="Código PUCP" onChange={this.handleChangeCodUser} value={this.state.codUser} />
							    </Col>
							  </FormGroup>

							  <FormGroup controlId="formHorizontalPassword">
							    <Col componentClass={ControlLabel} sm={2}>
							      Contraseña
							    </Col>
							    <Col sm={10}>
							      <FormControl type="password" placeholder="Contraseña" onChange={this.handleChangeContra} value={this.state.contrasena} />
							    </Col>
							  </FormGroup>

							  <FormGroup>
							    <Col smOffset={2} sm={10}>
							      <Button onClick={this.handleLogIn}>INICIAR SESIÓN</Button>
							    </Col>
							  </FormGroup>
							  <Col smOffset={2} sm={10}>
							  <a href="http://localhost:3000/registrar">Crear nuevo usuario</a>
							  </Col>
							</Form>
						</div>
					</BaseContainer>
				</div>
			);
		}
	}
}

export default SignIn;