
const ProductController = require ('../controllers/product.controller');
// const multer=require('multer');
const uploadMiddleware=require('../config/image.config');
const upload=require('../config/image.config')
module.exports = (app) =>{

    app.get('/api/Product',ProductController.findAllProducts);
    app.get('/api/Product/card',ProductController.finsCardProducts);
    app.get('/api/Product/:id', ProductController.findOneSingleProduct);
    app.post('/api/Product',upload.array("files",10), ProductController.createNewProduct);
    app.patch('/api/Product/:id', ProductController.updateExistingProduct);
    app.delete('/api/Product/:id', ProductController.deleteAnExistingProduct);
    // app.post("/api/cars",upload.array("files",10), CarController.createNewCar);
}


