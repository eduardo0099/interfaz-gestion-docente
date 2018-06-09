import React, {Component} from 'react';
import {Row, Grid, Table, Button, PageHeader, Modal, Popover, Tooltip, OverlayTrigger, Col} from 'react-bootstrap';
import Papa from 'papaparse';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import SimpleReactValidator from "simple-react-validator";
import moment from "moment";
import BootstrapTable from 'react-bootstrap-table-next';
import BaseContainer from "../BaseContainer";
import API from "../../api";
import Select from 'react-select';

class registroPostulante extends Component {


    constructor(props) {
        super(props);
        this.validator1 = new SimpleReactValidator();
        this.validator2 = new SimpleReactValidator();
        this.invValidator = new SimpleReactValidator();
        this.expValidator = new SimpleReactValidator();
        this.cargosValidator = new SimpleReactValidator();
        this.premiosValidator = new SimpleReactValidator();
        this.asesoriasValidator = new SimpleReactValidator();
        this.tituloValidator = new SimpleReactValidator();
        this.maestriaValidator = new SimpleReactValidator();
        this.doctoradoValidator = new SimpleReactValidator();
        this.diplomadoValidator = new SimpleReactValidator();
        this.state = {
            paises:[],
            tipoDocList:[],

            btnAnterior:false,
            btnFinalizar:false,
            paso:1,
            fechaNac:'',
            paisNac:'',
            lugarNac:'',
            nombres:'',
            aPaterno:'',
            aMaterno:'',
            sexo:'',
            checkM:false,
            checkF:false,
            nacionalidad:'',
            email:'',
            tipoDoc:'',
            numDoc:'',
            telefono:'',
            celular:'',
            direccion:'',


            investigaciones:[],
            numInvestigaciones:0,
            tituloInv:'',
            resumenInv:'',
            fechaInv:'',

            experiencia:[],
            numExp:0,
            expFIni:'',
            expFFin:'',
            expDescripcion:'',
            expInstitucion:'',

            cargos:[],
            numCargos:0,
            cargoNombre:'',
            cargoFIni:'',
            cargoFFin:'',
            cargoInstitucion:'',

            premios:[],
            numPremios:0,
            premioUrl:'',
            premioDescripcion:'',

            asesorias:[],
            numAsesorias:0,
            asesoriaTitulo:'',
            asesoriaResumen:'',
            asesoriaFPublicacion:'',

            titulos:[],
            numTitulos:0,
            titulo:{
                nombreProg:'',
                pais:'',
                institucion:'',
                nombreTitulo:'',
                fechaTitulo:'',
                tituloTesis:'',
                urlTesis:'',
                archivo:null
            },

            maestrias:[],
            numMaestrias:0,
            maestria:{
                nombreProg:'',
                pais:'',
                institucion:'',
                nombreTitulo:'',
                fechaTitulo:'',
                tituloTesis:'',
                urlTesis:'',
                archivo:null
            },

            doctorados:[],
            numDoctorados:0,
            doctorado:{
                nombreProg:'',
                pais:'',
                institucion:'',
                nombreTitulo:'',
                fechaTitulo:'',
                tituloTesis:'',
                urlTesis:'',
                archivo:null
            },

            diplomados:[],
            numDiplomados:0,
            diplomado:{
                nombreProg:'',
                pais:'',
                institucion:'',
                nombreTitulo:'',
                fechaTitulo:'',
                tituloTesis:'',
                urlTesis:'',
                archivo:null
            },

            infoConvocatoria:{},

            //mostrarGA:true,
            mostrarDocencia:false,
            mostrarExpProf:false,
            mostrarInvestigaciones:false,
            mostrarTitulo:false,
            mostrarMaestria:false,
            mostrarDoctorado:false,
            mostrarDiplomatura:false,
            mostrarAsesoriaTesis:false,
            mostrarPremiosDoc:false

            //tituloProf:false,
            //maestria:false,
            //doctorado:false,
            //cargos:false,
            //asesoria:false,
            //premios:false,
            //expProf:false,
            //investigacion:false
        };

        this.handleNombres = this.handleNombres.bind(this);
        this.handleAPaterno = this.handleAPaterno.bind(this);
        this.handleAMaterno = this.handleAMaterno.bind(this);
        this.handleFNac = this.handleFNac.bind(this);
        this.handleCheckM = this.handleCheckM.bind(this);
        this.handleCheckF = this.handleCheckF.bind(this);
        this.handlePaisNac = this.handlePaisNac.bind(this);
        this.handleLugarNac = this.handleLugarNac.bind(this);

        this.handleNacionalidad = this.handleNacionalidad.bind(this);
        this.handleEmail = this.handleEmail.bind(this);
        this.handleTipoDoc = this.handleTipoDoc.bind(this);
        this.handleTelefono = this.handleTelefono.bind(this);
        this.handleCelular = this.handleCelular.bind(this);
        this.handleDireccion = this.handleDireccion.bind(this);

        this.handleNumDoc = this.handleNumDoc.bind(this);

        this.handleFInv = this.handleFInv.bind(this);
        this.handleTituloInv = this.handleTituloInv.bind(this);
        this.handleResumenInv = this.handleResumenInv.bind(this);

        this.handleExpFIni = this.handleExpFIni.bind(this);
        this.handleExpDescripcion = this.handleExpDescripcion.bind(this);
        this.handleExpFFin = this.handleExpFFin.bind(this);
        this.handleExpInstitucion = this.handleExpInstitucion.bind(this);
//cargos:
        this.handleCargoNombre = this.handleCargoNombre.bind(this);
        this.handleCargoFIni = this.handleCargoFIni.bind(this);
        this.handleCargoFFin = this.handleCargoFFin.bind(this);
        this.handleCargoInstitucion = this.handleCargoInstitucion.bind(this);
//premios:
        this.handlePremioUrl = this.handlePremioUrl.bind(this);
        this.handlePremioDescripcion = this.handlePremioDescripcion.bind(this);
//asesorias:
        this.handleAsesoriaTitulo = this.handleAsesoriaTitulo.bind(this);
        this.handleAsesoriaResumen = this.handleAsesoriaResumen.bind(this);
        this.handleAsesoriaFPublicacion = this.handleAsesoriaFPublicacion.bind(this);

        this.handleTituloNombreProg = this.handleTituloNombreProg.bind(this);
        this.handleTituloPais = this.handleTituloPais.bind(this);
        this.handleTituloInstitucion = this.handleTituloInstitucion.bind(this);
        this.handleTituloNombreTitulo = this.handleTituloNombreTitulo.bind(this);
        this.handleTituloFecha = this.handleTituloFecha.bind(this);
        this.handleTituloNombreTesis = this.handleTituloNombreTesis.bind(this);
        this.handleTituloUrlTesis = this.handleTituloUrlTesis.bind(this);

        this.handleExpProfesional = this.handleExpProfesional.bind(this);

        this.handleMaestriaNombreProg = this.handleMaestriaNombreProg.bind(this);
        this.handleMaestriaPais = this.handleMaestriaPais.bind(this);
        this.handleMaestriaInstitucion = this.handleMaestriaInstitucion.bind(this);
        this.handleMaestriaNombreTitulo = this.handleMaestriaNombreTitulo.bind(this);
        this.handleMaestriaFecha = this.handleMaestriaFecha.bind(this);
        this.handleMaestriaNombreTesis = this.handleMaestriaNombreTesis.bind(this);
        this.handleMaestriaUrlTesis = this.handleMaestriaUrlTesis.bind(this);

        this.handleDoctoradoNombreProg = this.handleDoctoradoNombreProg.bind(this);
        this.handleDoctoradoPais = this.handleDoctoradoPais.bind(this);
        this.handleDoctoradoInstitucion = this.handleDoctoradoInstitucion.bind(this);
        this.handleDoctoradoNombreTitulo = this.handleDoctoradoNombreTitulo.bind(this);
        this.handleDoctoradoFecha = this.handleDoctoradoFecha.bind(this);
        this.handleDoctoradoNombreTesis = this.handleDoctoradoNombreTesis.bind(this);
        this.handleDoctoradoUrlTesis = this.handleDoctoradoUrlTesis.bind(this);

        this.handleDiplomadoNombreProg = this.handleDiplomadoNombreProg.bind(this);
        this.handleDiplomadoPais = this.handleDiplomadoPais.bind(this);
        this.handleDiplomadoInstitucion = this.handleDiplomadoInstitucion.bind(this);
        this.handleDiplomadoNombreTitulo = this.handleDiplomadoNombreTitulo.bind(this);
        this.handleDiplomadoFecha = this.handleDiplomadoFecha.bind(this);
        this.handleDiplomadoNombreTesis = this.handleDiplomadoNombreTesis.bind(this);
        this.handleDiplomadoUrlTesis = this.handleDiplomadoUrlTesis.bind(this);



    }

