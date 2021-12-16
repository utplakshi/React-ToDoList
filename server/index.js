const data = require('./data');
const express = require('express');
const e = require('express');
const app = express();
app.use(express.json()); //Adding Middleware and using that Middleware
app.use(express.urlencoded({ extended: true }));  //Can send key=value&key=value

app.use(function(req, res, next) {
    console.log('Logging...');
    next();
});

app.use(function(req, res, next) {
    console.log('Authenticating...');
    next();
});

/***** API Endpoints *****/
app.get('/', (req, res) => {
    res.send(['Hello World']);
});

app.get('/data', (req, res) => {
    res.status(200).send(data);
});

app.get('/data/:id' ,(req, res) => {
    res.status(200).send(data[req.params.id-1]);
})

/***** Make the API go online *****/
const port = process.env.PORT || 8080;
app.listen(port, () => {
    console.log(`Listening on port ${port}...`);
});