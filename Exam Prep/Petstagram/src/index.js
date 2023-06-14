const express = require('express');
const routes = require('./routes');
const expressConfig = require('./config/expressConfig');
const handlebarsConfig = require('./config/handlebarsConfig');
const { dbConnect } = require('./config/dbConfig');


const app = express();
const PORT = 3000;

expressConfig(app);
handlebarsConfig(app);

dbConnect()
    .then(() => console.log('DB Connected successfully'))
    .catch(err => console.log('DB Error:', err));

app.use(routes);

app.listen(PORT, () => console.log(`Server is listening on ${PORT}...`));