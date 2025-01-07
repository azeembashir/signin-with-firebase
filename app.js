import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
import {
  getAuth,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "https://www.gstatic.com/firebasejs/11.1.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyBmdVf0odv_gEmMAoUI69tLvzdQBoFqH-A",
  authDomain: "myproject-68350.firebaseapp.com",
  projectId: "myproject-68350",
  storageBucket: "myproject-68350.firebasestorage.app",
  messagingSenderId: "284031221969",
  appId: "1:284031221969:web:05ae4214ddf121a3f145f0",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const signupEmail = document.getElementById("signup_email");
const signupPassword = document.getElementById("signup_password");
const signup_btn = document.getElementById("signup_btn");

const signin_email = document.getElementById("signin_email");
const signin_password = document.getElementById("signin_password");
const signin_btn = document.getElementById("signin_btn");

const logout_btn = document.getElementById("logout_btn");

const auth_container = document.getElementById("auth_container");
const user_container = document.getElementById("user_container");
const signup_cont = document.getElementById("signup_cont");
const signin_cont = document.getElementById("signin_cont");

// Handle authentication state
onAuthStateChanged(auth, (user) => {
  if (user) {
    auth_container.style.display = "none";
    user_container.style.display = "block";
  } else {
    auth_container.style.display = "block";
    signup_cont.style.display = "block";
    signin_cont.style.display = "none";
    user_container.style.display = "none";
  }
});

// Signup
signup_btn.addEventListener("click", () => {
  createUserWithEmailAndPassword(auth, signupEmail.value, signupPassword.value)
    .then((userCredential) => {
      // alert("Signup successful!");
      Swal.fire("Success", "Signup successful!", "success");
      auth.signOut(); // Automatically log out the user after signup
      signup_cont.style.display = "none"; // Hide signup form
      signin_cont.style.display = "block"; // Show signin form
      signupEmail.value = "";
      signupPassword.value = "";

    })
    .catch((error) => {
      // alert(error.message);
      Swal.fire(error.message, "Please fill all fields Correctly", "error");
    });
});

// Signin
signin_btn.addEventListener("click", () => {
  signInWithEmailAndPassword(auth, signin_email.value, signin_password.value)
    .then((userCredential) => {
      // alert("Signin successful!");
      Swal.fire("Success", "Sigin successful!", "success");
    })
    .catch((error) => {
      // alert(error.message);
      Swal.fire(error.message, "Please fill all fields Correctly", "error");
    });
});

// Logout
logout_btn.addEventListener("click", () => {
  signOut(auth)
    .then(() => {
      // alert("Logged out successfully!");
      Swal.fire("Success", "Logged out successful!", "success");
    })
    .catch((error) => {
      // alert(error.message);
      Swal.fire(error.message, "error");
    });
});

// Toggle between Signup and Signin
document.querySelector(".toggle a").addEventListener("click", (e) => {
  e.preventDefault();
  signup_cont.style.display =
    signup_cont.style.display === "none" ? "block" : "none";
  signin_cont.style.display =
    signin_cont.style.display === "none" ? "block" : "none";
});
