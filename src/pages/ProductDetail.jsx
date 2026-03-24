import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getProductById, getReviewsByProduct, addReview } from '../services/db';
import { addItem } from '../dispatchers';
import { useAuth } from '../context/AuthContext';

/* eslint-disable react/prop-types */
const StarRating = ({ rating, onRate, interactive = false }) => {
    return (
        <div className="flex gap-0.5">
            {[1, 2, 3, 4, 5].map((star) => (
                <span
                    key={star}
                    onClick={() => interactive && onRate(star)}
                    className={`text-lg ${interactive ? 'cursor-pointer hover:scale-110 transition-transform' : ''} ${star <= rating ? 'text-yellow-400' : 'text-gray-300'}`}
                >
                    <i className="fas fa-star"></i>
                </span>
            ))}
        </div>
    );
};

const ProductDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { currentUser } = useAuth();

    const [product, setProduct] = useState(null);
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [quantity, setQuantity] = useState(1);
    const [reviewText, setReviewText] = useState('');
    const [reviewRating, setReviewRating] = useState(5);
    const [submitting, setSubmitting] = useState(false);
    const [selectedImageIndex, setSelectedImageIndex] = useState(0);

    useEffect(() => {
        const load = async () => {
            setLoading(true);
            try {
                const [prod, revs] = await Promise.all([
                    getProductById(id),
                    getReviewsByProduct(id),
                ]);
                setProduct(prod);
                setReviews(revs);
                setSelectedImageIndex(0);
            } catch (error) {
                console.error("Error loading product:", error);
            } finally {
                setLoading(false);
            }
        };
        load();
    }, [id]);

    const getImages = () => {
        if (!product) return [];
        if (product.images && product.images.length > 0) return product.images;
        if (product.image) return [product.image];
        return [];
    };

    const handleAddToCart = () => {
        if (!product) return;
        for (let i = 0; i < quantity; i++) {
            dispatch(addItem({ ...product, quantity: 0 }));
        }
        alert(`Added ${quantity} x ${product.name} to cart!`);
    };

    const handleSubmitReview = async (e) => {
        e.preventDefault();
        if (!currentUser) return alert("Please login to leave a review.");
        setSubmitting(true);
        try {
            await addReview({
                productId: id,
                userId: currentUser.uid,
                userEmail: currentUser.email,
                rating: reviewRating,
                text: reviewText,
            });
            const updatedReviews = await getReviewsByProduct(id);
            setReviews(updatedReviews);
            setReviewText('');
            setReviewRating(5);
        } catch (error) {
            console.error("Error submitting review:", error);
            alert("Failed to submit review.");
        } finally {
            setSubmitting(false);
        }
    };

    const averageRating = reviews.length > 0
        ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
        : 0;

    if (loading) return (
        <div className="flex justify-center items-center h-screen bg-base-100">
            <span className="loading loading-spinner loading-lg text-primary"></span>
        </div>
    );
    if (!product) return (
        <div className="text-center py-20 bg-base-100">
            <i className="fas fa-box-open text-5xl text-gray-300 mb-4"></i>
            <h2 className="text-xl font-semibold text-base-content">Product not found</h2>
            <button onClick={() => navigate('/products')} className="btn btn-primary mt-4">Back to Products</button>
        </div>
    );

    const images = getImages();
    const displayImage = images[selectedImageIndex] || images[0] || 'product-jpeg-500x500.webp';

    return (
        <div className="bg-base-100 min-h-screen">
            <div className="max-w-7xl mx-auto px-4 py-4">
                {/* Breadcrumb */}
                <nav className="text-xs text-gray-400 mb-4 flex items-center gap-1">
                    <button onClick={() => navigate('/')} className="hover:text-primary transition-colors">Home</button>
                    <span>/</span>
                    <button onClick={() => navigate('/products')} className="hover:text-primary transition-colors">Products</button>
                    <span>/</span>
                    <span className="text-base-content truncate max-w-[200px]">{product.name}</span>
                </nav>

                <div className="bg-base-200 rounded shadow-sm overflow-hidden">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-0">
                        {/* Image Column */}
                        <div className="lg:col-span-2 border-r border-base-300">
                            {/* Main Image */}
                            <div className="p-4 bg-base-200">
                                <img
                                    src={displayImage}
                                    alt={product.name}
                                    className="w-full h-80 object-contain"
                                />
                            </div>
                            {/* Thumbnails */}
                            {images.length > 1 && (
                                <div className="flex gap-2 px-4 pb-3 overflow-x-auto border-t border-base-300 pt-3">
                                    {images.map((img, index) => (
                                        <button
                                            key={index}
                                            onClick={() => setSelectedImageIndex(index)}
                                            className={`flex-shrink-0 w-14 h-14 rounded border-2 overflow-hidden transition-all ${
                                                index === selectedImageIndex
                                                    ? 'border-primary ring-1 ring-primary/30'
                                                    : 'border-base-300 hover:border-gray-400'
                                            }`}
                                        >
                                            <img src={img} alt={`view ${index + 1}`} className="w-full h-full object-contain p-1" />
                                        </button>
                                    ))}
                                </div>
                            )}
                            {/* Add to Cart — sticky on mobile bottom */}
                            <div className="px-4 pb-4 flex gap-3 md:hidden border-t border-base-300 pt-3">
                                {product.quantity > 0 ? (
                                    <button onClick={handleAddToCart} className="flex-1 bg-secondary text-white font-semibold py-3 rounded shadow text-sm hover:bg-orange-600 transition-colors">
                                        <i className="fas fa-cart-plus mr-2"></i>Add to Cart
                                    </button>
                                ) : (
                                    <button disabled className="flex-1 bg-gray-200 text-gray-400 font-semibold py-3 rounded text-sm cursor-not-allowed">
                                        Out of Stock
                                    </button>
                                )}
                            </div>
                        </div>

                        {/* Product Info Column */}
                        <div className="lg:col-span-3 p-6">
                            <h1 className="text-2xl font-medium text-base-content leading-snug">{product.name}</h1>

                            {/* Rating */}
                            {reviews.length > 0 && (
                                <div className="flex items-center gap-2 mt-2">
                                    <span className="inline-flex items-center gap-1 bg-primary text-white text-xs font-bold px-2 py-0.5 rounded">
                                        {averageRating} <i className="fas fa-star text-xs"></i>
                                    </span>
                                    <span className="text-xs text-gray-500">{reviews.length} Reviews</span>
                                </div>
                            )}

                            <div className="border-t border-base-300 my-4"></div>

                            {/* Price */}
                            <div className="flex items-baseline gap-2">
                                <span className="text-3xl font-medium text-base-content">₹{product.price}</span>
                            </div>

                            {/* Stock */}
                            <div className="mt-3">
                                <span className={`inline-flex items-center gap-1.5 text-sm font-medium ${product.quantity > 0 ? 'text-green-600' : 'text-red-500'}`}>
                                    <i className={`fas fa-circle text-xs`}></i>
                                    {product.quantity > 0 ? `In Stock (${product.quantity} available)` : 'Out of Stock'}
                                </span>
                            </div>

                            {/* Description */}
                            <div className="mt-4">
                                <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-1">Description</h3>
                                <p className="text-sm text-base-content leading-relaxed">{product.description}</p>
                            </div>

                            {/* Seller */}
                            {product.sellerEmail && (
                                <div className="mt-3 text-xs text-gray-500">
                                    <i className="fas fa-store mr-1"></i>Sold by: <span className="font-medium">{product.sellerEmail}</span>
                                </div>
                            )}

                            {/* Quantity + Add to Cart — Desktop */}
                            {product.quantity > 0 && (
                                <div className="mt-6 hidden md:block">
                                    <div className="flex items-center gap-4 mb-4">
                                        <span className="text-sm font-medium text-gray-500">Quantity:</span>
                                        <div className="flex items-center border border-base-300 rounded overflow-hidden">
                                            <button
                                                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                                className="px-4 py-2 text-lg font-semibold hover:bg-base-300 transition-colors text-base-content"
                                            >−</button>
                                            <span className="px-5 py-2 border-x border-base-300 font-semibold text-base-content min-w-[50px] text-center">{quantity}</span>
                                            <button
                                                onClick={() => setQuantity(Math.min(product.quantity, quantity + 1))}
                                                className="px-4 py-2 text-lg font-semibold hover:bg-base-300 transition-colors text-base-content"
                                            >+</button>
                                        </div>
                                    </div>
                                    <div className="flex gap-3">
                                        <button
                                            onClick={handleAddToCart}
                                            className="flex-1 max-w-xs bg-secondary hover:bg-orange-600 text-white font-semibold py-3 rounded shadow text-sm transition-colors"
                                        >
                                            <i className="fas fa-cart-plus mr-2"></i>Add to Cart
                                        </button>
                                        <button
                                            onClick={() => navigate('/checkout')}
                                            className="flex-1 max-w-xs bg-primary hover:bg-green-dark text-white font-semibold py-3 rounded shadow text-sm transition-colors"
                                        >
                                            <i className="fas fa-bolt mr-2"></i>Buy Now
                                        </button>
                                    </div>
                                </div>
                            )}

                            {/* Delivery Info */}
                            <div className="mt-5 bg-base-100 border border-base-300 rounded p-4 text-sm">
                                <div className="flex items-start gap-3 mb-3">
                                    <i className="fas fa-truck text-primary mt-0.5"></i>
                                    <div>
                                        <span className="font-semibold text-base-content">Free Delivery</span>
                                        <p className="text-xs text-gray-500">On orders above ₹499</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <i className="fas fa-undo text-primary mt-0.5"></i>
                                    <div>
                                        <span className="font-semibold text-base-content">7-Day Returns</span>
                                        <p className="text-xs text-gray-500">Easy return & refund policy</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Reviews Section */}
                <div className="mt-4 bg-base-200 rounded shadow-sm p-6">
                    <h2 className="text-xl font-bold text-base-content mb-4">
                        Ratings & Reviews
                        {reviews.length > 0 && (
                            <span className="ml-2 text-sm font-normal text-gray-500">({reviews.length} reviews)</span>
                        )}
                    </h2>

                    {/* Overall Rating */}
                    {reviews.length > 0 && (
                        <div className="flex items-center gap-4 mb-6 p-4 bg-base-100 rounded border border-base-300">
                            <div className="text-center">
                                <p className="text-5xl font-bold text-base-content">{averageRating}</p>
                                <StarRating rating={Math.round(averageRating)} />
                                <p className="text-xs text-gray-400 mt-1">{reviews.length} reviews</p>
                            </div>
                        </div>
                    )}

                    {/* Write Review Form */}
                    {currentUser && (
                        <form onSubmit={handleSubmitReview} className="mb-6 p-4 bg-base-100 rounded border border-base-300">
                            <h3 className="font-semibold text-base-content mb-3">Write a Review</h3>
                            <div className="mb-3">
                                <label className="block text-sm text-gray-500 mb-1">Your Rating</label>
                                <StarRating rating={reviewRating} onRate={setReviewRating} interactive />
                            </div>
                            <textarea
                                value={reviewText}
                                onChange={(e) => setReviewText(e.target.value)}
                                placeholder="Share your experience with this product..."
                                className="textarea textarea-bordered w-full mb-3 bg-base-200 text-base-content text-sm"
                                rows="3"
                                required
                            />
                            <button type="submit" disabled={submitting} className="btn btn-primary btn-sm">
                                {submitting ? <span className="loading loading-spinner loading-xs"></span> : 'Submit Review'}
                            </button>
                        </form>
                    )}

                    {/* Reviews List */}
                    {reviews.length === 0 ? (
                        <div className="text-center py-8 text-gray-400">
                            <i className="fas fa-comment-slash text-3xl mb-2"></i>
                            <p className="text-sm">No reviews yet. Be the first to review!</p>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {reviews.map((review) => (
                                <div key={review.id} className="border-b border-base-300 pb-4 last:border-0">
                                    <div className="flex items-center gap-2 mb-1">
                                        <span className="inline-flex items-center gap-1 bg-primary text-white text-xs font-bold px-1.5 py-0.5 rounded">
                                            {review.rating} <i className="fas fa-star text-xs"></i>
                                        </span>
                                        <span className="text-xs text-gray-400">{review.userEmail}</span>
                                    </div>
                                    <p className="text-sm text-base-content">{review.text}</p>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;
