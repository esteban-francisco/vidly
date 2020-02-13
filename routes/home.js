const express = require('express');
const router = express.Router();

// Welcome user
router.get('/', (req, res) => {
    res.send('Welcome to VIDLY movie service!');
});

module.exports = router;