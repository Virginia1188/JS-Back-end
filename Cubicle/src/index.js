const express = require('express');
const cookieParser = require('cookie-parser');

const expressConfig = require('./config/expressConfig');
const handlebarsConfig = require('./config/handlebarsConfig');
const dbConfig = require('./config/dbConfig');
const routes = require('./routes');
const auth = require('./middlewares/authMiddleware');


const app = express();
const PORT = 5000;

expressConfig(app);
handlebarsConfig(app);

app.use(auth.authentication);

dbConfig.dbConnect()
    .then(() => console.log('DB Connected successfully'))
    .catch(err => console.log('DB Error:', err));

app.use(routes);

app.listen(PORT, () => console.log(`Server is running on port ${PORT}...`));