const Product=  require("../Models/product-models")
const products = async (req, res) => {
    try {
      const response = await Product.find();
  
      if (!response || response.length === 0) {
        // Check if the response is empty or null
        res.status(404).json({ msg: "No Product Found" });
        return;
      }
  
      return res.status(200).json({ msg: "Product Found", data: response });
    } catch (error) {
      console.error("Error processing form data:", error);
      res.status(500).json({ msg: "Internal Server Error" });
    }
  };
  
  module.exports = products;
  