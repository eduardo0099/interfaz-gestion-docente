import React, { Component } from 'react';
import { Tabs, Tab, Col, Grid, Row, FormGroup, ControlLabel, FormControl, Form, Button, Checkbox, Modal } from 'react-bootstrap';
import BaseContainer from './BaseContainer';
import BootstrapTable from 'react-bootstrap-table-next';
import API from '../api';
import {Redirect} from 'react-router-dom';

class AsignarCursos extends Component {
    constructor(props) {
        super(props);
        //this.handleOnModalCurso=this.handleOnModalCurso.bind(this);
        this.closeModalCurso=this.closeModalCurso.bind(this);
        this.totalCursosXciclo = [];

        this.state = {
            auth:false,
            verAuth:false,
            cursos: [],
            listaSeccioneskey1: [],
            filtroSeccionkey1: "todos",
            cursoText: "",
            profeText: "",
            key: 1,
            listaProfesoresTotal: [],
            listaProfesoresParcial: [],
            filtro1: -1,
            listaFiltrada1: [],
            showAsignar: false,
            cursoSeleccionado:"",
            showModalCurso:false,
            listaDocenteCurso:[{nombre:"x",tipo:"x",ciclo1:"x",ciclo2:"x"}],

            listaSecciones: [],
            filtroSeccion: "todos",
            listaCiclos: [],
            filtroCiclo: "2018-2",

            dataTablaAsignacion: [], //lista de cursos
            codSeleccionado: "", //codigo del curso [cod]

            datacodSeleccionado: [],
            horSeleccionado: "",

            maxHorasModal: 0,
            asigHorasModal: 0,
            docentesPrefModal: [],
            docentesGeneralModal: [],
            mostrarPreferencias: true,
            codigoProfSelec: "",
            nombreProfSelec: "",
            horasTProfSelec: "",

            resumenAsignacion: [],
            filtroCicloRes: "2018-2",
            resSeleccionado: "",  //[res]
            detalleResSelec: [],
            showDetalle: false,

            actualizarProfe: false,
        };
    }

    componentWillMount() {
        if (localStorage.getItem('jwt') == null) {
            window.location.href = "/";
        } else {
            API.get('/auth/verificaPermiso', {
                /*
                headers:{
                  'x-access-token' : localStorage.getItem('jwt'),
                },
                */
                params: {
                    ruta: "/asignacionCursos"
                }
            }).then(resp => {
                console.log("resp asignar", resp.data);
                this.setState({ auth: resp.data.permiso,verAuth:true });
            }).catch(err => {
                console.log("err", err);
            })
        }
    }

    componentDidMount() {
        API.get('asignacionHorarios/listaCursosDisponible', { params: { ciclo: this.state.filtroCiclo } })
            .then(response => {
                this.totalCursosXciclo = response.data.cursos;
                let aux = [];
                for (let i = 0; i < response.data.cursos.length; i++) {
                    aux.push(response.data.cursos[i].seccion);
                }
                this.setState({ dataTablaAsignacion: response.data.cursos, listaSecciones: Array.from(new Set(aux)) });
            })
            .catch(error => {
                alert("Ha ocurrido un error, intentelo luego");
                console.log(error);
            });
        API.get('asignacionHorarios/consultaPreferencias')
            .then(response => {
                this.setState({
                    cursos: response.data.cursos
                });
                let aux = [];
                for (let i = 0; i < response.data.cursos.length; i++) {
                    aux.push(response.data.cursos[i].seccion);
                }
                let lista = [];
                for (let i = 0; i < this.state.cursos.length; i++) {
                        let obj = {};
                        obj.codigo = this.state.cursos[i].codigo;
                        obj.seccion = this.state.cursos[i].seccion;
                        obj.nombreCurso = this.state.cursos[i].nombreCurso;
                        obj.claseCurso = this.state.cursos[i].claseCurso;
                        lista.push(obj);
                }
                this.setState({
                    listaProfesoresTotal: Array.from(new Set(lista)),
                    listaProfesoresParcial: Array.from(new Set(lista)),
                    listaSeccioneskey1: Array.from(new Set(aux))
                })
            })
            .catch(error => {
                console.log(`Error al obtener datos de la pantalla asignacion de cursos`, error);
            });
        API.get('asignacionHorarios/listaDocenteCargaAsignada', {
            params: { ciclo: this.state.filtroCicloRes }
        }).then(res => {
            this.setState({ resumenAsignacion: res.data.docentes });
        }).catch(error => {
            alert("Ha ocurrido un error, intentelo luego");
        });
    }

