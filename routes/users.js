var express = require('express');
var router = express.Router();
const pool = require('../db');

/* GET users listing. */
router.get('/', async function(req, res, next) {
  try {
    const result = await pool.query('SELECT * FROM users'); // Replace with your table name
    res.send(result.rows); // Send rows as JSON
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

router.get('/:userId', async function(req, res, next) {

});

router.post('/', async function(req, res, next) {
  
});

router.patch('/:userId', async function(req, res, next) {
  
});

router.delete('/:userId', async function(req, res, next) {
  
});

module.exports = router;