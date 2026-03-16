const assert = require('assert');

// Test data
const products = [
    { id: 1, name: 'Tomato Seeds', description: 'Fresh organic seeds.', category: 'Seeds', price: 50 },
    { id: 2, name: 'Compost Bag', description: 'Rich compost for gardening.', category: 'Compost', price: 200 },
    { id: 3, name: 'Gardening Tools Set', description: 'Set of essential tools.', category: 'Tools', price: 500 },
    { id: 4, name: 'Wheat Grains', description: 'Premium wheat grains.', category: 'Grains', price: 100 },
];

const searchQuery = 'seed';
const selectedCategory = 'all';
const sortBy = 'price-low';

// Original algorithm
const originalFilter = () => {
    return products
        .filter(p => {
            const matchesSearch = p.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                p.description?.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesCategory = selectedCategory === 'all' ||
                p.category?.toLowerCase() === selectedCategory.toLowerCase();
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
};

// Optimized algorithm
const optimizedFilter = () => {
    const queryLower = searchQuery?.toLowerCase() ?? '';
    const categoryLower = selectedCategory?.toLowerCase() ?? '';

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
};

// Execute and verify
const resultOriginal = originalFilter();
const resultOptimized = optimizedFilter();

console.log('Original Result:', resultOriginal.map(p => p.name));
console.log('Optimized Result:', resultOptimized.map(p => p.name));

try {
    assert.deepStrictEqual(resultOriginal, resultOptimized);
    console.log('\n✅ Verification passed: Both algorithms produce identical results.');
} catch (error) {
    console.error('\n❌ Verification failed:', error.message);
    process.exit(1);
}