    handleCrearNuevoHorario = () =>{
        //Falta el api
        console.log("horarios actuales",this.state.datacodSeleccionado);
        this.setState({datacodSeleccionado: this.state.datacodSeleccionado.concat({
            numHorario: "99",
            id:this.state.datacodSeleccionado.length,
            codigo: "",
            nombre: "",
            horasAsignadas: ""
        })});
    }

    handleActualizarProfesor = () =>{

    }

    handleClose = () => {
        this.setState({
            showAsignar: false,
            docentesPrefModal: [],
            docentesGeneralModal: [],
            maxHorasModal: 0,
            codigoProfSelec: "",
            nombreProfSelec: "",
            horasTProfSelec: "",
            actualizarProfe: false
        });
    };

    handleCloseRes = () => {
        this.setState({ showDetalle: false });
    };

    handleAsignar = () => {
        /*
       obj.codigo = "";
               obj.nombre = "";
               obj.horasAsignadas = "";
               */
        if(!this.state.actualizarProfe){
            if (this.state.asigHorasModal > 0 && this.state.codigoProfSelec != "") {
                API.post('asignacionHorarios/asignarDocenteHorario', {
                    codigoDocente: this.state.codigoProfSelec,
                    codCurso: this.state.codSeleccionado,
                    numHorario: this.state.datacodSeleccionado[this.state.horSeleccionado[0]].numHorario,
                    horasAsignadas: this.state.asigHorasModal,
                    ciclo: this.state.filtroCiclo,
                })
                    .then(res => {
                        alert("Se ha registrado correctamente");
                        this.setState({
                            showAsignar: false,
                            docentesPrefModal: [],
                            docentesGeneralModal: [],
                            maxHorasModal: 0,
                            codigoProfSelec: "",
                            nombreProfSelec: "",
                            horasTProfSelec: "",
                            asigHorasModal: 0
                        });
                    })
                    .catch(error => {
                        alert("Ha ocurrido un error, intentelo luego");
                        console.log(error);
                    });
            } else {
                alert("Falta agregar datos")
            }
        }else{
            //Actualiza
            if (this.state.asigHorasModal > 0 && this.state.codigoProfSelec != "") {
                API.post('asignacionHorarios/actualizarDocenteHorario', {
                    codigoDocente: this.state.codigoProfSelec,
                    codCurso: this.state.codSeleccionado,
                    numHorario: this.state.datacodSeleccionado[this.state.horSeleccionado[0]].numHorario,
                    horasAsignadas: this.state.asigHorasModal,
                    ciclo: this.state.filtroCiclo,
                })
                    .then(res => {
                        alert("Se ha registrado correctamente");
                        this.setState({
                            showAsignar: false,
                            docentesPrefModal: [],
                            docentesGeneralModal: [],
                            maxHorasModal: 0,
                            codigoProfSelec: "",
                            nombreProfSelec: "",
                            horasTProfSelec: "",
                            asigHorasModal: 0,
                            actualizarProfe: false,
                        });
                    })
                    .catch(error => {
                        alert("Ha ocurrido un error, intentelo luego");
                        console.log(error);
                    });
            } else {
                alert("Falta agregar datos")
            }
        }
    };

