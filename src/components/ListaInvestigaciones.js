import React from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import {Grid,Row,Table,Button, Glyphicon,Col} from 'react-bootstrap';
import {HashRouter ,BrowserRouter,Router,Route,Link} from 'react-router-dom';
import RegistroInvestigacion from "./RegistroInvestigacion"
import ModificarInvestigacion from "./ModificarInvestigacion"
import axios from "axios/index";
import './../styles/ListaInvestigaciones.css';
import BootstrapTable from 'react-bootstrap-table-next';

export class ListaInvestigaciones extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            selectedId:-1,
            investigaciones:[
                {
                    id:1,
                    titulo:"uno",
                    resumen:"resumen"},
                {
                    id:2,
                    titulo:"dos",
                    resumen:"resumen2"}
            ]
        }
    }

    componentDidMount(){
        axios.get('http://200.16.7.151:8080/docente/docente/invDocente?codigo='+this.props.match.params.codigo+'&ciclo=2018-1')
            .then(response =>{
                this.setState({
                    investigaciones: response.data.investigaciones
                });
            })
            .catch(error =>{
                console.log("Error obteniendo la lista de las investigaciones",error);
            });
    }

    eliminar = () =>{
        if(this.state.selectedId!=-1){
            if (window.confirm('Seguro que deseas eliminar esta investigacion?')) {
                // Save it!
                axios.delete('http://200.16.7.151:8080/docente/investigacion/eliminar', {
                    data:{
                    id:this.state.selectedId
                    }
                })
                    .then(function (response) {
                        alert("Investigación eliminada");
                    })
                    .catch(function (error) {
                        alert("Error: No se pudo eliminar la investigación");
                    })
            } else {
                // Do nothing!
            }
        }else{
            alert(`Seleccionar una investigación!`);
        }
    }

    modificar = () =>{
        if(this.state.selectedId==-1){
            alert(`Seleccionar una investigación!`);
        }
    }



    render () {

        const columns = [{
            dataField: 'id',
            text: 'ID',
            hidden: true
        }, {
            dataField: 'titulo',
            text: 'Nombre'
        }, {
            dataField: 'resumen',
            text: 'Descripcion'
        }];

        const selectRow = {
            mode: 'radio',
            clickToSelect: true
        };

        const rowEvents = {
            onClick: (e, row) => {
                this.setState({
                    selectedId: row.id
                });
                //alert(`clicked on row with index: ${this.state.selectedId}`);
            }
        };


        console.log(this.props)

        function myFunction(x) {
            console.log("Row index is: " + x.rowIndex);
        }

        let myComponent;
        if(this.state.selectedId !== -1) {
            myComponent = <Link to={`${this.props.match.url}/${this.state.selectedId}/ModificarInvestigacion`}>Modificar</Link>
        } else {
            myComponent = <label onClick={this.modificar}>Modificar</label>
        }

        return(
            <div>
                <Route exact path={`${this.props.match.path}`} render={() =>
                    <Grid>
                        <Col md={12}>
                            <BootstrapTable keyField='id' data={ this.state.investigaciones } columns={ columns }
                                            selectRow={ selectRow } rowEvents={ rowEvents } />

                        </Col>
                        <Col md={2}>
                            <Link to={`${this.props.match.url}/RegistroInvestigacion`}>Registrar</Link>
                            <Button onClick={this.eliminar}>Eliminar</Button>
                            {myComponent}
                        </Col>
                    </Grid>
                }/>

                <Route path={`${this.props.match.path}/RegistroInvestigacion`} component={RegistroInvestigacion}/>
                <Route path={`${this.props.match.path}/:idInvestigacion/ModificarInvestigacion`} component={ModificarInvestigacion}/>

            </div>
        )
    }
}

export default ListaInvestigaciones;