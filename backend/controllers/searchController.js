const inventory = require("../data/inventory.json");

const searchInventory = (req, res) => {
  try {
    let { q, category, minPrice, maxPrice } = req.query;

    let results = [...inventory];

    //Edge Case: Invalid price range
    if (minPrice && maxPrice && Number(minPrice) > Number(maxPrice)) {
      return res.status(400).json({
        message: "Invalid price range: Minimum Price cannot be greater than Maximum Price"
      });
    }

    //Filter by product name (case-insensitive)
    if (q && q.trim() !== "") {
      results = results.filter(item =>
        item.productName.toLowerCase().includes(q.toLowerCase())
      );
    }

    // Filter by category
    if (category && category !== "All") {
      results = results.filter(item =>
        item.category.toLowerCase() === category.toLowerCase()
      );
    }

    // Filter by min price
    if (minPrice) {
      results = results.filter(item =>
        item.price >= Number(minPrice)
      );
    }

    // Filter by max price
    if (maxPrice) {
      results = results.filter(item =>
        item.price <= Number(maxPrice)
      );
    }

    return res.json(results);

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { searchInventory };