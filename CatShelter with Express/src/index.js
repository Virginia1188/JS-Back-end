const express = require('express');
const handlebars = require('express-handlebars');
const path = require('path');

const app = express();

app.engine('handlebars',handlebars.engine());
app.set('view engine', 'handlebars');

app.use(express.static('public'));

app.get('/',(req,res)=>{
    res.render('home',);
});



const port = 5000;
app.listen(port,()=> console.log(`Express running on port: ${port}...`));