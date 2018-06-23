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
			auth:false,
		}
	};
	
	componentDidMount(){
		document.addEventListener("keydown", this.enterLogin, false);
	}
	
	/*
	componentWillMount(){
		
    API.get('/auth/verificaPermiso',{
      token: localStorage.getItem('jwt'),
      ruta: "/home"
    }).then(resp => {

		}).catch(err =>{
			alert("Error: no tiene los permisos para acceder");
		});
    
	}
	*/
	enterLogin = (e) =>{
		if(e.keyCode == 13){
			e.preventDefault();
  		if(this.state.codUser!="" && this.state.contrasena!=""){
  			API.post('auth/login',{
  				codigo: parseInt(this.state.codUser),
  				password: this.state.contrasena
  			}).then(resp => {
					console.log(resp.data);
  				if(resp.data.auth){
						
  					this.props.handleLogIn();
  					localStorage.setItem('jwt',resp.data.token);
						localStorage.setItem('u',btoa(JSON.stringify(resp.data.user)));
						this.setState({auth:true});
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
		}	
	}
	handleChangeCodUser = e => {
    	this.setState({ codUser: e.target.value });
  	};
  	handleChangeContra= e => {
    	this.setState({ contrasena: e.target.value });
  	};
  	handleLogIn= e => {
  		e.preventDefault();
  		if(this.state.codUser!="" && this.state.contrasena!=""){
  			//axios.post('http://200.16.7.151:8080/auth/login',{
  			axios.post('http://200.16.7.151/auth/login',{
  				codigo: parseInt(this.state.codUser),
  				password: this.state.contrasena
  			}).then(resp => {
					console.log(resp.data);
  				if(resp.data.auth){
						
  					this.props.handleLogIn();
  					localStorage.setItem('jwt',resp.data.token);
						localStorage.setItem('u',btoa(JSON.stringify(resp.data.user)));
						this.setState({auth:true});
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

        var tipoUser = 0;
        var unidad = 0;
        if (localStorage.getItem('u') != null) {
            var usuario = JSON.parse(atob(localStorage.getItem('u')));
            tipoUser = usuario.tipo_usuario;
            unidad = usuario.unidad;
            console.log("Tipo",tipoUser);
            console.log("Unidad", unidad)
        }

		if(this.state.auth == true || localStorage.getItem('jwt')!= null){
			//ME DIRIJA A /dasboard o /profesores dependiendo el tipo de usuario

			//Asistente de seccion
			if(tipoUser == 5){
                window.location.href = "/profesores";
			}
			else{
                window.location.href = "/dashboard";
			}


		}
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
							  <a href= {window.location.origin+"/registrar"}>Crear nuevo usuario</a>
							  </Col>
							</Form>
						</div>
					</BaseContainer>
				</div>
			);
		
	}
}

export default SignIn;
