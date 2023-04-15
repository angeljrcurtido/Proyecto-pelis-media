const mongoose  = require('mongoose')

mongoose.set('strictQuery', true);

mongoose.connect('mongodb://127.0.0.1:27017/movies')
.then(() => console.log('Conexión exitosa'))
.catch((error) => console.log('Error de conexión:', error));