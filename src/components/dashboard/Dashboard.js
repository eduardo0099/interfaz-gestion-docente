import React, {Component} from 'react';
import {Route} from 'react-router-dom';
import axios from 'axios/index';
import BaseContainer from '../BaseContainer';
import API from '../../api'
import DashboardTabs from './DashboardTabs'
import Select from 'react-select';
import {currentSeccion,currentRole,Role} from '../../auth';


class Dashboard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            secciones: [{ id: 1, nombre: 'Seccion 1' }, { id: 2, nombre: 'Seccion 2' }, { id: 1, nombre: 'Seccion 3' }],
            seccion: {}
        }
    }

    componentDidMount() {
        console.log(currentSeccion());
        console.log(currentRole());
        this.allSecciones();
    }


    allSecciones (){
        API.get('/general/listaSeccionesDep')
            .then(response => {
                let aux=response.data.secciones;
                let len =response.data.secciones.length;
                console.log('secciones:',aux,len);
                aux.push({ id: 0, nombre: 'Todas' });
                this.setState({
                    secciones: aux,
                    seccion:aux[len]
                });
                if(currentRole()!==Role.JEFE_DEPARTAMENTO){
                    this.setState({
                        seccion:aux[0]
                    });
                }
            })
    }


    cambioSeccion = (obj) => {
        this.setState({ seccion: obj });
    };

    render() {
        let select;
        if (currentRole()===Role.JEFE_DEPARTAMENTO){
            select = <div className="col-md-3">
                <label> Seccion </label>
                <Select
                    value={this.state.seccion}
                    onChange={this.cambioSeccion}
                    valueKey={'id'}
                    labelKey={'nombre'}
                    options={this.state.secciones}
                    clearable={false}
                />
            </div>
        }else{
            select = null;
        }
        return (
            <div>
                <Route exact path={`${this.props.match.path}`} render={() =>
                    <BaseContainer>
                        <div className="panel col-lg-offset-2 col-lg-8 col-md-12 col-sm-12">
                            <div className="panel-heading m-b-n">
                                <header className="page-header m-b-n">
                                    <p className="h2"> Dashboard </p>
                                </header>
                            </div>
                            <div className="panel-body m-t-n">
                                <div className="form-group row">
                                    {select}
                                </div>
                                <div className="m-t-lg">
                                    <DashboardTabs ruta={this.props.match.path} seccion={this.state.seccion}/>
                                </div>
                            </div>
                        </div>
                    </BaseContainer>
                }/>
            </div>
        );
    }
}

export default Dashboard;