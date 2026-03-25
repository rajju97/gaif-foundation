import { useState } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate, NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import ThemeSwitcher from './ThemeSwitcher';

const NavBar = () => {
    const navigate = useNavigate();
    const itemCount = useSelector((state) => state.cart.itemCount);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const { currentUser, userRole, logout } = useAuth();

    const closeMobile = () => setIsMobileMenuOpen(false);

    const handleLogout = async () => {
        try {
            await logout();
            navigate('/');
            closeMobile();
        } catch (error) {
            console.error("Failed to logout", error);
        }
    };

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
            setSearchQuery('');
        } else {
            navigate('/products');
        }
    };

    return (
        <div className="sticky top-0 z-50">
            {/* Main Header Bar */}
            <header className="bg-primary text-white shadow-ambient">
                <div className="max-w-7xl mx-auto px-4 py-2 flex items-center gap-4">
                    {/* Logo */}
                    <div
                        onClick={() => { navigate('/'); closeMobile(); }}
                        className="flex items-center gap-2 cursor-pointer flex-shrink-0 min-w-fit"
                    >
                        <img src="/gaif_logo.jpeg" alt="GAIF" className="h-10 w-10 rounded-full bg-white object-cover" />
                        <div className="hidden md:block">
                            <span className="text-white font-bold text-lg leading-none">GAIF</span>
                            <p className="text-white/60 text-xs italic leading-none">Agri <span className="text-white font-semibold">Foundation</span></p>
                        </div>
                    </div>

                    {/* Search Bar */}
                    <form onSubmit={handleSearch} className="flex-1 max-w-2xl">
                        <div className="flex rounded-ds overflow-hidden shadow-sm">
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Search for seeds, fertilizers, tools and more..."
                                className="w-full px-4 py-2 text-sm text-gray-800 outline-none"
                            />
                            <button
                                type="submit"
                                className="bg-secondary-accent text-white px-4 py-2 hover:bg-secondary-container transition-colors flex-shrink-0"
                            >
                                <i className="fas fa-search"></i>
                            </button>
                        </div>
                    </form>

                    {/* Right Actions — Desktop */}
                    <div className="hidden lg:flex items-center gap-1">
                        {/* Login / User */}
                        {!currentUser ? (
                            <div className="dropdown dropdown-end">
                                <label tabIndex={0} className="flex items-center gap-1 cursor-pointer px-3 py-2 rounded hover:bg-white/10 transition-colors min-w-[80px]">
                                    <span className="font-semibold text-sm">Login</span>
                                    <i className="fas fa-chevron-down text-xs mt-0.5"></i>
                                </label>
                                <ul tabIndex={0} className="dropdown-content z-50 menu p-2 glass-surface shadow-glass text-on-surface rounded-ds w-52 mt-2">
                                    <li>
                                        <button onClick={() => navigate('/login')} className="flex items-center gap-2 text-sm">
                                            <i className="fas fa-sign-in-alt"></i> Login
                                        </button>
                                    </li>
                                    <li>
                                        <button onClick={() => navigate('/register')} className="flex items-center gap-2 text-sm">
                                            <i className="fas fa-user-plus"></i> New? Register
                                        </button>
                                    </li>
                                </ul>
                            </div>
                        ) : (
                            <div className="dropdown dropdown-end">
                                <label tabIndex={0} className="flex items-center gap-2 cursor-pointer px-3 py-2 rounded hover:bg-white/10 transition-colors">
                                    <div className="bg-white text-primary w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0">
                                        {(currentUser.email?.[0] || 'U').toUpperCase()}
                                    </div>
                                    <span className="text-sm font-medium hidden xl:inline truncate max-w-[100px]">
                                        {currentUser.email?.split('@')[0]}
                                    </span>
                                    <i className="fas fa-chevron-down text-xs"></i>
                                </label>
                                <ul tabIndex={0} className="dropdown-content z-50 menu p-2 glass-surface shadow-glass text-on-surface rounded-ds w-52 mt-2">
                                    <li className="px-3 py-1">
                                        <span className="text-xs text-on-surface-variant truncate">{currentUser.email}</span>
                                    </li>
                                    <li><button onClick={() => navigate('/profile')} className="flex items-center gap-2 text-sm"><i className="fas fa-user w-4"></i>My Profile</button></li>
                                    <li><button onClick={() => navigate('/orders')} className="flex items-center gap-2 text-sm"><i className="fas fa-box w-4"></i>My Orders</button></li>
                                    {(userRole === 'seller' || userRole === 'admin') && (
                                        <li><button onClick={() => navigate('/seller-dashboard')} className="flex items-center gap-2 text-sm"><i className="fas fa-store w-4"></i>Seller Dashboard</button></li>
                                    )}
                                    {userRole === 'admin' && (
                                        <li><button onClick={() => navigate('/admin-dashboard')} className="flex items-center gap-2 text-sm"><i className="fas fa-shield-alt w-4"></i>Admin Panel</button></li>
                                    )}
                                    <li className="mt-1 pt-1">
                                        <button onClick={handleLogout} className="flex items-center gap-2 text-sm text-red-500"><i className="fas fa-sign-out-alt w-4"></i>Logout</button>
                                    </li>
                                </ul>
                            </div>
                        )}

                        {/* Become a Seller */}
                        <button
                            onClick={() => navigate('/register')}
                            className="px-3 py-2 rounded hover:bg-white/10 transition-colors text-sm font-medium whitespace-nowrap"
                        >
                            Become a Seller
                        </button>

                        {/* Theme Switcher */}
                        <div className="px-2 py-2">
                            <ThemeSwitcher />
                        </div>

                        {/* Cart */}
                        <NavLink to="/cart" className="flex items-center gap-2 px-3 py-2 rounded hover:bg-white/10 transition-colors relative">
                            <div className="relative">
                                <i className="fas fa-shopping-cart text-xl"></i>
                                {itemCount > 0 && (
                                    <span className="absolute -top-2 -right-2 bg-secondary text-white rounded-full text-xs w-5 h-5 flex items-center justify-center font-bold">
                                        {itemCount > 9 ? '9+' : itemCount}
                                    </span>
                                )}
                            </div>
                            <span className="text-sm font-medium hidden xl:inline">Cart</span>
                        </NavLink>
                    </div>

                    {/* Mobile: Theme + Cart + Hamburger */}
                    <div className="lg:hidden flex items-center gap-2">
                        <ThemeSwitcher />
                        <NavLink to="/cart" onClick={closeMobile} className="relative p-2">
                            <i className="fas fa-shopping-cart text-lg"></i>
                            {itemCount > 0 && (
                                <span className="absolute -top-1 -right-1 bg-secondary text-white rounded-full text-xs w-5 h-5 flex items-center justify-center font-bold">
                                    {itemCount > 9 ? '9+' : itemCount}
                                </span>
                            )}
                        </NavLink>
                        <button className="p-2 focus:outline-none" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
                            <i className={`fas ${isMobileMenuOpen ? 'fa-times' : 'fa-bars'} text-xl`}></i>
                        </button>
                    </div>
                </div>

                {/* Desktop Nav Strip */}
                <nav className="hidden lg:block bg-primary-container">
                    <div className="max-w-7xl mx-auto px-4 flex gap-1 text-sm overflow-x-auto">
                        {[
                            { label: 'Home', to: '/', icon: 'fa-home' },
                            { label: 'All Products', to: '/products', icon: 'fa-th-large' },
                            { label: 'Fertilizers', to: '/products?category=Fertilizers', icon: 'fa-flask' },
                            { label: 'Seeds', to: '/products?category=Seeds', icon: 'fa-seedling' },
                            { label: 'Grains', to: '/products?category=Grains', icon: 'fa-wheat-awn' },
                            { label: 'Tools', to: '/products?category=Tools', icon: 'fa-tools' },
                            { label: 'About Us', to: '/about-us', icon: 'fa-info-circle' },
                            { label: 'Contact', to: '/contact', icon: 'fa-envelope' },
                        ].map(({ label, to, icon }) => (
                            <NavLink
                                key={to}
                                to={to}
                                className={({ isActive }) =>
                                    `flex items-center gap-1.5 px-3 py-2.5 whitespace-nowrap transition-colors ${isActive ? 'text-white font-semibold' : 'text-white/60 hover:text-white'}`
                                }
                            >
                                <i className={`fas ${icon} text-xs`}></i>
                                <span>{label}</span>
                            </NavLink>
                        ))}
                    </div>
                </nav>
            </header>

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
                <nav className="lg:hidden glass-surface text-on-surface shadow-glass">
                    <div className="flex flex-col py-2">
                        {[
                            { label: 'Home', to: '/', icon: 'fa-home' },
                            { label: 'Products', to: '/products', icon: 'fa-th-large' },
                            { label: 'About Us', to: '/about-us', icon: 'fa-info-circle' },
                            { label: 'Contact', to: '/contact', icon: 'fa-envelope' },
                        ].map(({ label, to, icon }) => (
                            <NavLink
                                key={to}
                                to={to}
                                onClick={closeMobile}
                                className={({ isActive }) =>
                                    `flex items-center gap-3 px-6 py-3 text-sm ${isActive ? 'text-secondary-accent font-semibold bg-surface-container' : 'hover:bg-surface-container'}`
                                }
                            >
                                <i className={`fas ${icon} w-4`}></i>{label}
                            </NavLink>
                        ))}

                        <div className="mt-1 pt-1">
                            {!currentUser ? (
                                <>
                                    <button onClick={() => { navigate('/login'); closeMobile(); }} className="flex items-center gap-3 px-6 py-3 text-sm w-full hover:bg-surface-container">
                                        <i className="fas fa-sign-in-alt w-4"></i>Login
                                    </button>
                                    <button onClick={() => { navigate('/register'); closeMobile(); }} className="flex items-center gap-3 px-6 py-3 text-sm w-full hover:bg-surface-container">
                                        <i className="fas fa-user-plus w-4"></i>Register
                                    </button>
                                </>
                            ) : (
                                <>
                                    <button onClick={() => { navigate('/profile'); closeMobile(); }} className="flex items-center gap-3 px-6 py-3 text-sm w-full hover:bg-surface-container">
                                        <i className="fas fa-user w-4"></i>My Profile
                                    </button>
                                    <button onClick={() => { navigate('/orders'); closeMobile(); }} className="flex items-center gap-3 px-6 py-3 text-sm w-full hover:bg-surface-container">
                                        <i className="fas fa-box w-4"></i>My Orders
                                    </button>
                                    {(userRole === 'seller' || userRole === 'admin') && (
                                        <button onClick={() => { navigate('/seller-dashboard'); closeMobile(); }} className="flex items-center gap-3 px-6 py-3 text-sm w-full hover:bg-surface-container">
                                            <i className="fas fa-store w-4"></i>Seller Dashboard
                                        </button>
                                    )}
                                    {userRole === 'admin' && (
                                        <button onClick={() => { navigate('/admin-dashboard'); closeMobile(); }} className="flex items-center gap-3 px-6 py-3 text-sm w-full hover:bg-surface-container">
                                            <i className="fas fa-shield-alt w-4"></i>Admin Panel
                                        </button>
                                    )}
                                    <button onClick={handleLogout} className="flex items-center gap-3 px-6 py-3 text-sm w-full text-red-500 hover:bg-surface-container">
                                        <i className="fas fa-sign-out-alt w-4"></i>Logout
                                    </button>
                                </>
                            )}
                        </div>
                    </div>
                </nav>
            )}
        </div>
    );
};

export default NavBar;
