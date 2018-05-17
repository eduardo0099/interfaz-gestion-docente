import React, { Component } from 'react';
import {Row,Grid,Table,Button,PageHeader} from 'react-bootstrap';

class ModificarActividad extends Component{
    constructor(props){
        super(props);
    }

    performPostRequest = ()=> {

        var titulo=document.getElementsByName("titulo")[0].value;
        var tipo=document.getElementsByName("tipo")[0].value;
        var fecha_inicio=document.getElementsByName("fecha_inicio")[0].value;
        var fecha_fin=document.getElementsByName("fecha_fin")[0].value;
        var estado=document.getElementsByName("estado")[0].value;


    }
}

export default ModificarActividad;