const mongoose = require('mongoose');
MONGO_URI= "" /* use a mongodb uri */

const dbConnect = async () => {
    try {
        const conn = await mongoose.connect(MONGO_URI,{
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false
        })
        console.log(`MongoDB Connected: ${conn.connection.host}`)
    }
    catch(err){
        console.log(err);
        process.exit(1);
    }
}

module.exports = dbConnect;