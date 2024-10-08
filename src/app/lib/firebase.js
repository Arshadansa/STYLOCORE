import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
  getDoc,
  doc,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA9z67dLECayHwJOim0AuJdldi8iaLr5nQ",
  authDomain: "stylacor.firebaseapp.com",
  projectId: "stylacor",
  storageBucket: "stylacor.appspot.com",
  messagingSenderId: "326785066179",
  appId: "1:326785066179:web:1d8fad5e87cb3fce752e76",
  measurementId: "G-3B1MF40M33",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const firestore = getFirestore(app); 

// Get Auth instance
export const auth = getAuth(app);

export const fetchAllProducts = async () => {
  try {
    const productsRef = collection(firestore, "products");
    const querySnapshot = await getDocs(productsRef);

    const products = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return products;
  } catch (error) {
    console.error("Error fetching all products:", error);
    return [];
  }
};

export const fetchProductById = async (productId) => {
  try {
    const docRef = doc(firestore, "products", productId);
    const productSnap = await getDoc(docRef);

    if (productSnap.exists()) {
      return productSnap.data();
    } else {
      console.error(`Product with ID ${productId} does not exist.`);
      throw new Error("Product not found");
    }
  } catch (error) {
    console.error("Error fetching product: ", error.message);
    throw new Error("Error fetching product: " + error.message);
  }
};

export const fetchProductsByTag = async (tag) => {
  try {
    const productsRef = collection(firestore, "products");
    const q = query(productsRef, where("tags", "array-contains", tag));

    const querySnapshot = await getDocs(q);

    const products = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return products;
  } catch (error) {
    console.error("Error fetching products: ", error);
    return [];
  }
};

export const fetchOrdersForEmail = async (emailId) => {
  try {
    const ordersRef = collection(firestore, "orders");
    const q = query(ordersRef, where("email", "==", emailId));

    const querySnapshot = await getDocs(q);
    const orders = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return orders;
  } catch (error) {
    console.error("Error fetching orders: ", error);
    return [];
  }
};


export const fetchRecentProducts = async (tags) => {
  if (!tags || tags.length === 0) {
    return []; // Return early if no tags
  }

  try {
    const productsRef = collection(firestore, "products");
    const q = query(productsRef, where("tags", "array-contains-any", tags));
    const querySnapshot = await getDocs(q);

    const products = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    console.log("Fetched Recent Products:", products); // Log fetched products
    return products;
  } catch (error) {
    console.error("Error fetching recent products:", error);
    return [];
  }
};
