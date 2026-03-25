import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { addItem } from "./dispatchers";
import { getProducts } from "./services/db";

const categories = [
    { name: "Fertilizers", icon: "fa-flask", color: "bg-surface-container text-on-surface" },
    { name: "Seeds", icon: "fa-seedling", color: "bg-surface-container text-on-surface" },
    { name: "Grains", icon: "fa-wheat-awn", color: "bg-surface-container text-on-surface" },
    { name: "Compost", icon: "fa-recycle", color: "bg-surface-container text-on-surface" },
    { name: "Tools", icon: "fa-tools", color: "bg-surface-container text-on-surface" },
];

const trustBadges = [
    { icon: 'fa-truck', label: 'Free Delivery', sub: 'On orders above ₹499' },
    { icon: 'fa-undo-alt', label: 'Easy Returns', sub: '7-day return policy' },
    { icon: 'fa-shield-alt', label: 'Secure Payment', sub: '100% safe & encrypted' },
    { icon: 'fa-leaf', label: 'Organic Certified', sub: 'Farm-fresh products' },
];

export default function Layout() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [productList, setProductList] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            try {
                const products = await getProducts();
                setProductList(products);
            } catch (error) {
                console.error("Failed to fetch products", error);
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, []);

    const handleAddToCart = (product) => {
        dispatch(addItem({ ...product, quantity: 0 }));
        alert(`${product.name} added to cart!`);
    };

    return (
        <div className="bg-base-100 min-h-screen">
            {/* Trust Badges Strip */}
            <div className="bg-surface-low hidden md:block">
                <div className="max-w-7xl mx-auto px-4 py-3 flex justify-around">
                    {trustBadges.map((badge) => (
                        <div key={badge.label} className="flex items-center gap-2">
                            <i className={`fas ${badge.icon} text-primary text-sm`}></i>
                            <div>
                                <p className="text-xs font-semibold text-base-content">{badge.label}</p>
                                <p className="text-xs text-on-surface-variant">{badge.sub}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Hero Banner */}
            <section className="relative overflow-hidden">
                <div
                    className="relative bg-cover bg-center bg-no-repeat"
                    style={{
                        backgroundImage: "url('https://media.istockphoto.com/id/2194044791/photo/young-green-sprouts-emerging-from-freshly-tilled-soil-at-sunrise-symbolizing-growth-new.jpg?s=612x612&w=0&k=20&c=9HrC8bQ38OPIVrBiqTNbu5j9zfY6k9rgyUKN1EabGVw=')",
                        minHeight: '380px'
                    }}
                >
                    <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent"></div>
                    <div className="relative max-w-7xl mx-auto px-6 py-16 flex flex-col justify-center" style={{ minHeight: '380px' }}>
                        <div className="max-w-md">
                            <span className="inline-block bg-secondary text-white text-xs font-bold px-3 py-1 rounded-ds mb-3 uppercase tracking-label">
                                Fresh From The Farm
                            </span>
                            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 leading-tight tracking-display">
                                Pure. Natural.<br />
                                <span className="text-green-400">Farm-Fresh.</span>
                            </h1>
                            <p className="text-gray-200 text-base mb-6 leading-relaxed">
                                Direct from verified farmers to your doorstep. No middlemen, better prices, fresher products.
                            </p>
                            <div className="flex flex-wrap gap-3">
                                <button
                                    onClick={() => navigate('/products')}
                                    className="ds-btn-primary px-7 py-3 text-sm shadow-lg"
                                >
                                    <i className="fas fa-shopping-bag mr-2"></i>Shop Now
                                </button>
                                <button
                                    onClick={() => navigate('/register')}
                                    className="bg-white text-on-surface hover:bg-surface-low px-7 py-3 rounded-ds font-semibold text-sm transition-colors shadow-lg ghost-border"
                                >
                                    <i className="fas fa-store mr-2"></i>Sell on GAIF
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Category Strip */}
            <section className="bg-surface-lowest shadow-ambient">
                <div className="max-w-7xl mx-auto px-4 py-6">
                    <div className="flex gap-4 overflow-x-auto pb-1 justify-center flex-wrap">
                        {categories.map((cat) => (
                            <button
                                key={cat.name}
                                onClick={() => navigate(`/products?category=${cat.name}`)}
                                className={`flex flex-col items-center gap-2 px-5 py-3 rounded-ds ${cat.color} hover:shadow-card-hover transition-all min-w-[90px] flex-shrink-0`}
                            >
                                <div className="w-10 h-10 rounded-full bg-surface-lowest flex items-center justify-center shadow-sm">
                                    <i className={`fas ${cat.icon} text-lg`}></i>
                                </div>
                                <span className="text-xs font-semibold whitespace-nowrap">{cat.name}</span>
                            </button>
                        ))}
                        <button
                            onClick={() => navigate('/products')}
                            className="flex flex-col items-center gap-2 px-5 py-3 rounded-ds bg-surface-container text-on-surface-variant hover:shadow-card-hover transition-all min-w-[90px] flex-shrink-0"
                        >
                            <div className="w-10 h-10 rounded-full bg-surface-lowest flex items-center justify-center shadow-sm">
                                <i className="fas fa-th-large text-lg"></i>
                            </div>
                            <span className="text-xs font-semibold whitespace-nowrap">View All</span>
                        </button>
                    </div>
                </div>
            </section>

            {/* Featured Products Section */}
            <section className="max-w-7xl mx-auto px-4 py-12">
                <div className="bg-surface-lowest rounded-ds shadow-ambient overflow-hidden">
                    {/* Section Header */}
                    <div className="flex justify-between items-center px-5 py-5">
                        <div>
                            <h2 className="text-xl font-bold text-base-content tracking-display">Featured Products</h2>
                            <p className="text-xs text-on-surface-variant mt-0.5">Handpicked for you</p>
                        </div>
                        <button
                            onClick={() => navigate('/products')}
                            className="ds-btn-primary text-sm px-5 py-2"
                        >
                            View All <i className="fas fa-arrow-right ml-1 text-xs"></i>
                        </button>
                    </div>

                    {loading ? (
                        <div className="flex justify-center items-center py-16">
                            <span className="loading loading-spinner loading-lg text-primary"></span>
                        </div>
                    ) : productList.length === 0 ? (
                        <div className="text-center py-16 text-on-surface-variant">
                            <i className="fas fa-box-open text-5xl mb-3 text-surface-high"></i>
                            <p className="font-medium">No products yet.</p>
                            <p className="text-sm">Be the first seller to add products!</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 p-4">
                            {productList.slice(0, 12).map((product) => (
                                <div
                                    key={product.id}
                                    className="bg-surface-lowest rounded-ds shadow-ambient flex flex-col hover:shadow-card-hover transition-shadow group"
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
                                    <div className="px-3 pb-3 flex flex-col flex-1">
                                        <h3
                                            className="text-sm font-medium text-base-content line-clamp-2 cursor-pointer hover:text-secondary-accent mt-1 leading-snug"
                                            onClick={() => navigate(`/product/${product.id}`)}
                                        >
                                            {product.name}
                                        </h3>
                                        <div className="mt-1">
                                            <span className="text-base font-bold text-base-content">₹{product.price}</span>
                                        </div>
                                        <div className="mt-2">
                                            {product.quantity > 0 ? (
                                                <button
                                                    onClick={() => handleAddToCart(product)}
                                                    className="w-full bg-secondary hover:opacity-90 text-white text-xs font-semibold py-2 rounded-ds transition-colors"
                                                >
                                                    <i className="fas fa-cart-plus mr-1"></i>Add to Cart
                                                </button>
                                            ) : (
                                                <button
                                                    onClick={() => navigate(`/product/${product.id}`)}
                                                    className="w-full bg-surface-high text-on-surface-variant text-xs font-semibold py-2 rounded-ds cursor-not-allowed"
                                                    disabled
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
            </section>

            {/* How It Works */}
            <section className="max-w-7xl mx-auto px-4 py-12">
                <div className="bg-surface-lowest rounded-ds shadow-ambient p-8">
                    <h2 className="text-xl font-bold text-base-content mb-8 text-center tracking-display">How It Works</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {[
                            { icon: 'fa-user-plus', step: '01', title: 'Register', desc: 'Create an account as a buyer or seller in seconds.' },
                            { icon: 'fa-search', step: '02', title: 'Browse & Order', desc: 'Explore products from verified farmers and place your order.' },
                            { icon: 'fa-truck', step: '03', title: 'Get Delivered', desc: 'Receive fresh products directly at your doorstep.' },
                        ].map((step) => (
                            <div key={step.step} className="flex items-start gap-4">
                                <div className="bg-primary text-on-primary w-12 h-12 rounded-full flex items-center justify-center text-lg flex-shrink-0 shadow-ambient">
                                    <i className={`fas ${step.icon}`}></i>
                                </div>
                                <div>
                                    <p className="ds-label">Step {step.step}</p>
                                    <h3 className="font-bold text-base-content">{step.title}</h3>
                                    <p className="text-sm text-on-surface-variant mt-0.5">{step.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Why Choose Us Banner */}
            <section className="bg-primary text-white py-section px-4">
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-xl font-bold text-center mb-8 tracking-display">Why Choose GAIF?</h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        {[
                            { icon: 'fa-leaf', title: 'Eco-Friendly', desc: 'Sustainable & organic products.' },
                            { icon: 'fa-award', title: 'High Quality', desc: 'Quality-checked before listing.' },
                            { icon: 'fa-tags', title: 'Best Prices', desc: 'Direct from farmers — no markup.' },
                            { icon: 'fa-truck', title: 'Fast Delivery', desc: 'Quick & reliable delivery.' },
                        ].map((f) => (
                            <div key={f.title} className="text-center">
                                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-2">
                                    <i className={`fas ${f.icon} text-xl`}></i>
                                </div>
                                <h3 className="font-semibold text-sm">{f.title}</h3>
                                <p className="text-white/60 text-xs mt-0.5">{f.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA for Sellers */}
            <section className="bg-surface-low py-section px-4">
                <div className="max-w-2xl mx-auto text-center">
                    <h2 className="text-2xl font-bold text-base-content mb-2 tracking-display">Are You a Farmer?</h2>
                    <p className="text-on-surface-variant text-sm mb-5">
                        Join our platform and sell your products directly to thousands of customers. No middlemen, better prices.
                    </p>
                    <button
                        onClick={() => navigate('/register')}
                        className="ds-btn-primary px-8 py-3 shadow-ambient"
                    >
                        <i className="fas fa-store mr-2"></i>Start Selling Today
                    </button>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-soil text-white py-12 px-4">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-6">
                        <div>
                            <h3 className="font-bold text-lg mb-3 flex items-center gap-2">
                                <img src="/gaif_logo.jpeg" alt="GAIF" className="h-8 w-8 rounded-full bg-white object-cover" />
                                GAIF
                            </h3>
                            <p className="text-sm text-white/70">
                                Ganga Agri Innovation Foundation — Empowering farmers through technology.
                            </p>
                        </div>
                        <div>
                            <h3 className="font-semibold mb-3 text-sm uppercase tracking-label">Quick Links</h3>
                            <ul className="space-y-2 text-sm text-white/70">
                                <li><button onClick={() => navigate('/products')} className="hover:text-white transition-colors">Products</button></li>
                                <li><button onClick={() => navigate('/about-us')} className="hover:text-white transition-colors">About Us</button></li>
                                <li><button onClick={() => navigate('/contact')} className="hover:text-white transition-colors">Contact</button></li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="font-semibold mb-3 text-sm uppercase tracking-label">For Sellers</h3>
                            <ul className="space-y-2 text-sm text-white/70">
                                <li><button onClick={() => navigate('/register')} className="hover:text-white transition-colors">Register as Seller</button></li>
                                <li><button onClick={() => navigate('/seller-dashboard')} className="hover:text-white transition-colors">Seller Dashboard</button></li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="font-semibold mb-3 text-sm uppercase tracking-label">Connect</h3>
                            <div className="flex gap-4 text-lg">
                                <a href="https://facebook.com" target="_blank" rel="noreferrer" className="hover:text-white/80 transition-colors"><i className="fab fa-facebook"></i></a>
                                <a href="https://twitter.com" target="_blank" rel="noreferrer" className="hover:text-white/80 transition-colors"><i className="fab fa-twitter"></i></a>
                                <a href="https://instagram.com" target="_blank" rel="noreferrer" className="hover:text-white/80 transition-colors"><i className="fab fa-instagram"></i></a>
                                <a href="https://youtube.com" target="_blank" rel="noreferrer" className="hover:text-white/80 transition-colors"><i className="fab fa-youtube"></i></a>
                            </div>
                        </div>
                    </div>
                    <div className="border-t border-white/20 pt-4 flex flex-col md:flex-row justify-between items-center gap-2 text-sm text-white/60">
                        <p>&copy; 2024 Ganga Agri Innovation Foundation. All rights reserved.</p>
                        <div className="flex gap-4">
                            <a href="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</a>
                            <a href="/terms-of-service" className="hover:text-white transition-colors">Terms of Service</a>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}
