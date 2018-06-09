import React, {Component} from 'react';
import {Modal} from 'react-bootstrap';

class ConfirmationModal extends Component {

    constructor(props) {
        super(props);
        this.state = {
            show: false
        }
    }

    open = () => {
        this.setState({show: true});
    }

    close = () => {
        this.setState({show: false});
    }

    render() {
        return (
            <Modal show={this.state.show}>
                <div className="modal-body">
                    { this.props.message }
                </div>
                <div className="modal-footer">
                    <button className="btn btn-link" onClick={ this.close }>Cancelar</button>
                    <button className="btn btn-success" onClick={ this.props.okaction }>Si, seguro</button>
                </div>
            </Modal>
        )

    }
}

export default ConfirmationModal;
