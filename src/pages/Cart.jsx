import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addItem, removeItem, clearCart } from '../dispatchers';
import { useAuth } from '../context/AuthContext';
import { useState } from 'react';
import Notification from '../components/Notification';
import ConfirmationModal from '../components/ConfirmationModal';

const Cart = () => {
    const cartItems = useSelector((state) => state.cart.items);
    const itemCount = useSelector((state) => state.cart.itemCount);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { currentUser } = useAuth();
    const [notification, setNotification] = useState({ message: '', type: '' });

    const totalPrice = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    const handleIncrease = (item) => dispatch(addItem(item));
    const handleDecrease = (item) => dispatch(removeItem(item));

    const handleClearCart = () => {
        document.getElementById('clear-cart-modal').showModal();
    };

    const confirmClearCart = () => {
        dispatch(clearCart());
        setNotification({ message: 'Cart cleared successfully.', type: 'success' });
    };

    const handleCheckout = () => {
        if (!currentUser) {
            setNotification({ message: 'Please login to proceed to checkout.', type: 'error' });
            setTimeout(() => navigate('/login'), 2000);
            return;
        }
        navigate('/checkout');
    };

    if (cartItems.length === 0) {
        return (
            <div className="bg-base-100 min-h-screen">
                <Notification message={notification.message} type={notification.type} />
                <div className="max-w-4xl mx-auto px-4 py-8">
                    <h1 className="text-2xl font-bold text-base-content mb-6 tracking-display">Shopping Cart</h1>
                    <div className="bg-surface-lowest rounded-ds shadow-ambient p-16 text-center">
                        <i className="fas fa-shopping-cart text-6xl text-surface-high mb-4"></i>
                        <h2 className="text-xl font-semibold text-base-content mb-2">Your cart is empty!</h2>
                        <p className="text-on-surface-variant text-sm mb-6">Add items to it now.</p>
                        <button onClick={() => navigate('/products')} className="ds-btn-primary px-8 py-3">
                            Shop Now
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-base-100 min-h-screen">
            <Notification message={notification.message} type={notification.type} />
            <ConfirmationModal id="clear-cart-modal" title="Clear Cart" message="Are you sure you want to clear all items from your cart?" onConfirm={confirmClearCart} />

            <div className="max-w-6xl mx-auto px-4 py-6">
                <h1 className="text-2xl font-bold text-base-content mb-4 tracking-display">
                    Shopping Cart
                    <span className="text-sm font-normal text-on-surface-variant ml-2">({itemCount} items)</span>
                </h1>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                    {/* Cart Items */}
                    <div className="lg:col-span-2 space-y-3">
                        {cartItems.map((item) => (
                            <div key={item.id} className="bg-surface-lowest rounded-ds shadow-ambient p-5 flex gap-4">
                                <img
                                    src={item.images?.[0] || item.image || "product-jpeg-500x500.webp"}
                                    alt={item.name}
                                    className="w-24 h-24 object-contain rounded-ds cursor-pointer flex-shrink-0 bg-surface-low p-1"
                                    onClick={() => navigate(`/product/${item.id}`)}
                                />
                                <div className="flex-1 min-w-0">
                                    <h3
                                        className="font-medium text-base-content text-sm cursor-pointer hover:text-secondary-accent line-clamp-2"
                                        onClick={() => navigate(`/product/${item.id}`)}
                                    >
                                        {item.name}
                                    </h3>
                                    <p className="text-green-600 text-xs mt-0.5">In Stock</p>
                                    <p className="text-lg font-bold text-base-content mt-1">₹{item.price}</p>

                                    <div className="flex items-center gap-3 mt-2">
                                        <div className="flex items-center ghost-border rounded-ds overflow-hidden">
                                            <button
                                                onClick={() => handleDecrease(item)}
                                                className="px-3 py-1 hover:bg-surface-container text-base-content font-semibold transition-colors"
                                            >−</button>
                                            <span className="px-4 py-1 ghost-border-x font-semibold text-base-content">{item.quantity}</span>
                                            <button
                                                onClick={() => handleIncrease(item)}
                                                className="px-3 py-1 hover:bg-surface-container text-base-content font-semibold transition-colors"
                                            >+</button>
                                        </div>
                                        <span className="text-sm font-semibold text-base-content ml-auto">
                                            ₹{(item.price * item.quantity).toFixed(2)}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ))}

                        <button
                            onClick={handleClearCart}
                            className="text-sm text-red-500 hover:text-red-600 flex items-center gap-1 transition-colors"
                        >
                            <i className="fas fa-trash text-xs"></i> Clear Cart
                        </button>
                    </div>

                    {/* Order Summary */}
                    <div className="bg-surface-lowest rounded-ds shadow-ambient p-6 h-fit sticky top-20">
                        <h2 className="ds-label mb-4 pb-4">
                            Price Details
                        </h2>

                        <div className="space-y-3 text-sm mb-4">
                            <div className="flex justify-between text-base-content">
                                <span>Price ({itemCount} items)</span>
                                <span>₹{totalPrice.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between text-base-content">
                                <span>Delivery Charges</span>
                                <span className="text-green-600 font-medium">Free</span>
                            </div>
                            <div className="pt-4 mt-4 flex justify-between font-bold text-base text-base-content" style={{ borderTop: '1px solid var(--ds-outline-variant, rgba(207, 196, 197, 0.2))' }}>
                                <span>Total Amount</span>
                                <span>₹{totalPrice.toFixed(2)}</span>
                            </div>
                        </div>

                        <p className="text-xs text-green-600 font-medium mb-4">
                            <i className="fas fa-tag mr-1"></i>You save ₹0 on this order
                        </p>

                        <button
                            onClick={handleCheckout}
                            className="w-full bg-secondary hover:opacity-90 text-white font-semibold py-3 rounded-ds transition-colors text-sm shadow-ambient"
                        >
                            Place Order
                        </button>

                        <button
                            onClick={() => navigate('/products')}
                            className="w-full mt-2 py-2 text-sm text-secondary-accent hover:underline"
                        >
                            Continue Shopping
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cart;
