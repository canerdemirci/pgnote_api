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
        },
    },
}