import API from './api';

export function download(file_id){
  API.get('general/descargarArchivo?id=' + file_id, {
    responseType: 'arraybuffer'
  }).then(response => {
    require('downloadjs')(response.data, response.headers['authorization'], response.headers['content-type']);
  })
}
