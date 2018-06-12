import React, { Component } from 'react';
import BaseContainer from "./BaseContainer";



class NuevaDescargaHoras extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            nombre: "",
            codigo: "",
            hDescargaTotal: "",
            semana: [],

        }

    }

    render() {
        return (
            <BaseContainer>

            </BaseContainer>
        );
    }
}


export default NuevaDescargaHoras;