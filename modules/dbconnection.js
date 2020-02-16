const MongoClient = require('mongodb').MongoClient;

var usersData = [
    { name: 'John', address: 'Highway 71' },
    { name: 'Peter', address: 'Lowstreet 4' },
    { name: 'Amy', address: 'Apple st 652' },
    { name: 'Hannah', address: 'Mountain 21' },
    { name: 'Michael', address: 'Valley 345' },
    { name: 'Sandy', address: 'Ocean blvd 2' },
    { name: 'Betty', address: 'Green Grass 1' },
    { name: 'Richard', address: 'Sky st 331' },
    { name: 'Susan', address: 'One way 98' },
    { name: 'Vicky', address: 'Yellow Garden 2' },
    { name: 'Ben', address: 'Park Lane 38' },
    { name: 'William', address: 'Central st 954' },
    { name: 'Chuck', address: 'Main Road 989' },
    { name: 'Viola', address: 'Sideway 1633' }
];

// Connection URL
const url = 'mongodb://localhost:27017/';

const connectionOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true
}


module.exports.createCollection = function () {
    MongoClient.connect(url, connectionOptions, function (err, db) {
        if (err) throw err;
        var dbo = db.db("usersDB");
        dbo.createCollection("user", function (err, res) {
            if (err) throw err;
            console.log("Collection created!");
            db.close();
        });
    });
}


module.exports.insertElement = function (data) {
    MongoClient.connect(url, connectionOptions, function (err, db) {
        if (err) throw err;
        var dbo = db.db('usersDB');
        dbo.collection('user').insertOne(data, function (err, res) {
            if (err) throw err;
            db.close();
        });
    });
}


module.exports.insertMany = function () {
    MongoClient.connect(url, connectionOptions, function (err, db) {
        if (err) throw err;
        var dbo = db.db('usersDB');
        dbo.collection('user').insertMany(usersData, function (err, res) {
            if (err) throw err;
            //console.log(`Elements : ${data} inserted`);
            db.close();
        });
    });
}


module.exports.find =  function () {
    MongoClient.connect(url, connectionOptions, function (err, db) {
        if (err) throw err;
        var dbo = db.db("usersDB");
        dbo.collection("user").find({}).toArray(function (err, result) {
            if (err) throw err;
            db.close();   console.log(result);
            return result;
         
        });
    });

}


module.exports.deleteAll = function () {
    MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, function (err, db) {
        if (err) throw err;
        var dbo = db.db("usersDB");
        dbo.collection("user").deleteMany({}, function (err, result) {
            if (err) throw err;
            console.log(result);
            db.close();
        });
    });
}


