var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  var animals = [
    {
      id: '1',
      name: 'Peter'
    },
    {
      id: '2',
      name: 'Belzebub'
    }
  ]
  res.send(animals);
});

module.exports = router;