    componentDidMount() {
        this.allPaises();
        this.allTipoDoc();
        this.findConvocatoria();
    }

    findConvocatoria() {
        API.get('convocatoria/convocatoria/devolver', {
            params: {
                id: this.props.match.params.id_convocatoria,
            }
        }).then(response => {
            let infoConv=response.data[0];
            this.setState({ infoConvocatoria: response.data[0] });
            if(infoConv.requiere_docencia_asesoria===1){
                this.setState({
                    mostrarAsesoriaTesis:true,
                });
            }
            if(infoConv.requiere_docencia_cargo===1){
                this.setState({
                    mostrarDocencia:true,
                });
            }
            if(infoConv.requiere_docencia_premio===1){
                this.setState({
                    mostrarPremiosDoc:true,
                });
            }
            if(infoConv.requiere_experiencia===1){
                this.setState({
                    mostrarExpProf:true,
                });
            }
            if(infoConv.requiere_grado_diplomatura===1){
                this.setState({
                    mostrarDiplomatura:true,
                });
            }
            if(infoConv.requiere_grado_doctorado===1){
                this.setState({
                    mostrarDoctorado:true,
                });
            }
            if(infoConv.requiere_grado_maestria===1){
                this.setState({
                    mostrarMaestria:true,
                });
            }
            if(infoConv.requiere_grado_titulo===1){
                this.setState({
                    mostrarTitulo:true,
                });
            }
            if(infoConv.requiere_investigacion===1){
                this.setState({
                    mostrarInvestigaciones:true,
                });
            }
        }).catch(error => {
            console.log(`Error al obtener datos de convocatoria ${this.props.match.params.id_convocatoria}`, error);
        });
    }

    allPaises() {
        API.get('general/listaPais')
            .then(response => {
                this.setState({ paises: response.data.pais })
            })
    }

    allTipoDoc() {
        API.get('general/listaTipoDocumento')
            .then(response => {
                this.setState({ tipoDocList: response.data.tipo_documento })
            })
    }

    handleNombres(event) {
        this.setState({nombres: event.target.value});
    }

    handleAPaterno(event) {
        this.setState({aPaterno: event.target.value});
    }

    handleAMaterno(event) {
        this.setState({aMaterno: event.target.value});
    }

    handleFNac(date) {
        this.setState({fechaNac: date});
    }

    handleNacionalidad(obj) {
        let pais = obj.pais;
        this.setState({ nacionalidad: pais })
    }

    handleEmail(event) {
        this.setState({email: event.target.value});
    }

    handleTipoDoc(obj) {
        let tipoDoc = obj.tipo_documento;
        this.setState({ tipoDoc: tipoDoc })
    }

    handleNumDoc(event) {
        this.setState({numDoc: event.target.value});
    }

    handleDireccion(event) {
        this.setState({direccion: event.target.value});
    }

    handleTelefono(event) {
        this.setState({telefono: event.target.value});
    }

    handleCelular(event) {
        this.setState({celular: event.target.value});
    }

    handleCheckM(event) {
        this.setState({
            sexo: 'masculino',
            checkF:false,
            checkM:true
        });
        console.log('sexo:',this.state.sexo,',F:',this.state.checkF,',M:',this.state.checkM)
    }

    handleCheckF(event) {
        this.setState({
            sexo: 'femenino',
            checkM:false,
            checkF:true
        });
        console.log('sexo:',this.state.sexo,',F:',this.state.checkF,',M:',this.state.checkM)
    }

    handlePaisNac(obj) {
        let pais = obj.pais;
        this.setState({ paisNac: pais })
    }

    handleLugarNac (event) {
        this.setState({lugarNac: event.target.value});
    }

    handleFInv(date){
        this.setState({fechaInv: date});
    }

    handleTituloInv(event) {
        this.setState({tituloInv: event.target.value});
    }

    handleResumenInv(event) {
        this.setState({resumenInv: event.target.value});
        console.log(this.state.titulo)
    }

//experiencia
    handleExpProfesional(event) {
        this.setState({expProfesional: event.target.value});
    }


    handleExpFIni(date){
        this.setState({expFIni: date});
    }

    handleExpDescripcion(event) {
        this.setState({expDescripcion: event.target.value});
    }

    handleExpFFin(date){
        this.setState({expFFin: date});
    }

    handleExpInstitucion(event) {
        this.setState({expInstitucion: event.target.value});
    }
    ////

    //cargos
    handleCargoNombre(event){
        this.setState({cargoNombre: event.target.value});
    }

    handleCargoFIni(date){
        this.setState({cargoFIni: date});
    }

    handleCargoFFin(date){
        this.setState({cargoFFin: date});
    }

    handleCargoInstitucion(event) {
        this.setState({cargoInstitucion: event.target.value});
    }

    ///////////

    //premios

    handlePremioUrl(event) {
        this.setState({premioUrl: event.target.value});
    }

    handlePremioDescripcion(event) {
        this.setState({premioDescripcion: event.target.value});
    }
    ////

    //asesorias

    handleAsesoriaTitulo(event) {
        this.setState({asesoriaTitulo: event.target.value});
    }

    handleAsesoriaResumen(event) {
        this.setState({asesoriaResumen: event.target.value});
    }

    handleAsesoriaFPublicacion(date) {
        this.setState({asesoriaFPublicacion: date});
    }
    ////

    handleTituloNombreProg(event) {
        let tempTitulo = {...this.state.titulo};
        tempTitulo.nombreProg = event.target.value
        this.setState({
            titulo:tempTitulo
        });
    }

    handleTituloPais(obj) {
        let tempTitulo = {...this.state.titulo};

        let pais = obj.pais;

        tempTitulo.pais = pais
        this.setState({
            titulo: tempTitulo
        });
    }

    handleTituloInstitucion(event) {
        let tempTitulo = {...this.state.titulo};
        tempTitulo.institucion = event.target.value
        this.setState({
            titulo:tempTitulo
        });
    }

    handleTituloNombreTitulo(event) {
        let tempTitulo = {...this.state.titulo};
        tempTitulo.nombreTitulo = event.target.value
        this.setState({
            titulo:tempTitulo
        });
    }

    handleTituloFecha(date) {
        let tempTitulo = {...this.state.titulo};
        tempTitulo.fechaTitulo = date
        this.setState({
            titulo: tempTitulo
        });
    }

    handleTituloNombreTesis(event) {
        let tempTitulo = {...this.state.titulo};
        tempTitulo.tituloTesis = event.target.value
        this.setState({
            titulo:tempTitulo
        });
    }

    handleTituloUrlTesis(event) {
        let tempTitulo = {...this.state.titulo};
        tempTitulo.urlTesis = event.target.value
        this.setState({
            titulo:tempTitulo
        });
    }
    ///////////

    handleMaestriaNombreProg(event) {
        let tempMaestria = {...this.state.maestria};
        tempMaestria.nombreProg = event.target.value
        this.setState({
            maestria:tempMaestria
        });
    }

    handleMaestriaPais(obj) {
        let tempMaestria = {...this.state.maestria};
        let pais = obj.pais;
        tempMaestria.pais = pais
        this.setState({
            maestria: tempMaestria
        });
    }

    handleMaestriaInstitucion(event) {
        let tempMaestria = {...this.state.maestria};
        tempMaestria.institucion = event.target.value
        this.setState({
            maestria:tempMaestria
        });
    }

    handleMaestriaNombreTitulo(event) {
        let tempMaestria = {...this.state.maestria};
        tempMaestria.nombreTitulo = event.target.value
        this.setState({
            maestria:tempMaestria
        });
    }

    handleMaestriaFecha(date) {
        let tempMaestria = {...this.state.maestria};
        tempMaestria.fechaTitulo = date
        this.setState({
            maestria: tempMaestria
        });
    }

    handleMaestriaNombreTesis(event) {
        let tempMaestria = {...this.state.maestria};
        tempMaestria.tituloTesis = event.target.value
        this.setState({
            maestria:tempMaestria
        });
    }

    handleMaestriaUrlTesis(event) {
        let tempMaestria = {...this.state.maestria};
        tempMaestria.urlTesis = event.target.value
        this.setState({
            maestria:tempMaestria
        });
    }

    ///////////

    handleDoctoradoNombreProg(event) {
        let tempDoctorado = {...this.state.doctorado};
        tempDoctorado.nombreProg = event.target.value
        this.setState({
            doctorado:tempDoctorado
        });
    }

    handleDoctoradoPais(obj) {
        let tempDoctorado = {...this.state.doctorado};
        let pais = obj.pais;
        tempDoctorado.pais = pais
        this.setState({
            doctorado: tempDoctorado
        });
    }

    handleDoctoradoInstitucion(event) {
        let tempTitulo = {...this.state.doctorado};
        tempTitulo.institucion = event.target.value
        this.setState({
            doctorado:tempTitulo
        });
    }

