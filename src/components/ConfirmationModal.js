import React, {Component} from 'react';

class ConfirmationModal extends Component {

    constructor(props){
        super(props);
    }

    render(){
        return(
            <Modal
                {...this.props}
                bsSize="small"
                aria-labelledby="contained-modal-title-sm"
            >
                <Modal.Body>
                    Seguro que desea eliminar el registro ?
                </Modal.Body>
                <Modal.Footer>
                    <button className="btn btn-primary" onClick={this.props.onHide}>ok</button>
                    <button className="btn btn-link" onClick={this.props.onHide}>cancelar</button>
                </Modal.Footer>
            </Modal>
        )

    }
}

export default ConfirmationModal;
