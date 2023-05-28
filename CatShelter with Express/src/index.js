const express = require('express');

const expressConfig = require('./config/expressConfig');
const handlebarsConfig = require('./config/handlebarsConfig');

const homeController = require('./controllers/homeController');

const app = express();
const port = 5000;

expressConfig(app);
handlebarsConfig(app);

app.use(homeController);








app.listen(port,()=> console.log(`Express running on port: ${port}...`));