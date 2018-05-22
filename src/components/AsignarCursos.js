import React, { Component } from 'react';
import {Tabs,Tab,Col,Grid,Row,FormGroup,ControlLabel,FormControl,Form,Button,Checkbox,Modal,Popover,Tooltip} from 'react-bootstrap';
import BaseContainer from './BaseContainer';
import BootstrapTable from 'react-bootstrap-table-next';
import axios from 'axios';

class AsignarCursos extends Component {
  constructor(props) {
    super(props);

    this.totalCursosXciclo = [];

    this.state = {
        cursos:[],
        listaSeccioneskey1:[],
        filtroSeccionkey1:"todos",
        cursoText:"",
        profeText:"",
        key: 1,
        listaProfesoresTotal:[],
        listaProfesoresParcial:[],
        filtro1: -1,
        listaFiltrada1:[],
        showAsignar: false,

        listaSecciones: [],
        filtroSeccion: "todos",
        listaCiclos: [],
        filtroCiclo: "2018-2",

        dataTablaAsignacion: [], //lista de cursos
        codSeleccionado: "", //codigo del curso [cod]

        datacodSeleccionado: [],
        horSeleccionado: "",

        maxHorasModal: 0,
        asigHorasModal: 1,
        docentesPrefModal: [],
        docentesGeneralModal: [],
        mostrarPreferencias: true,
        codigoProfSelec: "",
        nombreProfSelec: "",
        horasTProfSelec: "",
    };
  }


    componentDidMount(){
        axios.get('https://demo4106552.mockable.io/asigacionHorarios/listaCursosDisponible')
            .then(response => {
                this.totalCursosXciclo = response.data.cursos;
                let aux = [];
                for(let i=0;i<response.data.cursos.length;i++){
                    aux.push(response.data.cursos[i].seccion);
                }
                this.setState({dataTablaAsignacion: response.data.cursos, listaSecciones: Array.from(new Set(aux)) });
            })
            .catch(error => {
                alert("Ha ocurrido un error, intentelo luego");
                console.log(error);
            });
        axios.get('https://demo4106552.mockable.io/asignacionHorarios/consultaPreferencias')
            .then(response => {
                this.setState({
                    cursos: response.data.cursos
                });
                let aux = [];
                for(let i=0;i<response.data.cursos.length;i++){
                    aux.push(response.data.cursos[i].seccion);
                }
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
                this.setState({
                    listaProfesoresTotal:Array.from(new Set(lista)),
                    listaProfesoresParcial:Array.from(new Set(lista)),
                    listaSeccioneskey1:Array.from(new Set(aux))
                })
            })
            .catch(error => {
                console.log(`Error al obtener datos de la pantalla asignacion de cursos`,error);
            });
    }

  handleClose = () => {
    this.setState({showAsignar: false,
      docentesPrefModal: [],
      docentesGeneralModal: [],
      maxHorasModal:0,
      codigoProfSelec:"",
      nombreProfSelec:"",
      horasTProfSelec:"",
    });
  };


  handleShow = () => {
    axios.get('https://demo4106552.mockable.io/asignacionHorarios/listaDocenteAsignar%3Fcurso=ECO290&ciclo=2018-1')
      .then(response => {
        this.setState({
          showAsignar: true,
          maxHorasModal: this.state.dataTablaAsignacion.find(curso => curso.codigo === this.state.codSeleccionado[0]).horas,
          docentesPrefModal: response.data["preferencia "],
          docentesGeneralModal: response.data.general,
          mostrarPreferencias: true,
        });
      })
      .catch(error => {
        alert("Ha ocurrido un error, intentelo luego");
        console.log(error);
      });
  };


  handleSelect = key => {
    this.setState({key});
  };


  handleChangeListaPreferencias = e => {
    this.setState({mostrarPreferencias: e.target.checked,
      asigHorasModal:1,
      codigoProfSelec:"vacioprof",
      nombreProfSelec:"",
      horasTProfSelec:"",

    });
  };

  handleAsigHoras = e => {
    this.setState({asigHorasModal: e.target.value});
  };

  handleSelecionarProfeAsig = e => {
    if(e.target.value === "vacioprof"){
      this.setState({codigoProfSelec:"",nombreProfSelec:"",horasTProfSelec:""});
    }else{
      let profSelec = {};

      if(this.state.mostrarPreferencias){
        profSelec = this.state.docentesPrefModal.find(doc => doc.codigo==e.target.value);
      }else{
        profSelec = this.state.docentesGeneralModal.find(doc => doc.codigo==e.target.value);
      }
      this.setState({codigoProfSelec:e.target.value,nombreProfSelec:profSelec.nombre, horasTProfSelec:profSelec.horasAsignadas });
    }
  };

