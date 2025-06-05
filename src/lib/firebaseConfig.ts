// src/lib/firebaseConfig.ts
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDtK7GTc8bUucoIuSXSBZeoUcrzKbbEQlo",
  authDomain: "construloja-ddb06.firebaseapp.com",
  projectId: "construloja-ddb06",
  storageBucket: "construloja-ddb06.firebasestorage.app",
  messagingSenderId: "262018103194",
  appId: "1:262018103194:web:ff8f3437e81df2fbe4ec23",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
