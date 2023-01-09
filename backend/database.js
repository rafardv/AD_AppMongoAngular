const mongoose = require('mongoose')

const URI = 'mongodb+srv://rafardv:963749942Rafa@cluster0.nblstgc.mongodb.net/?retryWrites=true&w=majority';

mongoose.connect(URI).then(db => console.log('DB connected')).catch(err => console.log(err));

module.exports = mongoose;
