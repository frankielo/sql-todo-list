
const express = require('express');
const tasksRouter = express.Router();


// DB CONNECTION

const pool = require('../modules/pool')


tasksRouter.get('/', (req, res) => {
    let queryString = `SELECT * FROM tasks;`
    pool.query(queryString)
      .then(( results ) => {
        res.send(results.rows);
      })
      .catch((err) => {
        res.sendStatus(500);
      })
  });

//create request handler

tasksRouter.post('/', (req, res) => {
    let taskName = req.body.name;

    let queryString = `
      INSERT INTO "tasks" ("name")
      VALUES ($1);
    `;
    pool.query(queryString, [taskName])
      .then((results) => {
        res.sendStatus(201)
      })
      .catch((err) => {
        res.sendStatus(500);
      });
  });


//update request handler

  tasksRouter.put('/:id', (req, res) => {

    let taskId = req.params.id;
    let isComplete = req.body.isComplete;


    let queryString = `
      UPDATE "tasks"
      SET "isComplete" = $1
      WHERE "id" = $2;
    `;
    pool.query(queryString, [isComplete, taskId])
      .then((results) => {
        res.sendStatus(200)
      })
      .catch((err) => {
        res.sendStatus(500);
      });
  });


//delete request handler

  tasksRouter.delete('/:id', (req, res) => {

    let taskId = req.params.id;

    let queryString = `
    DELETE FROM "tasks"
    WHERE "id" = $1;
    `;
    pool.query(queryString, [taskId])
      .then((results) => {
        res.sendStatus(200)
      })
      .catch((err) => {
        res.sendStatus(500);
      });
  });

module.exports = tasksRouter;