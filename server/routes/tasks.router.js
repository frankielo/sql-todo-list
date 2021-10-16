const express = require('express');
const tasksRouter = express.Router();
// DB CONNECTION

const pool = require('../modules/pool');

//read request handler

tasksRouter.get('/', (req, res) => {
    let queryString = `SELECT * FROM "tasks";`
    pool.query(queryString)
      .then((results) => {
        res.send(results.rows);
      })
      .catch((err) => {
        res.sendStatus(500);
      })
  });






  module.exports = tasksRouter;