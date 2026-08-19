require('dotenv').config();
const express = require('express');
const axios = require('axios');

const app = express();

app.set('view engine', 'pug');

app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const PRIVATE_APP_ACCESS = process.env.PRIVATE_APP_ACCESS;
const CUSTOM_OBJECT_TYPE = process.env.CUSTOM_OBJECT_TYPE;

// GET homepage ("/") - retrieve all Book records and display them in a table
app.get('/', async (req, res) => {

    const searchBooksEndpoint = `https://api.hubapi.com/crm/v3/objects/${CUSTOM_OBJECT_TYPE}/search`;
    const searchBody = {
        properties: ['name', 'author', 'genre'],
        sorts: [{ propertyName: 'hs_createdate', direction: 'DESCENDING' }],
        limit: 100
    };
    const headers = {
        Authorization: `Bearer ${PRIVATE_APP_ACCESS}`,
        'Content-Type': 'application/json'
    };

    try {
        const resp = await axios.post(searchBooksEndpoint, searchBody, { headers });
        const data = resp.data.results;
        res.render('homepage', { title: 'Books | Integrating With HubSpot I Practicum', data });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error retrieving Book records');
    }

});

// GET "/update-cobj" - render the form used to create a new Book record
app.get('/update-cobj', async (req, res) => {

    res.render('updates', { title: 'Add new book | Integrating With HubSpot I Practicum' });

});

// POST "/update-cobj" - create a new Book record with the data submitted from the form
app.post('/update-cobj', async (req, res) => {

    const newBook = {
        properties: {
            "name": req.body.name,
            "author": req.body.author,
            "genre": req.body.genre
        }
    };

    const createBookEndpoint = `https://api.hubapi.com/crm/v3/objects/${CUSTOM_OBJECT_TYPE}`;
    const headers = {
        Authorization: `Bearer ${PRIVATE_APP_ACCESS}`,
        'Content-Type': 'application/json'
    };

    try {
        await axios.post(createBookEndpoint, newBook, { headers });
        res.redirect('/');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error creating Book record');
    }

});

app.listen(3000, () => console.log('Listening on http://localhost:3000'));
