const express = require('express');
const router = new express.Router();
const {getAllProducts,createProducto,deleteProduct,updateProduct} = require("./utils");

router.get("/products",async(req,res)=>{
    try{
        const products = await getAllProducts();
        res.status(200).send(
            {
                status:true,
                message:"products get done",
                data:{
                    products
                }
            }
        );

    }catch(error){
        res.status(500).send(
            {
                status:false,
                message:"failed to get products",
                data:{
                    message:error.toString()
                }
            }
        )
    }
});
router.post("/products/add",async(req,res)=>{
    try {
        const request = req.body;
        const products= await createProducto(
            request.nombre,
            request.tipoProducto,
            request.operarioResponsable,
            request.tiempoProduccion,
            request.tipoEmpaque
            
        );
        res.status(200).send(
            {
                status:true,
                message:"Successful creation",
                data:{
                    products
                }
            }
        );
    } catch (error) {
        res.status(500).send(
            {
                status:false,
                message:"Creation Failed",
                data:{
                    message:error.toString()
                }
            }
        )
    }

});
router.patch("/products/update",async(req,res)=>{
    try {
        const request = req.body

        const updatedProduct = await updateProduct(
            request._id,
            request.nombre,
            request.tipoProducto,
            request.operarioResponsable,
            request.tipoEmpaque
        )
        res.status(200).send({
            status: true,
            message: "Successful Product update",
            data: updatedProduct.message
            
        })
    } catch (error) {
        console.log(error)
        res.status(200).send({
            status: false,
            message: "Failed Update",
            data: { error: error.toString() }
        })
    }
});

router.delete("/products/delete/:idproduct",async(req,res)=>{
    try {
        (await deleteProduct(req.params.idproduct))
        res.status(200).send(
            {
                status:true,
                message:"removed product",
                data:{
                    message:"Done"
                }
            }
        )
    } catch (error) {
        res.status(500).send(
            {
                status:false,
                message:"Deleted Failed",
                data:{
                    message:error.toString()
                }
            }
        )
    }
});






module.exports=router