import React, { Component } from 'react';
import {Tabs,Tab,Col,FormGroup,ControlLabel,FormControl,Grid,Form} from 'react-bootstrap';
import BaseContainer from "./BaseContainer";
import BootstrapTable from 'react-bootstrap-table-next';
import axios from "axios/index";

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
        listaSecciones:[{id:"1",descripcion:"Economia"},
            {id:"2",descripcion:"Estudios Generales Letras"},
            {id:"3",descripcion:"Ciencias e Ingenieria"}],
      key: 1,
        listaProfesores:[],
    };
  }


    componentDidMount(){
        axios.get('https://demo4106552.mockable.io/asignacionHorarios/consultaPreferencias')
            .then(response => {
                this.setState({
                    cursos: response.data.cursos
                });
            })
            .catch(error => {
                console.log(`Error al obtener datos de la pantalla asignacion de cursos`,error);
            });
    }

  handleSelect = key => {
    this.setState({ key });
  };

  creaLista  = ( ) =>{
    let lista = [];
    for(let i=0;i<this.state.cursos.length;i++){
        let obj = {};
        obj.codigo = this.state.cursos[i].codigo;
        obj.seccion = this.state.cursos[i].seccion;
        obj.nombreCurso = this.state.cursos[i].nombreCurso;
        obj.claseCurso = this.state.cursos[i].claseCurso;
        if(this.state.cursos[i].profesorPreferencia.length)
            for(let j=0;j<this.state.cursos[i].profesorPreferencia.length;j++){
                obj.nombre = this.state.cursos[i].profesorPreferencia[j].nombre;
                obj.tipo = this.state.cursos[i].profesorPreferencia[j].tipo;
                if(this.state.cursos[i].profesorPreferencia[j].ciclo1 == true)
                    obj.ciclo1 = "inscrito";
                else
                    obj.ciclo1 = "";
                if(this.state.cursos[i].profesorPreferencia[j].ciclo2 == true)
                    obj.ciclo2 = "inscrito";
                else
                    obj.ciclo2 = "";
                lista.push(obj);
            }
        else {
            obj.nombre = "";
            obj.ciclo1 = "";
            obj.ciclo2 = "";
            lista.push(obj);
        }
    }
    return lista;
  };

  cambioSeccion = (event) =>{
      let seccionSelect = event.target.value;

  };


  render(){
    const columnasPreferencias = [
        {text:'Codigo',dataField:'codigo'},
        {text:'Seccion',dataField:'seccion'},
        {text:'Curso',dataField:'nombreCurso'},
        {text:'Clase',dataField:'claseCurso'},
        {text:'Profesor',dataField:'nombre'},
        {text:'Tipo',dataField:'tipo'},
        {text:'Ciclo_1',dataField:'ciclo1'},
        {text:'Ciclo_2',dataField:'ciclo2'}
    ];
    const lista = this.creaLista;
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
                        <FormControl componentClass="select" placeholder="select" ref="selectorSeccion" onChange={this.cambioSeccion}>
                            {this.state.listaSecciones.map((item, i) => {
                                return <option key={i} value={item.descripcion}>{item.descripcion}</option>
                            })}
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
                  <BootstrapTable keyField='id' data={lista()} columns={columnasPreferencias}/>
              </Col>
          </Grid>
          </BaseContainer>


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