
const express = require('express');
const app = express();
const Joi = require('joi');

app.use(express.json());

// Genre database
const genres = [
    { id: 1, name: 'Action' },
    { id: 2, name: 'SciFi' },
    { id: 3, name: 'Fantasy' },
    { id: 4, name: 'Romantic Comedy' },
    { id: 5, name: 'Documentary' },
];

const PATH_ROOT = '/';
const PATH_GENRES = '/api/genres';
const PATH_GENRE_BY_ID = '/api/genres/:id';


// Welcome user
app.get(PATH_ROOT, (req, res) => {
    res.send('Welcome to VIDLY movie service!');
});


// Get all genres
app.get(PATH_GENRES, (req, res) => {
    res.send(genres);
});


// Get single genre
app.get(PATH_GENRE_BY_ID, (req, res) => {
    const genre = containsGenre(parseInt(req.params.id)); 
    if(!genre) return;

    res.send(genre);
});


// Create single genre
app.post(PATH_GENRES, (req, res) => {
    const { error } = validateGenre(req.body);
    if (error) return res.status(400).send(`Bad Request. ${error.details[0].message}`);

    const genre = {
        id: genres.length + 1,
        name: req.body.name,
    };
    genres.push(genre);
    res.send(genre);
});


// Delete single genre
app.delete(PATH_GENRE_BY_ID, (req, res) => {
    const genre = containsGenre(parseInt(req.params.id)); 
    if(!genre) return;

    const index = genres.indexOf(genre);
    genres.splice(index, 1);
    res.send(genre);
});


// Update single genre
app.put(PATH_GENRE_BY_ID, (req, res) => {
    const genre = containsGenre(parseInt(req.params.id)); 
    if(!genre) return;

    const { error } = validateGenre(req.body);
    if (error) return res.status(400).send(`Bad Request. ${error.details[0].message}`);

    const index = genres.indexOf(genre);
    genres[index].name = req.body.name;
    res.send(genres[index]);
});


function containsGenre(id) {
    const genre = genres.find(c => c.id === id);
    if(!genre) {
        res.status(404).send(`The specified id (${id}) does not exist.`);
        return genre;
    }

    return genre;
}


function validateGenre(genre) {
    const schema = {
        name: Joi.string().min(3)
    };

    return Joi.validate(genre, schema);
}


// Setup listener
const port = process.env.PORT || 3000; 
app.listen(port, console.log(`Listening on port ${port}...`));