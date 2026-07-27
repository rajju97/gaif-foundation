import { useState, useEffect, useMemo } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getProducts } from '../services/db';
import { addItem } from '../dispatchers';

const ProductsPage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [searchParams] = useSearchParams();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');
    const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || 'all');
    const [sortBy, setSortBy] = useState('name');
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const categories = ['all', 'Fertilizers', 'Seeds', 'Grains', 'Compost', 'Tools', 'Other'];
    const sortOptions = [
        { value: 'name', label: 'Relevance' },
        { value: 'price-low', label: 'Price — Low to High' },
        { value: 'price-high', label: 'Price — High to Low' },
    ];

    useEffect(() => {
        const load = async () => {
            setLoading(true);
            try {
                const data = await getProducts();
                setProducts(data);
            } catch (error) {
                console.error("Error loading products:", error);
            } finally {
                setLoading(false);
            }
        };
        load();
    }, []);

    // Sync URL params on mount
    useEffect(() => {
        const search = searchParams.get('search');
        const category = searchParams.get('category');
        if (search) setSearchQuery(search);
        if (category) setSelectedCategory(category);
    }, [searchParams]);

    const handleAddToCart = (product) => {
        dispatch(addItem({ ...product, quantity: 0 }));
        alert(`${product.name} added to cart!`);
    };

    const filteredProducts = useMemo(() => {
        const query = searchQuery ? searchQuery.toLowerCase() : '';
        const cat = selectedCategory !== 'all' ? selectedCategory.toLowerCase() : 'all';

        return products
            .filter(p => {
                const matchesSearch = !query ||
                    (p.name && p.name.toLowerCase().includes(query)) ||
                    (p.description && p.description.toLowerCase().includes(query));
                const matchesCategory = cat === 'all' ||
                    (p.category && p.category.toLowerCase() === cat);
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
    }, [products, searchQuery, selectedCategory, sortBy]);

    const FilterSidebar = () => (
        <aside className="w-full">
            {/* Category Filter */}
            <div className="bg-surface-lowest rounded-ds shadow-ambient mb-3">
                <div className="px-4 py-3">
                    <h3 className="ds-label">Category</h3>
                </div>
                <ul className="py-2">
                    {categories.map(cat => (
                        <li key={cat}>
                            <button
                                onClick={() => { setSelectedCategory(cat); setSidebarOpen(false); }}
                                className={`w-full text-left px-4 py-2 text-sm transition-colors ${
                                    selectedCategory === cat
                                        ? 'text-secondary-accent font-semibold bg-secondary-accent/10'
                                        : 'text-base-content hover:bg-surface-container'
                                }`}
                            >
                                {cat === 'all' ? 'All Categories' : cat}
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
        </aside>
    );

    return (
        <div className="bg-base-100 min-h-screen">
            {/* Top Bar */}
            <div className="bg-surface-low">
                <div className="max-w-7xl mx-auto px-4 py-3 flex flex-wrap items-center gap-3">
                    {/* Search */}
                    <div className="relative flex-1 min-w-[200px] max-w-sm">
                        <input
                            type="text"
                            placeholder="Search products..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="input input-bordered input-sm w-full pl-9"
                        />
                        <i className="fas fa-search absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-xs"></i>
                    </div>

                    {/* Sort */}
                    <div className="flex items-center gap-2">
                        <span className="text-sm text-on-surface-variant hidden sm:inline">Sort by:</span>
                        <div className="flex gap-1 flex-wrap">
                            {sortOptions.map(opt => (
                                <button
                                    key={opt.value}
                                    onClick={() => setSortBy(opt.value)}
                                    className={`text-xs px-3 py-1.5 rounded-ds transition-colors ${
                                        sortBy === opt.value
                                            ? 'ds-chip-active font-semibold'
                                            : 'ds-chip-neutral'
                                    }`}
                                >
                                    {opt.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Mobile filter toggle */}
                    <button
                        className="lg:hidden flex items-center gap-2 text-sm ghost-border px-3 py-1.5 rounded-ds bg-surface-lowest text-base-content"
                        onClick={() => setSidebarOpen(!sidebarOpen)}
                    >
                        <i className="fas fa-filter text-xs"></i> Filters
                    </button>

                    <span className="text-xs text-on-surface-variant ml-auto hidden sm:inline">
                        {filteredProducts.length} results
                    </span>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 py-6 flex gap-4">
                {/* Sidebar — Desktop */}
                <div className="hidden lg:block w-56 flex-shrink-0">
                    <FilterSidebar />
                </div>

                {/* Mobile Sidebar Overlay */}
                {sidebarOpen && (
                    <div className="fixed inset-0 z-40 lg:hidden">
                        <div className="absolute inset-0 bg-black/40" onClick={() => setSidebarOpen(false)}></div>
                        <div className="absolute left-0 top-0 h-full w-64 bg-surface-lowest shadow-glass z-50 overflow-y-auto p-4">
                            <div className="flex justify-between items-center mb-4">
                                <h2 className="font-bold text-base-content">Filters</h2>
                                <button onClick={() => setSidebarOpen(false)} className="text-on-surface-variant hover:text-base-content">
                                    <i className="fas fa-times text-lg"></i>
                                </button>
                            </div>
                            <FilterSidebar />
                        </div>
                    </div>
                )}

                {/* Product Grid */}
                <div className="flex-1 min-w-0">
                    {loading ? (
                        <div className="flex justify-center items-center py-24">
                            <span className="loading loading-spinner loading-lg text-primary"></span>
                        </div>
                    ) : filteredProducts.length === 0 ? (
                        <div className="bg-surface-lowest rounded-ds shadow-ambient text-center py-20">
                            <i className="fas fa-search text-5xl text-surface-high mb-4"></i>
                            <h2 className="text-lg font-semibold text-base-content">No products found</h2>
                            <p className="text-sm text-on-surface-variant mt-1">Try adjusting your search or filters</p>
                            <button
                                onClick={() => { setSearchQuery(''); setSelectedCategory('all'); }}
                                className="mt-4 btn btn-primary btn-sm"
                            >
                                Clear Filters
                            </button>
                        </div>
                    ) : (
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-4">
                            {filteredProducts.map((product) => (
                                <div
                                    key={product.id}
                                    className="bg-surface-lowest rounded-ds shadow-ambient flex flex-col group hover:shadow-card-hover transition-shadow"
                                >
                                    <div
                                        className="relative overflow-hidden cursor-pointer"
                                        onClick={() => navigate(`/product/${product.id}`)}
                                    >
                                        <img
                                            src={product.images?.[0] || product.image || "product-jpeg-500x500.webp"}
                                            alt={product.name}
                                            className="w-full h-44 object-contain p-3 group-hover:scale-105 transition-transform duration-300"
                                        />
                                        {product.quantity <= 0 && (
                                            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                                                <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-ds">OUT OF STOCK</span>
                                            </div>
                                        )}
                                    </div>

                                    <div className="px-3 pb-4 flex flex-col flex-1">
                                        <h3
                                            className="text-sm font-medium text-base-content line-clamp-2 cursor-pointer hover:text-secondary-accent mt-2 leading-snug"
                                            onClick={() => navigate(`/product/${product.id}`)}
                                        >
                                            {product.name}
                                        </h3>
                                        <p className="text-xs text-on-surface-variant line-clamp-1 mt-0.5">{product.description}</p>

                                        <div className="mt-2 flex items-baseline gap-2">
                                            <span className="text-base font-bold text-base-content">₹{product.price}</span>
                                            <span className={`text-xs ${product.quantity > 0 ? 'text-green-600' : 'text-red-500'}`}>
                                                {product.quantity > 0 ? 'In Stock' : 'Out of Stock'}
                                            </span>
                                        </div>

                                        <div className="mt-3">
                                            {product.quantity > 0 ? (
                                                <button
                                                    onClick={() => handleAddToCart(product)}
                                                    className="w-full bg-secondary hover:opacity-90 text-white text-xs font-semibold py-2 rounded-ds transition-colors shadow-sm"
                                                >
                                                    <i className="fas fa-cart-plus mr-1"></i>Add to Cart
                                                </button>
                                            ) : (
                                                <button
                                                    disabled
                                                    className="w-full bg-surface-high text-on-surface-variant text-xs font-semibold py-2 rounded-ds cursor-not-allowed"
                                                >
                                                    Out of Stock
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProductsPage;
