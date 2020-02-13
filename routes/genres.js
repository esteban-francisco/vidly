const express = require('express');
const router = express.Router();
const Joi = require('joi');


// Genre database
const genres = [
    { id: 1, name: 'Action' },
    { id: 2, name: 'SciFi' },
    { id: 3, name: 'Fantasy' },
    { id: 4, name: 'Romantic Comedy' },
    { id: 5, name: 'Documentary' },
];


// Get all genres
router.get('/', (req, res) => {
    res.send(genres);
});


// Get single genre
router.get('/:id', (req, res) => {
    const genre = containsGenre(parseInt(req.params.id)); 
    if(!genre) return;

    res.send(genre);
});


// Create single genre
router.post('/', (req, res) => {
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
router.delete('/:id', (req, res) => {
    const genre = containsGenre(parseInt(req.params.id)); 
    if(!genre) return;

    const index = genres.indexOf(genre);
    genres.splice(index, 1);
    res.send(genre);
});


// Update single genre
router.put('/:id', (req, res) => {
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


module.exports = router;