  handleFiltroSeccion = e =>{
    if(e.target.value ==="todos"){
      this.setState({filtroSeccion: e.target.value, dataTablaAsignacion: this.totalCursosXciclo});
    }else{
      this.setState({filtroSeccion: e.target.value,
        dataTablaAsignacion: this.totalCursosXciclo.filter(c => c.seccion === e.target.value),
        codSeleccionado: ""});
    }

  };

  handleFiltroCiclo = e =>{
    this.setState({filtroCiclo: e.target.value});
  };



  handleOnSelectCurso = (row) =>{
    axios.get('https://demo4106552.mockable.io/asignacionHorarios/horariosCursoDisponible%3Fcurso=ECO290&ciclo=2018-1')
      .then(response =>{

        let auxHor = [];
        let cont = 0;
        for(let idx=0;idx<response.data.horarios.length;idx++){
          for(let j=0;j<response.data.horarios[idx].docentesInscritos.length;j++){
            let obj = {};
            obj.numHorario = response.data.horarios[idx].numHorario;
            obj.id = cont;
            obj.codigo = response.data.horarios[idx].docentesInscritos[j].codigo;
            obj.nombre = response.data.horarios[idx].docentesInscritos[j].nombre;
            obj.horasAsignadas = response.data.horarios[idx].docentesInscritos[j].horasAsignadas;
            obj.tipo = "xxx";
            cont++;
            auxHor.push(obj);
          }
        }
        this.setState({codSeleccionado: [row.codigo], datacodSeleccionado:auxHor, horSeleccionado:[] });
      }).catch(error => {
      alert("Ha ocurrido un error, intentelo luego");
      console.log(error);
    });



  };

  handleOnSelectHorario = (row) =>{
    this.setState({horSeleccionado: [row.id]});
  };

  handleFiltroSeccionkey1 = e =>{
      if(e.target.value === "todos"){
          this.setState({
              filtroSeccionkey1:e.target.value,
              listaProfesoresParcial:this.state.listaProfesoresTotal,
              listaFiltrada1:this.state.listaProfesoresTotal,
              filtro1:-1
          })
      }else{
          this.setState({
              filtroSeccionkey1:e.target.value,
              listaProfesoresParcial:this.state.listaProfesoresTotal.filter(c=>c.seccion === e.target.value),
              filtro1:1,
              listaFiltrada1:this.state.listaProfesoresParcial
          })
      }
  }

  busquedaCurso = e =>{
        this.setState({
            cursoText: e.target.value,
        })
      if(this.state.filtro1 === 1){//la lista fue filtrada por seccion
          var aux= this.state.listaFiltrada1.filter((d)=>{
              return d.nombreCurso.toUpperCase().indexOf(e.target.value.toUpperCase())!== -1
          });
      }
      else{//la lista no ha sido filtrada
          var aux= this.state.listaProfesoresTotal.filter((d)=>{
              return d.nombreCurso.toUpperCase().indexOf(e.target.value.toUpperCase())!== -1
          });
      }
      this.setState({
          listaProfesoresParcial:aux
      })
  }

  busquedaProfesor = e =>{
      this.setState({
          profeText: e.target.value,
      })
      if(this.state.filtro1 === 1){//la lista fue filtrada por seccion
          var aux= this.state.listaFiltrada1.filter((d)=>{
              return d.nombre.toUpperCase().indexOf(e.target.value.toUpperCase())!== -1
          });
      }
      else{//la lista no ha sido filtrada
          var aux= this.state.listaProfesoresTotal.filter((d)=>{
              return d.nombre.toUpperCase().indexOf(e.target.value.toUpperCase())!== -1
          });
      }
      this.setState({
          listaProfesoresParcial:aux
      })
  }
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
    const columnsTodo = [
      {
        dataField: 'seccion',
        text: 'SECCIÓN'
      },
      {
        dataField: 'codigo',
        text: 'CÓDIGO'
      },
      {
        dataField: 'nombre',
        text: 'NOMBRE'
      },
      {
        dataField: 'creditos',
        text: 'CREDITOS'
      },
      {
        dataField: 'horas',
        text: 'HORAS'
      },
      {
        dataField: 'horariosTotales',
        text: 'CANTIDAD HORARIOS'
      },
      {
        dataField: 'horariosAsignados',
        text: 'HORARIOS ASIGNADOS'
      }];

