import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyCrWaRaSsSJzGoeyIU56sdTDA2xnl5NOBQ",
  authDomain: "sahilnamdo-chatapp.firebaseapp.com",
  projectId: "sahilnamdo-chatapp",
  storageBucket: "sahilnamdo-chatapp.appspot.com",
  messagingSenderId: "89591428573",
  appId: "1:89591428573:web:6651ad04a699340f75b234",
  measurementId: "G-5P35PW9X4K"
};

export const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);