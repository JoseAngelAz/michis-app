if(process.env.NODE_ENV !='production'){
//dotenv 
require('dotenv').config();
}

console.log(process.env.NODE_ENV);

const express = require('express');
const morgan = require('morgan');
const multer = require('multer');
const path = require('path');
const exphbs = require('express-handlebars');

//Inicializaciones
const app = express();
require('./database');
//configuraciones
app.set('port',process.env.PORT||2000);
//vistas
app.set('views',path.join(__dirname,'../frontend/views'));

//configuración de express-handlebars partials y layout
app.engine('.hbs', exphbs({
defaultLayout:'main',
layoutsDir:path.join(app.get('views'),'layouts'),
partialsDir:path.join(app.get('views'),'partials'),
extname:'.hbs'
}));

app.set('view engine','.hbs');

//Middleware
app.use(morgan('dev'));//dev quita el error en nodemon
const storage = multer.diskStorage({
    destination:path.join(__dirname,'public/upload'),
    filename(req,file,cb){
        cb(null,new Date().getTime()+path.extname(file.originalname));
    }
    //req=request, file, cb = callback, se ejecuta al final
    // destination es donde se guardarán las imagenes, de decimos donde será con el modulo path
})//se configura multer antes de ejecutar

app.use(multer({storage}).single('image'))
//image será el input que debe supervisar multer para saber si subo una imagen o no.
//para entender las imagenes que se suban al server, se ejecuta

app.use(express.urlencoded({extended:false}));
//urlencoded interpreta datos del form como que fueran json y de este extraer lo que viene del form de la vista.
app.use(express.json());//para que express entienda json

//RUTAS
//ruta de api de los gatos
app.use('/api/cat' ,require('./routes/cats'));//hay que pasarle un middleware dessde cats.js en las rutas
//ruta de api de los users
app.use('/api/users',require('./routes/users'));//no se muestran aún
//pageface
app.use('/',require('./routes/facepage'));

//Archivos Estáticos (para al vista), le decimos que carpeta vamos a enviar enteramente al navegador y hacemos a la carpeta public pública en la app, todo lo que se encuentre en esta carpeta será accesible.
app.use(express.static(path.join(__dirname,'public')));
app.use(express.static(path.join(__dirname,'views')));




//comenzar el server
app.listen(app.get('port'),()=>{
    console.log('SERVER ON PORT', app.get('port'));
})