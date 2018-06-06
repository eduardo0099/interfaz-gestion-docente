import React from 'react';
import API from "../api";

class Home  extends React.Component {

    uploadFile(e) {
        let file = e.target.files[0];
        let formData = new FormData();
        formData.append('file', file);
        API.post('tests/upload',
            formData,
            {
                headers: {'Content-Type': 'multipart/form-data'}
            }
        ).then(function () {
            console.log('Archivo subido');
        }).catch(function () {
            console.log('Error al subir el archivo');
        });
    }

    render () {
        return (
            <div>
                <p>Contenido inicial</p>
                <p>.</p>
                <p>.</p>
                <p>.</p>
                <p>.</p>
                <p>.</p>
                <p>.</p>
                <p>.</p>
                <p>.</p>
                <p>.</p>
                <p>.</p>
                <p>.</p>
                <p>.</p>
                <p>.</p>
                <p>.</p>
                <div className="panel-body">
                    <label>Files
                        <input type="file" id="files" ref="files" onChange={this.uploadFile}/>
                    </label>
                </div>
                <p>.</p>
                <p>.</p>
                <p>.</p>
                <p>.</p>
                <p>.</p>
                <p>.</p>
                <p>.</p>
                <p>.</p>
                <p>.</p>
                <p>.</p>
                <p>.</p>
                <p>.</p>
                <p>Fin de contenido inicial</p>

            </div>
        );
    }
};

export default Home;