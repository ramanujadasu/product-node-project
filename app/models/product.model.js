module.exports = mongoose => {
    var schema = mongoose.Schema(
      {
        name: String,
        price: Number,
        country: String,
        description: String,
        viewCount: Number,

      },
      { timestamps: true }
    );
  
    schema.method("toJSON", function() {
      const { __v, _id, ...object } = this.toObject();
      object.id = _id;
      return object;
    });
  
    const Product = mongoose.model("product", schema);
    return Product;
  };
  