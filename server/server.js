//CONFIGURACION
const cors = require ('cors');
const express = require('express');
const app = express();
const PORT = 8000;
const bodyParser = require('body-parser');


//MIDLEWARE
app.use(express.json())
app.use(express.urlencoded({extended:true}))

//Cors

app.use (cors({
    credentials:true,
    origin:'http://localhost:3000'

}))

//Base de datos
require('./config/mongoose.config');

//Importar las rutas de nuestro servidor backend 
const userRoutes = require('./routes/user.route'); // Agregar esta línea
userRoutes(app) // Agregar esta línea

const RutasMovie = require('./routes/movie.route')
RutasMovie(app)



app.use(bodyParser.json());

//Aqui es donde mencionmos donde se va estar ejecutando el servidor en que puerto
app.listen(PORT,()=>{
    console.log(`Servidor corriendo en el puerto ${PORT}`)
})