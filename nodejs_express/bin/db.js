const mongoClient = require('mongodb').MongoClient;
const mongoDbUrl = "mongodb+srv://admin:fastfeed@cluster0.dvpo1.mongodb.net/<dbname>?retryWrites=true&w=majority";
let mongodb;
 // The database to use
const dbName = "FastFeedDB";
                    
function connect(callback){
    mongoClient.connect(mongoDbUrl, (err, db) => {
        if (err) return console.log(err);
        mongodb = db.db(dbName);
        callback();
    });
}

function get(){
    return mongodb;
}

function close(){
    mongodb.close();
}

module.exports = {
    connect,
    get,
    close
};