import React from 'react';
import {Bar, BarChart, CartesianGrid, Cell, Legend, Line, LineChart, Pie, PieChart, ResponsiveContainer, Sector, Tooltip, XAxis, YAxis} from 'recharts';
import 'create-react-class';
import API from "../../api";


function getRandomColor() {
    let letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i ++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];
COLORS.push(getRandomColor());
COLORS.push(getRandomColor());
COLORS.push(getRandomColor());
COLORS.push(getRandomColor());

const renderActiveShape = (props) => {
    //console.log('props:', props);
    const RADIAN = Math.PI / 180;
    const {
        cx, cy, midAngle, innerRadius, outerRadius, startAngle, endAngle,
        fill, payload, percent, value
    } = props;
    const sin = Math.sin(- RADIAN * midAngle);
    const cos = Math.cos(- RADIAN * midAngle);
    const sx = cx + (outerRadius + 10) * cos;
    const sy = cy + (outerRadius + 10) * sin;
    const mx = cx + (outerRadius + 30) * cos;
    const my = cy + (outerRadius + 30) * sin;
    const ex = mx + (cos >= 0 ? 1 : - 1) * 22;
    const ey = my;
    const textAnchor = cos >= 0 ? 'start' : 'end';

    return (
        <g>
            <text x={cx} y={cy} dy={-5} textAnchor="middle" fill={fill}>{payload.name}</text>
            <text x={cx} y={cy} dy={10} textAnchor="middle" fill={fill}>{`Value ${value}`}</text>
            <text x={cx} y={cy} dy={25} textAnchor="middle" fill={fill}>
                {`(Rate ${(percent * 100).toFixed(2)}%)`}
            </text>
            <Sector
                cx={cx}
                cy={cy}
                innerRadius={innerRadius}
                outerRadius={outerRadius}
                startAngle={startAngle}
                endAngle={endAngle}
                fill={fill}
            />
            <Sector
                cx={cx}
                cy={cy}
                startAngle={startAngle}
                endAngle={endAngle}
                innerRadius={outerRadius + 6}
                outerRadius={outerRadius + 10}
                fill={fill}
            />
            <circle r={2} fill={fill} stroke="none"/>
        </g>
    );
};

/*
const COLORS = [];
for (let i = 0; i < data2.length; i ++) {
    COLORS.push(getRandomColor());
}*/

