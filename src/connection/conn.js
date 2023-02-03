const MONGOOSE = require('mongoose');

// storing url for connection
const URL = 'mongodb://localhost:27017/MyNotesAPP';

console.log(`[MAKING] creating database...`);

// to ignore deprication warning
MONGOOSE.set('strictQuery', true);

// connect to local mongodb 
MONGOOSE.connect(URL).then(() => {
    console.log(`[SUCCESS] database created.`)
}).catch((err) => {
    console.log(`[!ERROR] database not created.`)
    console.log(err)
})