    handleShow = () => {
        let index = this.state.horSeleccionado[0];
        API.get('asignacionHorarios/listaDocenteAsignar', {
            params: {
                codCur: this.state.codSeleccionado,
                ciclo: this.state.filtroCiclo
            }
        })
            .then(response => {
                if(
                this.state.datacodSeleccionado[index].codigo != "" &&
                this.state.datacodSeleccionado[index].nombre != "" &&
                this.state.datacodSeleccionado[index].horasAsignadas != ""){
                    let profSelec = response.data.general.find(doc => doc.codigo == this.state.datacodSeleccionado[index].codigo);
                    this.setState({
                        actualizarProfe: true,
                        showAsignar: true,
                        maxHorasModal: this.state.dataTablaAsignacion.find(curso => curso.codigo === this.state.codSeleccionado[0]).horas,
                        docentesPrefModal: response.data.preferencia,
                        docentesGeneralModal: response.data.general,
                        mostrarPreferencias: true,
                        codigoProfSelec: this.state.datacodSeleccionado[index].codigo,
                        nombreProfSelec: this.state.datacodSeleccionado[index].nombre,
                        asigHorasModal: this.state.datacodSeleccionado[index].horasAsignadas,
                        horasTProfSelec: profSelec.horasAsignadas,
                    });
                }else{
                    this.setState({
                        showAsignar: true,
                        maxHorasModal: this.state.dataTablaAsignacion.find(curso => curso.codigo === this.state.codSeleccionado[0]).horas,
                        docentesPrefModal: response.data.preferencia,
                        docentesGeneralModal: response.data.general,
                        mostrarPreferencias: true,
                        
                    });
                }
                
            })
            .catch(error => {
                alert("Ha ocurrido un error, intentelo luego");
                console.log(error);
            });
    };


    handleFiltroCicloRes = e => {
        let newCicloRes = e.target.value;
        API.get('asignacionHorarios/listaDocenteCargaAsignada', {
            params: { ciclo: newCicloRes }
        }).then(res => {
            this.setState({ resumenAsignacion: res.data.docentes, filtroCicloRes: newCicloRes });
        }).catch(error => {
            alert("Ha ocurrido un error, intentelo luego");
        });
    };

    handleSelect = key => {
        this.setState({ key });
    };


    handleChangeListaPreferencias = e => {
        this.setState({
            mostrarPreferencias: e.target.checked,
            asigHorasModal: 0
        });

        /*
          codigoProfSelec:"",
          nombreProfSelec:"",
          horasTProfSelec:"",
        */
    };

    handleAsigHoras = e => {
        this.setState({ asigHorasModal: e.target.value });
    };

    handleSelecionarProfeAsig = e => {
        if (e.target.value === "vacioprof") {
            this.setState({ codigoProfSelec: "", nombreProfSelec: "", horasTProfSelec: "" });
        } else {
            let profSelec = {};

            if (this.state.mostrarPreferencias) {
                profSelec = this.state.docentesPrefModal.find(doc => doc.codigo == e.target.value);
            } else {
                profSelec = this.state.docentesGeneralModal.find(doc => doc.codigo == e.target.value);
            }
            this.setState({ codigoProfSelec: e.target.value, nombreProfSelec: profSelec.nombre, horasTProfSelec: profSelec.horasAsignadas });
        }
    };

    handleFiltroSeccion = e => {
        if (e.target.value === "todos") {
            this.setState({ filtroSeccion: e.target.value, dataTablaAsignacion: this.totalCursosXciclo });
        } else {
            this.setState({
                filtroSeccion: e.target.value,
                dataTablaAsignacion: this.totalCursosXciclo.filter(c => c.seccion === e.target.value),
                codSeleccionado: ""
            });
        }

    };

    handleFiltroCiclo = e => {
        let newFiltroCiclo = e.target.value;
        console.log(newFiltroCiclo);
        API.get('asignacionHorarios/listaCursosDisponible', {
            params: {
                ciclo: newFiltroCiclo
            }
        }).then(response => {
            console.log("data", response.data);
            this.totalCursosXciclo = response.data.cursos;
            let aux = [];
            for (let i = 0; i < response.data.cursos.length; i++) {
                aux.push(response.data.cursos[i].seccion);
            }
            this.setState({
                dataTablaAsignacion: response.data.cursos,
                listaSecciones: Array.from(new Set(aux)),
                filtroCiclo: newFiltroCiclo
            });
        })
            .catch(error => {
                alert("Ha ocurrido un error, intentelo luego");
                console.log(error);
            });
    };


