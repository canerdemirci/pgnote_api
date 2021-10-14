const db = require('../db');

module.exports = {
    name: 'notes',
    shortName: 'no',
    columns: {
        id: {
            name: 'note_id',
            notnull: true,
            primary: true
        },
        title: {
            name: 'title',
            maxLength: 150,
        },
        description: {
            name: 'description'
        },
        color: {
            name: 'colorhex',
            default: '000'
        },
        createdAt: {
            name: 'created_at',
        },
        updatedAt: {
            name: 'updated_at'
        }
    },
    get: async function(id) {
        let query = `SELECT * FROM ${this.name} WHERE ${this.columns.id.name} = $1`;

        const note = await db.query(query, [id]);

        if (note.rowCount == 0)
            return null;
        
        return note.rows[0];
    },
    getAll: async function(limit, offset) {
        let query = `SELECT * FROM ${this.name} ORDER BY ${this.columns.createdAt.name} DESC LIMIT $1 OFFSET $2`;

        const notes = await db.query(query, [limit, offset]);

        if (notes.rowCount < 1)
            return null;
        
        return notes.rows;
    },
    create: async function(note) {
        let query = `INSERT INTO ${this.name} (
                ${this.columns.title.name},
                ${this.columns.description.name},
                ${this.columns.color.name}
            ) VALUES ($1, $2, $3) RETURNING *`;

        const result = await db.query(query, [note.title, note.description, note.color]);

        if (!result) return null;

        return result.rows[0];
    },
    delete: async function(id) {
        let query = `DELETE FROM ${this.name} WHERE ${this.columns.id.name} = $1`;

        const result = await db.query(query, [id]);

        if (result.rowCount == 0)
            return false;
        
        return true;
    },
    update: async function(note) {
        let query = `UPDATE ${this.name} SET ${this.columns.title.name} = $1, ${this.columns.description.name} = $2, 
            ${this.columns.color.name} = $3, ${this.columns.updatedAt.name} = NOW()::DATE WHERE ${this.columns.id.name} = $4`;

        const result = await db.query(query, [note.title, note.description, note.color, note.id]);

        if (result.rowCount == 0)
            return false;
        
        return true;
    }
}