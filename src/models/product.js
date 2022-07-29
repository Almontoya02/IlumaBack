const mongoose = require("mongoose")

const productSchema = new mongoose.Schema({
    nombre:{
        type:String,
        required:true,
        maxlength:40
    },
    tipoProducto:{
        type:String,
        required:true
    },
    fechaProduccion:{
        type:Date,
        required:true
    },
    operarioResponsable:{
        type:String,
        required:true,
        maxlength:50
    },
    tiempoProduccion:{
        type:Number,
        required:true
    },
    tipoEmpaque:{
        type:String,
        required:true
    }
})


const Product = mongoose.model("Product", productSchema)
module.exports=Product