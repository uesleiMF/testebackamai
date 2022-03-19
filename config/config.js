const mongoose = require('mongoose')

mongoose.connect('mongodb+srv://cluster0.66bqn.mongodb.net/login', { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true }, (err, res) => {
    if (err) throw err;
    console.log('Base de datos online');
});

module.exports=mongoose