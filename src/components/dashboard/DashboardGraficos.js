import React from 'react';
import DashboardCursos from './DashboardCursos';
import DashboardInvestigaciones from "./DashboardInvestigaciones";
import DashboardAyudaEconomica from "./DashboardAyudaEconomica";
import DashboardCargaHoraria from "./DashboardCargaHoraria";
import { AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid, Brush, Legend,
    ReferenceArea, ReferenceLine, ReferenceDot, ResponsiveContainer,
    LabelList, Label ,Line, LineChart,Bar,BarChart,PieChart,Pie,Cell,Sector} from 'recharts';
import API from "../../api";
import 'create-react-class';

const data = [
    { name: 'Page A', uv: 4000, pv: 2400, amt: 2400, time: 1 },
    { name: 'Page B', uv: 3000, pv: 1398, amt: 2210, time: 3 },
    { name: 'Page C', uv: 2000, pv: 9800, amt: 2290, time: 9 },
    { name: 'Page D', uv: 2780, pv: 3908, amt: 2000, time: 10 },
    { name: 'Page E', uv: 2500, pv: 4800, amt: 2181, time: 12 },
    { name: 'Page F', uv: 1220, pv: 3800, amt: 2500, time: 16 },
    { name: 'Page G', uv: 2300, pv: 4300, amt: 2100, time: 18 },
];

function getRandomColor() {
    let letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

const data2 = [{name: 'Group A', value: 123}, {name: 'Group B', value: 300},
    {name: 'Group C', value: 300}, {name: 'Group D', value: 200}, {name: 'Group E', value: 200}];

const data3 = [{name: 'Group A', val: 123}, {name: 'Group B', val: 300},
    {name: 'Group C', val: 300}, {name: 'Group D', val: 200}, {name: 'Group E', val: 200}];

//const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const RADIAN = Math.PI / 180;

const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x  = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy  + radius * Math.sin(-midAngle * RADIAN);

    return (
        <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} 	dominantBaseline="central">
            {`${(percent * 100).toFixed(0)}%`}
        </text>
    );
};

const renderActiveShape = (props) => {
    console.log('props:',props);
    const RADIAN = Math.PI / 180;
    const { cx, cy, midAngle, innerRadius, outerRadius, startAngle, endAngle,
        fill, payload, percent, value } = props;
    const sin = Math.sin(-RADIAN * midAngle);
    const cos = Math.cos(-RADIAN * midAngle);
    const sx = cx + (outerRadius + 10) * cos;
    const sy = cy + (outerRadius + 10) * sin;
    const mx = cx + (outerRadius + 30) * cos;
    const my = cy + (outerRadius + 30) * sin;
    const ex = mx + (cos >= 0 ? 1 : -1) * 22;
    const ey = my;
    const textAnchor = cos >= 0 ? 'start' : 'end';

    return (
        <g>
            <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>{payload.name}</text>
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
            <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={fill} fill="none"/>
            <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none"/>
            <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} textAnchor={textAnchor} fill="#333">{`PV ${value}`}</text>
            <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} dy={18} textAnchor={textAnchor} fill="#999">
                {`(Rate ${(percent * 100).toFixed(2)}%)`}
            </text>
        </g>
    );
};


const COLORS=[];
for (let i = 0; i < data2.length; i++) {
    COLORS.push(getRandomColor());
}

class DashboardGraficos extends React.Component {

    constructor(props){
        super(props);

        this.state = {
            activeIndex: 0,

        }

        this.onPieEnter = this.onPieEnter.bind(this);
    }


    onPieEnter(data,index) {
        this.setState({
            activeIndex: index,
        });
    }
    /*
        componentDidMount() {
            this.findCicloActual();
            this.allCiclos();
        }*/

    render() {

        return(
            <div>
                <LineChart
                    width={400}
                    height={400}
                    data={data}
                    margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
                >
                    <XAxis dataKey="name" />
                    <Tooltip />
                    <CartesianGrid stroke="#f5f5f5" />
                    <Line type="monotone" dataKey="uv" stroke="#ff7300" yAxisId={0} />
                    <Line type="monotone" dataKey="pv" stroke="#387908" yAxisId={1} />
                </LineChart>

                <BarChart width={600} height={300} data={data}
                          margin={{top: 5, right: 30, left: 20, bottom: 5}}>
                    <CartesianGrid strokeDasharray="3 3"/>
                    <XAxis dataKey="name"/>
                    <YAxis/>
                    <Tooltip/>
                    <Legend />
                    <Bar dataKey="pv" fill="#8884d8" />
                    <Bar dataKey="uv" fill="#82ca9d" />
                </BarChart>

                <PieChart width={800} height={400} onMouseEnter={this.onPieEnter}>
                    <Pie
                        data={data3}
                        cx={300}
                        cy={200}
                        labelLine={false}
                        label={renderCustomizedLabel}
                        outerRadius={80}
                        fill="#8884d8"
                    >
                        {
                            data.map((entry, index) => <Cell fill={COLORS[index % COLORS.length]}/>)
                        }
                    </Pie>
                </PieChart>

                <PieChart width={800} height={400}>
                    <Pie
                        activeIndex={this.state.activeIndex}
                        activeShape={renderActiveShape}
                        data={data2}
                        cx={300}
                        cy={200}
                        innerRadius={60}
                        outerRadius={80}
                        fill="#8884d8"
                        onMouseEnter={this.onPieEnter}
                    >
                        {
                            data.map((entry, index) => <Cell fill={COLORS[index % COLORS.length]}/>)
                        }
                    </Pie>
                </PieChart>

            </div>

        )
    }
}

export default DashboardGraficos;