    handleOnSelectCurso = (row) => {
        API.get('asignacionHorarios/horariosCursoDisponible', {
            params: {
                codCur: row.codigo,
                ciclo: this.state.filtroCiclo
            }
        })
            .then(response => {

                let auxHor = [];
                let cont = 0;
                console.log(response.data.horarios);
                for (let idx = 0; idx < response.data.horarios.length; idx++) {
                    if (response.data.horarios[idx].docentesInscritos.length > 0) {
                        for (let j = 0; j < response.data.horarios[idx].docentesInscritos.length; j++) {
                            let obj = {};
                            obj.numHorario = response.data.horarios[idx].numHorario;
                            obj.id = cont;
                            obj.codigo = response.data.horarios[idx].docentesInscritos[j].codigo;
                            obj.nombre = response.data.horarios[idx].docentesInscritos[j].nombre;
                            obj.horasAsignadas = response.data.horarios[idx].docentesInscritos[j].horas_asignadas;
                            //obj.tipo = "xxx";
                            cont++;
                            auxHor.push(obj);
                        }
                    } else {
                        let obj = {};
                        obj.numHorario = response.data.horarios[idx].numHorario;
                        obj.id = cont;
                        obj.codigo = "";
                        obj.nombre = "";
                        obj.horasAsignadas = "";
                        //obj.tipo = "xxx";
                        cont++;
                        auxHor.push(obj);
                    }
                }
                console.log("datacodSeleccionado", auxHor);
                this.setState({ codSeleccionado: [row.codigo], datacodSeleccionado: auxHor, horSeleccionado: [] });
            }).catch(error => {
            alert("Ha ocurrido un error, intentelo luego");
            console.log(error);
        });


    };

    handleOnSelectHorario = (row) => {
        this.setState({ horSeleccionado: [row.id] });
    };

    handleOnSelectRes = (row) => {
        this.setState({ resSeleccionado: [row.codigo] });
    }

    handleFiltroSeccionkey1 = e => {
        if (e.target.value === "todos") {
            this.setState({
                filtroSeccionkey1: e.target.value,
                listaProfesoresParcial: this.state.listaProfesoresTotal,
                listaFiltrada1: this.state.listaProfesoresTotal,
                filtro1: -1
            })
        } else {
            this.setState({
                filtroSeccionkey1: e.target.value,
                listaProfesoresParcial: this.state.listaProfesoresTotal.filter(c => c.seccion === e.target.value),
                filtro1: 1,
                listaFiltrada1: this.state.listaProfesoresParcial
            })
        }
    }

    handleVerDetalles = () => {
        API.get('asignacionHorarios/detalleCargaDocenteAsignado', {
            params: {
                codDocente: this.state.resSeleccionado[0],
                ciclo: this.state.filtroCicloRes
            }
        }).then(res => {
            this.setState({ detalleResSelec: res.data.cursos, showDetalle: true });
        }).catch(err => {
            alert("Ha ocurrido un error, intentelo luego", err);
        })
    };

    busquedaCurso = e => {
        this.setState({
            cursoText: e.target.value,
        })
        if (this.state.filtro1 === 1) {//la lista fue filtrada por seccion
            var aux = this.state.listaFiltrada1.filter((d) => {
                return d.nombreCurso.toUpperCase().indexOf(e.target.value.toUpperCase()) !== -1
            });
        }
        else {//la lista no ha sido filtrada
            var aux = this.state.listaProfesoresTotal.filter((d) => {
                return d.nombreCurso.toUpperCase().indexOf(e.target.value.toUpperCase()) !== -1
            });
        }
        this.setState({
            listaProfesoresParcial: aux
        })
    }

    busquedaProfesor = e => {
        this.setState({
            profeText: e.target.value,
        })
        if (this.state.filtro1 === 1) {//la lista fue filtrada por seccion
            var aux = this.state.listaFiltrada1.filter((d) => {
                return d.nombre.toUpperCase().indexOf(e.target.value.toUpperCase()) !== -1
            });
        }
        else {//la lista no ha sido filtrada
            var aux = this.state.listaProfesoresTotal.filter((d) => {
                return d.nombre.toUpperCase().indexOf(e.target.value.toUpperCase()) !== -1
            });
        }
        this.setState({
            listaProfesoresParcial: aux
        })
    }

