import React from 'react';
import DashboardCursos from './DashboardCursos';
import DashboardInvestigaciones from "./DashboardInvestigaciones";
import DashboardAyudaEconomica from "./DashboardAyudaEconomica";
import DashboardCargaHoraria from "./DashboardCargaHoraria";
import { AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid, Brush, Legend,
    ReferenceArea, ReferenceLine, ReferenceDot, ResponsiveContainer,
    LabelList, Label ,Line, LineChart} from 'recharts';
import DashboardGraficos from "./DashboardGraficos";


class DashboardTabs extends React.Component {

    render() {
        return (
            <div>
                <ul className="nav nav-tabs">
                    <li className="active"><a href="#1" data-toggle="tab"> Dashboard </a></li>
                    <li><a href="#2" data-toggle="tab"> Cursos </a></li>
                    <li><a href="#3" data-toggle="tab"> Investigaciones </a></li>
                    <li><a href="#4" data-toggle="tab"> Ayuda Economica </a></li>
                    <li><a href="#5" data-toggle="tab"> Carga Horaria </a></li>
                </ul>
                <div className="tab-content clearfix m-t-md">
                    <div className="tab-pane active row" id="1">
                        <DashboardGraficos/>
                    </div>
                    <div className="tab-pane" id="2">
                        <DashboardCursos
                        ruta={this.props.ruta}/>
                    </div>
                    <div className="tab-pane" id="3">
                        <DashboardInvestigaciones/>
                    </div>
                    <div className="tab-pane" id="4">
                        <DashboardAyudaEconomica/>
                    </div>
                    <div className="tab-pane" id="5">
                        <DashboardCargaHoraria/>
                    </div>
                </div>
            </div>
        )
    }
}

export default DashboardTabs;