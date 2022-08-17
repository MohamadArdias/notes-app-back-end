const { nanoid } = require('nanoid');
const notes = require('./notes');

const addNoteHandler = (request, h) => {
    // deklarasi varible
    const { title, tags, body } = request.payload; // client
   
    const id = nanoid(16);
    const createdAt = new Date().toISOString();
    const updatedAt = createdAt;
   
    const newNote = {
        title, tags, body, id, createdAt, updatedAt,
    };
   
    notes.push(newNote);
   
    const isSuccess = notes.filter((note) => note.id === id).length > 0;
   
    // menambahkan catatan dengan ID
    if (isSuccess) {
        const response = h.response({
            status: 'success', //jika berhasil 
            message: 'Catatan berhasil ditambahkan',
            data: {
                noteId: id,
            },
        });
        response.code(201);
        return response;
    }
    const response = h.response({
        status: 'fail', //jika gagal
        message: 'Catatan gagal ditambahkan',
    });
    response.code(500);

    console.log(response);
    
    return response;
};
// menampilkan semua data pada "notes"
const getAllNotesHandler = () => ({
    status: 'success',
    data: {
        notes,
    },
});

// menampilkan detail data berdasarkan ID
const getNoteByIdHandler = (request, h) => {
    const { id } = request.params;

    const note = notes.filter((n) => n.id === id)[0]; //mengambil nilai dari "notes"

    if (note !== undefined) {
        return {
          status: 'success', //jika berhasil akan mengambil data dari array 
          data: {
            note,
          },
        };
      }

    const response = h.response({
        status: 'fail', //respon untuk gagal
        message: 'Catatan tidak ditemukan',
    });
    response.code(404);
    return response;
};

// mengedit data yang dipilih berdasarkan ID
const editNoteByIdHandler = (request, h) => {
    const { id } = request.params;

    const { title, tags, body } = request.payload; // mendapatkan nilai baru (perubahan) dari client
    const updatedAt = new Date().toISOString();

    // proses indexing array
    const index = notes.findIndex((note) => note.id === id); //mendapatkan index

    if (index !== -1) {
        notes[index] = {
            ...notes[index],
            title,
            tags,
            body,
            updatedAt,
        };
        const response = h.response({
            status: 'success',
            message: 'Catatan berhasil diperbarui',
        });
        response.code(200);
        return response;
    }

    const response = h.response({
        status: 'fail',
        message: 'Gagal memperbarui catatan. Id tidak ditemukan',
    });
    response.code(404);
    return response;

};

// menghapus data berdasarkan ID yang dipilih
const deleteNoteByIdHandler = (request, h) => {
    const { id } = request.params;

    const index = notes.findIndex((note) => note.id === id);
    if (index !== -1) {
        notes.splice(index, 1);
        const response = h.response({
            status: 'success',
            message: 'Catatan berhasil dihapus',
        });
        response.code(200);
        return response;
    }

    const response = h.response({
        status: 'fail',
        message: 'Catatan gagal dihapus. Id tidak ditemukan',
    });
    response.code(404);
    return response;
 
};


module.exports = { 
    addNoteHandler, 
    getAllNotesHandler, 
    getNoteByIdHandler, 
    editNoteByIdHandler, 
    deleteNoteByIdHandler
};