const Producto = require("../../models/product");
const moment =require("moment");

async function getAllProducts(){
    const products = await Producto.find();
    if(products==null || products.length <= 0){
        return [];
    }
    return products;
}

async function createProducto(nombre,tipoProducto,operarioResponsable,tiempoProduccion,tipoEmpaque){
    const product = await Producto.create({
        nombre,
        tipoProducto,
        fechaProduccion:moment().subtract(10, 'days').calendar(),
        operarioResponsable,
        tiempoProduccion,
        tipoEmpaque
    }).catch((error)=>{
        throw new Error("Register Failed")
    });
    return{
        nombre:product.nombre
    }
}

async function deleteProduct(idProduct){
    const product = await Producto.deleteOne({"_id":{$eq:idProduct}});
    return product;
}

module.exports={getAllProducts,createProducto,deleteProduct}