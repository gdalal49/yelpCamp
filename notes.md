    Our mongoose.connect()
    _________________________________________________
    const mongoose = require('mongoose');
    mongoose.connect('mongodb://localhost:27017/db_name', {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    .then(() => console.log('Connected to DB!'))
    .catch(error => console.log(error.message));
    --------------------------------------------------

    RestFull Routes
    name            url            verb          desc
    ======================================================================
    INDEX         /dogs             GET    Display a list of dogs
    NEW           /dogs/new         GET    Displays form to make a new dog
    CREATE        /dogs             POST   Adds new dog to DB
    SHOW          /dogs/:id         GET    Shows info about one dog
