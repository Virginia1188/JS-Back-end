const express = require('express');
const handlebars = require('express-handlebars');


const app = express();
const PORT = 5000;

app.engine('hbs',handlebars.engine({
    extname:'hbs',

}));
app.set('view engine','hbs');
app.set('views','src/views');

app.get('/',(req,res)=>{
    res.render('index');
});


app.listen(PORT, ()=>console.log(`Server is running on port ${PORT}...`));