class DashboardGraficos extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            seccion:this.props.seccion,

            activeIndex: 0,
            activeIndexDTP: 0,
            dataDocentesTipoDepartamento: [],

            activeIndexATD: 0,
            dataActividadesTipoDepartamento: [],

            activeIndexAEED: 0,
            dataApoyoEconomicoEstadoDepartamento: [],

            activeIndexCED: 0,
            dataConvocatoriaEstadoDepartamento: [],

        }

        this.onPieEnter = this.onPieEnter.bind(this);
        this.onPieEnterDTP = this.onPieEnterDTP.bind(this);
        this.onPieEnterATD = this.onPieEnterATD.bind(this);
        this.onPieEnterAEED = this.onPieEnterAEED.bind(this);
        this.onPieEnterCED = this.onPieEnterCED.bind(this);



    }


    onPieEnter(data, index) {
        this.setState({
            activeIndex: index
        });
    }


    onPieEnterDTP(data, index) {
        this.setState({
            activeIndexDTP: index
        });
    }


    onPieEnterATD(data, index) {
        this.setState({
            activeIndexATD: index
        });
    }

    onPieEnterAEED(data, index) {
        this.setState({
            activeIndexAEED: index
        });
    }

    onPieEnterCED(data, index) {
        this.setState({
            activeIndexCED: index
        });
    }

    componentDidMount() {
        console.log('seccion: ',this.props.seccion.id);
        this.obtenerDocentesTipoDepartamento();
        this.obtenerActividadesTipoDepartamento();
        this.obtenerApoyoEconomicoEstadoDepartamento();
        this.obtenerConvocatoriaEstadoDepartamento();
    }

    componentWillReceiveProps=(nextProps)=> {

        console.log('nextprops: ',nextProps);
        if(nextProps.seccion.id!==0) {
            this.obtenerDocentesTipoSeccion(nextProps);
            this.obtenerActividadesTipoSeccion(nextProps);
            this.obtenerApoyoEconomicoEstadoSeccion(nextProps);
            this.obtenerConvocatoriaEstadoSeccion(nextProps);
        }else{
            this.obtenerDocentesTipoDepartamento();
            this.obtenerActividadesTipoDepartamento();
            this.obtenerApoyoEconomicoEstadoDepartamento();
            this.obtenerConvocatoriaEstadoDepartamento();
        }
    }



    obtenerDocentesTipoDepartamento(){
        API.get('/dashboard/docentesTipoDepartamento')
            .then(response => {
                console.log('response:',response);
                this.setState({ dataDocentesTipoDepartamento: response.data });
            }).catch(error => {
            console.log(`Error al obtener datos `, error);
        });
    }

    obtenerActividadesTipoDepartamento(){
        API.get('/dashboard/actividadesTipoDepartamento')
            .then(response => {
                console.log('response:',response);
                this.setState({ dataActividadesTipoDepartamento: response.data });
            }).catch(error => {
            console.log(`Error al obtener datos `, error);
        });
    }

    obtenerApoyoEconomicoEstadoDepartamento(){
        API.get('/dashboard/apoyoEconomicoEstadoDepartamento')
            .then(response => {
                console.log('response:',response);
                this.setState({ dataApoyoEconomicoEstadoDepartamento: response.data });
            }).catch(error => {
            console.log(`Error al obtener datos `, error);
        });
    }

    obtenerConvocatoriaEstadoDepartamento(){
        API.get('/dashboard/convocatoriaEstadoDepartamento')
            .then(response => {
                console.log('response:',response);
                this.setState({ dataConvocatoriaEstadoDepartamento: response.data });
            }).catch(error => {
            console.log(`Error al obtener datos `, error);
        });
    }


    obtenerDocentesTipoSeccion(nextProps){
        API.get('/dashboard/docentesTipoSeccion', {
            params: {
                idSeccion: nextProps.seccion.id,
            }
        })
            .then(response => {
                console.log('response:',response);
                this.setState({ dataDocentesTipoDepartamento: response.data });
            }).catch(error => {
            console.log(`Error al obtener datos `, error);
        });
    }

    obtenerActividadesTipoSeccion(nextProps){
        API.get('/dashboard/actividadesTipoSeccion', {
            params: {
                idSeccion: nextProps.seccion.id,
            }
        })
            .then(response => {
                console.log('response:',response);
                this.setState({ dataActividadesTipoDepartamento: response.data });
            }).catch(error => {
            console.log(`Error al obtener datos `, error);
        });
    }

    obtenerApoyoEconomicoEstadoSeccion(nextProps){
        API.get('/dashboard/apoyoEconomicoEstadoSeccion', {
            params: {
                idSeccion: nextProps.seccion.id,
            }
        })
            .then(response => {
                console.log('response:',response);
                this.setState({ dataApoyoEconomicoEstadoDepartamento: response.data });
            }).catch(error => {
            console.log(`Error al obtener datos `, error);
        });
    }

    obtenerConvocatoriaEstadoSeccion(nextProps){
        API.get('/dashboard/convocatoriaEstadoSeccion', {
            params: {
                idSeccion: nextProps.seccion.id,
            }
        })
            .then(response => {
                console.log('response:',response);
                //this.setState({ dataConvocatoriaEstadoDepartamento: response.data });
            }).catch(error => {
            console.log(`Error al obtener datos `, error);
        });
    }

    render() {
        console.log('seccion: ',this.props.seccion);

        return (
            <div>

                <div className="card-row">
                    <div className="card-graph">
                        <ResponsiveContainer height={350}>
                            <PieChart width={800} height={400}>
                                <Pie
                                    activeIndex={this.state.activeIndexCED}
                                    activeShape={renderActiveShape}
                                    data={this.state.dataConvocatoriaEstadoDepartamento}
                                    cx={160}
                                    cy={160}
                                    innerRadius={60}
                                    outerRadius={80}
                                    fill="#8884d8"
                                    onMouseEnter={this.onPieEnterCED}
                                >
                                    {
                                        this.state.dataConvocatoriaEstadoDepartamento.map((entry, index) => <Cell fill={COLORS[index % COLORS.length]}/>)
                                    }
                                </Pie>
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                    <div className="card-graph">
                        <ResponsiveContainer height={350}>
                            <PieChart width={800} height={400}>
                                <Pie
                                    activeIndex={this.state.activeIndexDTP}
                                    activeShape={renderActiveShape}
                                    data={this.state.dataDocentesTipoDepartamento}
                                    cx={160}
                                    cy={160}
                                    innerRadius={60}
                                    outerRadius={80}
                                    fill="#8884d8"
                                    onMouseEnter={this.onPieEnterDTP}
                                >
                                    {
                                        this.state.dataDocentesTipoDepartamento.map((entry, index) => <Cell fill={COLORS[index % COLORS.length]}/>)
                                    }
                                </Pie>
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                <div className="card-row">
                    <div className="card-graph">
                        <ResponsiveContainer height={350}>
                            <PieChart width={800} height={400}>
                                <Pie
                                    activeIndex={this.state.activeIndexAEED}
                                    activeShape={renderActiveShape}
                                    data={this.state.dataApoyoEconomicoEstadoDepartamento}
                                    cx={160}
                                    cy={160}
                                    innerRadius={60}
                                    outerRadius={80}
                                    fill="#8884d8"
                                    onMouseEnter={this.onPieEnterAEED}
                                >
                                    {
                                        this.state.dataApoyoEconomicoEstadoDepartamento.map((entry, index) => <Cell fill={COLORS[index % COLORS.length]}/>)
                                    }
                                </Pie>
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                    <div className="card-graph">
                        <ResponsiveContainer height={350}>
                            <PieChart width={800} height={400}>
                                <Pie
                                    activeIndex={this.state.activeIndexATD}
                                    activeShape={renderActiveShape}
                                    data={this.state.dataActividadesTipoDepartamento}
                                    cx={160}
                                    cy={160}
                                    innerRadius={60}
                                    outerRadius={80}
                                    fill="#8884d8"
                                    onMouseEnter={this.onPieEnterATD}
                                >
                                    {
                                        this.state.dataActividadesTipoDepartamento.map((entry, index) => <Cell fill={COLORS[index % COLORS.length]}/>)
                                    }
                                </Pie>
                            </PieChart>
                        </ResponsiveContainer>
                    </div>

                </div>
            </div>

        )
    }
}

export default DashboardGraficos;