const {Router} = require('express');//requerimos solo el metodo raouter de express
 
const router = Router();//este objeto es el que le voy a pasar a app.use(require('.routes/cats')) 
const Cats = require('../models/Cats');

//consultando la db de los gatos
router.get('/',async (req,res) =>{
  const cats = await Cats.find();
  res.json(cats);//se muestran en la api
});

//post
router.post('/', async (req,res)=>{
    const {cat_name, cat_race,cat_yrs,cat_mth,cat_sick,cat_treament,cat_color,cat_length,cat_vacune} = req.body;
    const newCat = new Cats({cat_name,cat_race,cat_yrs,cat_mth,cat_sick,cat_treament,cat_color,cat_length,cat_vacune});

    await newCat.save();
    res.json({message:'Cat Saved'});
});


module.exports = router;