module.exports = app => {
    const products = require("../controllers/product.controller.js");
  
    var router = require("express").Router();

    console.log('testing routing...');
    
    // Create a new Product
    router.post("/", products.create);

    // Retrieve most viewed Product
    router.get("/", products.findAll);

    // Retrieve most viewed Product
    router.get("/most-views", products.findByViewCount);
  
    // Retrieve a single Product with id
    router.get("/:id", products.findOne);
  
    // Update a Product with id
    router.put("/:id", products.update);
  
    // Delete a Product with id
    router.delete("/:id", products.delete);
  
    app.use("/api/products", router);
  };
  