const movieController = require('../controllers/movie.controllers');

module.exports = (app) => {
app.post('/api/agregar', movieController.crearPelicula);
app.get('/api/obtener', movieController.obtenerpelicula);
app.delete('/api/borrar/:id', movieController.deleteMovie);
app.get('/api/categorias-enum',movieController.getEnumCategorias)
app.put('/api/editarpelicula/:id',movieController.editarpelicula)
app.get('/api/obtenerunapelicula/:id',movieController.obtenerunapelicula)
}
