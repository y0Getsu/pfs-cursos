const port = process.env.PORT || 3000;
const mongoose  = require('mongoose');
const express = require('express');
const app = express();
const apiRoutes = require('./api');
const bodyParser = require('body-parser');

//inicializations
app.set('port', process.env.port || 3000);

//middleware
app.use(bodyParser.urlencoded( {extended: true}));
app.use(bodyParser.json());

app.use('', apiRoutes);



app.get('/', (req, res) => {
    res.send('Hello World!');
});
  
mongoose.connect('mongodb://localhost:27017/curso', {useNewUrlParser: true}).then(() => {
        console.log("Database connected");

}).catch(error => {
    console.log("Database is not working", error);
        
});

app.listen(port, () => {
    console.log('localhost at port ', app.get('port'));
});


