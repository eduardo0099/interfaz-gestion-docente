import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import API from '../api';

class Home extends Component{
  constructor(props){
    super(props);
    this.state={
      auth:false,
    }
  }
  componentWillMount(){
    if(localStorage.getItem('jwt')==null){
      window.location.href = "/";
    }else{
      API.get('/auth/verificaPermiso',{
        headers:{
          'x-access-token' : localStorage.getItem('jwt'),
        },
        params:{
          ruta:"/home"
        }
      }).then(resp =>{
        console.log("resp",resp.data);
        this.setState({auth:resp.data.permiso});
      }).catch(err => {
        console.log("err",err);
      })
    }
  }
  render(){
    console.log("auth",this.state.auth);
    if(!this.state.auth){
      return(<div/>);
    }
    return (
      <div>
        <p>Contenido inicial</p>
        <p>.</p>
        <p>.</p>
        <p>.</p>
        <p>.</p>
        <p>.</p>
        <p>.</p>
        <p>.</p>
        <p>.</p>
        <p>.</p>
        <p>.</p>
        <p>.</p>
        <p>.</p>
        <p>.</p>
        <p>.</p>
        <p>.</p>
        <p>.</p>
        <p>.</p>
        <p>.</p>
        <p>.</p>
        <p>.</p>
        <p>.</p>
        <p>.</p>
        <p>.</p>
        <p>.</p>
        <p>.</p>
        <p>.</p>
        <p>Fin de contenido inicial</p>

      </div>
    );
  }
};

export default Home;