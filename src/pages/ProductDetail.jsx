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
                    className={`text-lg ${interactive ? 'cursor-pointer hover:scale-110 transition-transform' : ''} ${star <= rating ? 'text-yellow-400' : 'text-surface-high'}`}
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
            <i className="fas fa-box-open text-5xl text-surface-high mb-4"></i>
            <h2 className="text-xl font-semibold text-base-content">Product not found</h2>
            <button onClick={() => navigate('/products')} className="btn btn-primary mt-4">Back to Products</button>
        </div>
    );

    const images = getImages();
    const displayImage = images[selectedImageIndex] || images[0] || 'product-jpeg-500x500.webp';

    return (
        <div className="bg-base-100 min-h-screen">
            <div className="max-w-7xl mx-auto px-4 py-6">
                {/* Breadcrumb */}
                <nav className="text-xs text-on-surface-variant mb-4 flex items-center gap-1">
                    <button onClick={() => navigate('/')} className="hover:text-secondary-accent transition-colors">Home</button>
                    <span>/</span>
                    <button onClick={() => navigate('/products')} className="hover:text-secondary-accent transition-colors">Products</button>
                    <span>/</span>
                    <span className="text-base-content truncate max-w-[200px]">{product.name}</span>
                </nav>

                <div className="bg-surface-lowest rounded-ds shadow-ambient overflow-hidden">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-0">
                        {/* Image Column */}
                        <div className="lg:col-span-2 bg-surface-low">
                            {/* Main Image */}
                            <div className="p-4">
                                <img
                                    src={displayImage}
                                    alt={product.name}
                                    className="w-full h-80 object-contain"
                                />
                            </div>
                            {/* Thumbnails */}
                            {images.length > 1 && (
                                <div className="flex gap-2 px-4 pb-3 overflow-x-auto pt-3">
                                    {images.map((img, index) => (
                                        <button
                                            key={index}
                                            onClick={() => setSelectedImageIndex(index)}
                                            className={`flex-shrink-0 w-14 h-14 rounded-ds overflow-hidden transition-all ${
                                                index === selectedImageIndex
                                                    ? 'ring-2 ring-secondary-accent'
                                                    : 'ghost-border ghost-border-hover'
                                            }`}
                                        >
                                            <img src={img} alt={`view ${index + 1}`} className="w-full h-full object-contain p-1" />
                                        </button>
                                    ))}
                                </div>
                            )}
                            {/* Add to Cart — sticky on mobile bottom */}
                            <div className="px-4 pb-4 flex gap-3 md:hidden pt-3">
                                {product.quantity > 0 ? (
                                    <button onClick={handleAddToCart} className="flex-1 bg-secondary text-white font-semibold py-3 rounded-ds shadow-ambient text-sm hover:opacity-90 transition-colors">
                                        <i className="fas fa-cart-plus mr-2"></i>Add to Cart
                                    </button>
                                ) : (
                                    <button disabled className="flex-1 bg-surface-high text-on-surface-variant font-semibold py-3 rounded-ds text-sm cursor-not-allowed">
                                        Out of Stock
                                    </button>
                                )}
                            </div>
                        </div>

                        {/* Product Info Column */}
                        <div className="lg:col-span-3 p-6">
                            <h1 className="text-2xl font-medium text-base-content leading-snug tracking-display">{product.name}</h1>

                            {/* Rating */}
                            {reviews.length > 0 && (
                                <div className="flex items-center gap-2 mt-2">
                                    <span className="inline-flex items-center gap-1 bg-primary text-on-primary text-xs font-bold px-2 py-0.5 rounded-ds">
                                        {averageRating} <i className="fas fa-star text-xs"></i>
                                    </span>
                                    <span className="text-xs text-on-surface-variant">{reviews.length} Reviews</span>
                                </div>
                            )}

                            <div className="my-6"></div>

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
                                <h3 className="ds-label mb-1">Description</h3>
                                <p className="text-sm text-base-content leading-relaxed">{product.description}</p>
                            </div>

                            {/* Seller */}
                            {product.sellerEmail && (
                                <div className="mt-3 text-xs text-on-surface-variant">
                                    <i className="fas fa-store mr-1"></i>Sold by: <span className="font-medium">{product.sellerEmail}</span>
                                </div>
                            )}

                            {/* Quantity + Add to Cart — Desktop */}
                            {product.quantity > 0 && (
                                <div className="mt-6 hidden md:block">
                                    <div className="flex items-center gap-4 mb-4">
                                        <span className="text-sm font-medium text-on-surface-variant">Quantity:</span>
                                        <div className="flex items-center ghost-border rounded-ds overflow-hidden">
                                            <button
                                                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                                className="px-4 py-2 text-lg font-semibold hover:bg-surface-container transition-colors text-base-content"
                                            >−</button>
                                            <span className="px-5 py-2 ghost-border-x font-semibold text-base-content min-w-[50px] text-center">{quantity}</span>
                                            <button
                                                onClick={() => setQuantity(Math.min(product.quantity, quantity + 1))}
                                                className="px-4 py-2 text-lg font-semibold hover:bg-surface-container transition-colors text-base-content"
                                            >+</button>
                                        </div>
                                    </div>
                                    <div className="flex gap-3">
                                        <button
                                            onClick={handleAddToCart}
                                            className="flex-1 max-w-xs bg-secondary hover:opacity-90 text-white font-semibold py-3 rounded-ds shadow-ambient text-sm transition-colors"
                                        >
                                            <i className="fas fa-cart-plus mr-2"></i>Add to Cart
                                        </button>
                                        <button
                                            onClick={() => navigate('/checkout')}
                                            className="flex-1 max-w-xs ds-btn-primary py-3 text-sm shadow-ambient"
                                        >
                                            <i className="fas fa-bolt mr-2"></i>Buy Now
                                        </button>
                                    </div>
                                </div>
                            )}

                            {/* Delivery Info */}
                            <div className="mt-5 bg-surface-container rounded-ds p-4 text-sm">
                                <div className="flex items-start gap-3 mb-3">
                                    <i className="fas fa-truck text-primary mt-0.5"></i>
                                    <div>
                                        <span className="font-semibold text-base-content">Free Delivery</span>
                                        <p className="text-xs text-on-surface-variant">On orders above ₹499</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <i className="fas fa-undo text-primary mt-0.5"></i>
                                    <div>
                                        <span className="font-semibold text-base-content">7-Day Returns</span>
                                        <p className="text-xs text-on-surface-variant">Easy return & refund policy</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Reviews Section */}
                <div className="mt-6 bg-surface-lowest rounded-ds shadow-ambient p-8">
                    <h2 className="text-xl font-bold text-base-content mb-4 tracking-display">
                        Ratings & Reviews
                        {reviews.length > 0 && (
                            <span className="ml-2 text-sm font-normal text-on-surface-variant">({reviews.length} reviews)</span>
                        )}
                    </h2>

                    {/* Overall Rating */}
                    {reviews.length > 0 && (
                        <div className="flex items-center gap-4 mb-6 p-4 bg-surface-container rounded-ds">
                            <div className="text-center">
                                <p className="text-5xl font-bold text-base-content">{averageRating}</p>
                                <StarRating rating={Math.round(averageRating)} />
                                <p className="text-xs text-on-surface-variant mt-1">{reviews.length} reviews</p>
                            </div>
                        </div>
                    )}

                    {/* Write Review Form */}
                    {currentUser && (
                        <form onSubmit={handleSubmitReview} className="mb-6 p-4 bg-surface-container rounded-ds">
                            <h3 className="font-semibold text-base-content mb-3">Write a Review</h3>
                            <div className="mb-3">
                                <label className="block text-sm text-on-surface-variant mb-1">Your Rating</label>
                                <StarRating rating={reviewRating} onRate={setReviewRating} interactive />
                            </div>
                            <textarea
                                value={reviewText}
                                onChange={(e) => setReviewText(e.target.value)}
                                placeholder="Share your experience with this product..."
                                className="textarea textarea-bordered w-full mb-3 text-base-content text-sm"
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
                        <div className="text-center py-8 text-on-surface-variant">
                            <i className="fas fa-comment-slash text-3xl mb-2"></i>
                            <p className="text-sm">No reviews yet. Be the first to review!</p>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {reviews.map((review) => (
                                <div key={review.id} className="pb-4 mb-4 last:mb-0 last:pb-0">
                                    <div className="flex items-center gap-2 mb-1">
                                        <span className="inline-flex items-center gap-1 bg-primary text-on-primary text-xs font-bold px-1.5 py-0.5 rounded-ds">
                                            {review.rating} <i className="fas fa-star text-xs"></i>
                                        </span>
                                        <span className="text-xs text-on-surface-variant">{review.userEmail}</span>
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
