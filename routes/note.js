const router = require('express').Router();
const notesTable = require('../database/models/notes');

function mapNote(note) {
    return {
        id: note.note_id,
        title: note.title,
        description: note.description,
        color: note.colorhex,
        createdAt: note.created_at,
        updatedAt: note.updated_at
    };
}

router.get('/:id', async (req, res, next) => {
    try {
        const { id } = req.params;

        let note = await notesTable.get(id);

        if (note)
            note = mapNote(note);

        if (!note)
            return res.status(204).send();
        
        return res.status(200).json(note);
    } catch (error) {
        console.error(error);
        next();
    }
});

router.get('/', async (req, res, next) => {
    try {
        const { page, limit } = req.query;

        let notes = await notesTable.getAll(limit, (page - 1) * limit);

        if (notes)
            notes = notes.map(n => mapNote(n));

        if (!notes)
            return res.status(204).send();
        
        return res.status(200).json(notes);
    } catch (error) {
        console.error(error);
        next();
    }
});

router.post('/', async (req, res, next) => {
    const note = req.body;

    try {
        let createdNote = await notesTable.create(note);
        
        if (createdNote)
            createdNote = mapNote(createdNote);

        if (!createdNote)
            return next();
        
        return res.status(201).json(createdNote);
    } catch (error) {
        console.error(error);

        if (note.title.length > 150) {
            return res.status(400).send('Title can be 150 characters maximum.');
        }

        next();
    }
});

router.delete('/:id', async (req, res, next) => {
    try {
        const { id } = req.params;

        const result = await notesTable.delete(id);

        if (!result)
            return next();
        
        return res.status(204).send();
    } catch (error) {
        console.error(error);
        next();
    }
});

router.put('/:id', async (req, res, next) => {
    try {
        const note = req.body;

        const result = await notesTable.update(note);

        if (!result)
            return next();
        
        return res.status(204).send();
    } catch (error) {
        console.error(error);
        next();
    }
});

module.exports = router;