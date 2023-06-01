const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const bodyparser = require('body-parser');
const path = require('path');
const app = express();
const connectDB = require('./server/database/connection');


dotenv.config({path:'config.env'})
const PORT = process.env.PORT || 8080;

// log requests
app.use(morgan('tiny'));

// MySQL connection
connectDB.connect(function (err){
    if(err){
        console.log(err);
    }
    else{
        console.log("MySQL Database Connected!")
    }
});

// parse request to body parser
app.use(bodyparser.urlencoded({extended:true}));

// set view engine
app.set("view engine", "ejs");

// loat asset
app.use('/css', express.static(path.resolve(__dirname, "assets/css")));
app.use('/img', express.static(path.resolve(__dirname, "assets/img")));
app.use('/js', express.static(path.resolve(__dirname, "assets/js")));

// Load Routers
app.use('/', require('./server/routes/router'));

// app.get('/', (req, res) => {
//     res.render("index");
// });

// app.get('/products', (req, res) => {
//     res.render("home");
// });

// app.get('/category', (req, res) => {
//     res.render("categories");
// });

// app.get('/add-product', (req, res) => {
//     res.render("addProduct");
// });

// app.get('/add-category', (req, res) => {
//     res.render("addCategory");
// });

// app.get('/update-product', (req, res) => {
//     res.render("updateProduct");
// });

// app.get('/update-category', (req, res) => {
//     res.render("updateCategory");
// });

app.listen(PORT, () => {console.log(`server is running on http://localhost:${PORT}`)});