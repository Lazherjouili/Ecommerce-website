const Product = require('../models/product.model');

module.exports = {
    findAllProducts : (req, res) => {
        Product.find()
        .then((products) => {
            res.json(products);
        })
        .catch((err) => {
            res.json(err);
        });
    },
    finsCardProducts :(req,res) => {
        Product.find({_id:{$in:req.body.card}}).then((ListProduct) => {
            res.json(ListProduct);
        })
        .catch((err) => {
            res.status(400).json(err);
        });
    },
    findOneSingleProduct : (req, res) => {
        Product.findOne({_id: req.params.id})
        .then((oneSingleProduct) => {
            res.json(oneSingleProduct);
        })
        .catch((err) => {
            res.status(400).json(err);
        });
    },
    // createNewProduct : (req, res) => {
    //     Product.create(req.body)
    //     .then((newlyCreatedProduct) => {
    //         res.json(newlyCreatedProduct);
    //     })
    //     .catch((err) => {
    //         res.status(400).json(err);
    //     });
    // },
    createNewProduct : (req, res) => {
        console.log('THIS IS REQ FILE =====>',req.files);
      console.log('THIS IS REQ BODY =====>',req.body);
      let files = req.files;
      let paths = []
      files.forEach((file) => {
          paths.push('/images/'+file.filename)
      })
        Product.create({...req.body,image:paths})
            .then((newlyCreatedProduct) => {
                res.json(newlyCreatedProduct)
            })
            .catch((err) => res.status(400).json(err));
    },

    // module.exports.createNewCar = (req, res) => {
    //     console.log('THIS IS REQ FILE =====>',req.files);
    //   console.log('THIS IS REQ BODY =====>',req.body);
    //   let files = req.files;
    //   let paths = []
    //   files.forEach((file) => {
    //       paths.push('/images/'+file.filename)
    //   })
    //     Car.create({...req.body,photos:paths})
    //         .then((newlyCreatedCar) => {
    //             res.json(newlyCreatedCar)
    //         })
    //         .catch((err) => res.status(400).json(err));
    // }


    updateExistingProduct : (req, res) => {
        Product.findOneAndUpdate({_id : req.params.id}, req.body, {
            new : true,
            runValidators : true,
        })
        .then((updatedProduct) => {
            res.json(updatedProduct);
        })
        .catch((err) => {
            res.status(400).json(err);
        });
    },
    deleteAnExistingProduct : (req, res) => {
        Product.deleteOne({_id : req.params.id})
        .then((result)=> {
            res.json(result);
        })
        .catch((err) => {
            res.status(400).json(err);
        })
    },
    
}

