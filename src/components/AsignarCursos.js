import React, { Component } from 'react';
import {Tabs,Tab,Col,FormGroup,ControlLabel,FormControl,Grid,Form} from 'react-bootstrap';
import BaseContainer from "./BaseContainer";
import BootstrapTable from 'react-bootstrap-table-next';

class AsignarCursos extends Component {
  constructor(props){
    super(props);

    this.state = {
      cursos:[{
        codigo:"123",
          seccion:"Economia",
          nombreCurso:"Locura",
          claseCurso:"obligatoria",//obligatorio y elctivo
          profesorPreferencia:[{
              codigo:"445",
              nombre:"jose perez",
              tipo:"TC",
              ciclo1:"si",//Hace referencia a la primera parte del año
              ciclo2:"no"//Hace referencia a la segunda parte del año
          }]
      }],
        listaSecciones:[{id:"1",descripcion:"FCI"},
            {id:"2",descripcion:"EEGGLL"}],
      key: 1
    };
  }

  componentDidMount(){


  }


  handleSelect = key => {
    this.setState({ key });
  };

  creaLista  = () =>{
    let lista = [];
    for(let i=0;i<this.state.cursos.length;i++){
        let obj = {};
        obj.codigo = this.state.cursos[i].codigo;
        obj.seccion = this.state.cursos[i].seccion;
        obj.nombreCurso = this.state.cursos[i].nombreCurso;
        for(let j=0;j<this.state.cursos[i].profesorPreferencia.length;j++){
            obj.nombre = this.state.cursos[i].profesorPreferencia[j].nombre;
            obj.ciclo1 = this.state.cursos[i].profesorPreferencia[j].ciclo1;
            obj.ciclo2 = this.state.cursos[i].profesorPreferencia[j].ciclo2;
            lista.push(obj);
        }

    }
    return lista;
  };
  render(){
    const columnasPreferencias = [
        {text:'Codigo',dataField:'codigo'},
        {text:'Seccio',dataField:'seccion'},
        {text:'Curso',dataField:'nombreCurso'},
        {text:'Profesor',dataField:'profesorPreferencia'},
        {text:'Ciclo1',dataField:'ciclo1'},
        {text:'Ciclo2',dataField:'ciclo2'}
    ];
    const lista=this.creaLista;
    return (
      <Tabs
        activeKey={this.state.key}
        onSelect={this.handleSelect}
        id="controlled-tab-example"
      >
        <Tab eventKey={1} title="Consulta de Preferencias">

          <BaseContainer>
          <Grid>
            <Col md={12}>
              <Form horizontal>
                    <FormGroup  controlId="formHorizontalSeccion">
                        <Col componentClass={ControlLabel} sm={1}>
                            Seccion:
                        </Col>
                      <Col sm={3}>
                        <FormControl componentClass="select" placeholder="select">
                            <option value="select">select</option>
                            <option value="other">...</option>
                        </FormControl>
                      </Col>
                        <Col sm={4}>
                            <FormControl type="Buscar Curso" placeholder="Buscar Curso" />
                        </Col>
                        <Col sm={4}>
                            <FormControl type="Buscar Profesor" placeholder="Buscar Profesor" />
                        </Col>
                    </FormGroup>
              </Form>
            </Col>
              <Col md={12}>
                  <BootstrapTable keyField='id' data={lista} columns={columnasPreferencias}/>
              </Col>
          </Grid>
          </BaseContainer>

          Aqui solo se listan las preferencias

        </Tab>
        <Tab eventKey={2} title="Asignacion de cursos">
          Asigna
        </Tab>
        <Tab eventKey={3} title="Revision de carga">
          Resumen
        </Tab>
      </Tabs>
    );
  }
}

export default AsignarCursos;