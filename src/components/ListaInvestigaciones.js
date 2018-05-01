import React from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import {Grid,Row,Table,Button, Glyphicon,Col} from 'react-bootstrap';
import {HashRouter ,BrowserRouter,Router,Route,Link} from 'react-router-dom';
import RegistroInvestigacion from "./RegistroInvestigacion"
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
        axios.get('http://localhost:8080/docente/docente/invDocente?codigo=20112728&ciclo=2018-1')
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
            } else {
                // Do nothing!
            }
        }else{
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
                        </Col>
                    </Grid>
                }/>

                <Route path={`${this.props.match.path}/RegistroInvestigacion`} render={()=> <RegistroInvestigacion/>}/>

            </div>
        )
    }
}

export default ListaInvestigaciones;