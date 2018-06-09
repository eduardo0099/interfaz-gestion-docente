import React, {Component} from 'react';

class DashboardTabs extends Component {

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

                    </div>
                    <div className="tab-pane" id="2">

                    </div>
                    <div className="tab-pane" id="3">

                    </div>
                    <div className="tab-pane" id="4">

                    </div>
                    <div className="tab-pane" id="5">

                    </div>
                </div>
            </div>
        )
    }
}

export default DashboardTabs;