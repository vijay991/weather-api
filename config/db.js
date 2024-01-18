const mongoose = require('mongoose')
const url = process.env.DEV_MONGO_URI

mongoose.connect(url, {
    useNewUrlParser: true,
}).then(() => {
    console.log('DB connected successfully.');
}).catch(error => {
    throw error
})