    handleDoctoradoNombreTitulo(event) {
        let tempDoctorado = {...this.state.doctorado};
        tempDoctorado.nombreTitulo = event.target.value
        this.setState({
            doctorado:tempDoctorado
        });
    }

    handleDoctoradoFecha(date) {
        let tempDoctorado = {...this.state.doctorado};
        tempDoctorado.fechaTitulo = date
        this.setState({
            doctorado: tempDoctorado
        });
    }

    handleDoctoradoNombreTesis(event) {
        let tempDoctorado = {...this.state.doctorado};
        tempDoctorado.tituloTesis = event.target.value
        this.setState({
            doctorado:tempDoctorado
        });
    }

    handleDoctoradoUrlTesis(event) {
        let tempDoctorado = {...this.state.doctorado};
        tempDoctorado.urlTesis = event.target.value
        this.setState({
            doctorado:tempDoctorado
        });
    }

    ///////////

    handleDiplomadoNombreProg(event) {
        let tempDiplomado = {...this.state.diplomado};
        tempDiplomado.nombreProg = event.target.value
        this.setState({
            diplomado:tempDiplomado
        });
    }

    handleDiplomadoPais(obj) {
        let tempDiplomado = {...this.state.diplomado};
        let pais = obj.pais;
        tempDiplomado.pais = pais
        this.setState({
            diplomado: tempDiplomado
        });
    }

    handleDiplomadoInstitucion(event) {
        let tempDiplomado = {...this.state.diplomado};
        tempDiplomado.institucion = event.target.value
        this.setState({
            diplomado:tempDiplomado
        });
    }

    handleDiplomadoNombreTitulo(event) {
        let tempDiplomado = {...this.state.diplomado};
        tempDiplomado.nombreTitulo = event.target.value
        this.setState({
            diplomado:tempDiplomado
        });
    }

    handleDiplomadoFecha(date) {
        let tempDiplomado = {...this.state.diplomado};
        tempDiplomado.fechaTitulo = date
        this.setState({
            diplomado: tempDiplomado
        });
    }

    handleDiplomadoNombreTesis(event) {
        let tempDiplomado = {...this.state.diplomado};
        tempDiplomado.tituloTesis = event.target.value
        this.setState({
            diplomado:tempDiplomado
        });
    }

    handleDiplomadoUrlTesis(event) {
        let tempDiplomado = {...this.state.diplomado};
        tempDiplomado.urlTesis = event.target.value
        this.setState({
            diplomado:tempDiplomado
        });
    }

    ///////////

    performPostRequest = ()=> {
        console.log('postrequest:')

        let experiencia=this.state.experiencia;
        //if(experiencia!=null)
        experiencia.forEach(function(entry) {
            delete entry.id;
        });
        let investigaciones=this.state.investigaciones;
        investigaciones.forEach(function(entry) {
            delete entry.id;
        });
        let cargos=this.state.cargos;
        cargos.forEach(function(entry) {
            delete entry.id;
        });
        let premios=this.state.premios;
        premios.forEach(function(entry) {
            delete entry.id;
        });
        let asesorias=this.state.asesorias;
        asesorias.forEach(function(entry) {
            delete entry.id;
        });
        let titulos=this.state.titulos;
        titulos.forEach(function(entry) {
            delete entry.id;
        });
        let maestrias=this.state.maestrias;
        maestrias.forEach(function(entry) {
            delete entry.id;
        });
        let doctorados=this.state.doctorados;
        doctorados.forEach(function(entry) {
            delete entry.id;
        });
        let diplomados=this.state.diplomados;
        diplomados.forEach(function(entry) {
            delete entry.id;
        });

        //let grad_acad=[titulo,maestria,doctorado,diplomado];
        let titulo=this.state.titulos;
        let maestria=this.state.maestrias;
        let doctorado=this.state.doctorados;
        let diplomado=this.state.diplomados;
        let grad_acad=titulo.concat(maestria);
        grad_acad=grad_acad.concat(doctorado);
        grad_acad=grad_acad.concat(diplomado);


        let postulante=
                {
                    nombres: this.state.nombres,
                    apellido_paterno: this.state.aPaterno,
                    apellido_materno: this.state.aMaterno,
                    correo: this.state.email,
                    fecha_nacimiento: this.armarFecha(this.state.fechaNac._d),
                    numero_documento: this.state.numDoc,
                    tipo_documento: this.state.tipoDoc,
                    sexo: this.state.sexo,
                    pais_nacimiento: this.state.paisNac,
                    lugar_nacimiento: this.state.lugarNac,
                    direccion_domicilio: this.state.direccion,
                    pais_domicilio: this.state.nacionalidad,
                    telefono: this.state.telefono,
                    celular: this.state.celular
                };

        console.log('grad_acad:',grad_acad);
        console.log('postulante:',postulante);
        //console.log('docenciaRegistrar:',docenciaRegistrar);
        //console.log('expProfRegistrar:',expProfRegistrar);
        //console.log('investigacionRegistrar:',investigacionRegistrar);
        API.post('convocatoria/convocatoria/postulante/registrar', {
            postulante:
                {
                    nombres: this.state.nombres,
                    apellido_paterno: this.state.aPaterno,
                    apellido_materno: this.state.aMaterno,
                    correo: this.state.email,
                    fecha_nacimiento: this.armarFecha(this.state.fechaNac._d),
                    numero_documento: this.state.numDoc,
                    tipo_documento: this.state.tipoDoc,
                    sexo: this.state.sexo,
                    pais_nacimiento: this.state.paisNac,
                    lugar_nacimiento: this.state.lugarNac,
                    direccion_domicilio: this.state.direccion,
                    pais_domicilio: this.state.nacionalidad,
                    telefono: this.state.telefono,
                    celular: this.state.celular
                },
            id_convocatoria:this.props.match.params.id_convocatoria,
            postulante_experiencia:experiencia,
            postulante_investigacion:investigaciones,
            postulante_docencia_cargo:cargos,
            postulante_docencia_premio:premios,
            postulante_docencia_asesoria:asesorias,
            postulante_grado_academico:grad_acad,

        })
            .then(response => {
                alert("postulante registrado",response.data);
                this.props.history.goBack();
            })
            .catch(error => {
                alert("Error: No se pudo registrar la investigación");
            })


    }

    performNext = ()=> {
        if(this.state.paso==1) {
            //if (this.validator1.allValid()) {
            if (1) {
                this.setState({
                    paso: 2,
                    btnAnterior:true
                });
            } else {
                this.validator1.showMessages();
                // rerender to show messages for the first time
                this.forceUpdate();
            }

        }else if(this.state.paso==2){
            //if (this.validator2.allValid()) {
            if (1) {
                this.setState({
                    paso: 3,
                    btnFinalizar:true
                });
            } else {
                this.validator2.showMessages();
                // rerender to show messages for the first time
                this.forceUpdate();
            }
        }else if(this.state.paso==3){
            let valido=this.validarRequisitos();
            console.log(valido);
            if (valido) {
                console.log('Campos validos');

                this.performPostRequest()
            }else {
                console.log('llenar campos');
                alert("Llenar todos los requisitos");
                // rerender to show messages for the first time
                this.forceUpdate();
            }
        }
    }

    performBack = ()=> {
        if(this.state.paso==2) {
            this.setState({
                paso: 1,
                btnAnterior:false
            });
        }
        else if(this.state.paso==3) {
            this.setState({
                paso: 2,
                btnFinalizar:false
            });
        }
    }

    armarFecha(date) {
        var cadena = "";
        cadena = cadena + date.getFullYear();

        if (date.getMonth() < 9) {
            cadena = cadena + 0 + (date.getMonth() + 1);
        } else {
            cadena = cadena + (date.getMonth() + 1);
        }

        if (date.getDate() < 10) {
            cadena = cadena + 0 + date.getDate();
        } else {
            cadena = cadena + date.getDate();
        }
        console.log(cadena);
        return cadena;
    }

    agregarTitulo = ()=> {
        if (this.tituloValidator.allValid()) {

            let titulo  = {
                id: this.state.numTitulos+1,
                especialidad:this.state.titulo.nombreProg,
                pais:this.state.titulo.pais,
                institucion:this.state.titulo.institucion,
                nombre_titulo:this.state.titulo.nombreTitulo,
                egresado:1,
                fecha_obtencion:this.armarFecha(this.state.titulo.fechaTitulo._d),
                titulo_tesis:this.state.titulo.tituloTesis,
                url_tesis:this.state.titulo.urlTesis,
                archivo_tesis: null,
                grado_academico: "Título",
                premio:null};

            this.setState({
                titulos: [...this.state.titulos, titulo],
                numTitulos:this.state.numTitulos+1
            });
        }else {
            this.tituloValidator.showMessages();
            // rerender to show messages for the first time
            this.forceUpdate();
        }
        console.log('titulos: ',this.state.titulos);
    }

