import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
  onSnapshot,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDtC7dDXeXrRjgA8buXOLmBmXO_LT3dbnI",
  authDomain: "fir-test-c1429.firebaseapp.com",
  projectId: "fir-test-c1429",
  storageBucket: "fir-test-c1429.appspot.com",
  messagingSenderId: "919107205583",
  appId: "1:919107205583:web:413ea19b83a0356591baba",
};

// init firebase app
initializeApp(firebaseConfig);

//init services
const db = getFirestore();

//collection ref
const colRef = collection(db, "books");

//real time collection data
onSnapshot(colRef, (data) => {
  let books = [];
  data.docs.forEach((doc) => {
    books.push({ ...doc.data(), id: doc.id });
  });
  console.log(books);
}).catch((err) => {
  console.log(err);
});

// adding documents
const addBookForm = document.querySelector(".add");
addBookForm.addEventListener("submit", (e) => {
  e.preventDefault();

  addDoc(colRef, {
    title: addBookForm.title.value,
    author: addBookForm.author.value,
  }).then(() => {
    addBookForm.reset();
  });
});

// deleting documents
const deleteBookForm = document.querySelector(".delete");
deleteBookForm
  .addEventListener("submit", (e) => {
    e.preventDefault();

    const docRef = doc(db, "books", deleteBookForm.id.value);
    deleteDoc(docRef);
  })
  .then(() => {
    deleteBookForm.reset(