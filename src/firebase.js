// src/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, query, orderBy, onSnapshot } from "firebase/firestore";

// Your Firebase config (replace with your config)
const firebaseConfig = {
  apiKey: "your-api-key",
  authDomain: "your-auth-domain",
  projectId: "your-project-id",
  storageBucket: "your-storage-bucket",
  messagingSenderId: "your-sender-id",
  appId: "your-app-id",
  measurementId: "your-measurement-id",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Firestore references
const messagesCollection = collection(db, "messages");

// Function to send a message
const sendMessage = async (text, userName) => {
  try {
    await addDoc(messagesCollection, {
      text: text,
      user: userName,
      timestamp: new Date(),
    });
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};

// Function to listen for new messages
const listenForMessages = (callback) => {
  const q = query(messagesCollection, orderBy("timestamp"));
  onSnapshot(q, (querySnapshot) => {
    const messages = [];
    querySnapshot.forEach((doc) => {
      messages.push(doc.data());
    });
    callback(messages);
  });
};

export { sendMessage, listenForMessages };
