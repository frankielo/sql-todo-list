const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 3000;
const tasksRouter = require('./routes/tasks.router')

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('server/public'));

// ROUTES any request coming from front end with url localhost:3000/tasks will go to the below route
app.use('/tasks', tasksRouter)

// Start listening for requests on a specific port
app.listen(PORT, () => {
  console.log('listening on port', PORT);
});
