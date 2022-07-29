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
    const productOne = await Producto.findOne({_id:idProduct}).catch((error)=>{
        throw new Error("Product not found: ", error);
    });
    if(productOne==null){
        throw new Error("Product not found");
    }
    const product = await Producto.deleteOne({"_id":{$eq:idProduct}});
    return product;
}
async function updateProduct(id,nombre,tipoProducto,operarioResponsable,tipoEmpaque){
    try {
        const product = await Producto.findOne({_id:id}).catch((error)=>{
            throw new Error("Product not found: ", error);
        });
        if(product==null){
            throw new Error("Product not found");
        }
        product.nombre=nombre;
        product.tipoProducto=tipoProducto;
        product.operarioResponsable=operarioResponsable;
        product.tipoEmpaque=tipoEmpaque;
        product.save();
        return {message:"successful update"}
    } catch (error) {
        throw new Error("Update failed")
    }
}

module.exports={getAllProducts,createProducto,deleteProduct,updateProduct}