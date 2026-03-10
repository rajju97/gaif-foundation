const assert = require('assert');

// Simulate the data and logic
const products = [
    { id: 1, name: 'Apple', description: 'Fresh red apple', category: 'Fruits', price: 10 },
    { id: 2, name: 'Banana', description: 'Yellow banana', category: 'Fruits', price: 5 },
    { id: 3, name: 'Carrot', description: 'Orange carrot', category: 'Vegetables', price: 8 },
    { id: 4, name: 'Tomato', description: 'Red tomato', category: 'Vegetables', price: 12 },
    { id: 5, name: 'Organic Apple', description: 'Organic farm apple', category: 'Fruits', price: 15 },
];

function testFiltering(searchQuery, selectedCategory, sortBy) {
    const queryLower = searchQuery.toLowerCase();
    const categoryLower = selectedCategory.toLowerCase();

    return products
        .filter(p => {
            const matchesSearch = p.name?.toLowerCase().includes(queryLower) ||
                p.description?.toLowerCase().includes(queryLower);
            const matchesCategory = selectedCategory === 'all' ||
                p.category?.toLowerCase() === categoryLower;
            return matchesSearch && matchesCategory;
        })
        .sort((a, b) => {
            switch (sortBy) {
                case 'price-low': return (a.price || 0) - (b.price || 0);
                case 'price-high': return (b.price || 0) - (a.price || 0);
                case 'name': return (a.name || '').localeCompare(b.name || '');
                default: return 0;
            }
        });
}

// 1. Test empty search, all categories, sort by name
let result = testFiltering('', 'all', 'name');
assert.strictEqual(result.length, 5);
assert.strictEqual(result[0].name, 'Apple');
assert.strictEqual(result[4].name, 'Tomato');

// 2. Test search for 'apple', all categories, sort by price-low
result = testFiltering('apple', 'all', 'price-low');
assert.strictEqual(result.length, 2);
assert.strictEqual(result[0].name, 'Apple');
assert.strictEqual(result[1].name, 'Organic Apple');

// 3. Test search for 'red', all categories, sort by price-high
result = testFiltering('red', 'all', 'price-high');
assert.strictEqual(result.length, 2); // Apple and Tomato both have 'red' in description
assert.strictEqual(result[0].name, 'Tomato'); // Price 12
assert.strictEqual(result[1].name, 'Apple'); // Price 10

// 4. Test search for '', 'Vegetables' category, sort by name
result = testFiltering('', 'Vegetables', 'name');
assert.strictEqual(result.length, 2);
assert.strictEqual(result[0].name, 'Carrot');
assert.strictEqual(result[1].name, 'Tomato');

// 5. Test search for 'orange', 'Fruits' category (should be empty)
result = testFiltering('orange', 'Fruits', 'name');
assert.strictEqual(result.length, 0);

console.log("All filtering logic tests passed!");
