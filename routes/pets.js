var express = require('express');
var router = express.Router();
const pool = require('../db');

router.get('/', async function(req, res, next) {
  try {
    const { min_price, max_price, category_id, page, limit} = req.query;

    const minPrice = min_price ? Number(min_price) : 0;
    const maxPrice = max_price ? Number(max_price) : 9999999;
    const pageNumber = page ? Number(page) : 1;
    const pageSize = limit ? Number(limit) : 10;

    const offset = (pageNumber - 1) * pageSize;

    // const queryCategory = `
    //   WHERE category_id = $3
    // `;
    var result = null;


    if (category_id !== undefined) { 
      const query = `
      SELECT * FROM pets 
      WHERE price >= $1 AND price <= $2 AND category_id = $5
      ORDER BY price ASC
      LIMIT $3 OFFSET $4
      `;
      result = await pool.query(query, [minPrice, maxPrice, pageSize, offset, category_id]);
    }
    else {
      const query = `
      SELECT * FROM pets 
      WHERE price >= $1 AND price <= $2
      ORDER BY price ASC
      LIMIT $3 OFFSET $4
      `;
      result = await pool.query(query, [minPrice, maxPrice, pageSize, offset]);
    }

    res.send({
      page: pageNumber,
      limit: pageSize,
      total: result.rowCount,
      data: result.rows,
    });
  } catch (err) {
    res.status(500).send('Server Error');
    console.log(err);
  }
  
});


router.get('/:id', async function(req, res, next) {
  try {
    const petId = req.params.id;

    if (isNaN(petId)) {
      return res.status(400).json({ message: 'Некорректный ID' });
    }

    const result = await pool.query('SELECT * FROM pets WHERE id = $1', [petId]);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Питомец не найден' });
    }

    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).send('Server Error');
    console.log(err);
  }
});

module.exports = router;
