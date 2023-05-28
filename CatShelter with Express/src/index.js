const express = require('express');
const handlebars = require('express-handlebars');
const expressConfig = require('./config/expressConfig');

const app = express();
const port = 5000;

expressConfig(app);

app.engine('handlebars',handlebars.engine());
app.set('view engine', 'handlebars');



app.get('/',(req,res)=>{
    res.render('views/home');
});




app.listen(port,()=> console.log(`Express running on port: ${port}...`));