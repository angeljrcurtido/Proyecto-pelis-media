const mongoose = require ('mongoose')


const PeliculaSchema = new mongoose.Schema({
  title: {
    type: String,
    required:true,
  },
  description: {
    type: String,
    required:true,
  },
  images: {
    type: String,
    required:true,
  },
  categoria: {
    type: String,
    enum: [
      'Series',
      'Estreno de Series',
      'Peliculas',
      'Estreno de Peliculas',
    ],
    required:true,
  }
});
PeliculaSchema.virtual('categoria.enumValues').get(function() {
  return this.schema.path('categoria').enumValues;
});

const Pelicula = mongoose.model('Pelicula', PeliculaSchema);

module.exports = Pelicula;