    handleOnModalCurso=(row)=>{
        this.setState({
            showModalCurso:true,
            cursoSeleccionado:row.codigo,
        })
        //this.handleMuestraDocentes(row.codigo);
        API.get('asignacionHorarios/consultaPreferencias')
            .then(response => {
                let cursos= response.data.cursos;
                let lista = [];
                let ind=0;
                for (let i = 0; i < cursos.length; i++) {
                    if (cursos[i].codigo == row.codigo)
                        ind = i;//Encontre el curso
                }
                if (cursos[ind].profesorPreferencia.length)
                    for (let j = 0; j < cursos[ind].profesorPreferencia.length; j++) {
                        let obj = {};
                        obj.nombre = cursos[ind].profesorPreferencia[j].nombre;
                        obj.tipo = cursos[ind].profesorPreferencia[j].tipo;
                        if (cursos[ind].profesorPreferencia[j].ciclo1 == true)
                            obj.ciclo1 = "inscrito";
                        else
                            obj.ciclo1 = "";
                        if (cursos[ind].profesorPreferencia[j].ciclo2 == true)
                            obj.ciclo2 = "inscrito";
                        else
                            obj.ciclo2 = "";
                        lista.push(obj);
                    }
                else {
                    let obj = {};
                    obj.nombre = "";
                    obj.tipo = "";
                    obj.ciclo1 = "";
                    obj.ciclo2 = "";
                    lista.push(obj);
                }
                this.setState({
                    listaDocentesCurso:Array.from(new Set(lista)),
                })

            })
            .catch(error => {
                console.log(`Error al obtener lista de docentes en ese curso`, error);
            });
    }

    handleMuestraDocentes=(codigoCur)=>{
        API.get('asignacionHorarios/consultaPreferencias')
            .then(response => {
                this.setState({
                    cursos: response.data.cursos
                });
                let lista = [];
                let ind=-1;
                for (let i = 0; i < this.state.cursos.length; i++) {
                    if (this.state.cursos[i].codigo == codigoCur)
                        ind = i;//Encontre el curso
                }
                    if (this.state.cursos[ind].profesorPreferencia.length)
                        for (let j = 0; j < this.state.cursos[ind].profesorPreferencia.length; j++) {
                            let obj = {};
                            obj.nombre = this.state.cursos[ind].profesorPreferencia[j].nombre;
                            obj.tipo = this.state.cursos[ind].profesorPreferencia[j].tipo;
                            if (this.state.cursos[ind].profesorPreferencia[j].ciclo1 == true)
                                obj.ciclo1 = "inscrito";
                            else
                                obj.ciclo1 = "";
                            if (this.state.cursos[ind].profesorPreferencia[j].ciclo2 == true)
                                obj.ciclo2 = "inscrito";
                            else
                                obj.ciclo2 = "";
                            lista.push(obj);
                        }
                    else {
                        let obj = {};
                        obj.nombre = "";
                        obj.tipo = "";
                        obj.ciclo1 = "";
                        obj.ciclo2 = "";
                        lista.push(obj);
                    }
                this.setState({
                    listaDocentesCurso:Array.from(new Set(lista)),
                })

            })
            .catch(error => {
                console.log(`Error al obtener lista de docentes en ese curso`, error);
            });
    }

    closeModalCurso(){
        this.setState({
            showModalCurso:false,
        })
    }

