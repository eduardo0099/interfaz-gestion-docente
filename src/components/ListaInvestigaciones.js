import React from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import {Grid,Row,Table,Button, Glyphicon,Col} from 'react-bootstrap';
import {HashRouter ,BrowserRouter,Router,Route,Link} from 'react-router-dom';
import RegistroInvestigacion from "./RegistroInvestigacion"

export class ListaInvestigaciones extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            titulo:"",
            resumen:""
        }
    }

    render () {
        const columnas = [
            {
                Header: 'Titulo',
                accessor: 'titulo'
            }, {
                Header: 'Resumen',
                accessor: 'resumen'
            }
        ];


        console.log(this.props)


        return(
            <div>
                <Route exact path={`${this.props.match.path}`} render={() =>
                    <Grid>
                        <Row>
                            <Col md={12}>
                                <Table striped bordered condensed hover>
                                    <thead>
                                    <tr>
                                        <th>Titulo</th>
                                        <th>Resumen</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {this.props.investigaciones.map((item) => {
                                        return <tr>
                                            <td>{item.titulo}</td>
                                            <td>{item.resumen}</td>
                                            <td><Link to={`hola/cursos`}>Editar</Link></td>
                                            <td><Link to={`hola/cursos`}>Eliminar</Link></td>
                                        </tr>
                                    })}
                                    </tbody>
                                </Table>
                            </Col>
                            <Col md={2}>
                                <Link to={`${this.props.match.url}/RegistroInvestigacion`}>Registrar</Link>
                            </Col>
                        </Row>
                    </Grid>
                }/>

                <Route path={`${this.props.match.path}/RegistroInvestigacion`} render={()=> <RegistroInvestigacion/>}/>
            </div>
        )
    }
}

export default ListaInvestigaciones;