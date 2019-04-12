const express = require('express');
const controller = require('./assets/scripts/controller.js')
const app = express();


//static files
app.use(express.static('./'));

//view engine
app.set('view engine', 'ejs');


//fire controller
controller(app);

//listening to port
app.listen(1000);
console.clear();
console.log('app initialized...', '\nlistening to port 1000');



