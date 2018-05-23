import React, {Component} from 'react';

import PerfilDocencia from "./PerfilDocencia";
import PerfilTesis from "./PerfilTesis";
import PerfilCursos from "./PerfilCursos";

class PerfilTabs extends Component {

    render() {
        return (
            <div>
                <ul className="nav nav-tabs">
                    <li className="active"><a href="#1" data-toggle="tab">Grados Academicos</a></li>
                    <li><a href="#2" data-toggle="tab">Docencia</a></li>
                    <li><a href="#3" data-toggle="tab">Experiencia Profesional</a></li>
                    <li><a href="#4" data-toggle="tab">Investigaciones</a></li>
                </ul>
                <div className="tab-content clearfix m-t-md">
                    <div className="tab-pane active row" id="1">
                        <div className="form-group col-md-2 m-r-n">
                            <ul className="nav nav-pills nav-stacked">
                                <li className="active"><a href="#1a" data-toggle="tab">Titulo Profesional </a></li>
                                <li><a href="#1b" data-toggle="tab"> Maestria </a></li>
                                <li><a href="#1c" data-toggle="tab"> Doctorado </a></li>
                                <li><a href="#1d" data-toggle="tab"> Diplomatura </a></li>
                            </ul>
                        </div>
                        <div className="form-group col-md-10 m-l-n">
                            <div className="tab-content clearfix">
                                <div className="tab-pane active row" id="1a">
                                    <PerfilDocencia/>
                                </div>
                                <div className="tab-pane row" id="1b">
                                    <PerfilDocencia/>
                                    <PerfilDocencia/>
                                </div>
                                <div className="tab-pane row" id="1c">
                                    <PerfilDocencia/>
                                </div>
                                <div className="tab-pane row" id="1d">
                                    <PerfilDocencia/>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="tab-pane active row" id="2">
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
                                    <PerfilCursos/>
                                </div>
                                <div className="tab-pane row" id="2b">
                                    <PerfilTesis/>
                                </div>
                                <div className="tab-pane row" id="2c">
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