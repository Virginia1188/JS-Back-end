const express = require('express');

const expressConfig = require('./config/expressConfig');
const handlebarsConfig = require('./config/handlebarsConfig');

const homeController = require('./controllers/homeController');
const catController = require('./controllers/catController');

const app = express();
const port = 5000;

expressConfig(app);
handlebarsConfig(app);

app.use(homeController);
app.use('/cats',catController);



app.listen(port, () => console.log(`Express running on port: ${port}...`));