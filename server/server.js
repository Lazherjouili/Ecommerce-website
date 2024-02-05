const express = require('express')
const cors = require('cors')
const app = express()
const cookieParser = require('cookie-parser');


app.use(express.json({ limit: '500mb' }),express.urlencoded({extended : true, limit: '500mb' }));
// Use cors middleware with specific options
app.use(cors({origin:'http://localhost:5173',credentials:true, methods:['GET', 'POST','PATCH','DELETE']}), cookieParser());

// app.use(cookieParser());
// app.use(express.static('public'));
require('dotenv').config()
const PORT = process.env.PORT

require('../server/config/mongoose.config')
require('../server/routes/product.routes')(app);
require('./routes/user.routes')(app);

app.listen(PORT, ()=> console.log(`Listenning on port ${PORT} for requests ✈️`));