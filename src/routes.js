const { 
  addNoteHandler, 
  getAllNotesHandler, 
  getNoteByIdHandler, 
  editNoteByIdHandler,
  deleteNoteByIdHandler
   
} = require('./handler');

const routes = [
  // menambahkan data
  {
    method: 'POST',
    path: '/notes',
    handler: addNoteHandler,
  },
  // menampilkan data
  {
    method: 'GET',
    path: '/notes',
    handler: getAllNotesHandler,
  },
  // menampilkan detail data berdasarkan ID
  {
    method: 'GET',
    path: '/notes/{id}',
    handler: getNoteByIdHandler ,
  },
  // merubah isi data berdaarkan ID (upload)
  {
    method: 'PUT',
    path: '/notes/{id}',
    handler: editNoteByIdHandler  ,
  },
  // menghapus data berdasarkan ID
  {
    method: 'DELETE',
    path: '/notes/{id}',
    handler: deleteNoteByIdHandler  ,
  },
];

module.exports = routes;