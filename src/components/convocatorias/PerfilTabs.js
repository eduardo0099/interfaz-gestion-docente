import React, {Component} from 'react';

import PerfilDocencia from "./PerfilDocencia";
import PerfilTesis from "./PerfilTesis";
import PerfilCursos from "./PerfilCursos";
import PerfilPremiosDocencia from "./PerfilPremiosDocencia";

class PerfilTabs extends Component {

    render() {
        return (
            <div>
                <ul className="nav nav-tabs">
                    { this.props.titulos.length > 0 || this.props.maestrias.length > 0 || this.props.doctorados.length > 0 || this.props.diplomaturas.length > 0 ? (<li className="active"><a href="#1" data-toggle="tab">Grados Academicos</a></li>) : null }
                    { this.props.docencias.length > 0  || this.props.asesorias.length > 0 || this.props.premios.length > 0 ? (<li><a href="#2" data-toggle="tab">Docencia</a></li>) : null }
                    { this.props.experiencias.length > 0 ? (<li><a href="#3" data-toggle="tab">Experiencia Profesional</a></li>) : null }
                    { this.props.investigaciones.length > 0 ? (<li><a href="#4" data-toggle="tab">Investigaciones</a></li>) : null }
                </ul>
                <div className="tab-content clearfix m-t-md">
                    <div className="tab-pane active row" id="1">
                        <div className="form-group col-md-3 m-r-n">
                            <ul className="nav nav-pills nav-stacked">
                                { this.props.titulos.length > 0 ? (<li className="active"><a href="#1a" data-toggle="tab">Titulo Profesional</a></li>) : null }
                                { this.props.maestrias.length > 0 ? (<li><a href="#1b" data-toggle="tab"> Maestria </a></li>) : null }
                                { this.props.doctorados.length > 0 ? (<li><a href="#1c" data-toggle="tab"> Doctorado </a></li>) : null }
                                { this.props.diplomaturas.length > 0 ? (<li><a href="#1d" data-toggle="tab"> Diplomatura </a></li>) : null }
                            </ul>
                        </div>
                        <div className="form-group col-md-9 m-l-n">
                            <div className="tab-content clearfix">
                                <div className="tab-pane active row" id="1a">
                                    { this.props.titulos.map(titulo => {
                                        return <PerfilDocencia key={titulo.id} item={titulo}/>
                                    })}
                                </div>
                                <div className="tab-pane row" id="1b">
                                    { this.props.maestrias.map(maestria => {
                                        return <PerfilDocencia key={maestria.id} item={maestria}/>
                                    })}
                                </div>
                                <div className="tab-pane row" id="1c">
                                    { this.props.doctorados.map(doctorado => {
                                        return <PerfilDocencia key={doctorado.id} item={doctorado}/>
                                    })}
                                </div>
                                <div className="tab-pane row" id="1d">
                                    { this.props.diplomaturas.map(diplomatura => {
                                        return <PerfilDocencia key={diplomatura.id} item={diplomatura}/>
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="tab-pane" id="2">
                        <div className="form-group col-md-2 m-r-n">
                            <ul className="nav nav-pills nav-stacked">
                                <li className="active"><a href="#2a" data-toggle="tab">Cursos a su Cargo </a></li>
                                <li><a href="#2b" data-toggle="tab"> Aseosria de Tesis </a></li>
                                <li><a href="#2c" data-toggle="tab"> Premios a la Docencia </a></li>
                            </ul>
                        </div>
                        <div className="form-group col-md-10 m-l-n">
                            <div className="tab-content clearfix">
                                <div className="tab-pane active row" id="2a">
                                    { this.props.docencias.map( docencia => {return <PerfilCursos key={docencia.id} item={docencia}/> })}
                                </div>
                                <div className="tab-pane row" id="2b">
                                    { this.props.asesorias.map( asesoria => {return <PerfilTesis key={asesoria.id} item={asesoria}/> })}
                                </div>
                                <div className="tab-pane row" id="2c">
                                    { this.props.premios.map( premio => {return <PerfilPremiosDocencia key={premio.id} item={premio}/> })}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="tab-pane" id="3">
                    </div>
                    <div className="tab-pane" id="4">
                    </div>
                </div>
            </div>
        )
    }
}

export default PerfilTabs;