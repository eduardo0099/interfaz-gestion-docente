import React, {Component} from 'react';
import {Route} from 'react-router-dom';
import axios from "axios/index";
import BaseContainer from "../BaseContainer";
import API from '../../api'
import DashboardTabs from './DashboardTabs'

class Dashboard extends Component {

    constructor(props) {
        super(props);
        this.state = {}
    }

    componentDidMount() {

    }

    render() {
        return (
            <div>
                <Route exact path={`${this.props.match.path}`} render={() =>
                    <BaseContainer>
                        <div className="panel col-lg-offset-2 col-lg-8 col-md-12 col-sm-12">
                            <div className="panel-heading m-b-n">
                                <header className="page-header m-b-n">
                                    <a className="btn btn-default pull-right"
                                       onClick={this.props.history.goBack}> Volver </a>
                                    <p className="h2"> Dashboard </p>
                                </header>
                            </div>
                            <div className="panel-body m-t-n">
                                <div className="m-t-lg">
                                    <DashboardTabs/>
                                </div>
                            </div>
                        </div>
                    </BaseContainer>
                }/>
            </div>
        );
    }
}

export default Dashboard;