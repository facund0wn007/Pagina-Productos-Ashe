const express = require ("express");
const app = express();
let mysql = require("mysql");
let conexion = mysql.createConnection({
    host:"localhost",
    database: "tendadomario",
    user:"root",
    password:""
})

conexion.connect(function(error){
    if(error){
        throw error;
    }else{
        console.log("conexion establed")
      
    }
});



app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({extended:false}));



app.get('/', (req, res) => {
    const productos = "SELECT * FROM producto";
    const categorias= "SELECT * FROM categoria";

   //mandamous los productos
    conexion.query(productos, (error, listaA) => {
        if (error) {
            throw error;
        } else {
            //pasar las imagenes a base64 pq si no, no lo lee el ejspe
            listaA.forEach(producto => {
                if (producto.imagen) {
                    producto.imagen = Buffer.from(producto.imagen).toString('base64');
                } });
                //mandamous las categorias
            conexion.query(categorias, (error, listaB) => {
                if (error) {
                    throw error;
                } else {
                    
                    res.render('productos', { listaA, listaB });
                }
            });
        }
    });
});



app.use(express.static("public"));


app.listen(3000,function(){
    console.log("servidor creado http://localhost:3000")
})
