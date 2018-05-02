import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.css';
import App from './containers/App';
import ListaActividades from './components/ListaActividades';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<ListaActividades />, document.getElementById('root'));
registerServiceWorker();