    agregarMaestria = ()=> {
        if (this.maestriaValidator.allValid()) {

            let maestria  = {
                id: this.state.numMaestrias+1,
                especialidad:this.state.maestria.nombreProg,
                pais:this.state.maestria.pais,
                institucion:this.state.maestria.institucion,
                nombre_titulo:this.state.maestria.nombreTitulo,
                egresado:1,
                fecha_obtencion:this.armarFecha(this.state.maestria.fechaTitulo._d),
                titulo_tesis:this.state.maestria.tituloTesis,
                url_tesis:this.state.maestria.urlTesis,
                archivo_tesis: null,
                grado_academico: "Maestría",
                premio:null};

            this.setState({
                maestrias: [...this.state.maestrias, maestria],
                numMaestrias:this.state.numMaestrias+1
            });
        }else {
            this.maestriaValidator.showMessages();
            // rerender to show messages for the first time
            this.forceUpdate();
        }
        console.log('maestrias: ',this.state.maestrias);
    }

    agregarDoctorado = ()=> {
        if (this.doctoradoValidator.allValid()) {

            let doctorado  = {
                id: this.state.numDoctorados+1,
                especialidad:this.state.doctorado.nombreProg,
                pais:this.state.doctorado.pais,
                institucion:this.state.doctorado.institucion,
                nombre_titulo:this.state.doctorado.nombreTitulo,
                egresado:1,
                fecha_obtencion:this.armarFecha(this.state.doctorado.fechaTitulo._d),
                titulo_tesis:this.state.doctorado.tituloTesis,
                url_tesis:this.state.doctorado.urlTesis,
                archivo_tesis: null,
                grado_academico: "Doctorado",
                premio:null};

            this.setState({
                doctorados: [...this.state.doctorados, doctorado],
                numDoctorados:this.state.numDoctorados+1
            });
        }else {
            this.doctoradoValidator.showMessages();
            // rerender to show messages for the first time
            this.forceUpdate();
        }
        console.log('doctorados: ',this.state.doctorados);
    }

    agregarDiplomado = ()=> {
        if (this.diplomadoValidator.allValid()) {

            let diplomado  = {
                id: this.state.numDiplomados+1,
                especialidad:this.state.diplomado.nombreProg,
                pais:this.state.diplomado.pais,
                institucion:this.state.diplomado.institucion,
                nombre_titulo:this.state.diplomado.nombreTitulo,
                egresado:1,
                fecha_obtencion:this.armarFecha(this.state.diplomado.fechaTitulo._d),
                titulo_tesis:this.state.diplomado.tituloTesis,
                url_tesis:this.state.diplomado.urlTesis,
                archivo_tesis: null,
                grado_academico: "Diplomatura",
                premio:null};

            this.setState({
                diplomados: [...this.state.diplomados, diplomado],
                numDiplomados:this.state.numDiplomados+1
            });
        }else {
            this.diplomadoValidator.showMessages();
            // rerender to show messages for the first time
            this.forceUpdate();
        }
        console.log('doctorados: ',this.state.doctorados);
    }

    agregarPremio = ()=> {
        if (this.premiosValidator.allValid()) {
            var premio  = {id: this.state.numPremios+1,archivo_premio:null, url_premio: this.state.premioUrl,descripcion:this.state.premioDescripcion};
            this.setState({
                premios: [...this.state.premios, premio],
                numPremios:this.state.numPremios+1
            });
        }else {
            this.premiosValidator.showMessages();
            // rerender to show messages for the first time
            this.forceUpdate();
        }
        console.log('premios: ',this.state.premios);
    }

    agregarAsesoria = ()=> {
        if (this.asesoriasValidator.allValid()) {
            var asesoria  = {id: this.state.numAsesorias+1, titulo: this.state.asesoriaTitulo,resumen:this.state.asesoriaResumen, fecha_publicacion: this.armarFecha(this.state.asesoriaFPublicacion._d)};
            this.setState({
                asesorias: [...this.state.asesorias, asesoria],
                numAsesorias:this.state.numAsesorias+1
            });
        }else {
            this.asesoriasValidator.showMessages();
            // rerender to show messages for the first time
            this.forceUpdate();
        }
        console.log('asesoria: ',this.state.asesorias);
    }

    agregarCargo = ()=> {
        if (this.cargosValidator.allValid()) {
            var cargo  = {id: this.state.numCargos+1, nombre: this.state.cargoNombre, fecha_inicio: this.armarFecha(this.state.cargoFIni._d),fecha_fin:this.armarFecha(this.state.cargoFFin._d),institucion:this.state.cargoInstitucion,archivo_cargo:null};
            this.setState({
                cargos: [...this.state.cargos, cargo],
                numCargos:this.state.numCargos+1
            });
        }else {
            this.cargosValidator.showMessages();
            // rerender to show messages for the first time
            this.forceUpdate();
        }
        console.log('cargos: ',this.state.cargos);
    }

    agregarInvestigacion = ()=> {
        if (this.invValidator.allValid()) {
            var investigacion  = {id: this.state.numInvestigaciones+1, titulo: this.state.tituloInv, resumen: this.state.resumenInv,fecha:this.armarFecha(this.state.fechaInv._d),archivo_investigacion:null};
            this.setState({
                investigaciones: [...this.state.investigaciones, investigacion],
                numInvestigaciones:this.state.numInvestigaciones+1
            });
        }else {
            this.invValidator.showMessages();
            // rerender to show messages for the first time
            this.forceUpdate();
        }
        console.log('investigaciones: ',this.state.investigaciones);
    }

    agregarExpLaboral = ()=> {
        if (this.expValidator.allValid()) {
            var experienciaNueva  = {id: this.state.numExp+1, institucion: this.state.expInstitucion, descripcion: this.state.expDescripcion,fecha_inicio:this.armarFecha(this.state.expFIni._d),fecha_fin:this.armarFecha(this.state.expFFin._d),archivo_experiencia:null};
            this.setState({
                experiencia: [...this.state.experiencia, experienciaNueva],
                numExp:this.state.numExp+1
            });
        }else {
            this.expValidator.showMessages();
            // rerender to show messages for the first time
            this.forceUpdate();
        }
    }

    validarRequisitos=()=>{
        var valido = true;
        var infoConv=this.state.infoConvocatoria;
        if(infoConv.requiere_docencia_asesoria===1){
            if(this.state.asesorias.length===0){
                valido =false;
            }
        }
        if(infoConv.requiere_docencia_cargo===1){
            if(this.state.cargos.length===0){
                valido =false;
            }
        }
        if(infoConv.requiere_docencia_premio===1){
            if(this.state.premios.length===0){
                valido =false;
            }
        }
        if(infoConv.requiere_experiencia===1){
            if(this.state.experiencia.length===0){
                valido =false;
            }
        }
        if(infoConv.requiere_grado_diplomatura===1){
            if(this.state.diplomados.length===0){
                valido =false;
            }
        }
        if(infoConv.requiere_grado_doctorado===1){
            if(this.state.doctorados.length===0){
                valido =false;
            }
        }
        if(infoConv.requiere_grado_maestria===1){
            if(this.state.maestrias.length===0){
                valido =false;
            }
        }
        if(infoConv.requiere_grado_titulo===1){
            if(this.state.titulos.length===0){
                valido =false;
            }
        }
        if(infoConv.requiere_investigacion===1){
            if(this.state.investigaciones.length===0){
                valido =false;
            }
        }
        return valido;
    }

    render() {

        console.log(this.props)

        console.log(this.state)

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
            clickToSelect: true,
            hideSelectColumn: true,
            bgColor: '#93a3b5'
        };

        const rowEvents = {
        };

        const expColumns = [{
            dataField: 'id',
            text: 'ID',
            hidden: true
        }, {
            dataField: 'institucion',
            text: 'Institucion'
        }, {
            dataField: 'descripcion',
            text: 'Descripcion'
        }];

        const expSelectRow = {
            mode: 'radio',
            clickToSelect: true,
            hideSelectColumn: true,
            bgColor: '#93a3b5'
        };

        const expRowEvents = {
        };

        const cargoColumns = [{
            dataField: 'id',
            text: 'ID',
            hidden: true
        }, {
            dataField: 'nombre',
            text: 'Nombre'
        }, {
            dataField: 'institucion',
            text: 'Institucion'
        }];

        const cargoSelectRow = {
            mode: 'radio',
            clickToSelect: true,
            hideSelectColumn: true,
            bgColor: '#93a3b5'
        };

        const cargoRowEvents = {
        };

        const asesoriaColumns = [{
            dataField: 'id',
            text: 'ID',
            hidden: true
        }, {
            dataField: 'titulo',
            text: 'Titulo'
        }, {
            dataField: 'resumen',
            text: 'Resumen'
        }];

