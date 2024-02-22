import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBK-jo3IXJQnDXJdZsUFHoCm1eD56R5MZM",
  authDomain: "projet-react-native-849ea.firebaseapp.com",
  projectId: "projet-react-native-849ea",
  storageBucket: "projet-react-native-849ea.appspot.com",
  messagingSenderId: "596722965361",
  appId: "1:596722965361:web:65d58daa99e6b047d434d0"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth(app);