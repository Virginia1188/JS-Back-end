const express = require('express');

const expressConfig = require('./config/expressConfig');
const handlebarsConfig = require('./config/handlebarsConfig');

const app = express();
const port = 5000;

expressConfig(app);
handlebarsConfig(app);



app.get('/',(req,res)=>{
    res.render('views/home');
});




app.listen(port,()=> console.log(`Express running on port: ${port}...`));