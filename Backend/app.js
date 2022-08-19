const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv/config');
const productsRounter = require('./routers/products');
const categoriesRounter = require('./routers/categories');
const api = process.env.API_URL;

const app = express();
app.use(cors());
app.options('*', cors());

// middleware
app.use(express.json());
app.use(morgan('tiny'));

// Routers
app.use(`${api}/products`, productsRounter);
app.use(`${api}/categories`, categoriesRounter);

mongoose.connect(encodeURI(process.env.CONNECTION), {
    dbName: 'E-Shop'
})
    .then(() => {
        console.log('Database connected!')
    })
    .catch((error) => {
        console.log(error);
    })

app.listen(3000, () => {
    console.log('Server is running http://localhost:3000');
})