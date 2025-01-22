var express = require('express');
var router = express.Router();
const pool = require('../db');
const authMiddleware = require('../middleware/authMiddleware.js');

router.get('/pets', authMiddleware, async function(req, res, next) {
  try {
    const result = await pool.query('SELECT * FROM pets where user_id = $1', [req.user.id]); 
    res.send(result.rows);
  } catch (err) {
    res.status(500).send('Server Error');
    console.log(err);
  }
});

router.get('/pets/:id', authMiddleware, async function(req, res, next) {
  try {
    //TODO: get pet by id
    //const result = await pool.query('SELECT * FROM pets where user_id = $1', [req.user.id]); 
    //res.send(result.rows);
  } catch (err) {
    res.status(500).send('Server Error');
    console.log(err);
  }
});

router.post('/pets', authMiddleware, async function(req, res, next) {
    try {
      const result = await pool.query('INSERT INTO pets (user_id, category_id, name, price, description) VALUES ($1, $2, $3, $4, $5) RETURNING *', [req.user.id, req.body.category_id, req.body.name, req.body.price, req.body.description]); 
      res.send(result.rows[0]);
    } catch (err) {
      res.status(500).send('Server Error');
      console.log(err);
    }
  });

router.patch('/pets/:id', authMiddleware, async function(req, res, next) {
    try {
        //TODO: update pet by id
    //   const result = await pool.query('INSERT INTO pets (user_id, category_id, name, price, description) VALUES ($1, $2, $3, $4, $5) RETURNING *', [req.user.id, req.body.category_id, req.body.name, req.body.price, req.body.description]); 
    //   res.send(result.rows[0]);
    } catch (err) {
      res.status(500).send('Server Error');
      console.log(err);
    }
  });

router.delete('/pets/:id', authMiddleware, async function(req, res, next) {
    try {
        // TODO: delete pet by id
    //   const result = await pool.query('INSERT INTO pets (user_id, category_id, name, price, description) VALUES ($1, $2, $3, $4, $5) RETURNING *', [req.user.id, req.body.category_id, req.body.name, req.body.price, req.body.description]); 
    //   res.send(result.rows[0]);
    } catch (err) {
      res.status(500).send('Server Error');
      console.log(err);
    }
  });

module.exports = router;
