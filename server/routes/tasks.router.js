
const express = require('express');
const tasksRouter = express.Router();




// DB CONNECTION

const pool = require('../modules/pool')



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
          console.log(err);
        res.sendStatus(500);
      });
  });


module.exports = tasksRouter;