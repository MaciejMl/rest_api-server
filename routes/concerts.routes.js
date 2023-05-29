const express = require('express');
const db = require('../db/db');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
const uuid = uuidv4();

router.route('/concerts').get((req, res) => {
  res.json(db.concerts);
});

router.route('/concerts/add-element').post((req, res) => {
  const { performer, genre, price, day, image } = req.body;
  db.concerts.push({ id: uuid, performer, genre, price, day, image });
  res.json({ message: 'OK' });
});

router.route('/concerts/:id').put((req, res, next) => {
  const { performer, genre, price, day, image } = req.body;
  const id = req.params.id;
  let item = db.concerts.find((data) => data.id === id);

  if (item) {
    item.performer = performer;
    item.genre = genre;
    item.price = price;
    item.day = day;
    item.image = image;
    res.json({ message: 'OK' });
  } else {
    next();
  }
});

router.route('/concerts/:id').delete((req, res) => {
  const id = req.params.id;
  let item = db.concerts.findIndex((data) => data.id === id);

  if (item !== -1) {
    db.concerts.splice(item, 1);
    res.json({ message: 'OK' });
  } else {
    res.status(404).json({ message: 'Element not found...' });
  }
});

router.route('/concerts/:id').get((req, res, next) => {
  const id = req.params.id;
  const item = db.concerts.find((data) => data.id == id);

  if (item) {
    res.json(item);
  } else {
    res.status(404).json({ message: 'Element not found...' });
  }
});

module.exports = router;