        const asesoriaSelectRow = {
            mode: 'radio',
            clickToSelect: true,
            hideSelectColumn: true,
            bgColor: '#93a3b5'
        };

        const asesoriaRowEvents = {
        };

        const premioColumns = [{
            dataField: 'id',
            text: 'ID',
            hidden: true
        }, {
            dataField: 'url_premio',
            text: 'URL'
        }, {
            dataField: 'descripcion',
            text: 'Descripcion'
        }];

        const premioSelectRow = {
            mode: 'radio',
            clickToSelect: true,
            hideSelectColumn: true,
            bgColor: '#93a3b5'
        };

        const premioRowEvents = {
        };

        const tituloColumns = [{
            dataField: 'id',
            text: 'ID',
            hidden: true
        }, {
            dataField: 'nombre_titulo',
            text: 'Nombre'
        }, {
            dataField: 'titulo_tesis',
            text: 'Titulo tesis'
        }];

        const tituloSelectRow = {
            mode: 'radio',
            clickToSelect: true,
            hideSelectColumn: true,
            bgColor: '#93a3b5'
        };

        const tituloRowEvents = {
        };

        const maestriaColumns = [{
            dataField: 'id',
            text: 'ID',
            hidden: true
        }, {
            dataField: 'nombre_titulo',
            text: 'Nombre'
        }, {
            dataField: 'titulo_tesis',
            text: 'Titulo tesis'
        }];

        const maestriaSelectRow = {
            mode: 'radio',
            clickToSelect: true,
            hideSelectColumn: true,
            bgColor: '#93a3b5'
        };

        const maestriaRowEvents = {
        };

        const doctoradoColumns = [{
            dataField: 'id',
            text: 'ID',
            hidden: true
        }, {
            dataField: 'nombre_titulo',
            text: 'Nombre'
        }, {
            dataField: 'titulo_tesis',
            text: 'Titulo tesis'
        }];

        const doctoradoSelectRow = {
            mode: 'radio',
            clickToSelect: true,
            hideSelectColumn: true,
            bgColor: '#93a3b5'
        };

        const doctoradoRowEvents = {
        };

        const diplomadoColumns = [{
            dataField: 'id',
            text: 'ID',
            hidden: true
        }, {
            dataField: 'nombre_titulo',
            text: 'Nombre'
        }, {
            dataField: 'titulo_tesis',
            text: 'Titulo tesis'
        }];

        const diplomadoSelectRow = {
            mode: 'radio',
            clickToSelect: true,
            hideSelectColumn: true,
            bgColor: '#93a3b5'
        };

        const diplomadoRowEvents = {
        };

        let btnAnterior;
        if (this.state.btnAnterior) {
            btnAnterior = <Button className="btn btn-primary" onClick={this.performBack}>Anterior</Button>
        } else {
            btnAnterior = <label></label>
        }

        let btnSiguiente;
        if (this.state.btnFinalizar) {
            btnSiguiente = <button className="btn btn-primary" onClick={this.performNext}> Finalizar </button>
        } else {
            btnSiguiente = <button className="btn btn-primary" onClick={this.performNext}> Siguiente </button>
        }



        let investigaciones;
        if(this.state.mostrarInvestigaciones) {
            investigaciones = <li><a href="#4" data-toggle="tab">Investigaciones</a></li>
        }

        let gradosAcademicos;
        if(this.state.mostrarMaestria || this.state.mostrarTitulo || this.state.mostrarDiplomatura || this.state.mostrarDoctorado) {
            gradosAcademicos = <li className="active"><a href="#1" data-toggle="tab">Grados Academicos</a></li>
        }

        let docencia;
        if(this.state.mostrarDocencia || this.state.mostrarAsesoriaTesis || this.state.mostrarPremiosDoc) {
            docencia = <li><a href="#2" data-toggle="tab">Docencia</a></li>
        }

        let expLaboral;
        if(this.state.mostrarExpProf) {
            expLaboral=<li><a href="#3" data-toggle="tab">Experiencia Profesional</a></li>
        }


        let tituloProf;
        if(this.state.mostrarTitulo) {
            tituloProf=<li><a href="#1a" data-toggle="tab">Titulo Profesional </a></li>
        }

        let maestria;
        if(this.state.mostrarMaestria) {
            maestria=<li><a href="#1b" data-toggle="tab"> Maestria </a></li>
        }

        let doctorado;
        if(this.state.mostrarDoctorado) {
            doctorado=<li><a href="#1c" data-toggle="tab"> Doctorado </a></li>
        }

        let diplomatura;
        if(this.state.mostrarDiplomatura) {
            diplomatura=<li><a href="#1d" data-toggle="tab"> Diplomatura </a></li>
        }

        let cursosCargo;
        if(this.state.mostrarDocencia) {
            cursosCargo=<li><a href="#2a" data-toggle="tab">Cursos a su Cargo </a></li>
        }

        let asesoria;
        if(this.state.mostrarAsesoriaTesis) {
            asesoria=<li><a href="#2b" data-toggle="tab"> Asesoria de Tesis </a></li>
        }

        let premios;
        if(this.state.mostrarPremiosDoc) {
            premios=<li><a href="#2c" data-toggle="tab"> Premios a la Docencia </a></li>
        }



