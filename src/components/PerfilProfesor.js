import axios from 'axios';
import React from 'react';
import * as ReactBootstrap from 'react-bootstrap';


class PerfilProfesor extends React.Component {

    constructor(props){
        super(props);

        this.state = {
            codigo: '12345678',
            tipo: '',
            nombre: '',
            telefono: '',
            correo: '',
            seccion: '',
            imagen: null,
        }

    }

    /*componentDidMount(){
        axios.get('http://localhost:8080/tests')
            .then(response =>{
                this.setState({
                    codigo: response.codigo,
                    tipo: response.tipo,
                    nombre: response.nombre,
                    telefono: response.telefono,
                    correo: response.correo,
                    seccion: response.seccion,
                });
            })
            .catch(error =>{
                console.log("Error obteniendo los datos del profesor");
            });
    }*/

    render() {
        var codigo = this.state.codigo;
        var tipo = this.state.tipo;
        var nombre = this.state.nombre;
        var telefono = this.state.telefono;
        var correo = this.state.correo;
        var seccion = this.state.seccion;
        const imgUrl = require('../resources/images/'+ codigo + '.PNG');

        return (
            <div >
                <div className='Detalles'>
                    <h4>Codigo: {codigo}</h4>
                    <h4>Tipo: {tipo}</h4>
                    <h4>Docente: {nombre}</h4>
                    <h4>Telefono: {telefono}</h4>
                    <h4>Correo: {correo}</h4>
                    <h4>Seccion: {seccion}</h4>
                </div>
                <div>
                    <ReactBootstrap.Image
                        className='avatar'
                        src={imgUrl}
                        alt={'Avatar for ' + codigo}
                        responsive
                        rounded
                    />
                </div>
            </div>
        );
    }
}

export default PerfilProfesor;