const db = require("../models");
const Product = db.products;

// Create a new Product
exports.create = (req, res) => {
  // Validate request
  if (!req.body.name) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  // Create a Product
  const product = new Product({
    name: req.body.name,
    price: req.body.price,
    country: req.body.country,
    description: req.body.description,
    viewCount: 0
  });

  // Save Product in the database
  product
    .save(product)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Product."
      });
    });
};


// Retrieve all Products from the database.
exports.findAll = (req, res) => {
  const name = req.query.name;
  var condition = name ? { title: { $regex: new RegExp(name), $options: "i" } } : {};

  Product.find(condition)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving products."
      });
    });
};

// Find a single Product with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Product.findById(id)
    .then(data => {
      if (data){
        console.log(data);
        const product = new Product({
          _id : data._id,
          viewCount: data.viewCount + 1
        });
        
        Product.findByIdAndUpdate(id, product, { useFindAndModify: false })
          .then(data1 => {
            if (!data1) {
              res.status(404).send({
                message: `Cannot update Product with id=${id}. Maybe Product was not found!`
              });
            } else res.send({ message: "Product was updated successfully." });
          })
          .catch(err => {
            res.status(500).send({
              message: "Error updating Product with id=" + id
            });
          });
      }
      
      if (!data)
        res.status(404).send({ message: "Not found Product with id " + id });
      else res.send(data);
    }
    
    )
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving Product with id=" + id });
    });

  
};

// Update a Products by the id in the request
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!"
    });
  }

  const id = req.params.id;

  Product.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Product with id=${id}. Maybe Product was not found!`
        });
      } else res.send({ message: "Product was updated successfully." });
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Product with id=" + id
      });
    });
};

// Delete a Product with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Product.findByIdAndRemove(id, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Product with id=${id}. Maybe Product was not found!`
        });
      } else {
        res.send({
          message: "Product was deleted successfully!"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Product with id=" + id
      });
    });
};
var jsondata;
const requests = require("requests");
const userAction = async () => {
  const response = await fetch('http://api.currencylayer.com/live?access_key=e678fefb25515dc9f196923b44fbd817&currencies=USD,CAD,EUR,GBP&format=1');
  jsondata = await response.json(); //extract JSON from the http response
  console.log(jsondata);  // do something with myJson
}


let url = "http://api.currencylayer.com/live?access_key=e678fefb25515dc9f196923b44fbd817&currencies=USD,CAD,EUR,GBP&format=1"

var headers = {
        "cache-control": "no-cache",
        "x-dreamfactory-api-key": "YOUR_API_KEY"
}

let response = requests.request("GET", url, headers=headers);
console.log(response);

print(response.text)
console.log(userAction);

// Find all published Products
exports.findByViewCount = (req, res) => {

  const country = req.query.country;
  var condition = country ? { country: country} : {};
  var listsize = req.query.size;
  if (listsize == null || listsize == undefined || listsize == 0) {
    listsize = 5;
  }
  Product.find(condition)
    .then(data => {
      console.log("response data"+data);
      let vclist = [];
      let responselist = [];
      
      for (let mapData of data)
      {
        vclist.push(mapData.viewCount);
      }
      vclist = vclist.sort().reverse();
      for (let mapData of data)
      {
        if (vclist.includes(mapData.viewCount)){
          responselist.push(mapData);
        }
      }
      let result = responselist.slice(0,listsize)
      console.log("response list"+result);
      res.send(result);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Products."
      });
    });
};