    const selectRowTodo = {
      mode: 'radio',
      selected: this.state.codSeleccionado,
      clickToSelect: true,
      onSelect: this.handleOnSelectCurso,
      hideSelectColumn: true,
      bgColor: '#edeaea'
    };

    const columnsHor = [
      {
        dataField: 'numHorario',
        text: 'HORARIO'
      },
      {
        dataField: 'nombre',
        text: 'PROFESOR'
      },
      {
        dataField: 'tipo',
        text: 'TIPO'
      },
      {
        dataField: 'horasAsignadas',
        text: 'HORAS ASIGNADAS'
      }];

    const selectRowHor = {
      mode: 'radio',
      selected: this.state.horSeleccionado,
      clickToSelect: true,
      onSelect: this.handleOnSelectHorario,
      hideSelectColumn: true,
      bgColor: '#edeaea'
    };

    return (
      <BaseContainer>
                <div className="panel wrapper-md col-lg-offset-1 col-lg-10 col-md-12 col-sm-12">
      <Tabs
        activeKey={this.state.key}
        onSelect={this.handleSelect}
        id="controlled-tab-example"
      >
        <Tab eventKey={1} title="Consulta de Preferencias">

          <BaseContainer>
          <Grid>
            <Col md={10}>
              <Form horizontal>
                    <FormGroup  controlId="formHorizontalSeccion">
                        <Col componentClass={ControlLabel} sm={1}>
                            Seccion:
                        </Col>
                      <Col sm={3}>
                          <FormControl componentClass="select" placeholder="select"
                                       onChange={this.handleFiltroSeccionkey1}
                                       value={this.state.filtroSeccionkey1}>
                              <option value="todos">Todos</option>
                              {this.state.listaSeccioneskey1.map((item,index) => {
                                  return <option key={index} value={item} >{item}</option>
                              })}
                          </FormControl>
                      </Col>
                        <Col sm={4}>
                            <FormControl type="text" placeholder="Buscar Curso"
                                         value={this.state.cursoText}
                                        onChange={this.busquedaCurso.bind(this)}/>
                        </Col>
                        <Col sm={4}>
                            <FormControl type="Buscar Profesor" placeholder="Buscar Profesor"
                                         value={this.state.profeText}
                                         onChange={this.busquedaProfesor.bind(this)}/>
                        </Col>
                    </FormGroup>
              </Form>
            </Col>
              <Col md={10}>
                  <BootstrapTable keyField='id' data={this.state.listaProfesoresParcial} columns={columnasPreferencias}/>
              </Col>
          </Grid>
          </BaseContainer>


        </Tab>
        <Tab eventKey={2} title="Asignacion de cursos">
          <div style={{"padding":"1em"}}>
            <Grid>
              <Row>
                <Col md={2}>
                  <Form horizontal>
                    <FormGroup controlId="formHorizontalSeccion" >
                      <Col componentClass={ControlLabel} sm={2}>
                        Ciclo:
                      </Col>
                      <Col sm={10}>
                        <FormControl componentClass="select" placeholder="select" onChange={this.handleFiltroCiclo} value={this.state.filtroCiclo}>
                          <option value="2018-1">2018-1</option>
                          <option value="2018-2">2018-2</option>
                        </FormControl>
                      </Col>
                    </FormGroup>
                  </Form>
                </Col>
                <Col md={3}>
                  <Form horizontal>
                    <FormGroup controlId="formHorizontalSeccion" >
                      <Col componentClass={ControlLabel} sm={2}>
                        Sección:
                      </Col>
                      <Col sm={10}>
                        <FormControl componentClass="select" placeholder="select" onChange={this.handleFiltroSeccion} value={this.state.filtroSeccion}>
                          <option value="todos">Todos</option>
                          {this.state.listaSecciones.map((item,index) => {
                            return <option key={index} value={item} >{item}</option>
                          })}
                        </FormControl>
                      </Col>
                    </FormGroup>
                  </Form>
                </Col>
                <Col md={4}  mdOffset={3}>
                  <Form horizontal>
                    <FormGroup controlId="formHorizontalBuscarCurso" >
                      <Col sm={12}>
                        <FormControl type="curso" placeholder="Buscar curso" />
                      </Col>
                    </FormGroup>
                  </Form>
                </Col>
              </Row>

              <Row >
                <Col md={10}>
                  <BootstrapTable
                    keyField='codigo'
                    data={ this.state.dataTablaAsignacion }
                    columns={ columnsTodo }
                    selectRow={ selectRowTodo }
                  />
                </Col>
              </Row>
              <hr/>
              {this.state.codSeleccionado!==""?
                <span>
                <Row>
                  <Col md={11} mdOffset={1}>
                    <h4>Horarios del curso seleccionado:</h4>
                  </Col>
                </Row>
                <Row>
                  <Col md={10} mdOffset={1}>
                    <BootstrapTable
                      keyField='id'
                      data={ this.state.datacodSeleccionado }
                      columns={ columnsHor }
                      selectRow={ selectRowHor }
                    />
                  </Col>
                  <Col md={1}/>
                </Row>
                <Row>
                  <Col md={10} mdOffset={1}>
                    <Button bsStyle="primary" disabled={!this.state.horSeleccionado.length} onClick={this.handleShow}>Asignar Profesores</Button>
                    <Modal show={this.state.showAsignar} onHide={this.handleClose}>
                      <Modal.Header closeButton>
                        <Modal.Title>Asignar profesor al curso {this.state.codSeleccionado}</Modal.Title>
                      </Modal.Header>
                      <Modal.Body>
                        <h4>Lista de profesores:</h4>
                        <FormControl componentClass="select" placeholder="vacioprof" onChange={this.handleSelecionarProfeAsig}>
                          <option value="vacioprof">Seleccionar</option>
                          {this.state.mostrarPreferencias?
                            this.state.docentesPrefModal.map((item,index)=>{
                              return <option key={index} value={item.codigo}>{`${item.nombre},${item.tipo},${item.encuesta}`}</option>
                            })
                            :
                            this.state.docentesGeneralModal.map((item,index)=>{
                              return <option key={index} value={item.codigo}>{`${item.nombre},${item.tipo},${item.encuesta}`}</option>
                            })
                          }
                        </FormControl>
                        <Checkbox checked={this.state.mostrarPreferencias} onChange={this.handleChangeListaPreferencias}>
                          Mostrar solo preferencias
                        </Checkbox>
                        <hr/>
                        <h4>Datos del profesor:</h4>
                        <Form horizontal>
                          <FormGroup controlId="formHorizontal1">
                            <Col componentClass={ControlLabel} sm={2}>
                              Codigo:
                            </Col>
                            <Col sm={10}>
                              <FormControl readOnly type="text" value={this.state.codigoProfSelec} placeholder="Codigo del profesor" />
                            </Col>
                          </FormGroup>
                          <FormGroup controlId="formHorizontal2">
                            <Col componentClass={ControlLabel} sm={2}>
                              Nombre:
                            </Col>
                            <Col sm={10}>
                              <FormControl readOnly type="text" value={this.state.nombreProfSelec} placeholder="Nombre y apellidos del profesor" />
                            </Col>
                          </FormGroup>
                          <FormGroup controlId="formHorizontal2">
                            <Col componentClass={ControlLabel} sm={2}>
                              Total de horas:
                            </Col>
                            <Col sm={10}>
                              <FormControl readOnly type="number" value={this.state.horasTProfSelec} placeholder="Horas asignadas en el ciclo" />
                            </Col>
                          </FormGroup>
                          <FormGroup controlId="formHorizontal3">
                            <Col componentClass={ControlLabel} sm={2}>
                              Horas a dictar:
                            </Col>
                            <Col sm={7}>
                              <FormControl type="number"  step={1} min={1} max={this.state.maxHorasModal} value={this.asigHorasModal} onChange={this.handleAsigHoras}/>
                            </Col>
                            <Col sm={3}>
                              <h4>Max horas:{this.state.maxHorasModal}</h4>
                            </Col>
                          </FormGroup>

                        </Form>
                      </Modal.Body>
                      <Modal.Footer>
                        <Button onClick={this.handleClose}>Asignar</Button>
                      </Modal.Footer>
                    </Modal>
                  </Col>
                </Row>
              </span>
                : <span/>}
            </Grid>
          </div>
        </Tab>
        <Tab eventKey={3} title="Revision de carga">
          Resumen
        </Tab>
      </Tabs>
      </div>
      </BaseContainer>
    );
  }
}

export default AsignarCursos;