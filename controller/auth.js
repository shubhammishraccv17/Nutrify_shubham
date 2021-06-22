const dbClient = require("../Databases")
const passwordHash=require("password-hash")



const createUser = function (user) {
    return new Promise ((resolve, reject) => {
        const db = dbClient.db('Nutrify');
        const usersCollection = db.collection('Users');
        usersCollection.insertOne({
            userName:user.name,
            email: user.email,
            password: passwordHash.generate(user.password)
        })
            .then((dbRes) => {
                resolve()
            })
            .catch((err) => {
                reject(err);
            })
    })
}


module.exports.createUser=createUser;

const verifyUser=function(user,callback) {
            const db =dbClient.db('Nutrify')
            const usersCollection=db.collection('Users')
            usersCollection.findOne({
                    email:user.email
                    })
            .then((dbUser)=>{
                if (dbUser){
                    const isPasswordMatched =passwordHash.verify(user.password,dbUser.password)
                    callback(null,{
                        email:dbUser.email
                        })
                    }
                else{
                    callback(null,{
                    message:"please verify the credentials"
                })
            }})}
module.exports.verifyUser=verifyUser;
