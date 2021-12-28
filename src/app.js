import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';
// import firebase from 'firebase'
// require('firebase/auth')
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAqpypVh75V_xqIsYGZAo6owJQbadrZCvw",
  authDomain: "fckng-prj.firebaseapp.com",
  projectId: "fckng-prj",
  storageBucket: "fckng-prj.appspot.com",
  messagingSenderId: "847037279857",
  appId: "1:847037279857:web:6cb74946cf33030928f5d0"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

getUsers(db);

// const defaultAuth =  firebase.firestore().auth();
//
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const buttonConfirm = document.getElementById('btn_1');
const user =  {
  email: "",
  password: ""
}

emailInput.addEventListener('input', (event) => {
  if (event.target.value.match(/[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[a-zA-Z0-9]+/)) {
    user.email = event.target.value;
  } else { 
    console.log("net")
  }
});

passwordInput.addEventListener('input', (event) => {
  if (event.target.value.match(/(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/)) {
    user.password = event.target.value;
    console.log(user)
  } else { 
    console.log('Password should contain at least 8 symbols,2 big letters and numbers!')
    }
});

buttonConfirm.addEventListener('click', (event) =>{
  if (user.email && user.password) {
    console.log(user)
    createUser(user);    
  } else {
    console.log('no')
  }
});

async function getUsers(db) {
  const usersCol = collection(db, 'users');
  const usersSnapshot = await getDocs(usersCol);
  const usersList = usersSnapshot.docs.map(doc => doc.data());
  console.log(usersList);
}

const createUser = (user) => {
  const auth = getAuth(app);
  createUserWithEmailAndPassword(auth, user.email, user.password)
    .then((userCredential) => {
      // Signed in 
      console.log(userCredential)
      // console.log(user)
      // ...
    })
    .catch((error) => {
      console.log(error)
      const errorCode = error.code;
      const errorMessage = error.message;
      // ..
    });
}
