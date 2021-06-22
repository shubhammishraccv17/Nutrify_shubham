const MongoClient=require('mongodb').MongoClient;
const URL="mongodb+srv://Shubham:02Oct1997@cluster0.vh7py.mongodb.net/Nutrify?retryWrites=true&w=majority"



const dbClient = new MongoClient(URL, {
    useUnifiedTopology: true
});

dbClient.connect()
    .then(() => {
        console.log('Successfully connected to database');
    })
    .catch((err) => {
        console.log('Error connecting to database', err);
    })

module.exports = dbClient;