        let cuerpo;
        if (this.state.paso == 1) {
            cuerpo =
                <div className="panel-body">
                    <div className="col-md-12">
                        <h5> Información General </h5>
                        <div className="form-group">
                            <div className="col-md-offset-0 col-md-6">
                                <label> Nombres: </label>
                                <input type="text" className="form-control" value={this.state.nombres}
                                       onChange={this.handleNombres}/>
                                {this.validator1.message('nombres', this.state.nombres, 'required', false, {required: 'Este campo es obligatorio'})}
                                <br></br>
                                <label> Primer apellido: </label>
                                <input type="text" className="form-control" value={this.state.aPaterno}
                                       onChange={this.handleAPaterno}/>
                                {this.validator1.message('aPaterno', this.state.aPaterno, 'required', false, {required: 'Este campo es obligatorio'})}
                                <br></br>
                                <label> Segundo apellido: </label>
                                <input type="text" className="form-control" value={this.state.aMaterno}
                                       onChange={this.handleAMaterno}/>
                                {this.validator1.message('aMaterno', this.state.aMaterno, 'required', false, {required: 'Este campo es obligatorio'})}
                                <br></br>
                                <label> Sexo: </label>
                                <br></br>
                                <label>
                                    <input
                                        name="Masculino"
                                        type="checkbox"
                                        checked={this.state.checkM}
                                        onChange={this.handleCheckM}/>
                                    &nbsp;Masculino
                                </label>
                                <label> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </label>
                                <label>
                                    <input
                                        name="Femenino"
                                        type="checkbox"
                                        checked={this.state.checkF}
                                        onChange={this.handleCheckF}/>
                                    &nbsp;Femenino
                                </label>
                                {this.validator1.message('sexo', this.state.sexo, 'required', false, {required: 'Este campo es obligatorio'})}
                                <br></br>
                                <br></br>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-12">
                        <h5> Nacimiento </h5>
                        <div className="form-group">
                            <div className="col-md-offset-0 col-md-6">
                                <label> Pais: </label>
                                <Select
                                    value={ this.state.paisNac }
                                    onChange={ this.handlePaisNac }
                                    valueKey={ "pais" }
                                    labelKey={ "pais" }
                                    options={ this.state.paises }
                                    clearable={ false }
                                />
                                {this.validator1.message('paisNac', this.state.paisNac, 'required', false, {required: 'Este campo es obligatorio'})}
                                <br></br>
                                <label> Lugar: </label>
                                <input type="text" className="form-control" value={this.state.lugarNac}
                                       onChange={this.handleLugarNac}/>
                                {this.validator1.message('lugarNac', this.state.lugarNac, 'required', false, {required: 'Este campo es obligatorio'})}
                                <br></br>
                                <label> Fecha de nacimiento: </label>
                                <DatePicker
                                    dateFormat="DD/MM/YYYY"
                                    selected={this.state.fechaNac}
                                    onChange={this.handleFNac}
                                />
                                {this.validator1.message('fechaNac', this.state.fechaNac, 'required', false, {required: 'Este campo es obligatorio'})}
                                <br></br>
                                <br></br>
                            </div>
                        </div>
                    </div>
                </div>

            //********parte 2:
        }else if(this.state.paso == 2){
            cuerpo =
                <div className="panel-body">

                    <div className="col-md-12">
                        <h5> Documento </h5>

                        <div className="form-group">
                            <div className="col-md-offset-0 col-md-7">
                                <label> Tipo documento: </label>
                                <Select
                                    value={ this.state.tipoDoc }
                                    onChange={ this.handleTipoDoc }
                                    valueKey={ "tipo_documento" }
                                    labelKey={ "tipo_documento" }
                                    options={ this.state.tipoDocList }
                                    clearable={ false }
                                />
                                {this.validator2.message('tipoDoc', this.state.tipoDoc, 'required', false, {required: 'Este campo es obligatorio'})}
                                <br></br>
                                <label> Número documento: </label>
                                <input type="text" className="form-control" value={this.state.numDoc}
                                       onChange={this.handleNumDoc}/>
                                {this.validator2.message('numDoc', this.state.numDoc, 'required', false, {required: 'Este campo es obligatorio'})}
                                <br></br>
                                <br></br>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-12">
                        <h5> Domicilio </h5>

                        <div className="form-group">
                            <div className="col-md-offset-0 col-md-7">
                                <label> Pais: </label>
                                <Select
                                    value={ this.state.nacionalidad }
                                    onChange={ this.handleNacionalidad }
                                    valueKey={ "pais" }
                                    labelKey={ "pais" }
                                    options={ this.state.paises }
                                    clearable={ false }
                                />
                                {this.validator2.message('nacionalidad', this.state.nacionalidad, 'required', false, {required: 'Este campo es obligatorio'})}
                                <br></br>
                                <label> Dirección: </label>
                                <input type="text" className="form-control" value={this.state.direccion}
                                       onChange={this.handleDireccion}/>
                                {this.validator2.message('direccion', this.state.direccion, 'required', false, {required: 'Este campo es obligatorio'})}
                                <br></br>
                                <br></br>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-12">
                        <h5> Contacto </h5>

                        <div className="form-group">
                            <div className="col-md-offset-0 col-md-7">
                                <label> Telefono: </label>
                                <input type="text" className="form-control" value={this.state.telefono}
                                       onChange={this.handleTelefono}/>
                                {this.validator2.message('telefono', this.state.telefono, 'required', false, {required: 'Este campo es obligatorio'})}
                                <br></br>
                                <label> Celular: </label>
                                <input type="text" className="form-control" value={this.state.celular}
                                       onChange={this.handleCelular}/>
                                {this.validator2.message('celular', this.state.celular, 'required', false, {required: 'Este campo es obligatorio'})}
                                <br></br>
                                <label> Correo electrónico: </label>
                                <input type="text" className="form-control" value={this.state.email}
                                       onChange={this.handleEmail}/>
                                {this.validator2.message('email', this.state.email, 'required|email', false, {required: 'Este campo es obligatorio'})}
                                <br></br>
                                <br></br>
                            </div>
                        </div>
                    </div>
                </div>
            //Parte 3:
        }else if(this.state.paso == 3){
            cuerpo=
                <div>
                    <ul className="nav nav-tabs">
                        {gradosAcademicos}
                        {docencia}
                        {expLaboral}
                        {investigaciones}
                    </ul>
                    <div className="tab-content clearfix m-t-md">
                        <div className="tab-pane active row" id="1">
                            <div className="form-group col-md-2 m-r-n">
                                <ul className="nav nav-pills nav-stacked">
                                    {tituloProf}
                                    {maestria}
                                    {doctorado}
                                    {diplomatura}
                                </ul>
                            </div>
                            <div className="form-group col-md-10 m-l-n">
                                <div className="tab-content clearfix">
                                    <div className="tab-pane row" id="1a">
                                        <div className="form-group">
                                            <div className="col-md-offset-1 col-md-7">
                                                <label> Nombre del programa o especialidad: </label>
                                                <input type="text" className="form-control" value={this.state.titulo.nombreProg}
                                                       onChange={this.handleTituloNombreProg}/>
                                                {this.tituloValidator.message('titulo.nombreProg', this.state.titulo.nombreProg, 'required', false, {required: 'Este campo es obligatorio'})}

                                                <label> Pais: </label>
                                                <Select
                                                    value={ this.state.titulo.pais }
                                                    onChange={ this.handleTituloPais }
                                                    valueKey={ "pais" }
                                                    labelKey={ "pais" }
                                                    options={ this.state.paises }
                                                    clearable={ false }
                                                />
                                                {this.tituloValidator.message('titulo.pais', this.state.titulo.pais, 'required', false, {required: 'Este campo es obligatorio'})}

                                                <label> Institución educativa: </label>
                                                <input type="text" className="form-control" value={this.state.titulo.institucion}
                                                          onChange={this.handleTituloInstitucion}/>
                                                {this.tituloValidator.message('titulo.institucion', this.state.titulo.institucion, 'required', false, {required: 'Este campo es obligatorio'})}

                                                <label> Nombre del título: </label>
                                                <input type="text" className="form-control" value={this.state.titulo.nombreTitulo}
                                                          onChange={this.handleTituloNombreTitulo}/>
                                                {this.tituloValidator.message('titulo.nombreTitulo', this.state.titulo.nombreTitulo, 'required', false, {required: 'Este campo es obligatorio'})}

                                                <label> Fecha de obtención del título: </label>
                                                <DatePicker
                                                    className="form-control"
                                                    dateFormat="DD/MM/YYYY"
                                                    selected={this.state.titulo.fechaTitulo}
                                                    onChange={this.handleTituloFecha}
                                                />
                                                {this.tituloValidator.message('titulo.fechaTitulo', this.state.titulo.fechaTitulo, 'required', false, {required: 'Este campo es obligatorio'})}

                                                <label> Título de la tesis: </label>
                                                <input type="text" className="form-control" value={this.state.titulo.tituloTesis}
                                                          onChange={this.handleTituloNombreTesis}/>
                                                {this.tituloValidator.message('titulo.tituloTesis', this.state.titulo.tituloTesis, 'required', false, {required: 'Este campo es obligatorio'})}

                                                <label> URL de la tesis: </label>
                                                <input type="text" className="form-control" value={this.state.titulo.urlTesis}
                                                          onChange={this.handleTituloUrlTesis}/>
                                                {this.tituloValidator.message('titulo.urlTesis', this.state.titulo.urlTesis, 'required', false, {required: 'Este campo es obligatorio'})}

                                                <label> Archivo adjunto: </label>
                                                <input type="file" name="datafile"/>
                                                <br></br>
                                                <div className="m-t-md">
                                                    <BootstrapTable keyField='id' data={this.state.titulos} columns={tituloColumns}  rowEvents={tituloRowEvents} selectRow={tituloSelectRow}/>
                                                </div>
                                                <br></br>
                                                <div className="panel-footer text-right">
                                                    <button className="btn btn-primary" onClick={this.agregarTitulo}> Agregar Titulo</button>
                                                </div>
                                                <br></br>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="tab-pane row" id="1b">
                                        <div className="form-group">
                                            <div className="col-md-offset-1 col-md-7">
                                                <label> Nombre del programa o especialidad: </label>
                                                <input type="text" className="form-control" value={this.state.maestria.nombreProg}
                                                       onChange={this.handleMaestriaNombreProg}/>
                                                {this.maestriaValidator.message('maestria.nombreProg', this.state.maestria.nombreProg, 'required', false, {required: 'Este campo es obligatorio'})}

                                                <label> Pais: </label>
                                                <Select
                                                    value={ this.state.maestria.pais }
                                                    onChange={ this.handleMaestriaPais }
                                                    valueKey={ "pais" }
                                                    labelKey={ "pais" }
                                                    options={ this.state.paises }
                                                    clearable={ false }
                                                />
                                                {this.maestriaValidator.message('maestria.pais', this.state.maestria.pais, 'required', false, {required: 'Este campo es obligatorio'})}

                                                <label> Institución educativa: </label>
                                                <input type="text" className="form-control" value={this.state.maestria.institucion}
                                                       onChange={this.handleMaestriaInstitucion}/>
                                                {this.maestriaValidator.message('maestria.institucion', this.state.maestria.institucion, 'required', false, {required: 'Este campo es obligatorio'})}

                                                <label> Nombre del título: </label>
                                                <input type="text" className="form-control" value={this.state.maestria.nombreTitulo}
                                                       onChange={this.handleMaestriaNombreTitulo}/>
                                                {this.maestriaValidator.message('maestria.nombreTitulo', this.state.maestria.nombreTitulo, 'required', false, {required: 'Este campo es obligatorio'})}

                                                <label> Fecha de obtención del título: </label>
                                                <DatePicker
                                                    className="form-control"
                                                    dateFormat="DD/MM/YYYY"
                                                    selected={this.state.maestria.fechaTitulo}
                                                    onChange={this.handleMaestriaFecha}
                                                />
                                                {this.maestriaValidator.message('maestria.fechaTitulo', this.state.maestria.fechaTitulo, 'required', false, {required: 'Este campo es obligatorio'})}

                                                <label> Título de la tesis: </label>
                                                <input type="text" className="form-control" value={this.state.maestria.tituloTesis}
                                                       onChange={this.handleMaestriaNombreTesis}/>
                                                {this.maestriaValidator.message('maestria.tituloTesis', this.state.maestria.tituloTesis, 'required', false, {required: 'Este campo es obligatorio'})}

                                                <label> URL de la tesis: </label>
                                                <input type="text" className="form-control" value={this.state.maestria.urlTesis}
                                                       onChange={this.handleMaestriaUrlTesis}/>
                                                {this.maestriaValidator.message('maestria.urlTesis', this.state.maestria.urlTesis, 'required', false, {required: 'Este campo es obligatorio'})}

                                                <label> Archivo adjunto: </label>
                                                <input type="file" name="datafile"/>
                                                <br></br>
                                                <div className="m-t-md">
                                                    <BootstrapTable keyField='id' data={this.state.maestrias} columns={maestriaColumns}  rowEvents={maestriaRowEvents} selectRow={maestriaSelectRow}/>
                                                </div>
                                                <br></br>
                                                <div className="panel-footer text-right">
                                                    <button className="btn btn-primary" onClick={this.agregarMaestria}> Agregar Maestria</button>
                                                </div>
                                                <br></br>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="tab-pane row" id="1c">
                                        <div className="form-group">
                                            <div className="col-md-offset-1 col-md-7">
                                                <label> Nombre del programa o especialidad: </label>
                                                <input type="text" className="form-control" value={this.state.doctorado.nombreProg}
                                                       onChange={this.handleDoctoradoNombreProg}/>
                                                {this.doctoradoValidator.message('doctorado.nombreProg', this.state.doctorado.nombreProg, 'required', false, {required: 'Este campo es obligatorio'})}

                                                <label> Pais: </label>
                                                <Select
                                                    value={ this.state.doctorado.pais }
                                                    onChange={ this.handleDoctoradoPais }
                                                    valueKey={ "pais" }
                                                    labelKey={ "pais" }
                                                    options={ this.state.paises }
                                                    clearable={ false }
                                                />
                                                {this.doctoradoValidator.message('doctorado.pais', this.state.doctorado.pais, 'required', false, {required: 'Este campo es obligatorio'})}

                                                <label> Institución educativa: </label>
                                                <input type="text" className="form-control" value={this.state.doctorado.institucion}
                                                       onChange={this.handleDoctoradoInstitucion}/>
                                                {this.doctoradoValidator.message('doctorado.institucion', this.state.doctorado.institucion, 'required', false, {required: 'Este campo es obligatorio'})}

                                                <label> Nombre del título: </label>
                                                <input type="text" className="form-control" value={this.state.doctorado.nombreTitulo}
                                                       onChange={this.handleDoctoradoNombreTitulo}/>
                                                {this.doctoradoValidator.message('doctorado.nombreTitulo', this.state.doctorado.nombreTitulo, 'required', false, {required: 'Este campo es obligatorio'})}

                                                <label> Fecha de obtención del título: </label>
                                                <DatePicker
                                                    className="form-control"
                                                    dateFormat="DD/MM/YYYY"
                                                    selected={this.state.doctorado.fechaTitulo}
                                                    onChange={this.handleDoctoradoFecha}
                                                />
                                                {this.doctoradoValidator.message('doctorado.fechaTitulo', this.state.doctorado.fechaTitulo, 'required', false, {required: 'Este campo es obligatorio'})}

                                                <label> Título de la tesis: </label>
                                                <input type="text" className="form-control" value={this.state.doctorado.tituloTesis}
                                                       onChange={this.handleDoctoradoNombreTesis}/>
                                                {this.doctoradoValidator.message('doctorado.tituloTesis', this.state.doctorado.tituloTesis, 'required', false, {required: 'Este campo es obligatorio'})}

                                                <label> URL de la tesis: </label>
                                                <input type="text" className="form-control" value={this.state.doctorado.urlTesis}
                                                       onChange={this.handleDoctoradoUrlTesis}/>
                                                {this.doctoradoValidator.message('doctorado.urlTesis', this.state.doctorado.urlTesis, 'required', false, {required: 'Este campo es obligatorio'})}


                                                <label> Archivo adjunto: </label>
                                                <input type="file" name="datafile"/>
                                                <br></br>
                                                <div className="m-t-md">
                                                    <BootstrapTable keyField='id' data={this.state.doctorados} columns={doctoradoColumns}  rowEvents={doctoradoRowEvents} selectRow={doctoradoSelectRow}/>
                                                </div>
                                                <br></br>
                                                <div className="panel-footer text-right">
                                                    <button className="btn btn-primary" onClick={this.agregarDoctorado}> Agregar Doctorado</button>
                                                </div>
                                                <br></br>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="tab-pane row" id="1d">
                                        <div className="form-group">
                                            <div className="col-md-offset-1 col-md-7">
                                                <label> Nombre del programa o especialidad: </label>
                                                <input type="text" className="form-control" value={this.state.diplomado.nombreProg}
                                                       onChange={this.handleDiplomadoNombreProg}/>
                                                {this.diplomadoValidator.message('diplomado.nombreProg', this.state.diplomado.nombreProg, 'required', false, {required: 'Este campo es obligatorio'})}

                                                <label> Pais: </label>
                                                <Select
                                                    value={ this.state.diplomado.pais }
                                                    onChange={ this.handleDiplomadoPais }
                                                    valueKey={ "pais" }
                                                    labelKey={ "pais" }
                                                    options={ this.state.paises }
                                                    clearable={ false }
                                                />
                                                {this.diplomadoValidator.message('diplomado.pais', this.state.diplomado.pais, 'required', false, {required: 'Este campo es obligatorio'})}

                                                <label> Institución educativa: </label>
                                                <input type="text" className="form-control" value={this.state.diplomado.institucion}
                                                       onChange={this.handleDiplomadoInstitucion}/>
                                                {this.diplomadoValidator.message('diplomado.institucion', this.state.diplomado.institucion, 'required', false, {required: 'Este campo es obligatorio'})}

                                                <label> Nombre del título: </label>
                                                <input type="text" className="form-control" value={this.state.diplomado.nombreTitulo}
                                                       onChange={this.handleDiplomadoNombreTitulo}/>
                                                {this.diplomadoValidator.message('diplomado.nombreTitulo', this.state.diplomado.nombreTitulo, 'required', false, {required: 'Este campo es obligatorio'})}

                                                <label> Fecha de obtención del título: </label>
                                                <DatePicker
                                                    className="form-control"
                                                    dateFormat="DD/MM/YYYY"
                                                    selected={this.state.diplomado.fechaTitulo}
                                                    onChange={this.handleDiplomadoFecha}
                                                />
                                                {this.diplomadoValidator.message('diplomado.fechaTitulo', this.state.diplomado.fechaTitulo, 'required', false, {required: 'Este campo es obligatorio'})}

                                                <label> Título de la tesis: </label>
                                                <input type="text" className="form-control" value={this.state.diplomado.tituloTesis}
                                                       onChange={this.handleDiplomadoNombreTesis}/>
                                                {this.diplomadoValidator.message('diplomado.tituloTesis', this.state.diplomado.tituloTesis, 'required', false, {required: 'Este campo es obligatorio'})}

                                                <label> URL de la tesis: </label>
                                                <input type="text" className="form-control" value={this.state.diplomado.urlTesis}
                                                       onChange={this.handleDiplomadoUrlTesis}/>
                                                {this.diplomadoValidator.message('diplomado.urlTesis', this.state.diplomado.urlTesis, 'required', false, {required: 'Este campo es obligatorio'})}


                                                <label> Archivo adjunto: </label>
                                                <input type="file" name="datafile"/>
                                                <br></br>
                                                <div className="m-t-md">
                                                    <BootstrapTable keyField='id' data={this.state.diplomados} columns={diplomadoColumns}  rowEvents={diplomadoRowEvents} selectRow={diplomadoSelectRow}/>
                                                </div>
                                                <br></br>
                                                <div className="panel-footer text-right">
                                                    <button className="btn btn-primary" onClick={this.agregarDiplomado}> Agregar Diplomado</button>
                                                </div>
                                                <br></br>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="tab-pane" id="2">
                            <div className="form-group col-md-2 m-r-n">
                                <ul className="nav nav-pills nav-stacked">
                                    {cursosCargo}
                                    {asesoria}
                                    {premios}
                                </ul>
                            </div>
                            <div className="form-group col-md-10 m-l-n">
                                <div className="tab-content clearfix">
                                    <div className="tab-pane row" id="2a">
                                        <div className="form-group">
                                            <div className="col-md-offset-1 col-md-7">
                                                <label> Nombre: </label>
                                                <input type="text" className="form-control" value={this.state.cargoNombre}
                                                       onChange={this.handleCargoNombre}/>
                                                {this.cargosValidator.message('cargoNombre', this.state.cargoNombre, 'required', false, {required: 'Este campo es obligatorio'})}

                                                <label> Institución: </label>
                                                <input type="text" className="form-control" value={this.state.cargoInstitucion}
                                                          onChange={this.handleCargoInstitucion}/>
                                                {this.cargosValidator.message('cargoInstitucion', this.state.cargoInstitucion, 'required', false, {required: 'Este campo es obligatorio'})}

                                                <label> Fecha Inicio: </label>
                                                <DatePicker
                                                    className="form-control"
                                                    dateFormat="DD/MM/YYYY"
                                                    selected={this.state.cargoFIni}
                                                    onChange={this.handleCargoFIni}
                                                />
                                                {this.cargosValidator.message('cargoFIni', this.state.cargoFIni, 'required', false, {required: 'Este campo es obligatorio'})}

                                                <label> Fecha Fin: </label>
                                                <DatePicker
                                                    className="form-control"
                                                    dateFormat="DD/MM/YYYY"
                                                    selected={this.state.cargoFFin}
                                                    onChange={this.handleCargoFFin}
                                                />
                                                {this.cargosValidator.message('cargoFFin', this.state.cargoFFin, 'required', false, {required: 'Este campo es obligatorio'})}

                                                <label> Archivo: </label>
                                                <input type="file" name="datafile"/>
                                                <br></br>
                                                <div className="m-t-md">
                                                    <BootstrapTable keyField='id' data={this.state.cargos} columns={cargoColumns}  rowEvents={cargoRowEvents} selectRow={cargoSelectRow}/>
                                                </div>
                                                <br></br>
                                                <div className="panel-footer text-right">
                                                    <button className="btn btn-primary" onClick={this.agregarCargo}> Agregar Cargo</button>
                                                </div>
                                                <br></br>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="tab-pane row" id="2b">
                                        <div className="form-group">
                                            <div className="col-md-offset-1 col-md-7">
                                                <label> Titulo: </label>
                                                <input type="text" className="form-control" value={this.state.asesoriaTitulo}
                                                       onChange={this.handleAsesoriaTitulo}/>
                                                {this.asesoriasValidator.message('asesoriaTitulo', this.state.asesoriaTitulo, 'required', false, {required: 'Este campo es obligatorio'})}

                                                <label> Resumen: </label>
                                                <textarea type="text" className="form-control" value={this.state.asesoriaResumen}
                                                       onChange={this.handleAsesoriaResumen}/>
                                                {this.asesoriasValidator.message('asesoriaResumen', this.state.asesoriaResumen, 'required', false, {required: 'Este campo es obligatorio'})}

                                                <label> Fecha: </label>
                                                <DatePicker
                                                    className="form-control"
                                                    dateFormat="DD/MM/YYYY"
                                                    selected={this.state.asesoriaFPublicacion}
                                                    onChange={this.handleAsesoriaFPublicacion}
                                                />
                                                {this.asesoriasValidator.message('asesoriaFPublicacion', this.state.asesoriaFPublicacion, 'required', false, {required: 'Este campo es obligatorio'})}
                                                <br></br>
                                                <div className="m-t-md">
                                                    <BootstrapTable keyField='id' data={this.state.asesorias} columns={asesoriaColumns}  rowEvents={asesoriaRowEvents} selectRow={asesoriaSelectRow}/>
                                                </div>
                                                <br></br>
                                                <div className="panel-footer text-right">
                                                    <button className="btn btn-primary" onClick={this.agregarAsesoria}> Agregar Asesoria</button>
                                                </div>
                                                <br></br>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="tab-pane row" id="2c">
                                        <div className="form-group">
                                            <div className="col-md-offset-1 col-md-7">
                                                <label> URL: </label>
                                                <input type="text" className="form-control" value={this.state.premioUrl}
                                                       onChange={this.handlePremioUrl}/>
                                                {this.premiosValidator.message('premioUrl', this.state.premioUrl, 'required', false, {required: 'Este campo es obligatorio'})}

                                                <label> Descripcion: </label>
                                                <textarea type="text" className="form-control" value={this.state.premioDescripcion}
                                                          onChange={this.handlePremioDescripcion}/>
                                                {this.premiosValidator.message('premioDescripcion', this.state.premioDescripcion, 'required', false, {required: 'Este campo es obligatorio'})}
                                                <label> Archivo: </label>
                                                <input type="file" name="datafile"/>
                                                <br></br>
                                                <div className="m-t-md">
                                                    <BootstrapTable keyField='id' data={this.state.premios} columns={premioColumns}  rowEvents={premioRowEvents} selectRow={premioSelectRow}/>
                                                </div>
                                                <br></br>
                                                <div className="panel-footer text-right">
                                                    <button className="btn btn-primary" onClick={this.agregarPremio}> Agregar Premio</button>
                                                </div>
                                                <br></br>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="tab-pane" id="3">
                            <div className="form-group">
                                <div className="col-md-offset-1 col-md-7">
                                    <label> Institucion: </label>
                                    <input type="text" className="form-control" value={this.state.expInstitucion}
                                           onChange={this.handleExpInstitucion}/>
                                    {this.expValidator.message('expInstitucion', this.state.expInstitucion, 'required', false, {required: 'Este campo es obligatorio'})}

                                    <label> Descripcion: </label>
                                    <textarea type="text" className="form-control" value={this.state.expDescripcion}
                                              onChange={this.handleExpDescripcion}/>
                                    {this.expValidator.message('expDescripcion', this.state.expDescripcion, 'required', false, {required: 'Este campo es obligatorio'})}

                                    <label> Fecha Inicio: </label>
                                    <DatePicker
                                        className="form-control"
                                        dateFormat="DD/MM/YYYY"
                                        selected={this.state.expFIni}
                                        onChange={this.handleExpFIni}
                                    />
                                    {this.expValidator.message('expFIni', this.state.expFIni, 'required', false, {required: 'Este campo es obligatorio'})}

                                    <label> Fecha Fin: </label>
                                    <DatePicker
                                        className="form-control"
                                        dateFormat="DD/MM/YYYY"
                                        selected={this.state.expFFin}
                                        onChange={this.handleExpFFin}
                                    />
                                    {this.expValidator.message('expFFin', this.state.expFFin, 'required', false, {required: 'Este campo es obligatorio'})}

                                    <br></br>
                                    <div className="m-t-md">
                                        <BootstrapTable keyField='id' data={this.state.experiencia} columns={expColumns}  rowEvents={expRowEvents} selectRow={expSelectRow}/>
                                    </div>
                                    <br></br>
                                    <div className="panel-footer text-right">
                                        <button className="btn btn-primary" onClick={this.agregarExpLaboral}> Agregar Experiencia Laboral</button>
                                    </div>
                                    <br></br>
                                </div>
                            </div>
                        </div>
                        <div className="tab-pane" id="4">
                            <div className="form-group">
                                <div className="col-md-offset-1 col-md-7">
                                    <label> Titulo: </label>
                                    <input type="text" className="form-control" value={this.state.tituloInv}
                                           onChange={this.handleTituloInv}/>
                                    {this.invValidator.message('tituloInv', this.state.tituloInv, 'required', false, {required: 'Este campo es obligatorio'})}

                                    <label> Resumen: </label>
                                    <textarea type="text" className="form-control" value={this.state.resumenInv}
                                              onChange={this.handleResumenInv}/>
                                    {this.invValidator.message('resumenInv', this.state.resumenInv, 'required', false, {required: 'Este campo es obligatorio'})}

                                    <label> Fecha: </label>
                                    <DatePicker
                                        className="form-control"
                                        dateFormat="DD/MM/YYYY"
                                        selected={this.state.fechaInv}
                                        onChange={this.handleFInv}
                                    />
                                    {this.invValidator.message('fechaInv', this.state.fechaInv, 'required', false, {required: 'Este campo es obligatorio'})}

                                    <label> Archivo: </label>
                                    <input type="file" name="datafile"/>
                                    <br></br>
                                    <div className="m-t-md">
                                        <BootstrapTable keyField='id' data={this.state.investigaciones} columns={columns}  rowEvents={rowEvents} selectRow={selectRow}/>
                                    </div>
                                    <br></br>
                                    <div className="panel-footer text-right">
                                        <button className="btn btn-primary" onClick={this.agregarInvestigacion}> Agregar Investigación</button>
                                    </div>
                                    <br></br>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
        }

        return (
            <BaseContainer>
                <div className="panel col-lg-offset-2 col-lg-8 col-md-12 col-sm-12">
                    <div className="panel-heading">
                        <header className="page-header m-t-sm">
                            <a className="btn btn-default pull-right" onClick={this.props.history.goBack}> Volver </a>
                            <p className="h2 m-b-sm"> Registro de Postulante </p>
                        </header>
                    </div>
                    {cuerpo}
                    <div className="panel-footer text-right">
                        {btnAnterior}
                        <label> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </label>
                        {btnSiguiente}
                    </div>
                </div>
            </BaseContainer>
        );
    }
}

export default registroPostulante;