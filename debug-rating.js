// Debug script to test rating filter logic
const products = [
  { id: "1", name: "Premium Wireless Headphones", rating: 4.8, price: 299.99 },
  { id: "2", name: "Smart Fitness Watch", rating: 4.6, price: 249.99 },
  { id: "3", name: "Minimalist Leather Backpack", rating: 4.7, price: 189.99 },
  { id: "4", name: "Premium Coffee Maker", rating: 4.7, price: 349.99 },
  { id: "5", name: "Gaming Mechanical Keyboard", rating: 4.9, price: 159.99 },
  { id: "6", name: "4K Ultra HD Smart TV", rating: 4.7, price: 799.99 }
];

function testRatingFilter(products, ratingFilter) {
  console.log(`\nTesting with rating filter: ${ratingFilter}`);
  
  const filtered = products.filter(product => {
    // This is the exact logic from ProductsPage
    if (ratingFilter > 0 && product.rating < ratingFilter) {
      console.log(`  Filtering out ${product.name} (${product.rating}) - below ${ratingFilter}`);
      return false;
    }
    console.log(`  Keeping ${product.name} (${product.rating})`);
    return true;
  });
  
  console.log(`Result: ${filtered.length} products`);
  return filtered;
}

// Test all rating filter values
console.log("=== RATING FILTER DEBUG ===");
testRatingFilter(products, 0); // Any rating
testRatingFilter(products, 1); // 1+ stars
testRatingFilter(products, 2); // 2+ stars  
testRatingFilter(products, 3); // 3+ stars
testRatingFilter(products, 4); // 4+ stars
testRatingFilter(products, 5); // 5 stars
