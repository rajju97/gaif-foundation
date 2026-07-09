import { db } from "../firebase";
import {
    collection,
    addDoc,
    getDocs,
    doc,
    getDoc,
    updateDoc,
    deleteDoc,
    setDoc,
    query,
    where,
    serverTimestamp,
    runTransaction
} from "firebase/firestore";

const productsCollection = collection(db, "products");
const usersCollection = collection(db, "users");
const ordersCollection = collection(db, "orders");
const reviewsCollection = collection(db, "reviews");

// ── Products ──

export const addProduct = async (productData) => {
    return await addDoc(productsCollection, {
        ...productData,
        createdAt: serverTimestamp(),
    });
};

export const getProducts = async (sellerId = null) => {
    let q = productsCollection;
    if (sellerId) {
        q = query(productsCollection, where("sellerId", "==", sellerId));
    }
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(d => ({ ...d.data(), id: d.id }));
};

export const getProductById = async (id) => {
    const productDoc = await getDoc(doc(db, "products", id));
    if (productDoc.exists()) {
        return { ...productDoc.data(), id: productDoc.id };
    }
    return null;
};

// Atomically decrements stock so concurrent buyers can't oversell the same product.
export const decrementProductStock = async (productId, amount) => {
    const productRef = doc(db, "products", productId);
    await runTransaction(db, async (transaction) => {
        const productSnap = await transaction.get(productRef);
        if (!productSnap.exists()) throw new Error("Product not found.");
        const currentQty = productSnap.data().quantity ?? 0;
        if (currentQty < amount) {
            throw new Error(`Insufficient stock for "${productSnap.data().name}". Available: ${currentQty}.`);
        }
        transaction.update(productRef, { quantity: currentQty - amount });
    });
};

export const updateProduct = async (id, data, currentUserId) => {
    const productRef = doc(db, "products", id);
    const productSnap = await getDoc(productRef);
    if (!productSnap.exists()) throw new Error("Product not found.");
    if (productSnap.data().sellerId !== currentUserId) {
        throw new Error("Unauthorized: you do not own this product.");
    }
    await updateDoc(productRef, data);
};

export const deleteProduct = async (id, currentUserId) => {
    const productRef = doc(db, "products", id);
    const productSnap = await getDoc(productRef);
    if (!productSnap.exists()) throw new Error("Product not found.");
    if (productSnap.data().sellerId !== currentUserId) {
        const userDoc = await getDoc(doc(db, "users", currentUserId));
        if (!userDoc.exists() || userDoc.data().role !== 'admin') {
            throw new Error("Unauthorized: you do not own this product.");
        }
    }
    await deleteDoc(productRef);
};

// ── Users ──

export const getUserRole = async (uid) => {
    const userDoc = await getDoc(doc(db, "users", uid));
    if (userDoc.exists()) {
        return userDoc.data().role;
    }
    return null;
};

export const getUserProfile = async (uid) => {
    const userDoc = await getDoc(doc(db, "users", uid));
    if (userDoc.exists()) {
        return { ...userDoc.data(), id: userDoc.id };
    }
    return null;
};

export const updateUserProfile = async (uid, data) => {
    const { role, ...safeData } = data;
    void role;
    const userRef = doc(db, "users", uid);
    await updateDoc(userRef, safeData);
};

export const getAllUsers = async () => {
    const querySnapshot = await getDocs(usersCollection);
    return querySnapshot.docs.map(d => ({ ...d.data(), id: d.id }));
};

export const deleteUser = async (id, adminUserId) => {
    const adminDoc = await getDoc(doc(db, "users", adminUserId));
    if (!adminDoc.exists() || adminDoc.data().role !== 'admin') {
        throw new Error("Unauthorized: only admins can delete users.");
    }
    await deleteDoc(doc(db, "users", id));
};

export const updateUserRole = async (userId, newRole, adminUserId) => {
    const validRoles = ['customer', 'seller', 'admin'];
    if (!validRoles.includes(newRole)) throw new Error("Invalid role value.");
    const adminDoc = await getDoc(doc(db, "users", adminUserId));
    if (!adminDoc.exists() || adminDoc.data().role !== 'admin') {
        throw new Error("Unauthorized: only admins can change user roles.");
    }
    await updateDoc(doc(db, "users", userId), { role: newRole, updatedAt: serverTimestamp() });
};

// ── Config ──

export const getCommissionRate = async () => {
    const snap = await getDoc(doc(db, "config", "commission"));
    return snap.exists() ? (snap.data().rate ?? 0) : 0;
};

export const updateCommissionRate = async (rate, adminUserId) => {
    const adminDoc = await getDoc(doc(db, "users", adminUserId));
    if (!adminDoc.exists() || adminDoc.data().role !== 'admin') {
        throw new Error("Unauthorized.");
    }
    await setDoc(doc(db, "config", "commission"), { rate: Number(rate), updatedAt: serverTimestamp() });
};

export const getGstRate = async () => {
    const snap = await getDoc(doc(db, "config", "gst"));
    return snap.exists() ? (snap.data().rate ?? 0.05) : 0.05;
};

export const updateGstRate = async (rate, adminUserId) => {
    const adminDoc = await getDoc(doc(db, "users", adminUserId));
    if (!adminDoc.exists() || adminDoc.data().role !== 'admin') {
        throw new Error("Unauthorized.");
    }
    await setDoc(doc(db, "config", "gst"), { rate: Number(rate), updatedAt: serverTimestamp() });
};

// ── Orders ──

export const createOrder = async (orderData) => {
    return await addDoc(ordersCollection, {
        ...orderData,
        createdAt: serverTimestamp(),
        status: 'pending',
    });
};

export const getOrdersByBuyer = async (buyerId) => {
    const q = query(ordersCollection, where("buyerId", "==", buyerId));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(d => ({ ...d.data(), id: d.id }));
};

export const getOrdersBySeller = async (sellerId) => {
    const q = query(ordersCollection, where("sellerId", "==", sellerId));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(d => ({ ...d.data(), id: d.id }));
};

export const getAllOrders = async () => {
    const querySnapshot = await getDocs(ordersCollection);
    return querySnapshot.docs.map(d => ({ ...d.data(), id: d.id }));
};

export const updateOrderStatus = async (orderId, status, currentUserId) => {
    const orderRef = doc(db, "orders", orderId);
    const orderSnap = await getDoc(orderRef);
    if (!orderSnap.exists()) throw new Error("Order not found.");
    const order = orderSnap.data();

    if (order.sellerId !== currentUserId) {
        const userDoc = await getDoc(doc(db, "users", currentUserId));
        if (!userDoc.exists() || userDoc.data().role !== 'admin') {
            throw new Error("Unauthorized: you cannot update this order.");
        }
    }

    const allowed = ['pending', 'confirmed', 'shipped', 'delivered', 'cancelled'];
    if (!allowed.includes(status)) throw new Error("Invalid status value.");

    await updateDoc(orderRef, { status, updatedAt: serverTimestamp() });
};

// ── Reviews ──

export const addReview = async (reviewData) => {
    return await addDoc(reviewsCollection, {
        ...reviewData,
        createdAt: serverTimestamp(),
    });
};

export const getReviewsByProduct = async (productId) => {
    const q = query(reviewsCollection, where("productId", "==", productId));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(d => ({ ...d.data(), id: d.id }));
};