    render() {
        const columnasResumenDet = [
            { text: 'CODIGO', dataField: 'codigo' },
            { text: 'NOMBRE', dataField: 'nombre' },
            { text: 'HORAS ASIGNADAS', dataField: 'horas_asignadas' },
        ];
        const columnasPreferencias = [
            { text: 'Codigo', dataField: 'codigo' },
            { text: 'Seccion', dataField: 'seccion' },
            { text: 'Curso', dataField: 'nombreCurso' },
            { text: 'Clase', dataField: 'claseCurso' }
        ];

        const selectRowVistaProf={
            mode:'radio',
            selected: this.state.cursoSeleccionado,
            clickToSelect: true,
            onSelect: this.handleOnModalCurso,
            hideSelectColumn: true,
            bgColor: '#edeaea'

        }
        const columnasResumen = [
            { text: 'TIPO', dataField: 'tipo' },
            { text: 'CODIGO', dataField: 'codigo' },
            { text: 'PROFESOR', dataField: 'nombre' },
            { text: 'NUM. CURSOS', dataField: 'numCursos' },
            { text: 'HORAS ASIGNADAS', dataField: 'horasAsignadas' },
            { text: 'HORAS REQUERIDAS', dataField: 'horasRequeridas' },
            { text: 'HORAS DISPONIBLES', dataField: 'diferenciaHoras' }
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
                dataField: 'horarios_disponibles',
                text: 'CANTIDAD HORARIOS'
            },
            {
                dataField: 'horarios_asignados',
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
            /*{
              dataField: 'tipo',
              text: 'TIPO'
            },*/
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

        const columnasDocentes=[
            { text: 'Profesor', dataField: 'nombre' },
            { text: 'Tipo', dataField: 'tipo' },
            { text: 'Ciclo_1', dataField: 'ciclo1' },
            { text: 'Ciclo_2', dataField: 'ciclo2' }
        ]


        const selectRowRes = {
            mode: 'radio',
            selected: this.state.resSeleccionado,
            clickToSelect: true,
            onSelect: this.handleOnSelectRes,
            hideSelectColumn: true,
            bgColor: '#edeaea'
        };
        if(!this.state.auth && this.state.verAuth){
            return(<Redirect to="/home"/>);
        }else if (!this.state.verAuth){
            return(<div/>);
        }
        return (
            <BaseContainer>
                <div className="panel col-lg-offset-1 col-lg-10 col-md-12 col-sm-12">
                    <div className="panel-heading">
                        <p className="h2 m-b-sm"> Asignación de Cursos </p>
                    </div>
                    <div className="panel-body">
                    </div>
                    <Tabs
                        activeKey={ this.state.key }
                        onSelect={ this.handleSelect }
                        id="controlled-tab-example"
                    >
                        <Tab eventKey={ 1 } title="Consulta de Preferencias">

                            <BaseContainer>
                                <Grid>
                                    <Col md={ 10 }>
                                        <Form horizontal>
                                            <FormGroup controlId="formHorizontalSeccion">
                                                <Col componentClass={ ControlLabel } sm={ 1 }>
                                                    Seccion:
                                                </Col>
                                                <Col sm={ 3 }>
                                                    <FormControl componentClass="select" placeholder="select"
                                                                 onChange={ this.handleFiltroSeccionkey1 }
                                                                 value={ this.state.filtroSeccionkey1 }>
                                                        <option value="todos">Todos</option>
                                                        { this.state.listaSeccioneskey1.map((item, index) => {
                                                            return <option key={ index } value={ item }>{ item }</option>
                                                        }) }
                                                    </FormControl>
                                                </Col>
                                                <Col sm={ 4 }>
                                                    <FormControl type="text" placeholder="Buscar Curso"
                                                                 value={ this.state.cursoText }
                                                                 onChange={ this.busquedaCurso.bind(this) }/>
                                                </Col>
                                            </FormGroup>
                                        </Form>
                                    </Col>
                                    <Col md={ 10 }>
                                        <BootstrapTable selectRow={ selectRowVistaProf } keyField='codigo' data={ this.state.listaProfesoresParcial }
                                                        columns={ columnasPreferencias }/>
                                    </Col>
                                    <Modal show={this.state.showModalCurso}>
                                        <Modal.Header>
                                            <Modal.Title>Detalle de Docentes</Modal.Title>
                                        </Modal.Header>
                                        <Modal.Body>
                                            <h4>Lista Docentes</h4>
                                            <BootstrapTable keyField='nombre' data={this.state.listaDocenteCurso} columns={columnasDocentes}/>
                                        </Modal.Body>
                                        <Modal.Footer>
                                            <Button onClick={this.closeModalCurso}>Cerrar</Button>
                                        </Modal.Footer>
                                    </Modal>
                                </Grid>
                            </BaseContainer>


                        </Tab>
                        <Tab eventKey={ 2 } title="Asignacion de cursos">
                            <div style={ { "padding": "1em" } }>
                                <Grid>
                                    <Row>
                                        <Col md={ 10 }>
                                            <Form horizontal>
                                                <Col md={ 3 }>
                                                        <FormGroup controlId="formHorizontalSeccion">
                                                            <Col componentClass={ ControlLabel } sm={ 2 }>
                                                                Ciclo:
                                                            </Col>
                                                            <Col sm={ 10 }>
                                                                <FormControl componentClass="select" placeholder="select" onChange={ this.handleFiltroCiclo } value={ this.state.filtroCiclo }>
                                                                    <option value="2018-1">2018-1</option>
                                                                    <option value="2018-2">2018-2</option>
                                                                </FormControl>
                                                            </Col>
                                                        </FormGroup>
                                                </Col>
                                                <Col md={ 4 }>
                                                        <FormGroup controlId="formHorizontalSeccion">
                                                            <Col componentClass={ ControlLabel } sm={ 2 }>
                                                                Sección:
                                                            </Col>
                                                            <Col sm={ 10 }>
                                                                <FormControl componentClass="select" placeholder="select" onChange={ this.handleFiltroSeccion } value={ this.state.filtroSeccion }>
                                                                    <option value="todos">Todos</option>
                                                                    { this.state.listaSecciones.map((item, index) => {
                                                                        return <option key={ index } value={ item }>{ item }</option>
                                                                    }) }
                                                                </FormControl>
                                                            </Col>
                                                        </FormGroup>
                                                </Col>
                                                <Col md={ 3 } >
                                                        <FormGroup controlId="formHorizontalBuscarCurso">
                                                            <Col sm={ 12  }>
                                                                <FormControl type="curso" placeholder="Buscar curso"/>
                                                            </Col>
                                                        </FormGroup>
                                                </Col>
                                            </Form>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col md={ 10 }>
                                            <BootstrapTable
                                                keyField='codigo'
                                                data={ this.state.dataTablaAsignacion }
                                                columns={ columnsTodo }
                                                selectRow={ selectRowTodo }
                                            />
                                        </Col>
                                    </Row>
                                    { this.state.codSeleccionado !== "" ?
                                        <span>
                <Row>
                  <Col md={ 10 }>
                  <Button bsStyle="primary" disabled={ !this.state.codSeleccionado.length } onClick={ this.handleCrearNuevoHorario }>Agregar nuevo horario</Button>
                    <h4>Horarios del curso seleccionado:</h4>
                  </Col>
                </Row>
                <Row>
                  <Col md={ 10 }>
                    <BootstrapTable
                        keyField='id'
                        data={ this.state.datacodSeleccionado }
                        columns={ columnsHor }
                        selectRow={ selectRowHor }
                    />
                  </Col>
                </Row>
                <Row>
                  <Col md={ 10 } mdOffset={ 1 }>
                    <Button bsStyle="primary" disabled={ !this.state.horSeleccionado.length } onClick={ this.handleShow }>Asignar Profesores</Button>
                      { console.log("ez??", this.state.horSeleccionado) }
                      { this.state.horSeleccionado.length !== 0 ?
                          <Modal show={ this.state.showAsignar } onHide={ this.handleClose }>
                              <Modal.Header closeButton>
                                  <Modal.Title>Asignar profesor al curso { this.state.codSeleccionado } en el horario { this.state.datacodSeleccionado[this.state.horSeleccionado[0]].numHorario }</Modal.Title>
                              </Modal.Header>
                              <Modal.Body>
                                  <h4>Lista de profesores:</h4>
                                  <FormControl componentClass="select" placeholder="vacioprof" onChange={ this.handleSelecionarProfeAsig }>
                                      <option value="vacioprof">Seleccionar</option>
                                      { this.state.mostrarPreferencias ?
                                          this.state.docentesPrefModal.map((item, index) => {
                                              return <option key={ index } value={ item.codigo }>{ `${item.nombre},${item.tipo},${item.encuesta}` }</option>
                                          })
                                          :
                                          this.state.docentesGeneralModal.map((item, index) => {
                                              return <option key={ index } value={ item.codigo }>{ `${item.nombre},${item.tipo},${item.encuesta}` }</option>
                                          })
                                      }
                                  </FormControl>
                                  <Checkbox checked={ this.state.mostrarPreferencias } onChange={ this.handleChangeListaPreferencias }>
                                      Mostrar solo preferencias
                                  </Checkbox>
                                  <hr/>
                                  <h4>Datos del profesor:</h4>
                                  <Form horizontal>
                                      <FormGroup controlId="formHorizontal1">
                                          <Col componentClass={ ControlLabel } sm={ 2 }>
                                              Codigo:
                                          </Col>
                                          <Col sm={ 10 }>
                                              <FormControl readOnly type="text" value={ this.state.codigoProfSelec } placeholder="Codigo del profesor"/>
                                          </Col>
                                      </FormGroup>
                                      <FormGroup controlId="formHorizontal2">
                                          <Col componentClass={ ControlLabel } sm={ 2 }>
                                              Nombre:
                                          </Col>
                                          <Col sm={ 10 }>
                                              <FormControl readOnly type="text" value={ this.state.nombreProfSelec } placeholder="Nombre y apellidos del profesor"/>
                                          </Col>
                                      </FormGroup>
                                      <FormGroup controlId="formHorizontal2">
                                          <Col componentClass={ ControlLabel } sm={ 2 }>
                                              Total de horas:
                                          </Col>
                                          <Col sm={ 10 }>
                                              <FormControl readOnly type="number" value={ this.state.horasTProfSelec } placeholder="Horas asignadas en el ciclo"/>
                                          </Col>
                                      </FormGroup>
                                      <FormGroup controlId="formHorizontal3">
                                          <Col componentClass={ ControlLabel } sm={ 2 }>
                                              Horas a dictar:
                                          </Col>
                                          <Col sm={ 7 }>
                                              <FormControl type="number" step={ 1 } min={ 1 } max={ this.state.maxHorasModal } value={ this.state.asigHorasModal } onChange={ this.handleAsigHoras }/>
                                          </Col>
                                          <Col sm={ 3 }>
                                              <h4>Max horas:{ this.state.maxHorasModal }</h4>
                                          </Col>
                                      </FormGroup>

                                  </Form>
                              </Modal.Body>
                              <Modal.Footer>
                                  <Button onClick={ this.handleAsignar }>Asignar</Button>
                              </Modal.Footer>
                          </Modal>
                          : <span/> }
                  </Col>
                </Row>
              </span>
                                        : <span/> }
                                </Grid>
                            </div>
                        </Tab>
                        <Tab eventKey={ 3 } title="Revision de carga">
                            <FormControl componentClass="select" placeholder="select" onChange={ this.handleFiltroCicloRes } value={ this.state.filtroCicloRes }>
                                <option value="2018-1">2018-1</option>
                                <option value="2018-2">2018-2</option>
                            </FormControl>
                            <BootstrapTable
                                keyField='codigo'
                                data={ this.state.resumenAsignacion }
                                columns={ columnasResumen }
                                selectRow={ selectRowRes }
                            />
                            <Button bsStyle="primary" disabled={ !this.state.resSeleccionado.length } onClick={ this.handleVerDetalles }>Ver detalles</Button>
                            { this.state.resSeleccionado.length != 0 ?
                                <Modal show={ this.state.showDetalle } onHide={ this.handleCloseRes }>
                                    <Modal.Header closeButton>
                                        <Modal.Title>Detalle de asignacion del docente</Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body>
                                        <h4>Lista cursos</h4>
                                        <BootstrapTable
                                            keyField='codigo'
                                            data={ this.state.detalleResSelec }
                                            columns={ columnasResumenDet }
                                        />
                                    </Modal.Body>
                                    <Modal.Footer>
                                        <Button onClick={ this.handleCloseRes }>Cerrar</Button>
                                    </Modal.Footer>
                                </Modal>
                                : <span/> }
                        </Tab>
                    </Tabs>
                </div>
            </BaseContainer>
        );
    }
}

export default AsignarCursos;