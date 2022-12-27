const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

app.get('/test', (req, res) => {
    res.status(200).send({ message: 'Everything ok.' });
});

app.listen(port, () => console.log(`Server listening on port ${port}`));

module.exports = app;
