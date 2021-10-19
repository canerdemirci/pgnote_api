require('dotenv').config();

const db = require('./database/db');

const NOTE_COLORS = [
    '#fb8787',
    '#7ce1ef',
    '#e27eff',
    '#85fb86',
    '#fb882e',
    '#fbf47f',
    '#f9f9f9'
];

var sampleNotes = [];

const words = [
    'lorem', 'ipsum', 'dolor', 'sit', 'amet', 'consectetur',
    'adipiscing', 'elit', 'curabitur', 'vel', 'hendrerit', 'libero',
    'eleifend', 'blandit', 'nunc', 'ornare', 'odio', 'ut',
    'orci', 'gravida', 'imperdiet', 'nullam', 'purus', 'lacinia',
    'a', 'pretium', 'quis', 'congue', 'praesent', 'sagittis', 
    'laoreet', 'auctor', 'mauris', 'non', 'velit', 'eros',
    'dictum', 'proin', 'accumsan', 'sapien', 'nec', 'massa',
    'volutpat', 'venenatis', 'sed', 'eu', 'molestie', 'lacus',
    'quisque', 'porttitor', 'ligula', 'dui', 'mollis', 'tempus',
    'at', 'magna', 'vestibulum', 'turpis', 'ac', 'diam',
    'tincidunt', 'id', 'condimentum', 'enim', 'sodales', 'in',
    'hac', 'habitasse', 'platea', 'dictumst', 'aenean', 'neque',
    'fusce', 'augue', 'leo', 'eget', 'semper', 'mattis', 
    'tortor', 'scelerisque', 'nulla', 'interdum', 'tellus', 'malesuada',
    'rhoncus', 'porta', 'sem', 'aliquet', 'et', 'nam',
    'suspendisse', 'potenti', 'vivamus', 'luctus', 'fringilla', 'erat',
    'donec', 'justo', 'vehicula', 'ultricies', 'varius', 'ante',
    'primis', 'faucibus', 'ultrices', 'posuere', 'cubilia', 'curae',
    'etiam', 'cursus', 'aliquam', 'quam', 'dapibus', 'nisl',
    'feugiat', 'egestas', 'class', 'aptent', 'taciti', 'sociosqu',
    'ad', 'litora', 'torquent', 'per', 'conubia', 'nostra',
    'inceptos', 'himenaeos', 'phasellus', 'nibh', 'pulvinar', 'vitae',
    'urna', 'iaculis', 'lobortis', 'nisi', 'viverra', 'arcu',
    'morbi', 'pellentesque', 'metus', 'commodo', 'ut', 'facilisis',
    'felis', 'tristique', 'ullamcorper', 'placerat', 'aenean', 'convallis',
    'sollicitudin', 'integer', 'rutrum', 'duis', 'est', 'etiam',
    'bibendum', 'donec', 'pharetra', 'vulputate', 'maecenas', 'mi',
    'fermentum', 'consequat', 'suscipit', 'aliquam', 'habitant', 'senectus',
    'netus', 'fames', 'quisque', 'euismod', 'curabitur', 'lectus',
    'elementum', 'tempor', 'risus', 'cras'
];

function produceDummyText(wordLength) {
    let txt = '';

    for (let i=0; i<wordLength; i++) {
        txt += words[Math.floor(Math.random() * 178)] + ' ';
    }

    return txt;
}

for (let i=0; i<100; i++) {
    sampleNotes.push(
        {
            title: produceDummyText(3),
            description: produceDummyText(35),
            color: NOTE_COLORS[Math.floor(Math.random() * 7)]
        }
    );
}

function fillBySampleNotes() {
    for (let i=0; i<sampleNotes.length; i++) {
        db.query(`INSERT INTO notes (title, description, colorhex) VALUES ($1, $2, $3)`, 
            [sampleNotes[i].title, sampleNotes[i].description, sampleNotes[i].color]);
    }
}

function deleteAll() {
    db.query('DELETE FROM notes');
}

//deleteAll();
fillBySampleNotes();