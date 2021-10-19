const db = require('./db');
const noteModel = require('./models/note');

module.exports = {
    get: async function(id) {
        let query = `SELECT * FROM ${noteModel.name} WHERE ${noteModel.columns.id.name} = $1`;

        const note = await db.query(query, [id]);

        if (note.rowCount == 0)
            return null;
        
        return note.rows[0];
    },
    getAll: async function(limit, offset) {
        let query = `SELECT * FROM ${noteModel.name} 
            ORDER BY ${noteModel.columns.createdAt.name} DESC LIMIT $1 OFFSET $2`;

        const notes = await db.query(query, [limit, offset]);

        if (notes.rowCount < 1)
            return null;
        
        return notes.rows;
    },
    search: async function(like) {
        let query = `SELECT * FROM ${noteModel.name} 
            WHERE ${noteModel.columns.title.name} LIKE '%${like}%' 
            OR ${noteModel.columns.description.name} LIKE '%${like}%'`;

        const notes = await db.query(query);

        if (notes.rowCount < 1)
            return null;
        
        return notes.rows;
    },
    create: async function(note) {
        let query = `INSERT INTO ${noteModel.name} (
                ${noteModel.columns.title.name},
                ${noteModel.columns.description.name},
                ${noteModel.columns.color.name}
            ) VALUES ($1, $2, $3) RETURNING *`;

        const result = await db.query(query, [note.title, note.description, note.color]);

        if (!result) return null;

        return result.rows[0];
    },
    delete: async function(id) {
        let query = `DELETE FROM ${noteModel.name} WHERE ${noteModel.columns.id.name} = $1`;

        const result = await db.query(query, [id]);

        if (result.rowCount == 0)
            return false;
        
        return true;
    },
    update: async function(note) {
        let query = `UPDATE ${noteModel.name} SET ${noteModel.columns.title.name} = $1, ${noteModel.columns.description.name} = $2, 
            ${noteModel.columns.color.name} = $3, ${noteModel.columns.updatedAt.name} = NOW()::DATE WHERE ${noteModel.columns.id.name} = $4`;

        const result = await db.query(query, [note.title, note.description, note.color, note.id]);

        if (result.rowCount == 0)
            return false;
        
        return true;
    }
}