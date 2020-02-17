const express = require('express');
const bodyparser = require('body-parser');
const DB = require("./modules/dbconnection");
const hbs = require('hbs');
const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017/';
const app = express();
const connectionOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true
}
const expresshandlebars = require('express-handlebars');
const PORT = 3006;

app.engine("hbs", expresshandlebars({
    extname: "hbs",
    defaultLayout: "mainlayout",
    layoutDir: __dirname + "/views/layouts"
}));

hbs.localsAsTemplateData(app);
app.set('view engine', 'hbs');
app.use(express.static('assets'))

var server = app.listen(PORT, (result) => {
    console.log(`you are now listening to port ${PORT}`);
});

MongoClient.connect(url, connectionOptions, function (err, db) {
    if (err) throw err;
    var dbo = db.db("usersDB");
    dbo.collection("user").find({}).toArray(function (err, result) {
        if (err) throw err;
        users = result;
        db.close();


    });
});

DB.createCollection();
//DB.insertMany();
var users = DB.find();
app.get('/home', (req, res) => {
    res.render('home');
});
app.get('/user', (req, res) => {
    res.render('user', { array: users });
});
app.get('/about', (req, res) => {
    res.render('about');
});
//console.log(DB.find());

// app.post('/' , urlEncodedParser, (req , res)=>{
// 	console.log(req.body);
// 	DB.insertElement(req.body);
// 	res.render('employee' , {person :req.body});
// })

//DB.deleteAll();