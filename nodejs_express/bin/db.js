const mongoClient = require('mongodb').MongoClient;
const mongoDbUrl = "mongodb+srv://admin:fastfeed@cluster0.dvpo1.mongodb.net/<dbname>?retryWrites=true&w=majority";
let mongodb;
 // The database to use
const dbName = "FastFeedDB";
                    
// async function run() { //to be deleted
//     try {
//             await client.connect();
//             console.log("Connected correctly to server");
//             db = client.db(dbName);

//             // Use the collection "users"
//             const usercol = db.collection("users");

//             // Insert a single document, wait for promise so we can read it back
//             const p = await usercol.insertOne(personDocument);
//             // Find one document
//             const myDoc = await usercol.findOne();
//             // Print to the console
//             console.log(myDoc);

//         } catch (err) {
//             console.log(err.stack);
//         }

//         finally {
//         await client.close();
//     }
// }

function connect(callback){
    mongoClient.connect(mongoDbUrl, (err, db) => {
        mongodb = db.db('FastFeedDB');
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