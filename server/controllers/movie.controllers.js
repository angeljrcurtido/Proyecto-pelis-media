const Pelicula = require('../models/movie.models');
const categorias = require('../models/movie.models').categorias;

exports.crearPelicula = (req, res)=>{
  Pelicula.create(req.body)
  .then((resultado)=>{
      console.log(resultado)
      res.json(resultado)
  }).catch((error)=>{
      console.log(error)
      res.status(400).json(error)
  })
};

exports.getEnumCategorias = (req, res) => {
  const enumValues = Pelicula.schema.path('categoria').enumValues;
  res.status(200).json(enumValues);
};

exports.obtenerpelicula = (req, res)=>{
  Pelicula.find(req.params.id)
  .then((resultado)=>{
    if(!resultado){
      return res.status(404).json({ mensaje: "La película no fue encontrada" });
    }
    console.log(resultado)
    res.status(200).json(resultado)
}).catch((err)=>{
    console.log(err)
    res.status(500).json({ mensaje: "Error interno del servidor" })
})
};

exports.editarpelicula = (req, res)=>{
  Pelicula.updateOne({_id:req.params.id},req.body, {runValidators:true})
  .then((resultado)=>{
    console.log(req.body)
    res.json(resultado)
}).catch((error)=>{
    console.log(error)
    res.status(400).json(error)
})
};

exports.obtenerunapelicula = (req, res)=>{
  Pelicula.findById(req.params.id)
  .then((resultado)=>{
      console.log(resultado)
      res.json(resultado)

  }).catch((err)=>{
      console.log(err)
  })
}

exports.deleteMovie = async (req, res) => {
  Pelicula.deleteOne({_id:req.params.id},)
  .then((resultado)=>{
      console.log(req.body)
      res.json(resultado)
  }).catch((error)=>{
      console.log(error)
  })
};
